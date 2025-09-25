"use client";

import { useState, useEffect } from "react";
import { LogoWithText } from '@/components/Logo';
import Logo from '@/components/Logo';

export default function Nav() {
  // COMPLETE NAVIGATION: Perfect order matching your page structure
  const navLinks = [
    { id: "home", label: "Home", href: "#top" },
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "journey", label: "Journey", href: "#journey" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // IMPROVED scroll detection with perfect section recognition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Check if navbar should be styled differently when scrolled
      setIsScrolled(scrollY > 50);
      
      let currentActive = "home";
      
      // Define section boundaries more accurately
      if (scrollY < 400) {
        // Still in Hero section
        currentActive = "home";
      } else {
        // Check sections in reverse order (bottom to top) for accurate detection
        const sections = [
          { id: "contact", selector: "#contact" },
          { id: "projects", selector: "#projects" },
          { id: "skills", selector: "#skills" },
          { id: "journey", selector: "#journey" },
          { id: "experience", selector: "#experience" },
          { id: "about", selector: "#about" },
        ];
        
        for (const section of sections) {
          const element = document.querySelector(section.selector);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            
            // If we've scrolled past the start of this section (with offset)
            if (scrollY >= elementTop - 200) {
              currentActive = section.id;
              break;
            }
          }
        }
      }
      
      setActive(currentActive);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  // PERFECT smooth scroll function
  const handleNavClick = (href: string, id: string) => {
    setActive(id);
    setIsMobileMenuOpen(false);
    
    if (href === "#top" || id === "home") {
      // Scroll to very top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });
      }
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/85 backdrop-blur-xl shadow-xl border-b border-blue-500/20' 
          : 'bg-black/75 backdrop-blur-md shadow-lg'
      }`}>
        <nav className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between">
          {/* Real Logo with Brand Text */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActive("home");
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-20 group cursor-pointer"
            aria-label="Home"
          >
            <LogoWithText size="sm" />
          </a>

          {/* Desktop Navigation - Your Brand Colors */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map(({ id, label, href }) => {
              const isActive = active === id;
              return (
                <li key={id} className="group relative">
                  <button
                    onClick={() => handleNavClick(href, id)}
                    className={`relative px-4 lg:px-6 py-2.5 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? "text-white" 
                        : "text-blue-200 hover:text-white"
                    }`}
                  >
                    {label}
                    
                    {/* Active state background - Your Brand Colors */}
                    <span
                      className={`absolute inset-0 -z-10 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/25 scale-105"
                          : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600/50 group-hover:via-blue-600/50 group-hover:to-blue-700/50 group-hover:shadow-md group-hover:shadow-blue-500/20 group-hover:scale-105"
                      }`}
                    ></span>
                    
                    {/* Subtle border glow - Your Brand Colors */}
                    <span
                      className={`absolute inset-0 -z-20 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 opacity-20 blur-sm"
                          : "opacity-0 group-hover:opacity-10 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-blue-400 group-hover:to-blue-500 group-hover:blur-sm"
                      }`}
                    ></span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button - Your Brand Colors */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden relative z-30 p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            data-mobile-menu
          >
            <div className="w-6 h-6 flex flex-col items-center justify-center space-y-1">
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Menu - Your Brand Colors */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black border-l border-blue-500/20 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-mobile-menu
      >
        <div className="pt-20 pb-6 px-6">
          {/* Mobile Navigation Links - Your Brand Colors */}
          <nav className="space-y-2">
            {navLinks.map(({ id, label, href }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(href, id)}
                  className={`w-full text-left px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 shadow-lg"
                      : "text-blue-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:via-blue-600/20 hover:to-blue-700/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    {isActive && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Footer with Real Logo */}
          <div className="mt-12 pt-8 border-t border-blue-700/30">
            <div className="text-center">
              <p className="text-blue-300/70 text-sm">
                Computer Science Student
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg p-2">
                  <Logo size="xs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
