'use client';

import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

interface WorkoutCardProps {
  name: string;
  date: string;
  duration: number;
  delay?: number;
}

export default function WorkoutCard({ name, date, duration, delay = 0 }: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="glass-effect-light rounded-2xl p-4 border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium mb-1">{name}</h4>
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration} min
            </span>
          </div>
        </div>

        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-text-secondary group-hover:text-primary transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="mt-3 h-1 bg-surface rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${Math.random() * 40 + 60}%` }}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
