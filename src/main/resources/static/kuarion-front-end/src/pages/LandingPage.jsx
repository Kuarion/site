import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate } from "react-router-dom";
import LandingPage2 from "./LandingPage2"; // Assuming LandingPage2.jsx is in the same directory

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// --- Constants (Shapes, Colors) remain the same ---
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

const LandingPage = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const boxRef = useRef(null); // Solid logo
  const fragmentsRef = useRef([]);
  const gradientRef = useRef(null);
  const maskContainerRef = useRef(null); // Container for SVG mask/clipper
  const logoOutlineSvgRef = useRef(null); // The SVG containing outlines and clipPath
  const landingPage2ContainerRef = useRef(null); // Container for LandingPage2
  const maskContainerPath = useRef(null); // Container for LandingPage2
  const fragments = new Array(75).fill(null);

  useEffect(() => {
    gsap.to(window, {
      duration: 0.1,
      scrollTo: 0, // or scrollTo: { y: 0, autoKill: true }
      ease: 'power1.out',
    });

    const continuousAnimations = [];

    // Function to create slow ambient movement (unchanged)
    const createAmbientAnimation = (fragment) => {
      const xRange = 30;
      const yRange = 30;
      const duration = 4 + Math.random() * 3;
      const rotationDuration = 15 + Math.random() * 5;

      const moveAnim = gsap.to(fragment, {
        x: `+=${Math.random() * xRange - xRange / 2}`,
        y: `+=${Math.random() * yRange - yRange / 2}`,
        duration: duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      const rotateAnim = gsap.to(fragment, {
        rotation: `+=${Math.random() * 180 - 90}`,
        duration: rotationDuration,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      return [moveAnim, rotateAnim];
    };

    // Background color ScrollTrigger (unchanged)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "center center",
      end: "+=200%",
      scrub: true,
      onEnter: () => {
        document.body.style.backgroundColor = '#000000';
        document.querySelector('main').style.backgroundColor = '#000000';
      },
      onLeave: () => {
        document.body.style.backgroundColor = '#090A14';
        document.querySelector('main').style.backgroundColor = '#090A14';
      },
      onEnterBack: () => {
        document.body.style.backgroundColor = '#000000';
        document.querySelector('main').style.backgroundColor = '#000000';
      },
      onLeaveBack: () => {
        document.body.style.backgroundColor = '#000000';
        document.querySelector('main').style.backgroundColor = '#000000';
      }
    });

    // Calculate fragment position (unchanged)
    const calculatePosition = (i) => {
      const gridSize = Math.floor(Math.sqrt(fragmentsRef.current.length));
      const cellX = (i % gridSize) - gridSize / 2;
      const cellY = Math.floor(i / gridSize) - gridSize / 2;
      const angle = Math.atan2(cellY, cellX);
      const baseDistance = Math.sqrt(cellX * cellX + cellY * cellY) * 200;
      const randomDistance = baseDistance * (0.5 + Math.random());
      const randomAngleOffset = (Math.random() - 0.5) * Math.PI * 0.5;
      return {
        x: Math.cos(angle + randomAngleOffset) * randomDistance,
        y: Math.sin(angle + randomAngleOffset) * randomDistance * 0.75
      };
    };

    // --- Main GSAP Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        
        trigger: sectionRef.current,
        start: "center center",
        end: "+=200%",
        scrub: 2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        // markers: true, // REMOVE for production
        onLeave: () => navigate('/landing_page_2'),
        onUpdate: (self) => {
          if (self.progress > 0.5 && continuousAnimations.length === 0) {
            fragmentsRef.current.forEach(fragment => {
              const anims = createAmbientAnimation(fragment);
              continuousAnimations.push(...anims);
            });
          }
        },
        onEnterBack: () => {
          continuousAnimations.forEach(anim => anim.kill());
          continuousAnimations.length = 0;
        }
      }
    });

    // 1. Initial logo reveal (unchanged)
    tl.fromTo(boxRef.current,
      { opacity: 0, scale: 2, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", scale: 1, duration: 15, ease: "back.out(1.7)" }
    )
    // 2. Gradient and Fragments expansion (unchanged)
    .fromTo(gradientRef.current,
      { opacity: 0, scale: 0.1, transformOrigin: "center center" },
      { opacity: 1, scale: 8, duration: 40, ease: "power4.out" },
      "-=2"
    )
    .to([fragmentsRef.current, gradientRef.current], {
      opacity: (i, target) => target === gradientRef.current ? 0.8 : 1 - ((fragmentsRef.current[i]?.style?.filter?.match(/blur\((\d+(\.\d+)?)px\)/)?.[1] || 0) / 10),
      scale: (i, target) => target === gradientRef.current ? 4 : "random(1, 3)",
      x: (i, target) => {
        if (target === gradientRef.current) return 0;
        const finalX = calculatePosition(i).x;
        target.dataset.finalX = finalX;
        return finalX;
      },
      y: (i, target) => {
        if (target === gradientRef.current) return 0;
        const finalY = calculatePosition(i).y;
        target.dataset.finalY = finalY;
        return finalY;
      },
      rotation: (i, target) => target === gradientRef.current ? 0 : "random(-720, 720)",
      duration: 60,
      ease: "power4.out",
      stagger: { each: 0.01, from: "center", ease: "power3.out" }
    }, "<")

    // 3. Transition from solid logo to outline & setup portal
    .addLabel("outlineReveal", ">-=20")
    .to(boxRef.current, { // Fade out solid logo
      opacity: 0,
      duration: 15,
      ease: "power2.inOut",
    }, "outlineReveal")
    .fromTo(maskContainerRef.current, { // Fade in the mask container (holds the SVG)
      opacity: 0,
      scale: 1, // Start at base scale
    },{
      opacity: 1,
      scale: 1,
      duration: 15,
      ease: "power2.inOut",
    }, "outlineReveal")

    // 4. Reveal LandingPage2 via clip-path
    .addLabel("portalReveal", "outlineReveal+=5")
    .to(landingPage2ContainerRef.current, { // Fade in the LandingPage2 container
      opacity: 1,
      duration: 15,
      ease: "power2.inOut",
    }, "portalReveal")

    // 5. Scale up the mask container (which scales the clip-path implicitly)
    .addLabel("portalExpand", ">")
    .to(maskContainerRef.current, { // Scale up the SVG container
      scale: 15, // Increase scale factor for a bigger effect
      duration: 80,
      ease: "power2.in",
    }, "portalExpand")
    .to(maskContainerPath.current, { // Scale up the SVG container
      scale: 7.5, // Increase scale factor for a bigger effect
      duration: 80,
      ease: "power2.in",
    }, "portalExpand")
    // Fade out the visible outlines as the portal expands
    .to(logoOutlineSvgRef.current.querySelectorAll('g.logo-outlines'), {
      opacity: 1,
      duration: 70,
      scrub: -2,
      strokeWidth: 0.1,
      ease: "none",
      
    }, "portalExpand");

    // Cleanup function
    return () => {
      tl.kill();
      continuousAnimations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.body.style.backgroundColor = '';
      if (document.querySelector('main')) {
        document.querySelector('main').style.backgroundColor = '';
      }
    };
  }, [navigate]);

  return (
    <main className="text-white pb-1000 overflow-hidden" >
      <section ref={sectionRef} className="h-screen w-screen gsap-animated relative">
        {/* LandingPage2 Container (positioned behind, clipped) */}
        <div
          ref={landingPage2ContainerRef}
          className="absolute z-10 opacity-0  w-screen items-center justify-center overflow-visible" // Full screen, starts hidden
          viewBox="0 0 512 512"
          style={{
            clipPath: 'url(#logoClipPath)', // Apply the clip path defined in the SVG below
            pointerEvents: 'none', // Prevent interaction until reveal if needed
          }}
        >
          <LandingPage2 /> {/* LandingPage2 fills this container */}
        </div>

        {/* Centering Container for animations */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-auto h-auto">
            {/* Gradient background (unchanged) */}
            <div
              ref={gradientRef}
              className="absolute top-1/2 left-1/2 opacity-0 z-0"
              style={{
                background: 'radial-gradient(circle, #090A14 0%, transparent 70%)',
                width: '40vh',
                height: '40vh',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Fragments container (unchanged) */}
            <div className="absolute inset-0 -z-10">
              {fragments.map((_, index) => {
                const ShapeComponent = shapes[Math.floor(Math.random() * shapes.length)];
                const randomColor = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];
                const randomBlur = Math.random() * 7;

                return (
                  <svg
                    key={index}
                    ref={el => fragmentsRef.current[index] = el}
                    className="absolute top-1/2 left-1/2 w-8 h-8 opacity-0 gsap-animated transform-gpu"
                    viewBox="0 0 32 32"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      filter: `blur(${randomBlur}px)`
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

            {/* Original solid logo (unchanged) */}
            <div ref={boxRef} className="gsap-animated transform-gpu relative z-10 flex items-center justify-center w-64 h-64">
              <img src="/Kuarion.svg" alt="Kuarion Logo" className="w-full h-full object-contain"/>
            </div>

            {/* SVG Mask/Clipper Container - FIXED POSITIONING */}
            <div
              ref={maskContainerRef}
              className="gsap-animated transform-gpu absolute z-20 top-1/2 left-1/2 w-64 h-64 opacity-0"
              style={{
                transform: 'translate(-50%, -50%)', // Center it properly
                transformOrigin: 'center center',
              }}
            >
              {/* SVG Container for ClipPath Definition and Outlines */}
              <svg
                ref={logoOutlineSvgRef}
                className="w-full h-full"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: 'visible' }} // Keep visible to allow scaling clip-path correctly
              >
                <svg ref={logoOutlineSvgRef}
                className="w-full h-full"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: 'visible' }}>
                
                  {/* CLIP PATH DEFINITION */}
                  <clipPath
  ref={maskContainerPath}
  id="logoClipPath"
  className="gsap-animated"
  style={{
    transform: 'translate(calc(50vw - 50%), calc(50vh - 50%)) scale(0.5)',
  }}
>

                    {/* Blue parts */}
                    <path d="
M408.89,298.34l74.58,74.58c17.87-34.87,27.95-74.4,27.95-116.28,0-18.84-2.08-37.2-5.96-54.88l-96.57,96.57Z
M256.15,451.08l-54.98,54.98c17.69,3.88,36.05,5.94,54.9,5.94s37.31-2.07,55.04-5.97l-54.95-54.95Z
M468,399.13l-79.95-79.95-111.07,111.07,66.42,66.42c51.15-18.62,94.68-53.12,124.6-97.54Z
M103.38,298.31L6.71,201.64c-3.9,17.72-5.99,36.12-5.99,55.01,0,41.9,10.13,81.41,28.02,116.3l74.64-74.64Z
M235.32,430.25l-111.11-111.11-80.01,80.01c3.34,4.95,6.81,9.8,10.48,14.5l44.4,44.4c20.9,16.32,44.43,29.42,69.82,38.64l66.43-66.43Z
M256.11,228.91L228.33,256.69 165.83,319.19 193.6,346.97 256.11,284.47 318.61,346.97 346.38,319.19 283.88,256.69 256.11,228.91Z
M256.11,131.68L228.33,159.46 117.21,270.58 144.99,298.36 256.11,187.24 367.22,298.36 395,270.58 283.88,159.46 256.11,131.68Z
M333.01,13.11c-14.69-4.64-29.95-7.98-45.66-9.9l-31.25,31.25-31.26-31.26c-15.71,1.92-30.98,5.25-45.67,9.89l49.15,49.15L68.6,221.96l27.78,27.78,159.73-159.73,159.73,159.73,27.78-27.78L283.88,62.24l49.13-49.13Z
M131.1,62.24L19.99,173.35l27.78,27.78,111.11-111.11,27.78-27.78-27.78-27.78-9.71-9.71c-12.42,5.74-24.31,12.43-35.55,20l17.48,17.48Z
M398.62,44.72c-11.25-7.58-23.13-14.27-35.55-20l-9.74,9.74-27.78,27.78,27.78,27.78,111.11,111.11,27.78-27.78-111.11-111.11,17.52-17.52Z
M285.57,359.52a29.46,29.46 0 1,0 -58.92,0a29.46,29.46 0 1,0 58.92,0Z" />

                  </clipPath>
                
                </svg>
                {/* Logo Outlines (remain visible for a time) */}
                <g strokeWidth="6" fill="none" className="logo-outlines">
                  {/* Blue outlines */}
                  <path stroke={colors.blue} d="M408.89,298.34l74.58,74.58c17.87-34.87,27.95-74.4,27.95-116.28,0-18.84-2.08-37.2-5.96-54.88l-96.57,96.57Z"/>
                  <path stroke={colors.blue} d="M256.15,451.08l-54.98,54.98c17.69,3.88,36.05,5.94,54.9,5.94s37.31-2.07,55.04-5.97l-54.95-54.95Z"/>
                  <path stroke={colors.blue} d="M468,399.13l-79.95-79.95-111.07,111.07,66.42,66.42c51.15-18.62,94.68-53.12,124.6-97.54Z"/>
                  <path stroke={colors.blue} d="M103.38,298.31L6.71,201.64c-3.9,17.72-5.99,36.12-5.99,55.01,0,41.9,10.13,81.41,28.02,116.3l74.64-74.64Z"/>
                  <path stroke={colors.blue} d="M235.32,430.25l-111.11-111.11-80.01,80.01c3.34,4.95,6.81,9.8,10.48,14.5l44.4,44.4c20.9,16.32,44.43,29.42,69.82,38.64l66.43-66.43Z"/>
                  {/* Yellow outlines */}
                  <polygon stroke={colors.yellow} points="256.11 228.91 228.33 256.69 165.83 319.19 193.6 346.97 256.11 284.47 318.61 346.97 346.38 319.19 283.88 256.69 256.11 228.91"/>
                  <polygon stroke={colors.yellow} points="256.11 131.68 228.33 159.46 117.21 270.58 144.99 298.36 256.11 187.24 367.22 298.36 395 270.58 283.88 159.46 256.11 131.68"/>
                  <path stroke={colors.yellow} d="M333.01,13.11c-14.69-4.64-29.95-7.98-45.66-9.9l-31.25,31.25-31.26-31.26c-15.71,1.92-30.98,5.25-45.67,9.89l49.15,49.15L68.6,221.96l27.78,27.78,159.73-159.73,159.73,159.73,27.78-27.78L283.88,62.24l49.13-49.13Z"/>
                  <path stroke={colors.yellow} d="M131.1,62.24L19.99,173.35l27.78,27.78,111.11-111.11,27.78-27.78-27.78-27.78-9.71-9.71c-12.42,5.74-24.31,12.43-35.55,20l17.48,17.48Z"/>
                  <path stroke={colors.yellow} d="M398.62,44.72c-11.25-7.58-23.13-14.27-35.55-20l-9.74,9.74-27.78,27.78,27.78,27.78,111.11,111.11,27.78-27.78-111.11-111.11,17.52-17.52Z"/>
                  {/* Green outline */}
                  <circle stroke={colors.green} cx="256.11" cy="359.52" r="29.46"/>
                </g>
              </svg>
            </div> {/* End maskContainerRef */}
          </div> {/* End relative w-auto h-auto */}
        </div> {/* End centering container */}
      </section> {/* End sectionRef */}
    </main>
  );
};

export default LandingPage;