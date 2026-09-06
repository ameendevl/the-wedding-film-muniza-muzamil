import React from 'react';
import { motion } from 'framer-motion';
import { WeddingDayTimelineItem } from '../../types/universe';
import { Sparkles, Clock, Camera } from 'lucide-react';

interface WeddingDay24HoursProps {
  timeline: WeddingDayTimelineItem[];
  weddingDateStr: string;
}

export const WeddingDay24Hours: React.FC<WeddingDay24HoursProps> = ({
  timeline,
  weddingDateStr,
}) => {
  const targetDate = new Date(weddingDateStr + 'T00:00:00');
  const now = new Date();
  const isPast = now.getTime() > targetDate.getTime() + 86400000;
  const isToday =
    targetDate.getFullYear() === now.getFullYear() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getDate() === now.getDate();

  const headerTitle = isPast
    ? 'THE DAY WE BECAME US'
    : isToday
    ? 'TODAY IS THE DAY'
    : 'THE DAY IS COMING';

  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          The 24-Hour Chronicle
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          {headerTitle}
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          Hour by hour, step by step, prayer by prayer.
        </p>
      </div>

      {/* 24-Hour Timeline Stream */}
      <div className="relative border-l border-[var(--gold-border)]/50 ml-4 sm:ml-28 space-y-10 pl-6 sm:pl-10">
        {timeline.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Hour marker on left */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-[#181512] border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shadow-md group-hover:scale-125 transition-transform">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </div>

            <div className="sm:absolute sm:-left-28 sm:top-1 text-xs font-cinzel text-[var(--accent-light)] font-light tracking-widest hidden sm:block">
              {item.time}
            </div>

            {/* Content card */}
            <div className="bg-[#171513] border border-[var(--gold-border)] p-6 shadow-xl space-y-3 group-hover:border-[var(--accent)] transition-colors">
              <div className="flex items-center justify-between sm:hidden text-xs font-cinzel text-[var(--accent)]">
                <span>{item.time}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal tracking-wide">
                {item.title}
              </h3>

              <p className="font-serif text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                {item.description}
              </p>

              {item.photoUrl && (
                <div className="pt-2">
                  <img
                    src={item.photoUrl}
                    alt={item.title}
                    className="w-full max-w-sm h-40 object-cover border border-[var(--gold-border)] filter contrast-[1.05]"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
