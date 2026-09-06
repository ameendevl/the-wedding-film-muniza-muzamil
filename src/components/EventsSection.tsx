import React from 'react';
import { motion } from 'framer-motion';
import { WeddingEvent, Guest } from '../types';
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus } from 'lucide-react';

interface EventsSectionProps {
  events: WeddingEvent[];
  guest?: Guest | null;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, guest }) => {
  // If guest is present, filter to their invited events
  const displayedEvents = guest
    ? events.filter((ev) => guest.invitedEvents.includes(ev.id))
    : events;

  // Generate .ics calendar download
  const handleAddToCalendar = (event: WeddingEvent) => {
    const calendarEvent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Wedding Film//EN
BEGIN:VEVENT
SUMMARY:${event.title} - Muniza & Muzamil Wedding
DESCRIPTION:${event.description} \\nDress Code: ${event.dressCode}
LOCATION:${event.venueName}, ${event.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-28 px-6 relative max-w-6xl mx-auto">
      {/* Section Editorial Header */}
      <div className="text-center mb-20 space-y-3">
        <span className="text-[11px] font-sans tracking-[0.35em] text-[var(--accent)] uppercase flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          The Ceremonies & Celebrations
        </span>
        <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl tracking-[0.15em] font-light text-[var(--text-primary)] uppercase">
          WEDDING EVENTS
        </h2>
        {guest && (
          <div className="inline-block bg-[#1a1714] border border-[var(--gold-border)] px-4 py-1.5 mt-2">
            <span className="text-xs font-sans tracking-luxury uppercase text-[var(--accent-light)]">
              Personalized Itinerary for {guest.name}
            </span>
          </div>
        )}
        <div className="w-16 h-[1px] bg-[var(--gold-border)] mx-auto mt-4" />
      </div>

      {/* Editorial Event Panels */}
      <div className="space-y-16">
        {displayedEvents.map((event, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative border border-[var(--gold-border)] bg-[#141210] flex flex-col ${
                isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } overflow-hidden shadow-2xl group`}
            >
              {/* Event Visual Imagery */}
              <div className="w-full lg:w-1/2 relative min-h-[340px] lg:min-h-[460px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 border border-[var(--gold-border)] bg-[#141210]/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-luxury uppercase text-[var(--accent-light)]">
                  Event 0{index + 1}
                </div>
              </div>

              {/* Event Invitation Editorial Details */}
              <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[var(--accent)] block">
                    {event.subtitle}
                  </span>

                  <h3 className="font-cinzel text-3xl sm:text-4xl text-[var(--text-primary)] font-light tracking-[0.12em] uppercase">
                    {event.title}
                  </h3>

                  <p className="font-serif italic text-base text-[var(--text-secondary)] font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Event Schedule & Venue Grid */}
                <div className="space-y-4 pt-4 border-t border-[var(--gold-border)]/50 text-xs sm:text-sm font-sans tracking-wide">
                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[var(--text-primary)] font-medium block">{event.date}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[var(--text-primary)] block">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[var(--text-primary)] font-medium block">{event.venueName}</span>
                      <span className="text-[11px] text-[var(--text-muted)]">{event.address}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--accent)] block mb-1">
                      Dress Code
                    </span>
                    <span className="font-serif italic text-sm text-[var(--text-primary)]">
                      {event.dressCode}
                    </span>
                  </div>
                </div>

                {/* Actions: Google Maps & Add to Calendar */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--gold-border)] bg-[#1e1a16] hover:bg-[#28231d] text-xs font-sans tracking-[0.2em] uppercase text-[#FAF8F5] transition-all duration-300 hover:border-[var(--accent)] cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Take Me There</span>
                  </a>

                  <button
                    onClick={() => handleAddToCalendar(event)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--gold-border)]/60 hover:border-[var(--accent)] text-xs font-sans tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 cursor-pointer"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
