"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTypeSwap } from "@/hooks/useTypeSwap";

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

function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(window.innerHeight);
    };

    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateVH, 100);
    });

    return () => {
      window.removeEventListener('resize', updateVH);
      window.removeEventListener('orientationchange', updateVH);
    };
  }, []);

  return viewportHeight;
}

function useResponsiveBreakpoint() {
  const [screenSize, setScreenSize] = useState<string>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 768) setScreenSize('mobile-lg');
      else if (width < 1024) setScreenSize('tablet');
      else if (width < 1440) setScreenSize('laptop');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

const FloatingTechElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // UPDATED: Only show at 1440px+, with proper spacing
    const getResponsivePositions = () => {
      const width = window.innerWidth;
      
      if (width >= 1920) {
        // Ultra-wide: Maximum spacing
        const edgePadding = 18;
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
        // 1440px-1919px: Push far to edges so hero text has space
        const verticalSpacing = 20;
        
        return [
          // Left side - pushed to 5% from left edge
          { x: 5, y: verticalSpacing, size: { width: 210, height: 125 } },
          // Right side - pushed to 5% from right edge
          { x: 95 - 14.6, y: verticalSpacing, size: { width: 210, height: 125 } },
          
          // Left side - 3% from left edge
          { x: 3, y: verticalSpacing + 38, size: { width: 200, height: 120 } },
          // Right side - 3% from right edge
          { x: 97 - 13.9, y: verticalSpacing + 38, size: { width: 200, height: 120 } },
          
          // Left side - 6% from left edge
          { x: 6, y: verticalSpacing + 64, size: { width: 215, height: 130 } },
          // Right side - 6% from right edge
          { x: 94 - 14.9, y: verticalSpacing + 64, size: { width: 215, height: 130 } }
        ];
      }
      else {
        // Below 1440px: HIDE all floating elements
        return [];
      }
    };

    // Tech content messages
    const techElementsContent = [
      {
        type: 'laptop',
        content: `<span style="color: #3b82f6;">jaineel@kali:~$</span> <span style="color: #60a5fa;">nmap -sS target</span><br><span style="color: #93c5fd;">Learning pentesting</span>`,
        duration: 8, layer: 'front', animationType: 'float'
      },
      {
        type: 'code',
        content: `const student = {<br>&nbsp;&nbsp;name: 'Jaineel',<br>&nbsp;&nbsp;goal: 'CS Degree'<br>};`,
        language: 'Computer Science', color: '#3b82f6',
        duration: 8, layer: 'front', animationType: 'float'
      },
      {
        type: 'terminal',
        content: `$ whoami<br>Cybersecurity Student<br>$ ./ethical_hack.sh`,
        duration: 8, layer: 'back', animationType: 'float'
      },
      {
        type: 'laptop',
        content: `<span style="color: #60a5fa;">student@dev:~#</span> <span style="color: #3b82f6;">python study.py</span><br><span style="color: #93c5fd;">Building knowledge</span>`,
        duration: 8, layer: 'back', animationType: 'float'
      },
      {
        type: 'terminal',
        content: `> metasploit<br>> use exploit/handler<br>> Security research`,
        duration: 8, layer: 'front', animationType: 'float'
      },
      {
        type: 'code',
        content: `// CS Journey<br>while(studying) {<br>&nbsp;&nbsp;knowledge++;<br>&nbsp;&nbsp;build_projects();<br>}`,
        language: 'Computer Science', color: '#3b82f6',
        duration: 8, layer: 'back', animationType: 'float'
      }
    ];

    // Create star particles
    const createStarParticles = () => {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'absolute pointer-events-none star-particle';
        star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
          background: linear-gradient(45deg, #3b82f6, #60a5fa);
          border-radius: 50%;
          animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite alternate;
          opacity: ${Math.random() * 0.8 + 0.2};
        `;
        container.appendChild(star);
      }
    };

    createStarParticles();

    // Get responsive positions
    const positions = getResponsivePositions();

    // Combine content with positions
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

    // Resize handler
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

    // Create elements
    techElements.forEach((element, index) => {
      if (!element.x || !element.y) return;

      const elementDiv = document.createElement('div');
      elementDiv.className = 'absolute pointer-events-none select-none tech-element';
      
      const opacity = element.layer === 'front' ? '0.90' : '0.75';
      const brandBlue = '#2563eb';
      
      const animationClass = `unified-float-animation`;
      const animationDelay = index * 1.3;
      
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

      // Content rendering
      if (element.type === 'laptop') {
        const baseFontSize = window.innerWidth >= 1440 ? 12 : window.innerWidth >= 768 ? 10 : 9;
        
        elementDiv.innerHTML = `
          <div style="width: 100%; height: 100%; background: linear-gradient(145deg, #1e293b, #334155); border-radius: 13px 13px 6px 6px; border: 1px solid ${brandBlue}aa; position: relative; box-shadow: inset 0 3px 7px rgba(255,255,255,0.12); backdrop-filter: blur(12px);">
            <div style="width: 94%; height: 76%; background: linear-gradient(135deg, #000000, #0f172a); margin: 3% auto; border-radius: 9px; padding: ${window.innerWidth >= 768 ? '18px' : '14px'}; font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace; font-size: ${baseFontSize}px; color: #3b82f6; overflow: hidden; line-height: 1.4; position: relative; border: 1px solid #1e293b; display: flex; flex-direction: column; justify-content: center; word-break: break-word;">
              <div>${element.content}</div>
              <span style="position: absolute; right: 10px; bottom: 8px; width: 10px; height: 14px; background: linear-gradient(45deg, #3b82f6, #60a5fa); animation: terminalBlink 2s infinite; border-radius: 2px; box-shadow: 0 0 8px #3b82f6;"></span>
            </div>
          </div>
        `;
      } else if (element.type === 'code') {
        const color = element.color || '#3b82f6';
        const language = element.language || 'JavaScript';
        const baseFontSize = window.innerWidth >= 1440 ? 11 : window.innerWidth >= 768 ? 9 : 8;
        
        elementDiv.innerHTML = `
          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(15, 23, 42, 0.97), rgba(30, 41, 59, 0.93)); border: 1px solid ${brandBlue}aa; border-radius: 11px; padding: ${window.innerWidth >= 768 ? '20px' : '16px'}; font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace; font-size: ${baseFontSize}px; color: #e2e8f0; backdrop-filter: blur(15px); line-height: 1.3; position: relative; overflow: hidden; display: flex; flex-direction: column; word-break: break-word;">
            <div style="color: ${color}; font-size: ${baseFontSize - 2}px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; font-weight: 600; flex-shrink: 0;">
              <span style="width: 12px; height: 12px; background: linear-gradient(45deg, ${color}, ${color}dd); border-radius: 3px; box-shadow: 0 0 8px ${color}77; animation: codePulse 3s infinite;"></span>
              ${language}
            </div>
            <div style="font-size: ${baseFontSize}px; color: #cbd5e1; flex: 1; display: flex; align-items: center; word-break: break-word;">${element.content}</div>
          </div>
        `;
      } else if (element.type === 'terminal') {
        const borderColor = 'rgba(59, 130, 246, 0.65)';
        const baseFontSize = window.innerWidth >= 1440 ? 11 : window.innerWidth >= 768 ? 9 : 8;
        
        elementDiv.innerHTML = `
          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0, 0, 0, 0.97), rgba(17, 24, 39, 0.93)); border: 1px solid ${borderColor}; border-radius: 11px; padding: ${window.innerWidth >= 768 ? '20px' : '16px'}; font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace; font-size: ${baseFontSize}px; color: #3b82f6; backdrop-filter: blur(15px); line-height: 1.3; overflow: hidden; display: flex; flex-direction: column; word-break: break-word;">
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

    // CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
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
      
      @media (min-width: 1440px) and (max-width: 1919px) {
        .tech-element { opacity: 0.88 !important; }
      }
      
      @media (min-width: 1920px) {
        .tech-element { opacity: 0.92 !important; }
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      elementsRef.current.forEach(el => el.remove());
      elementsRef.current = [];
      container.querySelectorAll('.star-particle').forEach(star => star.remove());
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden xl:block"
      style={{ opacity: 0.88 }}
    />
  );
};

