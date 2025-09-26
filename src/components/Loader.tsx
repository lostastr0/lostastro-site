"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onLoaded }: { onLoaded?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // simulate loading complete when content is ready
    const timer = setTimeout(() => {
      setVisible(false);
      onLoaded?.();
    }, 1000); // fade out after 1s
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 50 50"
            className="text-cyan-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="31.4 31.4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
