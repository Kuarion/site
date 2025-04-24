import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useColors } from "../context/ColorContext";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import './LandingPage2.css'; // Import your CSS file for styles
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// Shapes for particles (Mantido)
const shapes = [
  () => <circle cx="16" cy="16" r="14" strokeWidth="2.5" fill="none" />,
  () => <circle cx="16" cy="16" r="14" />,
  () => <rect x="2" y="2" width="28" height="28" strokeWidth="2.5" fill="none" />,
  () => <rect x="2" y="2" width="28" height="28" />,
  () => <path d="M16 2 L30 30 L2 30 Z" strokeWidth="2.5" fill="none" />,
  () => <path d="M16 2 L30 30 L2 30 Z" />,
];

// Function to create ambient animation (Mantido)
const createAmbientAnimation = (element) => {
  const xRange = window.innerWidth * 0.1;
  const yRange = window.innerHeight * 0.1;
  const duration = 8 + Math.random() * 6;
  const rotationDuration = 20 + Math.random() * 10;

  const moveAnim = gsap.to(element, {
    x: `+=${Math.random() * xRange - xRange / 2}`,
    y: `+=${Math.random() * yRange - yRange / 2}`,
    duration: duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    repeatDelay: Math.random() * 2
  });

  const rotateAnim = gsap.to(element, {
    rotation: `+=${Math.random() * 100 - 50}`,
    duration: rotationDuration,
    ease: "none",
    repeat: -1,
    yoyo: true
  });

  return [moveAnim, rotateAnim];
};

