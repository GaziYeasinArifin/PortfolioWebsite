import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      "Working with this designer transformed our product. The attention to detail and user-centric approach resulted in a 40% increase in engagement.",
    author: 'Sarah Chen',
    role: 'CEO, TechStart',
  },
  {
    id: 2,
    quote:
      "An exceptional collaborator who truly understands how to balance business goals with user needs. Our conversion rate doubled.",
    author: 'Marcus Johnson',
    role: 'Head of Product, FinanceApp',
  },
  {
    id: 3,
    quote:
      "The design system delivered was not just beautiful but incredibly scalable. It's been the foundation of our product for three years.",
    author: 'Elena Rodriguez',
    role: 'CTO, DataViz Inc',
  },
  {
    id: 4,
    quote:
      "A rare talent who combines strategic thinking with flawless execution. Every interaction was thoughtful and purposeful.",
    author: 'David Park',
    role: 'Founder, StartupXYZ',
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(30);

  useEffect(() => {
    // Adjust animation speed based on content width
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const contentWidth = scrollContainer.scrollWidth / 2;
      const duration = contentWidth / 50; // pixels per second
      setAnimationDuration(Math.max(20, duration));
    }
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mb-12 md:mb-16">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            testimonials
          </p>
          <h2 className="max-w-2xl font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">
            Satisfaction isn't one-sided. It's about building solutions that{' '}
            <span className="text-accent">truly work</span> for all.
          </h2>
        </div>
      </div>

      {/* Horizontal auto-scrolling testimonials */}
      <div className="relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 animate-marquee"
          style={{ 
            animationDuration: `${animationDuration}s`,
            width: 'max-content'
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] rounded-[4px] border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-lg will-change-transform"
            >
              <blockquote className="mb-6 sm:mb-8 font-display text-sm sm:text-base md:text-lg italic leading-relaxed text-foreground/90">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-[4px] bg-secondary flex items-center justify-center">
                  <span className="text-sm sm:text-base font-medium text-muted-foreground">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium">{testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