const Hero: React.FC = () => {
  const REVEAL_STEPS = 5;
  const shown = useStaggeredReveal(REVEAL_STEPS, 450);
  const text = useTypeSwap("lostastr0", "Jaineel.");
  const viewportHeight = useViewportHeight();

  useEffect(() => {
    console.log("🚀 Welcome to my learning journey!");
  }, []);

  return (
    <main
      id="top"
      className="relative flex flex-col items-center justify-center bg-black text-blue-100 overflow-hidden"
      style={{
        minHeight: `calc(var(--vh, 1vh) * 100)`,
        padding: '0 clamp(16px, 5vw, 24px)'
      }}
    >
      <FloatingTechElements />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-900/30 via-blue-800/25 to-blue-900/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-15rem] right-[-15rem] h-[35rem] w-[35rem] rounded-full bg-gradient-to-l from-blue-800/25 via-blue-900/20 to-blue-800/25 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[30rem] w-[30rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-900/15 blur-2xl animate-pulse" />
      </div>

      <section className="relative max-w-5xl text-center z-10 flex flex-col items-center gap-4 md:gap-6 w-full">
        <div
          className={`transition-all duration-700 text-xs sm:text-sm font-mono text-blue-400/80 tracking-widest ${
            shown >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 text-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline">ASPIRING COMPUTER SCIENCE STUDENT</span>
            <span className="sm:hidden">CS STUDENT</span>
          </span>
        </div>

        <div
          className={`transition-all duration-700 ${
            shown >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-blue-300/90 font-medium mb-2 md:mb-3">
            Hi, I'm <span className="text-blue-400 font-bold">Jaineel</span> 👋
          </p>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-blue-200/80">
            <span className="text-blue-400 font-medium">
              Learning, Building, Breaking Boundaries in Tech
            </span>
          </p>
        </div>

        <h1
          className={`transition-all duration-700 font-bold tracking-tight bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent relative ${
            shown >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 5rem)',
            filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))",
            textShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
            lineHeight: '1.1'
          }}
        >
          <span>{text}</span>
          <span
            className="ml-2 inline-block w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"
            style={{
              height: 'clamp(2rem, 10vw, 2.5rem)',
              animation: "subtleCursorBlink 1.5s ease-in-out infinite",
            }}
          />
        </h1>

        <div
          className={`transition-all duration-700 mt-2 md:mt-4 space-y-3 md:space-y-4 ${
            shown >= 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-2 md:space-y-3">
            <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-bold leading-tight">
              Passionate about{" "}
              <span className="text-cyan-400">Computer Science</span> with{" "}
              <span className="text-blue-400">Cyber Security</span> as my pathway
            </p>
            <p className="text-sm sm:text-base md:text-lg text-blue-200/80 leading-relaxed px-4 md:px-0">
              Currently learning programming and building projects while
              preparing for Cert IV in Cyber Security (2025) – my stepping stone
              to a CS degree
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6 text-xs sm:text-sm px-4 md:px-0">
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-200">Learning Programming</span>
            </span>
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-blue-200">Building Projects</span>
            </span>
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-blue-200">Pathway to CS</span>
            </span>
          </div>
        </div>

        <div
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 relative z-0 w-full max-w-lg sm:max-w-none ${
            shown >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <a
            href="#projects"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              See What I've Built
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </a>

          <a
            href="#about"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/10 transition-all duration-300 text-base md:text-lg font-semibold hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              My Journey
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-cyan-500/30 text-cyan-300 bg-transparent hover:bg-cyan-500/10 transition-all duration-300 text-base md:text-lg font-semibold hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              Let's Connect
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a
            href="#about"
            className="group animate-bounce text-blue-400 hover:text-blue-300 transition-colors p-2"
            aria-label="Learn more about my journey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Hero;
