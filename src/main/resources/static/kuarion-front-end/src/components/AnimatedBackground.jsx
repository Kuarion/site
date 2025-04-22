import React, { useEffect, useRef } from 'react';
import { useColors } from '../context/ColorContext';

function AnimatedBackground() {
  const { colors } = useColors();
  const backgroundRef = useRef(null);
  const particlesRef = useRef(null);

  const createShapes = () => {
    const background = backgroundRef.current;
    const shapeTypes = ['square', 'circle', 'triangle', 'rectangle'];
    const themeColors = [colors.purple, colors.green, colors.yellow, colors.blue];
    
    for (let i = 0; i < 40; i++) {
      const shape = document.createElement('div');
      const shapeClass = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.className = `shape ${shapeClass}`;
      
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10;
      
      Object.assign(shape.style, {
        left: `${posX}%`,
        top: `${posY}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: color,
      });
      
      if (shapeClass === 'triangle') {
        shape.style.borderBottomColor = color;
        shape.style.background = 'transparent';
      }
      
      background.appendChild(shape);
    }
  };

  const createParticles = () => {
    const container = particlesRef.current;
    
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 4 + 4;
      
      Object.assign(particle.style, {
        left: `${posX}%`,
        top: `${posY}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      });
      
      container.appendChild(particle);
    }
  };

  useEffect(() => {
    createShapes();
    createParticles();

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach(shape => {
        const speed = 0.05;
        const shapeX = parseFloat(shape.style.left);
        const shapeY = parseFloat(shape.style.top);
        
        shape.style.left = `${shapeX + (x - 0.5) * speed}%`;
        shape.style.top = `${shapeY + (y - 0.5) * speed}%`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="geometric-background" ref={backgroundRef} />
      <div className="particles" ref={particlesRef} />
      <div className="gradient-overlay" style={{ background: `radial-gradient(circle at center, transparent 0%, ${colors.pureBlack} 80%)` }} />
    </>
  );
}

export default AnimatedBackground;