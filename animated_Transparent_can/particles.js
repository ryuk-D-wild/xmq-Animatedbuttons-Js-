export const createParticles = (container) => {
    if (!container) return;
  
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.position = "absolute";
      particle.style.width = "6px";
      particle.style.height = "6px";
      particle.style.backgroundColor = "#A4D0AD";
      particle.style.borderRadius = "50%";
      particle.style.opacity = "1";
      particle.style.pointerEvents = "none";
  
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 10;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
  
      particle.style.transform = `translate(${x}px, ${y}px)`;
      container.appendChild(particle);
  
      setTimeout(() => {
        particle.style.opacity = "0";
        particle.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
      }, 300);
  
      setTimeout(() => {
        container.removeChild(particle);
      }, 600);
    }
  };
  