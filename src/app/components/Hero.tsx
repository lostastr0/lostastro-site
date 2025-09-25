"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTypeSwap } from "@/hooks/useTypeSwap";

// Util for staggered entrance
function useStaggeredReveal(delaySteps: number, stepMs: number): number {
  const [shownStep, setShownStep] = useState<number>(0);
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setShownStep((step) => {
        if (step < delaySteps) return step + 1;
        clearInterval(interval);
        return step;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [delaySteps, stepMs]);
  return shownStep;
}

// Floating Tech Elements with UNIFIED ANIMATIONS AND FIXED SIZING
const FloatingTechElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // MATHEMATICALLY PERFECT symmetrical positioning with LARGER SIZES
    const getResponsivePositions = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) {
        // FULLSCREEN (1920px+) - Larger elements
        const edgePadding = 22;
        const verticalSpacing = 16;
        
        return [
          { x: edgePadding, y: verticalSpacing, size: { width: 220, height: 130 } },
          { x: 100 - edgePadding - (220/window.innerWidth*100), y: verticalSpacing, size: { width: 220, height: 130 } },
          { x: edgePadding - 2, y: verticalSpacing + 42, size: { width: 210, height: 125 } },
          { x: 100 - edgePadding + 2 - (210/window.innerWidth*100), y: verticalSpacing + 42, size: { width: 210, height: 125 } },
          { x: edgePadding + 3, y: verticalSpacing + 68, size: { width: 225, height: 135 } },
          { x: 100 - edgePadding - 3 - (225/window.innerWidth*100), y: verticalSpacing + 68, size: { width: 225, height: 135 } }
        ];
      }
      else if (width >= 1440) {
        // LARGE DESKTOP (1440px-1919px) - Larger elements
        const edgePadding = 15;
        const verticalSpacing = 20;
        
        return [
          { x: edgePadding, y: verticalSpacing, size: { width: 210, height: 125 } },
          { x: 100 - edgePadding - 14.6, y: verticalSpacing, size: { width: 210, height: 125 } },
          { x: edgePadding - 3, y: verticalSpacing + 38, size: { width: 200, height: 120 } },
          { x: 100 - edgePadding + 3 - 13.9, y: verticalSpacing + 38, size: { width: 200, height: 120 } },
          { x: edgePadding + 3, y: verticalSpacing + 64, size: { width: 215, height: 130 } },
          { x: 100 - edgePadding - 3 - 14.9, y: verticalSpacing + 64, size: { width: 215, height: 130 } }
        ];
      }
      else if (width >= 768) {
        // TABLET/LAPTOP (768px-1439px) - FIXED LARGER SIZES
        const edgePadding = 8;
        const verticalSpacing = 16;
        
        return [
          { x: edgePadding, y: verticalSpacing, size: { width: 180, height: 110 } },
          { x: 100 - edgePadding - 23.4, y: verticalSpacing, size: { width: 180, height: 110 } },
          { x: edgePadding - 2, y: verticalSpacing + 44, size: { width: 170, height: 105 } },
          { x: 100 - edgePadding + 2 - 22.1, y: verticalSpacing + 44, size: { width: 170, height: 105 } },
          { x: edgePadding + 3, y: verticalSpacing + 68, size: { width: 185, height: 115 } },
          { x: 100 - edgePadding - 3 - 24.1, y: verticalSpacing + 68, size: { width: 185, height: 115 } }
        ];
      }
      else {
        // MOBILE (320px-767px) - Larger compact elements
        const edgePadding = 5;
        const verticalSpacing = 12;
        
        return [
          { x: edgePadding, y: verticalSpacing, size: { width: 150, height: 85 } },
          { x: 100 - edgePadding - 46.9, y: verticalSpacing, size: { width: 150, height: 85 } },
          { x: edgePadding - 2, y: verticalSpacing + 56, size: { width: 140, height: 80 } },
          { x: 100 - edgePadding + 2 - 43.8, y: verticalSpacing + 56, size: { width: 140, height: 80 } },
          { x: edgePadding + 6, y: verticalSpacing + 76, size: { width: 155, height: 90 } },
          { x: 100 - edgePadding - 6 - 48.4, y: verticalSpacing + 76, size: { width: 155, height: 90 } }
        ];
      }
    };

    // CONTENT with SHORTER CONTENT - No overflow
    const techElementsContent = [
      // ELEMENT 1 - Top Left Laptop (CYBERSECURITY)
      {
        type: 'laptop',
        content: `<span style="color: #3b82f6;">jaineel@kali:~$</span> <span style="color: #60a5fa;">nmap -sS target</span><br><span style="color: #93c5fd;">Learning pentesting</span>`,
        duration: 8, layer: 'front', animationType: 'float'
      },
      
      // ELEMENT 2 - Top Right Code (COMPUTER SCIENCE)
      {
        type: 'code',
        content: `const student = {<br>&nbsp;&nbsp;name: 'Jaineel',<br>&nbsp;&nbsp;goal: 'CS Degree'<br>};`,
        language: 'Computer Science', color: '#3b82f6',
        duration: 8, layer: 'front', animationType: 'float'
      },

      // ELEMENT 3 - Middle Left Terminal (CYBERSECURITY) - SHORTER CONTENT
      {
        type: 'terminal',
        content: `$ whoami<br>Cybersecurity Student<br>$ ./ethical_hack.sh`,
        duration: 8, layer: 'back', animationType: 'float'
      },

      // ELEMENT 4 - Middle Right Laptop (COMPUTER SCIENCE)
      {
        type: 'laptop',
        content: `<span style="color: #60a5fa;">student@dev:~#</span> <span style="color: #3b82f6;">python study.py</span><br><span style="color: #93c5fd;">Building knowledge</span>`,
        duration: 8, layer: 'back', animationType: 'float'
      },

      // ELEMENT 5 - Bottom Left Terminal (CYBERSECURITY) - SHORTER CONTENT
      {
        type: 'terminal',
        content: `> metasploit<br>> use exploit/handler<br>> Security research`,
        duration: 8, layer: 'front', animationType: 'float'
      },

      // ELEMENT 6 - Bottom Right Code (COMPUTER SCIENCE)
      {
        type: 'code',
        content: `// CS Journey<br>while(studying) {<br>&nbsp;&nbsp;knowledge++;<br>&nbsp;&nbsp;build_projects();<br>}`,
        language: 'Computer Science', color: '#3b82f6',
        duration: 8, layer: 'back', animationType: 'float'
      }
    ];

    // Get responsive positions with perfect symmetry
    const positions = getResponsivePositions();

    // Combine content with mathematically symmetrical positions
    const techElements = techElementsContent.map((element, index) => ({
      ...element,
      ...positions[index]
    }));

    // Mouse tracking
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        lastMouseUpdate = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler with perfect symmetry recalculation
    const handleResize = () => {
      const newPositions = getResponsivePositions();
      elementsRef.current.forEach((el, index) => {
        if (el && newPositions[index]) {
          el.style.left = `${newPositions[index].x}%`;
          el.style.top = `${newPositions[index].y}%`;
          el.style.width = `${newPositions[index].size.width}px`;
          el.style.height = `${newPositions[index].size.height}px`;
        }
      });
    };

    window.addEventListener('resize', handleResize);

    // Create ALL 6 elements with perfect symmetrical positioning
    techElements.forEach((element, index) => {
      const elementDiv = document.createElement('div');
      elementDiv.className = 'absolute pointer-events-none select-none tech-element';
      
      const opacity = element.layer === 'front' ? '0.90' : '0.75';
      const brandBlue = '#2563eb';
      
      // ALL ELEMENTS GET THE SAME FLOAT ANIMATION WITH STAGGERED DELAYS
      const animationClass = `unified-float-animation`;
      const animationDelay = index * 1.3; // Staggered delays for natural feel
      
      elementDiv.style.cssText = `
        left: ${element.x}%;
        top: ${element.y}%;
        width: ${element.size.width}px;
        height: ${element.size.height}px;
        animation: ${animationClass} ${element.duration}s ease-in-out infinite;
        animation-delay: ${animationDelay}s;
        opacity: ${opacity};
        z-index: ${element.layer === 'front' ? '3' : '2'};
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: ${element.layer === 'front'
          ? `0 16px 50px ${brandBlue}80, 0 8px 20px ${brandBlue}70`
          : `0 12px 35px ${brandBlue}60, 0 6px 15px ${brandBlue}50`};
        will-change: transform, box-shadow, opacity;
        transform: perspective(1200px) rotateX(0deg) rotateY(0deg);
        filter: brightness(1.05);
      `;

      // Enhanced hover effects
      elementDiv.addEventListener('mouseenter', () => {
        elementDiv.style.transform = 'perspective(1200px) scale(1.08) rotateX(3deg) rotateY(3deg)';
        elementDiv.style.boxShadow = `0 25px 70px ${brandBlue}95, 0 12px 28px ${brandBlue}85`;
        elementDiv.style.zIndex = '20';
        elementDiv.style.opacity = '1';
        elementDiv.style.filter = 'brightness(1.15)';
      });

      elementDiv.addEventListener('mouseleave', () => {
        elementDiv.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        elementDiv.style.boxShadow = element.layer === 'front'
          ? `0 16px 50px ${brandBlue}80, 0 8px 20px ${brandBlue}70`
          : `0 12px 35px ${brandBlue}60, 0 6px 15px ${brandBlue}50`;
        elementDiv.style.zIndex = element.layer === 'front' ? '3' : '2';
        elementDiv.style.opacity = opacity;
        elementDiv.style.filter = 'brightness(1.05)';
      });

      // Content rendering with RESPONSIVE FONT SIZES AND BETTER PADDING
      if (element.type === 'laptop') {
        const baseFontSize = window.innerWidth >= 1440 ? 12 : window.innerWidth >= 768 ? 10 : 9;
        
        elementDiv.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(145deg, #1e293b, #334155);
            border-radius: 13px 13px 6px 6px;
            border: 1px solid ${brandBlue}aa;
            position: relative;
            box-shadow: inset 0 3px 7px rgba(255,255,255,0.12);
            backdrop-filter: blur(12px);
          ">
            <div style="
              width: 94%;
              height: 76%;
              background: linear-gradient(135deg, #000000, #0f172a);
              margin: 3% auto;
              border-radius: 9px;
              padding: ${window.innerWidth >= 768 ? '18px' : '14px'};
              font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
              font-size: ${baseFontSize}px;
              color: #3b82f6;
              overflow: hidden;
              line-height: 1.4;
              position: relative;
              border: 1px solid #1e293b;
              display: flex;
              flex-direction: column;
              justify-content: center;
              word-break: break-word;
            ">
              <div>${element.content}</div>
              <span style="
                position: absolute;
                right: 10px;
                bottom: 8px;
                width: 10px;
                height: 14px;
                background: linear-gradient(45deg, #3b82f6, #60a5fa);
                animation: terminalBlink 2s infinite;
                border-radius: 2px;
                box-shadow: 0 0 8px #3b82f6;
              "></span>
            </div>
          </div>
        `;
      } else if (element.type === 'code') {
        const color = element.color || '#3b82f6';
        const language = element.language || 'JavaScript';
        const baseFontSize = window.innerWidth >= 1440 ? 11 : window.innerWidth >= 768 ? 9 : 8;
        
        elementDiv.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(30, 41, 59, 0.93));
            border: 1px solid ${brandBlue}aa;
            border-radius: 11px;
            padding: ${window.innerWidth >= 768 ? '20px' : '16px'};
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
            font-size: ${baseFontSize}px;
            color: #e2e8f0;
            backdrop-filter: blur(15px);
            line-height: 1.3;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            word-break: break-word;
          ">
            <div style="
              color: ${color};
              font-size: ${baseFontSize - 2}px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 600;
              flex-shrink: 0;
            ">
              <span style="
                width: 12px;
                height: 12px;
                background: linear-gradient(45deg, ${color}, ${color}dd);
                border-radius: 3px;
                box-shadow: 0 0 8px ${color}77;
                animation: codePulse 3s infinite;
              "></span>
              ${language}
            </div>
            <div style="font-size: ${baseFontSize}px; color: #cbd5e1; flex: 1; display: flex; align-items: center; word-break: break-word;">
              ${element.content}
            </div>
          </div>
        `;
      } else if (element.type === 'terminal') {
        const borderColor = 'rgba(59, 130, 246, 0.65)';
        const baseFontSize = window.innerWidth >= 1440 ? 11 : window.innerWidth >= 768 ? 9 : 8;
        
        elementDiv.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.97), rgba(17, 24, 39, 0.93));
            border: 1px solid ${borderColor};
            border-radius: 11px;
            padding: ${window.innerWidth >= 768 ? '20px' : '16px'};
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
            font-size: ${baseFontSize}px;
            color: #3b82f6;
            backdrop-filter: blur(15px);
            line-height: 1.3;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            word-break: break-word;
          ">
            <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center; flex-shrink: 0;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(45deg, #ef4444, #dc2626); box-shadow: 0 0 4px #ef4444; animation: buttonPulse 4s infinite;"></div>
              <div style="width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(45deg, #f59e0b, #d97706); box-shadow: 0 0 4px #f59e0b; animation: buttonPulse 4s infinite 0.5s;"></div>
              <div style="width: 10px; height: 10px; border-radius: 50%; background: linear-gradient(45deg, #3b82f6, #60a5fa); box-shadow: 0 0 4px #3b82f6; animation: buttonPulse 4s infinite 1s;"></div>
              <span style="color: #6b7280; font-size: ${baseFontSize - 2}px; margin-left: 8px; font-weight: 600;">Terminal</span>
            </div>
            <div style="color: #3b82f6; text-shadow: 0 0 4px #3b82f644; flex: 1; display: flex; align-items: center; word-break: break-word;">${element.content}</div>
          </div>
        `;
      }

      container.appendChild(elementDiv);
      elementsRef.current.push(elementDiv);
    });

    // Mouse interaction
    let animationId: number;
    const updateInteractions = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      elementsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const dx = mouseRef.current.x - elementCenterX;
        const dy = mouseRef.current.y - elementCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Parallax effect
        const parallaxStrength = el.style.zIndex === '3' ? 0.03 : 0.02;
        const parallaxX = (mouseRef.current.x - centerX) * parallaxStrength;
        const parallaxY = (mouseRef.current.y - centerY) * parallaxStrength;
        
        let transform = `translate(${parallaxX}px, ${parallaxY}px)`;
        
        if (distance < 160) {
          const force = Math.max(0, (160 - distance) / 160) * 0.28;
          const avoidX = -(dx / distance) * force * 14;
          const avoidY = -(dy / distance) * force * 14;
          transform = `translate(${parallaxX + avoidX}px, ${parallaxY + avoidY}px) scale(1.04)`;
        }
        
        el.style.transform = `perspective(1200px) ${transform}`;
      });
      
      animationId = requestAnimationFrame(updateInteractions);
    };
    
    updateInteractions();

    // UNIFIED FLOAT ANIMATION - Same for all elements
    const style = document.createElement('style');
    style.textContent = `
      @keyframes terminalBlink {
        0%, 50% { opacity: 1; transform: scale(1); }
        51%, 100% { opacity: 0.2; transform: scale(0.9); }
      }
      
      @keyframes codePulse {
        0%, 100% { transform: scale(1); box-shadow: 0 0 10px currentColor; }
        50% { transform: scale(1.15); box-shadow: 0 0 18px currentColor; }
      }
      
      @keyframes buttonPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        25% { transform: scale(1.08); opacity: 0.8; }
        50% { transform: scale(0.96); opacity: 1; }
        75% { transform: scale(1.04); opacity: 0.9; }
      }

      @keyframes unified-float-animation {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-12px) rotate(0.5deg); }
        66% { transform: translateY(-6px) rotate(-0.5deg); }
      }
      
      /* RESPONSIVE BREAKPOINTS */
      @media (max-width: 767px) {
        .tech-element {
          opacity: 0.6 !important;
        }
      }
      
      @media (min-width: 768px) and (max-width: 1439px) {
        .tech-element {
          opacity: 0.75 !important;
        }
      }
      
      @media (min-width: 1440px) and (max-width: 1919px) {
        .tech-element {
          opacity: 0.88 !important;
        }
      }
      
      @media (min-width: 1920px) {
        .tech-element {
          opacity: 0.92 !important;
        }
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      elementsRef.current.forEach(el => el.remove());
      elementsRef.current = [];
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
    />
  );
};

const Hero: React.FC = () => {
  const REVEAL_STEPS = 5;
  const shown = useStaggeredReveal(REVEAL_STEPS, 500);
  const text = useTypeSwap("lostastr0", "Jaineel.");

  useEffect(() => {
    console.log("🚀 Hey there! Welcome to my digital universe!");
  }, []);

  return (
    <main
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-blue-100 overflow-hidden px-6"
    >
      <FloatingTechElements />
      
      {/* Enhanced background gradients with YOUR BLUE COLORS */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[35rem] w-[75rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-900/30 via-blue-800/25 to-blue-900/30 blur-3xl" />
        <div className="absolute bottom-[-15rem] right-[-15rem] h-[30rem] w-[30rem] rounded-full bg-gradient-to-l from-blue-800/25 via-blue-900/20 to-blue-800/25 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[25rem] w-[25rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-900/15 blur-2xl" />
      </div>

      <section className="relative max-w-5xl text-center z-10 flex flex-col items-center gap-6">
        {/* Section Number - Your brand style */}
        <div
          className={`transition-all duration-700 text-xs sm:text-sm font-mono text-blue-400/70 tracking-widest ${
            shown >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          00. HOME
        </div>
        
        {/* Personal greeting - Your brand style */}
        <div
          className={`transition-all duration-700 ${
            shown >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-lg sm:text-xl text-blue-300/90 font-medium mb-2">
            Hey there! 👋 I'm
          </p>
        </div>
        
        <h1
          className={`transition-all duration-700 text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent ${
            shown >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span>{text}</span>
          <span className="ml-2 inline-block h-[2.5rem] w-1 translate-y-1 align-middle bg-gradient-to-b from-blue-400 to-blue-600 animate-pulse rounded-full" />
        </h1>
        
        {/* Enhanced description - Your brand colors */}
        <div
          className={`transition-all duration-700 mt-4 space-y-4 ${
            shown >= 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-xl sm:text-2xl text-blue-200 font-medium">
            And I'm passionate about <span className="text-blue-400">cybersecurity</span> & <span className="text-blue-300">computer science</span>
          </p>
          <p className="text-base sm:text-lg text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            About to begin my cybersecurity journey while building a foundation in programming and development. Excited to explore ethical hacking, security fundamentals, and eventually pursue computer science studies.
          </p>
        </div>
        
        <div
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 ${
            shown >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <a
            href="#projects"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              Explore My Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          
          {/* 🎯 CLEAN CV Coming Soon Button */}
          <button
            disabled
            className="group px-8 py-4 rounded-xl border-2 border-blue-500/20 text-blue-300/60 bg-black/20 backdrop-blur-sm transition-all duration-300 text-lg font-semibold shadow-lg cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CV Coming Soon
            </span>
          </button>
        </div>
      </section>
      
      <div className="mt-20 flex justify-center">
        <a 
          href="#about" 
          className="group animate-bounce text-blue-400 hover:text-blue-300 transition-colors" 
          aria-label="Scroll down to About section"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 group-hover:scale-110 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </main>
  );
};

export default Hero;
