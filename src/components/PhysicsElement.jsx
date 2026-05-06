import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { usePhysics } from './PhysicsProvider';

export const PhysicsElement = ({ 
  children, 
  isStatic = false, 
  restitution = 0.5, 
  friction = 0.1, 
  className = '', 
  options = {}, 
  alwaysPhysics = false // If true, it is a physics body even when gravity is off (like floating skills)
}) => {
  const { engine, gravityEnabled } = usePhysics();
  const elementRef = useRef(null);
  const bodyRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const isPhysicsActive = alwaysPhysics || gravityEnabled;

  useEffect(() => {
    if (!engine || !elementRef.current) return;

    if (isPhysicsActive && !bodyRef.current) {
      // 1. Measure the element in its current DOM state
      const rect = elementRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate center coordinates
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      // Save starting position so we can use transform relative to it
      startPosRef.current = { x: centerX, y: centerY };

      // 2. Create Matter.js body
      const body = Matter.Bodies.rectangle(centerX, centerY, width, height, {
        isStatic: isStatic,
        restitution: restitution,
        friction: friction,
        frictionAir: alwaysPhysics && !gravityEnabled ? 0.05 : 0.01,
        ...options,
      });

      bodyRef.current = body;
      Matter.Composite.add(engine.world, body);

      // 3. Set up the sync loop
      const updateTransform = () => {
        if (!elementRef.current || !bodyRef.current) return;

        const { position, angle } = bodyRef.current;
        const dx = position.x - startPosRef.current.x;
        const dy = position.y - startPosRef.current.y;

        // Apply transform
        elementRef.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
      };

      Matter.Events.on(engine, 'afterUpdate', updateTransform);

      // Add mouse interaction if it's a floating skill
      if (alwaysPhysics) {
        const handleMouseEnter = () => {
          if (!gravityEnabled) {
            // Apply a small random force on hover
            const forceMagnitude = 0.05 * body.mass;
            Matter.Body.applyForce(body, body.position, {
              x: (Math.random() - 0.5) * forceMagnitude,
              y: (Math.random() - 0.5) * forceMagnitude
            });
          }
        };
        elementRef.current.addEventListener('mouseenter', handleMouseEnter);
        elementRef.current._cleanupHover = () => elementRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }

      return () => {
        if (elementRef.current && elementRef.current._cleanupHover) {
          elementRef.current._cleanupHover();
        }
        Matter.Events.off(engine, 'afterUpdate', updateTransform);
        Matter.Composite.remove(engine.world, body);
        bodyRef.current = null;
        
        // Reset transform
        if (elementRef.current) {
          elementRef.current.style.transform = 'none';
        }
      };
    }
  }, [engine, isPhysicsActive, gravityEnabled, isStatic, restitution, friction, options, alwaysPhysics]);

  return (
    <div 
      ref={elementRef} 
      className={`physics-element ${className}`} 
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  );
};
