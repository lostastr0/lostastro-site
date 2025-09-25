"use client";
import { motion } from "framer-motion";

export default function MusicFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900 border-t border-slate-700/50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-3">
            🎧 Built with Music
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Late-night coding sessions powered by incredible tunes
          </p>
          <div className="text-xs text-slate-500 space-x-4">
            <span>Lofi Hip Hop • Synthwave • Ambient</span>
            <span className="text-blue-400">Thanks to all the artists! 🎵</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
