import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const BackgroundMatrix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Matter.js setup
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 0; // Antigravity!
    engine.world.gravity.x = 0;

    // Assets
    const codeSnippets = [
      'function connect() {}',
      'const data = [];',
      'import React from "react";',
      'let system = true;',
      'export default System;',
      'if (x > 0) return true;',
      'console.log("initialized");',
      'module.exports = {};',
      'class Node {}',
      'await fetch("/api");'
    ];

    const icons = [
      // Gear path
      new Path2D('M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z'),
      // Cube
      new Path2D('M21 16V8C20.9996 7.64927 20.9071 7.30681 20.7315 7.00518C20.556 6.70355 20.3032 6.45262 20 6.276L13 2.276C12.696 2.09919 12.3511 2.00624 12 2.00624C11.6489 2.00624 11.304 2.09919 11 2.276L4 6.276C3.69681 6.45262 3.44399 6.70355 3.26846 7.00518C3.09292 7.30681 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09292 16.6932 3.26846 16.9948C3.44399 17.2965 3.69681 17.5474 4 17.724L11 21.724C11.304 21.9008 11.6489 21.9938 12 21.9938C12.3511 21.9938 12.696 21.9008 13 21.724L20 17.724C20.3032 17.5474 20.556 17.2965 20.7315 16.9948C20.9071 16.6932 20.9996 16.3507 21 16ZM12 4.088L18.421 7.764L12 11.441L5.579 7.764L12 4.088ZM5 16.035V8.683L11 12.115V19.467L5 16.035ZM13 19.467V12.115L19 8.683V16.035L13 19.467Z'),
      // Play/Triangle Node
      new Path2D('M8 5V19L19 12L8 5Z')
    ];

    const bodies = [];

    // Create Icon Bodies
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const radius = 25;
      const body = Matter.Bodies.circle(x, y, radius, {
        restitution: 0.8,
        frictionAir: 0.05,
        render: { iconIndex: i % icons.length, type: 'icon' },
        angle: Math.random() * Math.PI * 2
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
      bodies.push(body);
    }

    // Create Text Bodies
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const text = codeSnippets[i % codeSnippets.length];
      const width = text.length * 8; // approx width
      const height = 16;
      const body = Matter.Bodies.rectangle(x, y, width, height, {
        restitution: 0.8,
        frictionAir: 0.02,
        render: { text, type: 'text' },
        angle: (Math.random() - 0.5) * 0.2 // Slight random rotation
      });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 1, y: (Math.random() - 0.5) * 1 });
      bodies.push(body);
    }

    Matter.World.add(engine.world, bodies);

    // Mouse Tracking
    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render Loop
    let animationFrameId;
    const render = () => {
      Matter.Engine.update(engine, 1000 / 60);

      // Apply Wind and Mouse Repulsion
      bodies.forEach(body => {
        // Wind
        const windForce = { x: (Math.random() - 0.5) * 0.0001, y: (Math.random() - 0.5) * 0.0001 };
        Matter.Body.applyForce(body, body.position, windForce);

        // Bounds wrapping
        if (body.position.x < -100) Matter.Body.setPosition(body, { x: canvas.width + 100, y: body.position.y });
        if (body.position.x > canvas.width + 100) Matter.Body.setPosition(body, { x: -100, y: body.position.y });
        if (body.position.y < -100) Matter.Body.setPosition(body, { x: body.position.x, y: canvas.height + 100 });
        if (body.position.y > canvas.height + 100) Matter.Body.setPosition(body, { x: body.position.x, y: -100 });

        // Mouse Repulsion
        const dx = mousePos.x - body.position.x;
        const dy = mousePos.y - body.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const forceMagnitude = (200 - dist) * 0.000005;
          Matter.Body.applyForce(body, body.position, {
            x: -dx * forceMagnitude,
            y: -dy * forceMagnitude
          });
        }
      });

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bodies.forEach(body => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        if (body.render.type === 'icon') {
          // Scale down icons slightly and center them
          ctx.scale(1.5, 1.5);
          ctx.translate(-12, -12); // Path is centered around 12,12
          ctx.stroke(icons[body.render.iconIndex]);
        } else if (body.render.type === 'text') {
          ctx.font = '14px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(body.render.text, 0, 0);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        background: '#050505'
      }}
    />
  );
};

export default BackgroundMatrix;
