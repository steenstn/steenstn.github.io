#include <time.h>
#include <vector>
#include <sys/ioctl.h> //ioctl() and TIOCGWINSZ
#include <unistd.h> // for STDOUT_FILENO

struct winsize size;

double makeRandom() {
    return (double)rand() / (double)RAND_MAX;
}

int randomChar() {
    return rand() % 70 + 32;
}

int maxX = 0;
int maxY = 0;

struct character {
    float x;
    float y;
    float speed;
    char _character;
    int charTimer;
    int charTimerStart;
    int startupCounter;
    float cleanerY;
    float cleanerSpeed;
    character(char character, int x, int y) {
        this->x = x;
        this->y = y;
        this->_character = character;
        this->speed = makeRandom()/800+0.0002;
        this->charTimer = this->charTimerStart = (int)(makeRandom()*20000+20000);
        this->startupCounter =(int)(makeRandom()*20000+10000);
        this->cleanerY = 0;
        this->cleanerSpeed = this->speed*makeRandom();
    }

    void move() {
        
        if(this->y > maxY) {
            this->y = 0;
            this->startupCounter = (int)(makeRandom()*10000);
        }
        if(this->startupCounter > 0) {
            this->startupCounter--;
            return;
        }


        if(this->y+this->speed < maxY) {
            this->y = this->y+this->speed;
            this->cleanerY+=this->cleanerSpeed;
            this->charTimer--;
        } else {
            this->y = 1;
            this->cleanerY = 0;
        }

        if(this->charTimer <= 0) {
            this->charTimer = this->charTimerStart;
            this->_character = randomChar();
        }
        
    }

    void render() {
        if(this->startupCounter > 0) {
            return;
        }

        printf("\033[%d;%dH%c", (int)this->y, (int)this->x, this->_character);  

        if((int)this->cleanerY < (int)this->y) {
            printf("\033[%d;%dH ", (int)this->cleanerY, (int)this->x);
        }

    }
};


int main() {

    printf("\33[?25l"); // Hide cursor
    // printf("\33[?25h"); // show cursor
    ioctl(STDOUT_FILENO, TIOCGWINSZ, &size);
    maxX = size.ws_col;
    maxY = size.ws_row;
    srand(time(NULL));

    int maxCharacters = maxX;
    std::vector<character> allChars;
    for(int i = 0; i <= maxCharacters; i++) {
        allChars.push_back(character(randomChar(), i, 1));
    }

    while(true) {
        for(int i = 0; i < allChars.size(); i++) {
            allChars[i].move();
            allChars[i].render();
        }
    }

    return 0;
}

