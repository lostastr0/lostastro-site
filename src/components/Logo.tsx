"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant?: 'default' | 'animated';
  className?: string;
  priority?: boolean;
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  className = '',
  priority = false 
}: LogoProps) {
  
  const sizeConfig = {
    xs: { px: 16, class: 'w-4 h-4', file: '/logo/lostastr0-logo-16.png' },
    sm: { px: 32, class: 'w-8 h-8', file: '/logo/lostastr0-logo-32.png' },
    md: { px: 48, class: 'w-12 h-12', file: '/logo/lostastr0-logo-48.png' },
    lg: { px: 64, class: 'w-16 h-16', file: '/logo/lostastr0-logo-64.png' },
    xl: { px: 128, class: 'w-32 h-32', file: '/logo/lostastr0-logo-128.png' },
    xxl: { px: 256, class: 'w-64 h-64', file: '/logo/lostastr0-logo-256.png' }
  };

  const config = sizeConfig[size];

  const LogoElement = (
    <Image
      src={config.file}
      alt="lostastr0 logo"
      width={config.px}
      height={config.px}
      className={`${config.class} ${className} object-contain`}
      priority={priority}
    />
  );

  return variant === 'animated' ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {LogoElement}
    </motion.div>
  ) : (
    LogoElement
  );
}

// Logo with text component
export function LogoWithText({ 
  size = 'md', 
  showText = true,
  className = '' 
}: { 
  size?: LogoProps['size']; 
  showText?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={size} variant="animated" />
      {showText && (
        <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          lostastr0
        </span>
      )}
    </div>
  );
}

// Animated logo with effects
export function AnimatedLogo({ size = 'xl' }: { size?: LogoProps['size'] }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="relative"
    >
      <Logo size={size} />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full blur-lg"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
