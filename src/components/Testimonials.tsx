import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      "Yeasin Arifin consistently brings strong systems thinking to complex UX problems. He excels at solving challenging interaction scenarios and has deep knowledge of iOS and Android UI guidelines. He stays current with emerging technologies and has successfully led UI/UX teams with confidence and clarity.",
    author: 'Mahfuzur Rahman',
    role: 'CTO, KGS',
  },
  {
    id: 2,
    quote:
      "Yeasin Arifin is a highly skilled UI/UX professional with strong leadership and integrity. He approaches problems analytically, resolves conflicts transparently, and delivers results through collaboration. His attention to detail and commitment to high standards make him an asset to any product team.",
    author: 'Md. Rofiqul Islam',
    role: 'Creative Lead (UI/UX)',
  },
  {
    id: 3,
    quote:
      "Gazi Arifin produces consistently high-quality UI/UX work grounded in best practices and emerging trends. He is a supportive team member with a strong eye for detail and a deep understanding of user-centered design. He is one of the strongest UX designers I have worked with.",
    author: 'Rafat Ahmed',
    role: 'Senior Software Engineer',
  },
  {
    id: 4,
    quote:
      "Gazi brings a research-driven approach to designing AI-powered user experiences. He treats AI agents as end-to-end systems, ensuring usability, scalability, and long-term product value. His leadership fosters critical thinking and high design standards across teams.",
    author: 'Tanvir Hossain',
    role: 'Head of Product',
  },
  {
    id: 5,
    quote:
      "Gazi Arifin excels at designing intuitive AI-driven experiences grounded in research and user insights. He understands both the capabilities and limitations of AI, enabling responsible and effective design decisions. As a leader, he is thoughtful, reliable, and focused on impact.",
    author: 'Nusrat Jahan',
    role: 'Product Manager',
  },
  {
    id: 6,
    quote:
      "Arifin leads the design of AI agent experiences with a strong emphasis on research, validation, and iteration. He aligns advanced technology with real user needs and mentors teams to deliver practical, high-quality solutions. He is well-suited for complex, large-scale product environments.",
    author: 'Shahriar Kabir',
    role: 'Engineering Manager',
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
      <div className="container mb-16">
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
              className="flex-shrink-0 w-[216px] sm:w-[248px] md:w-[280px] rounded-card border border-surface-card-border bg-surface-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg will-change-transform"
            >
              <blockquote className="mb-4 sm:mb-5 font-display text-xs sm:text-sm md:text-base italic leading-relaxed text-foreground/90">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-sm bg-secondary flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">{testimonial.author}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</p>
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
