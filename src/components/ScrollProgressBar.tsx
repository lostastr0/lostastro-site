"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-transparent z-50"
      style={{ 
        scaleX: scrollYProgress, 
        transformOrigin: "0 0",
        background: "linear-gradient(90deg, #0ea5e9, #22d3ee)"
      }}
    />
  );
}
