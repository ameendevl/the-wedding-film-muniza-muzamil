import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { StoryMilestone } from '../types';
import { MapPin, Sparkles, Heart } from 'lucide-react';

interface StoryTimelineProps {
  timeline: StoryMilestone[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ timeline }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked progress for drawing the central golden spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 85%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const spineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 relative max-w-6xl mx-auto overflow-hidden"
    >
      {/* Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-28 space-y-4"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.35em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[var(--accent)]" />
          The Story of Us
        </motion.span>

        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          HOW IT ALL BEGAN
        </h2>

        <p className="font-serif italic text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto font-light leading-relaxed">
          "Every great love story is a sequence of quiet miracles that time slowly weaves together."
        </p>

        {/* Animated accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto mt-6"
        />
      </motion.div>

      {/* Interactive Cinematic Timeline */}
      <div className="relative">
        {/* Central Vertical Spine Background Track */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-12 w-[1px] bg-[var(--gold-border)]/20 -translate-x-1/2" />

        {/* Animated Liquid Gold Spine with Spring Physics */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-12 w-[2px] -translate-x-1/2 pointer-events-none overflow-visible">
          <motion.div
            style={{ height: spineHeight }}
            className="w-full bg-gradient-to-b from-[var(--accent)] via-[#ecd6a5] to-[var(--accent)] shadow-[0_0_12px_rgba(201,169,110,0.6)] relative"
          >
            {/* Glowing Emitter Spark that rides the crest of the timeline line */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  '0 0 8px rgba(230,210,165,0.8)',
                  '0 0 18px rgba(201,169,110,1)',
                  '0 0 8px rgba(230,210,165,0.8)',
                ],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 -left-[3px] w-2 h-2 rounded-full bg-[#FAF8F5] border border-[var(--accent)]"
            />
          </motion.div>
        </div>

        <div className="space-y-28 md:space-y-40">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-10 md:gap-20 group`}
              >
                {/* Center Milestone Bead with Pulsing Halo */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--gold-border)] bg-[var(--bg-primary)] items-center justify-center z-20 shadow-xl group-hover:border-[var(--accent)] transition-colors duration-500">
                  {/* Subtle Expanding Radar Ring */}
                  <motion.div
                    animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.4,
                    }}
                    className="absolute inset-0 rounded-full border border-[var(--accent)]/40 pointer-events-none"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] group-hover:bg-[#f6deb5] group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_var(--accent)]" />
                </div>

                {/* Milestone Image Column */}
                <div className="w-full md:w-1/2">
                  {item.image && (
                    <motion.div
                      whileHover={{ scale: 1.025, y: -4 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative overflow-hidden border border-[var(--gold-border)] shadow-2xl group/card cursor-pointer bg-[#141210]"
                    >
                      {/* Editorial Curtain Mask that reveals photo */}
                      <motion.div
                        initial={{ y: 0 }}
                        whileInView={{ y: '-100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                        className="absolute inset-0 bg-[#161412] z-10 pointer-events-none"
                      />

                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-80 sm:h-[420px] object-cover filter contrast-[1.05] brightness-[0.93] group-hover/card:scale-108 group-hover/card:brightness-100 transition-all duration-1000 ease-out"
                      />

                      {/* Moving light sheen effect across image on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Inset Heirloom Border */}
                      <div className="absolute inset-3 border border-white/15 pointer-events-none transition-all duration-500 group-hover/card:inset-4" />

                      {/* Location & Year Pill Badge */}
                      <div className="absolute bottom-5 left-5 bg-[#12100e]/90 backdrop-blur-md px-3.5 py-2 border border-[var(--gold-border)] flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#F7F4EE] shadow-lg">
                        <MapPin className="w-3 h-3 text-[var(--accent)]" />
                        <span>{item.location}</span>
                        <span className="text-[var(--accent)]">•</span>
                        <span>{item.year}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Milestone Text Column */}
                <div
                  className={`w-full md:w-1/2 space-y-4 ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                  >
                    <span className="font-cinzel text-5xl sm:text-6xl font-light text-[var(--accent)] block tracking-[0.1em] drop-shadow-sm">
                      {item.year}
                    </span>
                  </motion.div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-normal tracking-wide group-hover:text-[var(--accent-light)] transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base leading-relaxed text-[var(--text-secondary)] max-w-md font-light">
                    {item.caption}
                  </p>

                  <div className={`pt-3 flex items-center gap-2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <Heart className="w-3.5 h-3.5 text-[var(--accent)]/70" />
                    <span className="text-[11px] font-sans tracking-[0.25em] text-[var(--text-muted)] uppercase">
                      Chapter {index + 1} of Our Journey
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