const LandingPage2 = () => {
  const { colors } = useColors(); // Assume useColors hook provides necessary colors
  const pageRef = useRef(null);
  const sectionRefs = useRef([]); // Ref to hold section elements for ScrollTrigger
  const particleRefs = useRef([]); // Ref to hold particle SVG elements
  const particleAnimations = useRef([]); // Ref to hold particle GSAP tweens

  const numberOfParticles = 0; // Adjust as needed
  const particlesArray = new Array(numberOfParticles).fill(null);

  // Section titles and content descriptions (Mantido)
  const sectionTitles = [
    "Uma necessidade.", // 1. os problemas da energia solar
    "Uma solução.",    // 2. kuarion
    "Um propósito.",   // 3. nosso objetivo
    "Uma comunidade.", // 4. forum
    "Um mercado.",     // 5. marketplace
    "Um aprendizado.", // 6. portal educativo, blogs, videos, desafios.
    "Um sistema.",     // 7. ligação de empresas
    "Uma transformação.", // 8. a facilitação do workflow
    "Um convite.",     // 9. junte-se a nos, vantagens
    "Junte-se a nós.", // 10. (Nova frase para introduzir a CTA)
    "Comece agora."    // 11. (Chamada para ação final)
  ];

  const sectionDescriptions = [
    "Nos embasamos em dados e pesquisas para criar um produto que realmente atenda às necessidades do mercado de energia solar.", // Descrição para "Uma necessidade."
    "Kuarion - plataforma integrada que resolve os principais desafios do setor de energia solar.", // Descrição para "Uma solução."
    "Nosso objetivo é democratizar o acesso à energia limpa e facilitar a transição energética.", // Descrição para "Um propósito."
    "Um fórum para conexão, troca de experiências e colaboração entre entusiastas e profissionais.", // Descrição para "Uma comunidade."
    "Conectando consumidores e fornecedores qualificados com transparência e eficiência.", // Descrição para "Um mercado."
    "Explore nosso conteúdo exclusivo para dominar o universo da energia solar.", // Descrição para "Um aprendizado."
    "Conecte-se com um ecossistema inteligente que impulsiona o seu crescimento no setor solar.", // Descrição para "Um sistema."
    "Simplificamos processos, integramos ferramentas e otimizamos seu tempo para o sucesso.", // Descrição para "Uma transformação."
    "Descubra as vantagens de fazer parte da plataforma que está revolucionando o mercado.", // Descrição para "Um convite."
    "Seja bem-vindo à comunidade que está transformando o futuro da energia no Brasil.", // Descrição para "Junte-se a nós."
    "Dê o primeiro passo rumo à inovação e sustentabilidade no setor de energia solar." // Descrição para "Comece agora."
  ];
 
  
  useEffect(() => {
    // Main entrance animation (Mantido)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  
    

    const tl = gsap.timeline();

    tl.fromTo(pageRef.current, {
      opacity: 0,
      
    }, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    });

    // Setup particles (Mantido)
    const currentParticles = particleRefs.current.filter(Boolean);
    if (currentParticles.length > 0) {
      currentParticles.forEach(particle => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          opacity: 0.6 + Math.random() * 0.4,
          scale: 1 + Math.random() * 3
        });

        const anims = createAmbientAnimation(particle);
        particleAnimations.current.push(...anims);
      });
    }

    // Setup ScrollTrigger animations for each section (Mantido)
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      // Animate heading
      gsap.fromTo(
        section.querySelector('h2'),
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate subtext
      gsap.fromTo(
        section.querySelector('p.subtext'),
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate content items (cards, etc.)
      const contentElements = section.querySelectorAll('.content-item');

      if (contentElements.length > 0) {
        gsap.fromTo(
          contentElements,
          {
            y: 30,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
       // Animate CTA button specifically for the last section
       if (index === sectionTitles.length - 1) {
         gsap.fromTo(
           section.querySelector('.cta-button'),
           {
             scale: 0.8,
             opacity: 0
           },
           {
             scale: 1,
             opacity: 1,
             duration: 1,
             ease: "elastic.out(1, 0.5)",
             scrollTrigger: {
               trigger: section.querySelector('.cta-button'),
               start: "top 90%",
               end: "top 50%",
               toggleActions: "play none none reverse"
             }
           }
         );
       }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      particleAnimations.current.forEach(anim => anim.kill());
      particleAnimations.current = [];
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    
    // Added bg-[#090A14] class here to set the base background color
    <div ref={pageRef} className="min-h-screen overflow-x-hidden bg-[#090A14]">
      {/* Background Grid - This will now be the main background for all sections */}
      {/* Assuming .background-grid CSS provides the black background with dark grid */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden background-grid"></div>

      {/* Particle Background (Mantido e posicionado acima do grid) */}
      {/* Adjusted particle number to 1 for testing based on previous interaction */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"> {/* Z-index slightly higher than grid */}
        {particlesArray.map((_, index) => {
          const ShapeComponent = shapes[Math.floor(Math.random() * shapes.length)];
          const randomColor = [colors.blue, colors.purple, colors.green, colors.yellow][Math.floor(Math.random() * 4)];

          return (
            <svg
              key={index}
              ref={el => particleRefs.current[index] = el}
              className="absolute opacity-0"
              viewBox="0 0 32 32"
              style={{ top: '0', left: '0' }}
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

      {/* --- Sections based on 11 phrases --- */}

      {/* Removed Header Navigation */}

      {sectionTitles.map((title, index) => (
        <section
          key={index} // Added key for list rendering
          id={title.toLowerCase().replace(/[\s.]/g, '-')} // Generate simple ID from title
          ref={el => sectionRefs.current[index] = el}
          // Removed background color styles from sections
          className="min-h-screen flex items-center py-16 px-4 relative z-10" // Content above background
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Applied requested font styles and sizes */}
            <h2
              className="text-[5rem] tracking-widest font-bold mb-8 text-white"
              style={{ fontFamily: 'CMSans' }}
            >
              {title}
            </h2>
            {/* Applied requested font styles and sizes */}
            <p
              className="text-[2rem] mb-12 text-white opacity-90 subtext" // Adjusted mb to mb-12 as seen in some sections
              style={{ fontFamily: 'Riccione' }}
            >
              {sectionDescriptions[index]}
            </p>

            {/* --- Content for each section (Add your specific content here) --- */}
            {/* Adjusted content structure within each section to improve layout */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"> {/* Added lg:grid-cols-3 for more columns on large screens */}
                 {/* This is a placeholder structure. Replace with actual content based on the section index */}
                  {/* You can use conditional rendering based on `index` to show different content for each section */}
                  {index === 0 && (
                      // Section 1 Content
                      <> {/* Use fragment to wrap multiple direct grid children */}
                         {/* Problem Card 1 - Conscientização */}
                            <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.blue}33` }}> {/* Added w-full */}
                                 <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.blue }}>
                                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                 </div>
                                 <h3 className="text-xl font-bold mb-3 text-white">Conscientização</h3>
                                 <p className="text-white opacity-90">
                                   As pessoas não querem investir em energia solar porque não conhecem os benefícios ou não confiam no mercado.
                                 </p>
                               </div>
                             {/* Problem Card 2 - Facilitação */}
                             <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.purple}33` }}> {/* Added w-full */}
                                 <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.purple }}>
                                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                 </div>
                                 <h3 className="text-xl font-bold mb-3 text-white">Facilitação</h3>
                                 <p className="text-white opacity-90">
                                   Quem deseja adquirir energia solar não sabe como entrar no mercado ou com quem falar.
                                 </p>
                               </div>
                             {/* Problem Card 3 - Workflow */}
                             <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.green}33` }}> {/* Added w-full */}
                                 <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.green }}>
                                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 9H21M8 3V21M16 3V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                 </div>
                                 <h3 className="text-xl font-bold mb-3 text-white">Workflow</h3>
                                 <p className="text-white opacity-90">
                                   Empresas do setor não conseguem estabelecer um workflow eficiente para atender a demanda crescente.
                                 </p>
                               </div>
                      </>
                  )}
                   {index === 1 && (
                      // Section 2 Content
                       <>
                         {/* Solution Card 1 */}
                           <div className="content-item p-6 rounded-xl text-center w-full" style={{ backgroundColor: 'rgba(66, 91, 233, 0.15)', border: `2px solid ${colors.blue}` }}> {/* Added w-full */}
                             <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.blue }}>
                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <h3 className="text-xl font-bold mb-3 text-white">Portal Educativo</h3>
                             <p className="text-white opacity-90">
                               Conteúdo informativo acessível sobre energia solar, desmistificando o setor e construindo confiança.
                             </p>
                           </div>

                           {/* Solution Card 2 */}
                           <div className="content-item p-6 rounded-xl text-center w-full" style={{ backgroundColor: 'rgba(159, 81, 217, 0.15)', border: `2px solid ${colors.purple}` }}> {/* Added w-full */}
                             <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.purple }}>
                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 17V13.5V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 17V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 17V13.5V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 17V13.5V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <h3 className="text-xl font-bold mb-3 text-white">Marketplace Inteligente</h3>
                             <p className="text-white opacity-90">
                               Conectamos consumidores a fornecedores qualificados, com ferramentas de comparação e avaliações.
                             </p>
                           </div>

                           {/* Solution Card 3 */}
                           <div className="content-item p-6 rounded-xl text-center w-full" style={{ backgroundColor: 'rgba(1, 177, 113, 0.15)', border: `2px solid ${colors.green}` }}> {/* Added w-full */}
                             <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.green }}>
                               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <h3 className="text-xl font-bold mb-3 text-white">Sistema de Gestão</h3>
                             <p className="text-white opacity-90">
                               Plataforma completa para empresas gerenciarem projetos, comunicação com clientes e orçamentos.
                             </p>
                           </div>
                       </>
                   )}
                   {index === 2 && (
                      // Section 3 Content
                      <>
                         {/* Purpose Image */}
                       <div className="content-item w-full"> {/* Added w-full */}
                           <div
                             className="rounded-xl overflow-hidden shadow-2xl h-full"
                             style={{ border: `3px solid ${colors.blue}` }}
                           >
                             <img
                               src="https://media.istockphoto.com/id/497709519/photo/sunbean-of-sunset-sky.jpg?s=612x612&w=0&k=20&c=MGBivlMjj4tx7rfl5Yo69QTeRm13V_JNnjhx4lJL36o=" // Replace with actual image
                               alt="Nosso propósito"
                               className="w-full h-full object-cover"
                             />
                           </div>
                         </div>
                         {/* Purpose Points */}
                         <div className="content-item space-y-6 w-[150%]"> {/* Added w-full */}
                           <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <p className="text-lg text-white opacity-90">Promover sustentabilidade através da energia renovável</p>
                           </div>
                           <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <p className="text-lg text-white opacity-90">Facilitar a transição energética para consumidores e empresas</p>
                           </div>
                           <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <p className="text-lg text-white opacity-90">Criar um ecossistema transparente e confiável no setor solar</p>
                           </div>
                           <div className="flex items-start gap-3">
                             <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                             </div>
                             <p className="text-lg text-white opacity-90">Impulsionar a inovação tecnológica no mercado de energia solar</p>
                           </div>
                         </div>
                      </>
                   )}
                    {index === 3 && (
                       // Section 4 Content
                       <>
                         <div className="content-item col-span-1 md:col-span-2 w-full"> {/* Added w-full */}
                           <div className="bg-opacity-20 p-6 rounded-xl w-full" style={{ backgroundColor: `${colors.purple}33` }}> {/* Added w-full */}
                             <h3 className="text-2xl font-bold mb-4 text-white">Fórum de Discussão</h3>
                             <p className="text-lg text-white opacity-90 mb-6">
                               Nosso fórum reúne proprietários, entusiastas, profissionais e especialistas em energia solar para compartilhar conhecimentos, solucionar problemas e criar conexões valiosas.
                             </p>
                             <div className="space-y-4">
                               <div className="bg-opacity-30 p-4 rounded-lg" style={{ backgroundColor: `${colors.pureBlack}99` }}>
                                 <div className="flex items-center gap-3 mb-2">
                                   <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.blue }}></div>
                                   <div>
                                     <p className="font-bold text-white">Maria Silva</p>
                                     <p className="text-sm text-white opacity-70">Proprietária de Sistema Solar</p>
                                   </div>
                                 </div>
                                 <p className="text-white opacity-90">
                                   "O fórum me ajudou a entender como otimizar meu sistema solar. As dicas que recebi aumentaram minha economia em 20%!"
                                 </p>
                               </div>
                               <div className="bg-opacity-30 p-4 rounded-lg" style={{ backgroundColor: `${colors.pureBlack}99` }}>
                                 <div className="flex items-center gap-3 mb-2">
                                   <div className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.green }}></div>
                                   <div>
                                     <p className="font-bold text-white">Carlos Mendes</p>
                                     <p className="text-sm text-white opacity-70">Instalador Profissional</p>
                                   </div>
                                 </div>
                                 <p className="text-white opacity-90">
                                   "Encontro diariamente novas tecnologias e soluções através das discussões. É uma fonte inestimável de conhecimento para minha empresa."
                                 </p>
                               </div>
                             </div>
                           </div>
                         </div>
                         <div className="content-item col-span-1 w-full"> {/* Added w-full */}
                           <div className="bg-opacity-20 p-6 rounded-xl h-full flex flex-col justify-between w-full" style={{ backgroundColor: `${colors.green}33`, border: `2px solid ${colors.green}` }}> {/* Added w-full */}
                             <div>
                               <h3 className="text-xl font-bold mb-3 text-white">Participe</h3>
                               <p className="text-white opacity-90 mb-6">
                                 Junte-se à maior comunidade de energia solar do Brasil. Compartilhe experiências e aprenda com especialistas e entusiastas.
                               </p>
                             </div>
                             <div>
                               <Link
                                 to="/forum"
                                 className="block w-full py-3 rounded-lg font-bold text-lg text-center transition-all duration-300 hover:scale-105"
                                 style={{ backgroundColor: colors.green, color: colors.pureBlack }}
                               >
                                 Acessar o Fórum
                               </Link>
                             </div>
                           </div>
                         </div>
                       </>
                   )}
                    {index === 4 && (
                       // Section 5 Content
                        <>
                           <div className="content-item space-y-6 w-full"> {/* Added w-full */}
                               <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Encontre fornecedores verificados na sua região</p>
                               </div>
                               <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Compare orçamentos e avaliações de diferentes empresas</p>
                               </div>
                                <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Garanta a melhor negociação para seu projeto solar</p>
                               </div>
                           </div>
                            <div className="content-item rounded-xl overflow-hidden shadow-2xl h-full w-full" style={{ border: `3px solid ${colors.purple}` }}> {/* Added w-full */}
                              <img
                                src="https://media.discordapp.net/attachments/1359990326701330693/1365022046291103926/image.png?ex=680bcb58&is=680a79d8&hm=1a9454b6501ba11c1b659eb24824e6a03a1d60b091938cc213765860b896698e&=&format=webp&quality=lossless&width=982&height=552" // Replace with actual image
                                alt="Marketplace Kuarion"
                                className="w-full h-full object-cover"
                              />
                            </div>
                       </>
                    )}
                    {index === 5 && (
                       // Section 6 Content
                       <>
                         {/* Learning Card 1 - Blogs */}
                         <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.yellow}33` }}> {/* Added w-full */}
                              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.yellow }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V18M18 12H6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                              <h3 className="text-xl font-bold mb-3 text-white">Blogs e Artigos</h3>
                              <p className="text-white opacity-90">
                                Conteúdo aprofundado sobre as últimas tendências e tecnologias em energia solar.
                              </p>
                            </div>
                          {/* Learning Card 2 - Videos */}
                          <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.yellow}33` }}> {/* Added w-full */}
                              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.yellow }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16.5V7.5L17 12L10 16.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                              <h3 className="text-xl font-bold mb-3 text-white">Vídeos e Tutoriais</h3>
                              <p className="text-white opacity-90">
                                Aprenda de forma visual com nossos vídeos explicativos e guias passo a passo.
                              </p>
                            </div>
                          {/* Learning Card 3 - Desafios */}
                          <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.yellow}33` }}> {/* Added w-full */}
                              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.yellow }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17V12L15 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                              <h3 className="text-xl font-bold mb-3 text-white">Desafios Interativos</h3>
                              <p className="text-white opacity-90">
                                Teste seus conhecimentos e ganhe reconhecimento na comunidade Kuarion.
                              </p>
                            </div>
                       </>
                    )}
                     {index === 6 && (
                       // Section 7 Content
                       <>
                           <div className="content-item w-full"> {/* Added w-full */}
                             <div
                               className="rounded-xl overflow-hidden shadow-2xl h-full"
                               style={{ border: `3px solid ${colors.green}` }}
                             >
                               <img
                                 src="https://cdn.sanity.io/images/z7wg6mcy/production/b89b9ef48c96e84841c07411c863ab600f833e60-1661x1049.png" // Replace with actual image showing connections
                                 alt="Sistema Integrado"
                                 className="w-full h-full object-cover"
                               />
                             </div>
                           </div>
                           <div className="content-item space-y-6 w-[150%]"> {/* Added w-full */}
                               <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 20L16 4" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 20L8 4" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Conecte-se com parceiros estratégicos do setor</p>
                               </div>
                               <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 20L16 4" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 20L8 4" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Gerencie todas as etapas do seu projeto em um só lugar</p>
                               </div>
                                <div className="flex items-start gap-3">
                                   <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 20L16 4" stroke="black" strokeWidth="3" strokeLinecap="round" /><path d="M16 20L8 4" stroke="black" strokeWidth="3" strokeLinecap="round" /></svg>
                                   </div>
                                   <p className="text-lg text-white opacity-90">Otimize a comunicação e a colaboração da sua equipe</p>
                               </div>
                           </div>
                       </>
                    )}
                    {index === 7 && (
                       // Section 8 Content
                       <>
                            <div className="content-item space-y-6 w-full"> {/* Added w-full */}
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6V18M6 12H18" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                    <p className="text-lg text-white opacity-90">Reduza a burocracia e acelere seus projetos</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="3" strokeLinecap="round"/><path d="M12 6V18M6 12H18" stroke="black" strokeWidth="3" strokeLinecap="round" /></svg>
                                    </div>
                                    <p className="text-lg text-white opacity-90">Melhore a experiência do cliente com processos claros</p>
                                </div>
                                 <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full mt-1 flex items-center justify-center" style={{ backgroundColor: colors.yellow }}>
                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="3" strokeLinecap="round"/><path d="M12 6V18M6 12H18" stroke="black" strokeWidth="3" strokeLinecap="round" /></svg>
                                    </div>
                                    <p className="text-lg text-white opacity-90">Aumente sua produtividade e lucratividade</p>
                                </div>
                            </div>
                             <div className="content-item rounded-xl overflow-hidden shadow-2xl h-full w-full" style={{ border: `3px solid ${colors.blue}` }}> {/* Added w-full */}
                               <img
                                 src="https://sustainablereview.com//wp-content/uploads/2023/05/a2-1024x880.png" // Replace with image showing transformation/efficiency
                                 alt="Transformação do Workflow"
                                 className="w-full h-full object-cover"
                               />
                             </div>
                       </>
                    )}
                     {index === 8 && (
                       // Section 9 Content
                       <>
                           {/* Advantage Card 1 */}
                           <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.purple}33` }}> {/* Added w-full */}
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.purple }}>
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10V14M12 10V14M16 10V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Ferramentas Exclusivas</h3>
                                <p className="text-white opacity-90">
                                  Acesso a funcionalidades que otimizam sua operação no mercado solar.
                                </p>
                              </div>
                            {/* Advantage Card 2 */}
                            <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.purple}33` }}> {/* Added w-full */}
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.purple }}>
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Networking Valioso</h3>
                                <p className="text-white opacity-90">
                                  Conecte-se com os principais players e especialistas do setor.
                                </p>
                              </div>
                            {/* Advantage Card 3 */}
                            <div className="content-item rounded-xl overflow-hidden bg-opacity-20 p-6 w-full" style={{ backgroundColor: `${colors.purple}33` }}> {/* Added w-full */}
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: colors.purple }}>
                                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V16M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Suporte Especializado</h3>
                                <p className="text-white opacity-90">
                                  Conte com nossa equipe para ajudar no seu crescimento.
                                </p>
                              </div>
                       </>
                    )}
                    {index === 9 && (
                        // Section 10 Content
                        <div className="content-item mt-16 w-full"> {/* Added w-full */}
                            <img
                               src="https://images.stockcake.com/public/7/9/0/79041c55-e32d-4368-a928-f55d6094ed57_large/joyful-sunset-smile-stockcake.jpg" // Replace with compelling image/visual
                               alt="Junte-se a nós"
                               className="rounded-xl mx-auto shadow-2xl w-full h-auto" // Adjusted to w-full h-auto and mx-auto
                               style={{ border: `3px solid ${colors.green}`, maxWidth: '800px' }}
                             />
                         </div>
                    )}
                    {index === 10 && (
                        // Section 11 Content (CTA)
                        <div className="content-item max-w-4xl mx-auto w-full text-center"> {/* Added w-full */}
                            <Link
                               to="/auth" // Update target path for registration/login
                               className="cta-button items-center inline-block px-12 py-4 rounded-full text-2xl font-bold transition-all duration-300 hover:scale-110 shadow-lg"
                               style={{ backgroundColor: colors.green, color: colors.pureBlack }}
                             >
                               Seja conosco.
                             </Link>
                              <p className="mt-6 text-white opacity-80">
                                  Já tem uma conta? <Link to="/login" className="text-blue-400 hover:underline">Faça Login</Link>
                              </p>
                         </div>
                    )}
             </div>

            {/* --- End Content for each section --- */}

          </div>
        </section>
      ))}


       {/* Footer (Optional - Add your footer here) */}
       <footer className="py-8 text-center text-white opacity-70 relative z-10">
           <p>&copy; 2023 Kuarion. Todos os direitos reservados.</p>
       </footer>

    </div>
  );
};

export default LandingPage2;