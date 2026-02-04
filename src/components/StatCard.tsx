'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  color: 'primary' | 'accent';
  delay?: number;
}

export default function StatCard({ icon, label, value, unit, color, delay = 0 }: StatCardProps) {
  const colorClasses = {
    primary: {
      bg: 'from-primary/20 to-primary/5',
      text: 'text-primary',
      glow: 'shadow-primary/20',
    },
    accent: {
      bg: 'from-accent/20 to-accent/5',
      text: 'text-accent',
      glow: 'shadow-accent/20',
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`glass-effect rounded-2xl border border-white/5 p-5 bg-gradient-to-br ${colors.bg} hover:shadow-lg ${colors.glow} transition-all cursor-pointer`}
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={`${colors.text} mb-3`}
      >
        {icon}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        <div className="flex items-baseline gap-1 mb-1">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
            className="text-3xl font-bold"
          >
            {value}
          </motion.span>
          <span className="text-xs text-text-secondary">{unit}</span>
        </div>
        <p className="text-xs text-text-secondary font-medium">{label}</p>
      </motion.div>

      {/* Animated background pulse */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0`}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </motion.div>
  );
}
