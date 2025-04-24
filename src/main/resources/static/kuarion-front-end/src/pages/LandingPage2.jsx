import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LandingPage2.css"; // Keep your background grid CSS

// --- Constants (Shapes, Colors) copied from LandingPage.jsx ---
const shapes = [
  () => <circle cx="16" cy="16" r="14" strokeWidth="2.5" fill="none" />,
  () => <circle cx="16" cy="16" r="14" />,
  () => <rect x="2" y="2" width="28" height="28" strokeWidth="2.5" fill="none" />,
  () => <rect x="2" y="2" width="28" height="28" />,
  () => <path d="M16 2 L30 30 L2 30 Z" strokeWidth="2.5" fill="none" />,
  () => <path d="M16 2 L30 30 L2 30 Z" />,
];

const colors = {
  blue: '#425BE9',
  purple: '#9F51D9',
  green: '#01B171',
  yellow: '#F1BF08'
};
// --- ---

// --- Function to create slow ambient movement (copied from LandingPage.jsx) ---
const createAmbientAnimation = (fragment) => {
  const xRange = window.innerWidth * 0.1; // Wander within 10% of viewport width
  const yRange = window.innerHeight * 0.1; // Wander within 10% of viewport height
  const duration = 8 + Math.random() * 6; // Longer duration for slower movement
  const rotationDuration = 20 + Math.random() * 10; // Slower rotation

  const moveAnim = gsap.to(fragment, {
    x: `+=${Math.random() * xRange - xRange / 2}`,
    y: `+=${Math.random() * yRange - yRange / 2}`,
    duration: duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    // Optional: Add a slight delay before repeating for more natural pause
    repeatDelay: Math.random() * 2
  });

  const rotateAnim = gsap.to(fragment, {
    rotation: `+=${Math.random() * 100 - 50}`, // Smaller rotation range
    duration: rotationDuration,
    ease: "none",
    repeat: -1,
    yoyo: true
  });

  return [moveAnim, rotateAnim];
};
// --- ---


const LandingPage2 = () => {
  const pageRef = useRef(null);
  const particleRefs = useRef([]); // Ref to hold particle SVG elements
  const particleAnimations = useRef([]); // Ref to hold particle GSAP tweens
  const numberOfParticles = 10; // Adjust the number of particles as needed
  const particlesArray = new Array(numberOfParticles).fill(null);


  useEffect(() => {
    // Entrance animation for LandingPage2
    const tl = gsap.timeline();

    tl.fromTo(pageRef.current, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.inOut"
    });

    // --- Particle Animation Setup ---
    // Ensure particles are referenced correctly
    const currentParticles = particleRefs.current.filter(Boolean);

    if (currentParticles.length > 0) {
         currentParticles.forEach(particle => {
            // Random initial position across the screen
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotation: `+=${Math.random() * 100 - 50}`, // Smaller rotation range
                opacity: 0.9 + Math.random() * 0.5, // Random initial opacity
                scale: 3.5 + Math.random() * 5.5 // Random initial scale
            });
            // Apply the ambient wandering animation
            const anims = createAmbientAnimation(particle);
            particleAnimations.current.push(...anims);
        });
    }
    // --- End Particle Animation Setup ---


    return () => {
      tl.kill();
      // --- Cleanup Particle Animations ---
      particleAnimations.current.forEach(anim => anim.kill());
      particleAnimations.current = []; // Clear the array
      // --- End Cleanup Particle Animations ---
    };
  }, []); // Empty dependency array means this runs once on mount


  return (
    <main ref={pageRef} className="bg-[#090A14] pt-[80vh] text-white min-h-screen relative overflow-hidden">
      {/* Background Grid */}
      {/* Using className="background-grid" here */}
      <div className="background-grid"></div>

      {/* Particle Layer - positioned absolutely to cover the background */}
      <div className="absolute inset-0 z-0 pointer-events-none"> {/* Z-index lower than content */}
         {particlesArray.map((_, index) => {
            const ShapeComponent = shapes[Math.floor(Math.random() * shapes.length)];
            const randomColor = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];
            const randomBlur = Math.random() * 1; // Less blur for more defined particles

            return (
              <svg
                key={index}
                ref={el => particleRefs.current[index] = el}
                className="absolute w-4 h-4 opacity-0 transform-gpu" // Start smaller and hidden initially
                viewBox="0 0 32 32" // Keep the viewBox for consistent shape scaling
                style={{
                   // Initial position set by GSAP, but good to have a default
                   top: '0', left: '0',
                   filter: `blur(${randomBlur}px)`,
                   // Removed translate(-50%, -50%) here, as GSAP will set initial x/y
                }}
              >
                <g
                  stroke={ShapeComponent().props.fill === 'none' ? randomColor : 'none'}
                  fill={ShapeComponent().props.fill === 'none' ? 'none' : randomColor}
                >
                  {ShapeComponent()}
                </g>
              </svg>
            );
          })}
      </div>


      {/* Your Existing Content */}
      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10"> {/* Content stays on top */}
        <div> 
          <h1 className="text-[5rem] font-bold mb-8" style={{ fontFamily: 'CMSans' }} >Uma necessidade.</h1>
          <p className="text-[2rem]">
              Nos embasamos em dados e pesquisas para criar um produto 
              <br />
              que realmente atenda às necessidades do mercado.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="bg-black/30 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">SG</h2>
            <p className="text-lg">
              sdgsdgsdg.
              gdsgdsgds technology
            </p>
          </div>

          <div className="bg-black/30 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">a</h2>
            <p className="text-lg">
              gdsgdsgsdgly
              sdgsdg.
            </p>
          </div>

          <div className="bg-black/30 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">aa</h2>
            <p className="text-lg">
              agsafasf,
              gulgulp guulp gulp.
            </p>
          </div>

          <div className="bg-black/30 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">sggssgUs</h2>
            <p className="text-lg">
              AGHIASGHIASIU
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl mb-6">BORA?</h3>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            Explore Now
          </button>
          
        </div>
      </div>
    </main>
  );
};

export default LandingPage2;