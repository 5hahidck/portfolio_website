import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const PhysicsContext = createContext();

export const usePhysics = () => useContext(PhysicsContext);

export const PhysicsProvider = ({ children }) => {
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Matter.js Engine
    const engine = Matter.Engine.create();
    engine.world.gravity.y = gravityEnabled ? 1 : 0;
    engineRef.current = engine;

    // Create a runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    // We don't necessarily need a Render, but we need a Mouse instance attached to the document for dragging
    const mouse = Matter.Mouse.create(document.body);
    
    // Fix Matter.js blocking mobile scroll and clicks
    mouse.element.style.touchAction = 'pan-y'; // Allow vertical scrolling
    
    // Optional: completely remove mousewheel event listeners so scroll isn't hijacked
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    // ADD THESE LINES TO FIX SCROLLING AND CLICKS ON MOBILE:
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("touchmove", mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener("touchstart", mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener("touchend", mouseConstraint.mouse.mouseup);

    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    // Since we're mapping DOM elements to bodies, the mouse positions will correctly map
    // provided we don't scroll. If we scroll, we might need to offset the mouse.
    
    // Add walls so things don't fall off screen
    const updateWalls = () => {
      const width = Math.max(document.documentElement.scrollWidth, window.innerWidth);
      const height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      const thickness = 60;

      // Remove existing walls
      const walls = engine.world.bodies.filter(b => b.label === 'wall');
      Matter.Composite.remove(engine.world, walls);

      const ground = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true, label: 'wall' });
      const leftWall = Matter.Bodies.rectangle(0 - thickness / 2, height / 2, thickness, height, { isStatic: true, label: 'wall' });
      const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true, label: 'wall' });
      const ceiling = Matter.Bodies.rectangle(width / 2, 0 - thickness / 2, width, thickness, { isStatic: true, label: 'wall' });

      Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);
    };

    updateWalls();
    window.addEventListener('resize', updateWalls);

    // Start engine
    Matter.Runner.run(runner, engine);

    return () => {
      window.removeEventListener('resize', updateWalls);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  // Update gravity when toggled
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.world.gravity.y = gravityEnabled ? 1 : 0;
      
      // Wake up all bodies if gravity turns on
      if (gravityEnabled) {
        engineRef.current.world.bodies.forEach(body => {
          if (!body.isStatic) {
            Matter.Sleeping.set(body, false);
          }
        });
      }
    }
  }, [gravityEnabled]);

  const toggleGravity = () => {
    setGravityEnabled(prev => !prev);
  };

  return (
    <PhysicsContext.Provider value={{ engine: engineRef.current, gravityEnabled, toggleGravity }}>
      {children}
    </PhysicsContext.Provider>
  );
};
