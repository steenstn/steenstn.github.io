#include <iostream>
#include <stdlib.h>     
#include <time.h>
#include <vector>
#include <Windows.h>

void gotoxy(int x, int y) {
  COORD coord;
  coord.X = x;
  coord.Y = y;
  SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}

int randomChar() {
    return rand() % 70 + 33;
}

double random() {
    return (double)rand() / (double)RAND_MAX;
}

int maxX = 0;
int maxY = 0;

void setUpConsoleWindow() {
    HANDLE out = GetStdHandle(STD_OUTPUT_HANDLE);

    CONSOLE_CURSOR_INFO cursorInfo;
    GetConsoleCursorInfo(out, &cursorInfo);
    cursorInfo.bVisible = false;
    SetConsoleCursorInfo(out, &cursorInfo);

    CONSOLE_SCREEN_BUFFER_INFO bufferInfo;
    GetConsoleScreenBufferInfo(out, &bufferInfo);
    maxX = bufferInfo.srWindow.Right-bufferInfo.srWindow.Left;
    maxY = bufferInfo.srWindow.Bottom-bufferInfo.srWindow.Top;
}


struct character {
    float x, oldx;
    float y, oldy;
    float speed;
    char _character;
    char lastCharacter;
    int charTimer;
    int charTimerStart;
    int startupCounter;
    character(char character, int x, int y) {
        this->x = this->oldx = x;
        this->y = y-1;
        this->oldy = this->y - 1;
        this->_character = this->lastCharacter = character;
        this->speed = random()/8+0.05;
        this->charTimer = this->charTimerStart = (int)(random()*100+100);
        this->startupCounter =(int)(random()*4000+1000);
    }

    void move() {
        if(this->startupCounter > 0) {
            this->startupCounter--;
            return;
        }
        
        if(this->oldy+this->speed < maxY) { 
            this->oldy = this->oldy+this->speed;
        } else {
            this->oldy = 0;
        }

        if(this->y+this->speed < maxY) {
            this->oldx = this->oldx;
            this->y = this->y+this->speed;
            this->charTimer--;
        } else {
            this->y = 0;
        }
        if(this->charTimer <= 0) {
            this->charTimer = this->charTimerStart;
            this->_character = randomChar();
            this->lastCharacter = this->_character;
        }
        
    }

    void render() {
        if(this->startupCounter > 0) {
            return;
        }
        HANDLE out = GetStdHandle(STD_OUTPUT_HANDLE);
        bool renderBlack = this->_character+20 < 90;
        int characterColor = renderBlack ? 0 : FOREGROUND_BLUE | FOREGROUND_GREEN | FOREGROUND_INTENSITY | FOREGROUND_RED;
        SetConsoleTextAttribute(out, characterColor);
        gotoxy((int)this->x,(int)this->y);
        std::cout << this->_character;

        int trailColor = renderBlack ? 0 : FOREGROUND_GREEN;
        SetConsoleTextAttribute(out, trailColor);
        gotoxy((int)this->x,(int)this->oldy);
        std::cout << this->lastCharacter;
    }
};

int main(void) {
    setUpConsoleWindow();
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