import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const variants = {
  violet: 'border-hairline-violet/30 bg-surface-press',
  night: 'border-hairline-cloud bg-ink-deep text-on-primary',
  lime: 'border-accent-lime/40 bg-accent-lime/10',
  pink: 'border-accent-pink/30 bg-accent-pink/10',
};

const StatCard = ({ title, value, icon: Icon, trend, unit, variant = 'violet' }) => {
  const isDark = variant === 'night';
  const trendUp = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`card-compact border transition-shadow hover:shadow-[var(--shadow-card)] ${variants[variant] || variants.violet}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${isDark ? 'text-on-dark-muted' : 'text-muted'}`}>{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <h3 className={`font-display text-2xl font-semibold sm:text-3xl ${isDark ? 'text-on-primary' : 'text-ink-deep'}`}>
              {typeof value === 'number' ? value.toLocaleString('vi-VN') : value}
            </h3>
            <span className={`text-sm font-medium ${isDark ? 'text-on-dark-muted' : 'text-muted'}`}>{unit}</span>
          </div>
          {trend !== undefined && (
            <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-accent-lime' : 'text-accent-pink'}`}>
              {trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <div className={`rounded-lg p-3 ${isDark ? 'bg-surface-night' : 'bg-surface-light'}`}>
          <Icon className={`h-6 w-6 ${isDark ? 'text-accent-lime' : 'text-accent-violet'}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
