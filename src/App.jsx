import React from 'react';
import { PhysicsProvider, usePhysics } from './components/PhysicsProvider';
import { PhysicsElement } from './components/PhysicsElement';
import { SkillTags } from './components/SkillTags';
import { ProjectCard } from './components/ProjectCard';
import BackgroundMatrix from './components/BackgroundMatrix';
import myPic from './assets/mypic.png';

const MainContent = () => {
  const { gravityEnabled, toggleGravity } = usePhysics();

  const projects = [
    {
      title: 'DeepLink — AI Learning Platform',
      description: 'An AI-driven educational platform designed to cultivate high-order thinking skills, featuring a seamless React and TypeScript architecture.',
      tags: ['TypeScript', 'React.js', 'AI Integration']
    },
    {
      title: 'IP Address Tracker',
      description: 'A responsive real-time IP and domain tracking application utilizing asynchronous JavaScript and dynamic map rendering.',
      tags: ['JavaScript', 'LeafletJS', 'IPify API']
    },
    {
      title: 'Automated WhatsApp PDF Reader',
      description: 'A full-stack application leveraging LLMs to extract business insights from PDFs with an optimized Python backend for high-performance data processing.',
      tags: ['Python', 'LLM', 'Full-Stack', 'API Integration']
    }
  ];

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '4rem' }}>
        <PhysicsElement options={{ density: 0.1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '2px' }}>SHAHID AHAMMED CK</div>
        </PhysicsElement>
        <PhysicsElement options={{ density: 0.1 }}>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="mailto:shahidahameck@gmail.com" className="contact-link">Gmail</a>
            <a href="https://www.linkedin.com/in/shahid-ck-4b2600274?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" className="contact-link">LinkedIn</a>
            <a href="https://github.com/5hahidck" target="_blank" rel="noreferrer" className="contact-link">GitHub</a>
          </nav>
        </PhysicsElement>
      </header>

      <main style={{ flex: 1 }}>
        <section id="about" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div style={{ flex: '1 1 min(100%, 400px)' }}>
            <PhysicsElement options={{ density: 0.1 }}>
              <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '1rem', fontWeight: 700 }}>Hello, I'm Shahid Ahammed CK</h1>
            </PhysicsElement>
            <PhysicsElement options={{ density: 0.1 }}>
              <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', opacity: 0.8, marginBottom: '1.5rem', lineHeight: '1.6' }}>
                I am a Software Engineering student at Asia Pacific University with a deep fascination for the intersection of clean code and complex architecture. I focus on how technical architecture serves business processes and workflows, designing dataflows that are built for long-term sustainability and scalability.
              </p>
            </PhysicsElement>
            <PhysicsElement isStatic={true} alwaysPhysics={false}>
              <button className="gravity-btn" onClick={toggleGravity}>
                {gravityEnabled ? 'Restore Order' : 'Enable Gravity'}
              </button>
            </PhysicsElement>
          </div>
          <div style={{ flex: '1 1 min(100%, 300px)', display: 'flex', justifyContent: 'center' }}>
            <PhysicsElement>
              <img
                src={myPic}
                alt="Developer Picture"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid var(--border-color)',
                  maxHeight: '400px',
                  objectFit: 'contain'
                }}
              />
            </PhysicsElement>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <PhysicsElement>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'inline-block' }}>Technical Skills</h2>
          </PhysicsElement>
          <SkillTags />
        </section>

        <section id="education" style={{ marginBottom: '6rem' }}>
          <PhysicsElement>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>
              Education & Achievements
            </h2>
          </PhysicsElement>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            <PhysicsElement>
              <div style={{ border: '1px solid var(--border-color)', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', zIndex: 10 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>B.S. Software Engineering</h3>
                <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Asia Pacific University, Malaysia (Expected 2027)</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="project-tag">Undergraduate</span>
                </div>
              </div>
            </PhysicsElement>
            <PhysicsElement>
              <div style={{ border: '1px solid var(--border-color)', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)', zIndex: 10 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>HackerRank Java Certification</h3>
                <p style={{ opacity: 0.8, marginBottom: '1rem' }}>Basic/Intermediate Java Proficiency</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="project-tag">Certification</span>
                </div>
              </div>
            </PhysicsElement>
          </div>
        </section>

        <section id="projects" style={{ marginBottom: '6rem' }}>
          <PhysicsElement>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>
              Selected Projects
            </h2>
          </PhysicsElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {projects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <PhysicsElement>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Let's Build Something</h3>
            <p style={{ opacity: 0.8 }}>Available for new opportunities.</p>
          </div>
        </PhysicsElement>
      </footer>
    </div>
  );
};

function App() {
  return (
    <>
      <BackgroundMatrix />
      <div className="mask-layer">
        <PhysicsProvider>
          <MainContent />
        </PhysicsProvider>
      </div>
    </>
  );
}

export default App;
