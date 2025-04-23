import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const LandingPage = () => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const fragmentsRef = useRef([]);
  const gradientRef = useRef(null);
  const fragments = new Array(75).fill(null); // increased to 100 for better coverage

  useEffect(() => {
    const continuousAnimations = [];

    // Function to create slow ambient movement
    const createAmbientAnimation = (fragment) => {
      const xRange = 30; // increased range
      const yRange = 30; // increased range
      const duration = 4 + Math.random() * 3; // faster movement (4-7s)
      const rotationDuration = 15 + Math.random() * 5; // faster rotation (15-20s)

      const moveAnim = gsap.to(fragment, {
        x: `+=${Math.random() * xRange - xRange / 2}`,
        y: `+=${Math.random() * yRange - yRange / 2}`,
        duration: duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      const rotateAnim = gsap.to(fragment, {
        rotation: `+=${Math.random() * 180 - 90}`, // increased rotation range
        duration: rotationDuration,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      return [moveAnim, rotateAnim];
    };

    // Create separate ScrollTrigger for background color
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "center center",
      end: "+=100%",
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "+=100%",
        scrub: 2,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        markers: true,
        onLeave: () => {
          // Start ambient animations after main animation
          fragmentsRef.current.forEach(fragment => {
            const anims = createAmbientAnimation(fragment);
            continuousAnimations.push(...anims);
          });
        },
        onEnterBack: () => {
          // Clean up ambient animations when scrolling back
          continuousAnimations.forEach(anim => anim.kill());
          continuousAnimations.length = 0;
        }
      }
    });

    // First animation - logo reveal
    tl.fromTo(boxRef.current,
      {
        opacity: 0,
        scale: 2,
        filter: "blur(10px)",
        y: 0,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
        duration: 15,
        ease: "back.out(1.7)",
      }
    )
    .fromTo(gradientRef.current, {
      opacity: 0,
      scale: 0.1,
      transformOrigin: "center center",
    }, {
      opacity: 1,
      scale: 8,
      duration: 40,
      ease: "power4.out",
      delay: -2,
    })
    // Combined fragments and gradient animation
    .to([fragmentsRef.current, gradientRef.current], {
      opacity: (i, target) => {
        if (target === gradientRef.current) return 0.8;
        const blur = fragmentsRef.current[i].style.filter.match(/blur\((.+)px\)/)[1];
        return 1 - (blur / 10);
      },
      scale: (i, target) => target === gradientRef.current ? 4 : "random(1, 3)",
      x: (i, target) => {
        if (target === gradientRef.current) return 0;
        const finalX = calculatePosition(i).x;
        if (!target.dataset) target.dataset = {};
        target.dataset.finalX = finalX;
        return finalX;
      },
      y: (i, target) => {
        if (target === gradientRef.current) return 0;
        const finalY = calculatePosition(i).y;
        if (!target.dataset) target.dataset = {};
        target.dataset.finalY = finalY;
        return finalY;
      },
      rotation: (i, target) => target === gradientRef.current ? 0 : "random(-720, 720)",
      duration: 60, // Increased from 25
      delay: -2,
      ease: "power4.out",
      stagger: {
        each: 0,
        from: "center",
        ease: "power3.out"
      }
    });

    return () => {
      tl.kill();
      continuousAnimations.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="text-white overflow-x-hidden">
      <section ref={sectionRef} className="h-screen w-screen gsap-animated">
        <div className="absolute inset-0 flex items-center  justify-center">
          <div className="relative w-auto">
            {/* Gradient background */}
            <div 
              ref={gradientRef}
              className="absolute top-1/2 left-1/2 opacity-0 z-0"
              style={{
                background: 'radial-gradient(circle, #090A14 0%, transparent 70%)',
                width: '40vh',
                height: '40vh',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
            {/* Fragments container */}
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
            {/* Logo */}
            <div ref={boxRef} className="gsap-animated transform-gpu relative z-10 flex items-center justify-center">
              <img
                src="/Kuarion.svg"
                alt="Kuarion Logo"
                className="w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for scroll content */}
      <div className="h-[300vh]" />
    </main>
  );
};

export default LandingPage;