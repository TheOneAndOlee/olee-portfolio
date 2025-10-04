<script lang="ts"> // Add lang="ts" to enable TypeScript
  import { onMount } from 'svelte';

  // --- TYPE DEFINITIONS ---
  
  // 1. Define a type for our particle objects for clarity and safety.
  type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };

  // --- VARIABLE DECLARATIONS WITH TYPES ---

  // 2. Define the type for the SVG element.
  let svgContainer: SVGElement;
  
  const numParticles = 50;
  const connectDistance = 175;
  
  // 3. Define the types for our arrays.
  let particles: Particle[] = [];
  let circles: SVGCircleElement[] = [];
  let lines: SVGLineElement[] = [];

  const svgNS = "http://www.w3.org/2000/svg";

  onMount(() => {
    const width = svgContainer.clientWidth;
    const height = svgContainer.clientHeight;

    for (let i = 0; i < numParticles; i++) {
      const p: Particle = { // We can use our Particle type here too
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random(),
        vy: Math.random(),
      };
      particles.push(p);

      const circle = document.createElementNS(svgNS, 'circle') as SVGCircleElement;
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', 'white');
      svgContainer.appendChild(circle);
      circles.push(circle);
    }
    
    for (let i = 0; i < numParticles * 2; i++) {
        const line = document.createElementNS(svgNS, 'line') as SVGLineElement;
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
        line.setAttribute('stroke-width', '1');
        svgContainer.appendChild(line);
        lines.push(line);
    }

    function animate() {
      let lineIndex = 0;

      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        circles[i].setAttribute('cx', String(p1.x));
        circles[i].setAttribute('cy', String(p1.y));

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
          
          if (distance < connectDistance && lineIndex < lines.length) {
            const line = lines[lineIndex];
            line.setAttribute('x1', String(p1.x));
            line.setAttribute('y1', String(p1.y));
            line.setAttribute('x2', String(p2.x));
            line.setAttribute('y2', String(p2.y));
            line.style.display = 'block';
            lineIndex++;
          }
        }
      }
      
      for (let i = lineIndex; i < lines.length; i++) {
        lines[i].style.display = 'none';
      }

      requestAnimationFrame(animate);
    }
    animate();
  });
</script>

<div class="svg-bg-container">
  <svg bind:this={svgContainer} width="100%" height="100%"></svg>
</div>

<style>
  .svg-bg-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: #041322;
  }
</style>