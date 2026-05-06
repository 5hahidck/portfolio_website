import React from 'react';
import { PhysicsElement } from './PhysicsElement';

const skillCategories = [
  {
    title: 'Core CS',
    skills: ['System Design', 'DSA', 'Computer Architecture']
  },
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Frameworks & Tools',
    skills: ['React.js', 'Node.js', 'Tailwind CSS', 'Spring Boot', 'MySQL']
  }
];

export const SkillTags = () => {
  return (
    <div className="skills-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
      {skillCategories.map((category, catIndex) => (
        <div key={catIndex}>
          <PhysicsElement>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', opacity: 0.8, fontWeight: 'normal' }}>
              {category.title}
            </h3>
          </PhysicsElement>
          <div className="skill-tags-container" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'flex-start'
          }}>
            {category.skills.map((skill, index) => (
              <PhysicsElement 
                key={`${catIndex}-${index}`}
                alwaysPhysics={true}
                restitution={0.8} // Bouncier
                friction={0.01}
                options={{
                  density: 0.05
                }}
              >
                <div className="skill-tag" style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-color)',
                  userSelect: 'none'
                }}>
                  {skill}
                </div>
              </PhysicsElement>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
