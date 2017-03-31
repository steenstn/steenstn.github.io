class ParticleCleaner {

  cleanupBlood(particles : any) {
    for(let i = 0; i < particles.length - 1; i++) {
      if(particles[i].shouldBeDeleted) {
        continue;
      }
      let p1 = particles[i];
      for(let j = 0; j < particles.length; j++) {
        let p2 = particles[j];
        let particlesOverlapping = Math.abs(p1.x-p2.x)<1 && Math.abs(p1.y-p2.y)<1;
        if(particlesOverlapping) {
          p2.shouldBeDeleted = true;
        }
      }
    }
  }
}
