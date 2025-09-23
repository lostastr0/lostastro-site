"use client";

import { useState, useEffect } from "react";
import { useOffsetAnchors } from "@/hooks/useOffsetAnchors";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import JourneyTimeline from "./components/JourneyTimeline";
import ProjectCard from "./components/ProjectCard";
import SkillTools from "./components/SkillTools";
import Loader from "./components/Loader";

import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiMysql,
  SiLinux,
  SiGnu,
  SiCloudflare,
  SiDatabricks,
  SiWebauthn,
} from "react-icons/si";

import { FaNetworkWired, FaDatabase } from "react-icons/fa";

function ExperienceEducation() {
  return (
    <section id="experience" className="min-h-screen flex flex-col items-center bg-black text-sky-200 px-4">
      <div className="mx-auto max-w-5xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">Experience & Education</h2>
        <p className="text-sky-300 text-center">Content coming soon.</p>
      </div>
    </section>
  );
}

function AchievementsCertifications() {
  return (
    <section id="achievements" className="min-h-screen flex flex-col items-center bg-black text-sky-200 px-4">
      <div className="mx-auto max-w-5xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">Achievements & Certifications</h2>
        <p className="text-sky-300 text-center">Content coming soon.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center bg-black text-sky-200 px-4">
      <div className="mx-auto max-w-5xl w-full text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>
        <p className="text-sky-300 mb-3">Feel free to reach out via email or LinkedIn.</p>
      </div>
    </section>
  );
}

const skills = [
  { name: "Python", Icon: SiPython, description: "A versatile programming language" },
  { name: "JavaScript", Icon: SiJavascript, description: "Scripting language for web development" },
  { name: "HTML5", Icon: SiHtml5, description: "Standard markup language for web pages" },
  { name: "CSS3", Icon: SiCss3, description: "Stylesheet language for web pages" },
  { name: "PHP", Icon: SiPhp, description: "Popular server-side scripting language" },
  { name: "SQL", Icon: SiMysql, description: "Query language for databases" },
];

const learningNext = [
  { name: "Linux", Icon: SiLinux, description: "Open source operating system" },
  { name: "Bash", Icon: SiGnu, description: "Shell scripting and command language" },
  { name: "Networking", Icon: FaNetworkWired, description: "Computer networking fundamentals" },
  { name: "Databases", Icon: FaDatabase, description: "Database management systems" },
  { name: "Cloud Basics", Icon: SiCloudflare, description: "Fundamental cloud computing concepts" },
  { name: "Data Structures", Icon: SiDatabricks, description: "Efficient data organization methods" },
  { name: "Web Security", Icon: SiWebauthn, description: "Protecting web applications" },
];

export default function Page() {
  useOffsetAnchors();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader message="Launching..." />;

  return (
    <>
      <Nav />
      {/* Removed Starfield wrapper */}
      <Hero />
      <AboutSection />
      <section id="journey" className="min-h-screen flex items-center bg-black text-sky-200 px-4">
        <div className="mx-auto max-w-5xl w-full">
          <div className="rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <h2 className="text-3xl font-semibold">Journey & Plan</h2>
            <p className="mt-2 text-sky-300/80">Live timeline with halfway and yearly markers.</p>
            <JourneyTimeline />
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex flex-col items-center bg-black text-sky-200 px-4">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-start">
          <h2 className="text-3xl font-semibold mb-2">Projects</h2>
          <ProjectCard />
        </div>
      </section>

      <SkillTools skills={skills} learningNext={learningNext} />

      <ExperienceEducation />
      <AchievementsCertifications />
      <Contact />
    </>
  );
}
