class ParticleCleaner {
    cleanupBlood(particles) {
        if (particles.length > WorldConstants.maxBloodParticles) {
            let numParticlesToDelete = particles.length - WorldConstants.maxBloodParticles;
            console.log(numParticlesToDelete);
            for (let i = 0; i < numParticlesToDelete; i++) {
                particles[i].shouldBeDeleted = true;
            }
        }
        for (let i = 0; i < particles.length - 1; i++) {
            if (particles[i].shouldBeDeleted) {
                continue;
            }
            let p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let particlesOverlapping = Math.abs(p1.x - p2.x) < 1 && Math.abs(p1.y - p2.y) < 1;
                if (particlesOverlapping && p1.state === BloodParticle.INACTIVE) {
                    p2.shouldBeDeleted = true;
                }
            }
        }
    }
}
