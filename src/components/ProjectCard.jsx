import React from 'react';
import { PhysicsElement } from './PhysicsElement';

export const ProjectCard = ({ title, description, tags }) => {
  return (
    <PhysicsElement>
      <div className="project-card outline-box" style={{
        padding: '1.5rem',
        marginBottom: '1rem',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: 'var(--bg-color)',
      }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ marginBottom: '1rem', opacity: 0.8 }}>{description}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.map((tag, i) => (
            <span key={i} style={{ 
              fontSize: '0.75rem', 
              padding: '0.25rem 0.5rem', 
              border: '1px solid rgba(255, 255, 255, 0.5)' 
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </PhysicsElement>
  );
};
