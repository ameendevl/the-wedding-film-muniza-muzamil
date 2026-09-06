import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Car, Sparkles, Navigation } from 'lucide-react';
import { WeddingData } from '../types';

interface WeddingDayScheduleProps {
  wedding: WeddingData;
}

export const WeddingDaySchedule: React.FC<WeddingDayScheduleProps> = ({ wedding }) => {
  const currentHour = new Date().getHours();

  const scheduleItems = [
    { time: '5:00 PM', title: 'Guest Arrival & Rose Petal Welcome', location: 'Grand Courtyard', hour: 17 },
    { time: '6:15 PM', title: 'Baraat Procession & Dhol Beats', location: 'Palace Royal Gate', hour: 18 },
    { time: '7:30 PM', title: 'Sacred Nikkah Ceremony & Dua', location: 'Chandelier Pavilion', hour: 19 },
    { time: '9:00 PM', title: 'Royal Mughlai Banquet Dinner', location: 'Crystal Banquet Hall', hour: 21 },
    { time: '10:45 PM', title: 'Rukhsati (Tearful Farewell & Blessings)', location: 'Marble Portico', hour: 22 },
  ];

  return (
    <section className="py-20 px-6 relative max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-2 border-[var(--accent)] bg-[#171412] p-8 sm:p-12 shadow-2xl space-y-10"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#25201a] border border-[var(--gold-border)] text-[10px] font-sans tracking-luxury uppercase text-[var(--accent-light)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Day-of Concierge
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl text-[#FAF8F5] tracking-[0.15em] uppercase font-light">
            TODAY'S CEREMONY SCHEDULE
          </h2>

          <p className="font-serif italic text-base text-[var(--text-secondary)]">
            Real-time itinerary for {wedding.weddingDisplayDate}
          </p>
        </div>

        {/* Schedule timeline */}
        <div className="space-y-6 max-w-xl mx-auto">
          {scheduleItems.map((item, index) => {
            const isCurrent = currentHour >= item.hour && currentHour < (scheduleItems[index + 1]?.hour || 24);

            return (
              <div
                key={item.time}
                className={`p-4 border transition-all flex items-start justify-between gap-4 ${
                  isCurrent
                    ? 'border-[var(--accent)] bg-[#211d18] shadow-lg'
                    : 'border-white/5 bg-[#141210]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-sm text-[var(--accent-light)] tracking-wide">
                      {item.time}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 text-[8px] tracking-widest uppercase bg-emerald-950 border border-emerald-700 text-emerald-300">
                        Happening Soon / Now
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-lg text-[#FAF8F5] font-light">{item.title}</h4>
                  <span className="text-[11px] text-[var(--text-muted)] font-sans flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--accent)]" />
                    {item.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Day-of Concierge & Valet info */}
        <div className="pt-6 border-t border-[var(--gold-border)]/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 bg-[#141210] border border-white/5 space-y-1">
            <span className="text-[10px] tracking-widest uppercase text-[var(--accent)] flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              Complimentary Valet Parking
            </span>
            <p className="text-[var(--text-secondary)]">
              Drop your vehicle at the West Portico entrance. Attendants will assist you.
            </p>
          </div>

          <div className="p-4 bg-[#141210] border border-white/5 space-y-1">
            <span className="text-[10px] tracking-widest uppercase text-[var(--accent)] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Family Concierge Contact
            </span>
            <p className="text-[var(--text-secondary)]">
              For immediate directions or assistance: +92 300 8472910 (Hassan)
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
