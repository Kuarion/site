import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LogoIntro() {
  const logoRef = useRef(null);

  useEffect(() => {
    const parts = gsap.utils.toArray(".st1, .st2");
    const circle = document.querySelector(".st0");

    // Set initial state far outside screen in symmetrical directions
    gsap.set(parts, {
      opacity: 0,
      scale: 1,
      x: (_, i) => 800 * Math.cos((i / parts.length) * Math.PI * 2),
      y: (_, i) => 800 * Math.sin((i / parts.length) * Math.PI * 2),
      transformOrigin: "50% 50%"
    });

    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    // Animate parts flying in symmetrically
    gsap.to(parts, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1.6,
      ease: "power3.out",
      stagger: {
        each: 0.01,
        from: "center"
      },
      onComplete: () => {
        // Green circle pops in
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <svg
        ref={logoRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-[300px] h-[300px]"
      >
        <g>
          <g>
            <path className="st1" d="M408.89,298.34l74.58,74.58..." />
            <path className="st1" d="M256.15,451.08l-54.98,54.98..." />
            <path className="st1" d="M468,399.13l-79.95-79.95..." />
            <path className="st1" d="M103.38,298.31L6.71,201.64..." />
            <path className="st1" d="M235.32,430.25l-111.11-111.11..." />
          </g>
          <g>
            <polygon className="st2" points="256.11 228.91 228.33 256.69..." />
            <polygon className="st2" points="256.11 131.68 228.33 159.46..." />
            <path className="st2" d="M333.01,13.11c-14.69-4.64..." />
            <path className="st2" d="M131.1,62.24L19.99,173.35..." />
            <path className="st2" d="M398.62,44.72c-11.25-7.58..." />
          </g>
        </g>
        <circle className="st0" cx="256.11" cy="359.52" r="29.46" />
      </svg>
    </div>
  );
}
