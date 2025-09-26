"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOffsetAnchors } from "@/hooks/useOffsetAnchors";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import JourneyTimeline from "./components/JourneyTimeline";
import ProjectCard from "./components/ProjectCard";
import SkillTools from "./components/SkillTools";
import Loader from "@/components/Loader";
import ExperienceEducation from "./components/ExperienceEducation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  useOffsetAnchors();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Nav />

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
        className="scroll-mt-20"
      >
        <AboutSection />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Experience & Education Section */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
        className="scroll-mt-20"
      >
        <ExperienceEducation />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Journey Timeline Section */}
      <motion.section
        id="journey"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
        className="scroll-mt-20"
      >
        <JourneyTimeline />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Skills & Tools Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
        className="scroll-mt-20"
      >
        <SkillTools />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center bg-black text-blue-100 px-4 py-20 relative overflow-hidden scroll-mt-20"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-700/10 to-blue-800/10 blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-blue-200/70 text-lg">
              Real-world applications and learning projects
            </p>
          </motion.div>
          <ProjectCard />
        </div>
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6 }}
      >
        <Contact />
      </motion.section>

      {/* SPACING */}
      <div className="h-24 md:h-32 lg:h-40"></div>

      {/* Footer */}
      <Footer />
    </>
  );
}
