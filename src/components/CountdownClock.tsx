import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LifecycleMode } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface CountdownClockProps {
  weddingDateStr: string;
  displayDate: string;
  lifecycle: LifecycleMode;
}

export const CountdownClock: React.FC<CountdownClockProps> = ({
  weddingDateStr,
  displayDate,
  lifecycle,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isToday: boolean;
    isPassed: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      // If lifecycle override is 'day' or 'after', respect it directly
      if (lifecycle === 'day') {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPassed: false });
        return;
      }
      if (lifecycle === 'after' || lifecycle === 'anniversary') {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPassed: true });
        return;
      }

      const target = new Date(weddingDateStr + 'T18:00:00');
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      const isSameDay =
        target.getFullYear() === now.getFullYear() &&
        target.getMonth() === now.getMonth() &&
        target.getDate() === now.getDate();

      if (isSameDay) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPassed: false });
        return;
      }

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr, lifecycle]);

  return (
    <section className="py-24 px-6 relative max-w-4xl mx-auto text-center">
      {/* State A: The Day Has Arrived */}
      {timeLeft.isToday ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="border border-[var(--gold-border)] bg-[#191613] p-12 shadow-2xl space-y-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent animate-pulse pointer-events-none" />
          <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-[var(--accent)]" />
            The Auspicious Moment
          </span>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#FAF8F5] tracking-[0.2em] uppercase font-light">
            TODAY IS THE DAY
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[var(--accent-light)]">
            Our hearts are full. We cannot wait to celebrate with you tonight.
          </p>
        </motion.div>
      ) : timeLeft.isPassed ? (
        /* State B: Married / Permanent Archive */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="border border-[var(--gold-border)] bg-[#171412] p-12 shadow-2xl space-y-4"
        >
          <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-[var(--accent)]" />
            Eternal Union
          </span>
          <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#FAF8F5] tracking-[0.2em] uppercase font-light">
            WE GOT MARRIED
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[var(--accent-light)] font-light">
            On {displayDate}, we exchanged our sacred vows. Welcome to our permanent digital heirloom.
          </p>
        </motion.div>
      ) : (
        /* State C: Anticipation Countdown */
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-2">
            <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              The Wedding Is Coming
            </span>
            <span className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] block">
              Counting down every fleeting moment until forever begins
            </span>
          </div>

          {/* Minimalist Editorial Countdown Grid with Animated Digits */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10">
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINUTES', val: timeLeft.minutes },
              { label: 'SECONDS', val: timeLeft.seconds },
            ].map((unit, index) => (
              <React.Fragment key={unit.label}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center bg-[#161412]/80 border border-[var(--gold-border)]/50 px-4 py-5 sm:px-6 sm:py-7 rounded-sm shadow-xl min-w-[70px] sm:min-w-[95px] backdrop-blur-sm group hover:border-[var(--accent)] transition-colors"
                >
                  <div className="h-10 sm:h-14 overflow-hidden relative flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.val}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="font-cinzel text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] font-light tracking-wider block"
                      >
                        {String(unit.val).padStart(2, '0')}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--text-muted)] mt-2 group-hover:text-[var(--accent)] transition-colors">
                    {unit.label}
                  </span>
                </motion.div>
                {index < 3 && (
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="font-cinzel text-2xl sm:text-3xl text-[var(--accent)] select-none"
                  >
                    :
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto mt-6"
          />
        </motion.div>
      )}
    </section>
  );
};
