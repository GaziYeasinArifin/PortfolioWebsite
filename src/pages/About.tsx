import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';
import { Link } from 'react-router-dom';
import aboutImg1 from '@/assets/about-1.png';
import aboutVideo from '@/assets/about-2.mov';
import aboutImg3 from '@/assets/about-3.webp';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Intro Section */}
        <section className="pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-28 md:pb-36">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Text Content */}
              <div className="lg:col-span-7">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8 sm:mb-10 md:mb-12 leading-[1.1] tracking-tight animate-fade-up opacity-0">
                  Designing With Intent, Not Ego
                </h1>
                
                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-up opacity-0 delay-200">
                  <p>
                    I'm a Product & Interaction Designer with over a decade of experience building digital products people actually use. My work spans iOS applications, SaaS platforms, and AI-driven systems, products that have reached hundreds of thousands of users across different industries and contexts.
                  </p>
                  
                  <p>
                    The early years of my career were about mastering craft: learning to push pixels, understanding interaction patterns, building fluency with tools and techniques. That foundation mattered. But over time, my focus shifted. I became more interested in <span className="text-foreground">decision-making</span>, in <span className="text-foreground">systems thinking</span>, in understanding how design choices ripple through organizations and affect business outcomes.
                  </p>
                  
                  <p>
                    Today, I think less about what I can produce and more about what I can enable. Tools evolve constantly, they always have, and they always will. But <span className="text-foreground">judgment</span>, <span className="text-foreground">empathy</span>, and <span className="text-foreground">clarity</span> remain the most valuable skills a designer can develop. Those don't become obsolete.
                  </p>
                </div>
              </div>
              
              {/* Visual Element */}
              <div className="lg:col-span-5 relative animate-fade-up opacity-0 delay-300">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted/50">
                  <img 
                    src={aboutImg1} 
                    alt="Gazi Arifin at Big Sur" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-foreground/10 rounded-xl -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-foreground/5 rounded-full -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy Section */}
        <section className="py-20 sm:py-28 md:py-36 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left Column - Image */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="sticky top-32">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/50 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                    <video 
                      src={aboutVideo} 
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Pull quote */}
                  <div className="mt-8 p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 rotate-[1deg]">
                    <p className="text-sm sm:text-base italic text-muted-foreground leading-relaxed">
                      "The question I ask most often isn't 'what did we make?' but 'what's different now?'"
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Content */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-10 sm:mb-12 md:mb-16 tracking-tight">
                  How I Think About Design
                </h2>
                
                <div className="space-y-12 sm:space-y-16">
                  {/* Principle 1 */}
                  <div className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-sm font-medium text-foreground/60 group-hover:bg-foreground/10 transition-colors">
                        01
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                        Outcomes over artifacts
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground pl-12">
                      I've learned to measure my work by what changed in the product, not by what was produced during the process. Wireframes, prototypes, and documentation are means to an end, they're not the end itself.
                    </p>
                  </div>

                  {/* Principle 2 */}
                  <div className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-sm font-medium text-foreground/60 group-hover:bg-foreground/10 transition-colors">
                        02
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                        Clarity, not control
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground pl-12">
                      Senior designers don't choreograph experiences, they reduce complexity. The best work I've done has made decisions easier for teams, not harder. The goal is to make the right path obvious, not to control every step along it.
                    </p>
                  </div>

                  {/* Principle 3 */}
                  <div className="space-y-4 group">
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-sm font-medium text-foreground/60 group-hover:bg-foreground/10 transition-colors">
                        03
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                        AI as accelerator, not replacement
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground pl-12">
                      I use AI tools extensively, for synthesis, exploration, and iteration. They help me move faster and consider more possibilities. But I treat them as accelerators, never as substitutes for human judgment, responsibility, or ethical decision-making.
                    </p>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 p-6 bg-background/50 rounded-xl border-l-2 border-foreground/20">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    These aren't theoretical opinions. They're lessons I've absorbed through years of real product work, through projects that succeeded, projects that failed, and everything in between.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UX Process Section */}
        <section className="relative">
          <div className="container px-4 sm:px-6 py-16 sm:py-20 md:py-24">
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground italic">
              "Over the years, my process evolved, not into something rigid, but into something adaptable."
            </p>
          </div>
          <Process />
        </section>

        {/* Closing Section */}
        <section className="py-20 sm:py-28 md:py-36">
          <div className="container px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted/50">
                    <img 
                      src={aboutImg3} 
                      alt="Design system components" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating card */}
                  <div className="absolute -bottom-6 -right-6 bg-background border border-border/50 rounded-xl p-4 shadow-lg max-w-[200px]">
                    <p className="text-xs text-muted-foreground">Currently interested in</p>
                    <p className="text-sm font-medium text-foreground mt-1">Complex systems & AI-driven products</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I'm drawn to <span className="text-foreground">complex systems</span> and <span className="text-foreground">ambiguous challenges</span>, the kind of problems where there's no obvious answer, where design decisions have real consequences, and where getting it right requires genuine understanding rather than pattern matching.
                  </p>
                  
                  <p>
                    The teams I work best with are <span className="text-foreground">curious</span>, <span className="text-foreground">honest</span>, and <span className="text-foreground">outcome-focused</span>. They respect craft, but they also respect constraints. They're interested in what's true, not just what sounds good. And they understand that thoughtful collaboration produces better work than performative design or surface-level polish.
                  </p>
                  
                  <p>
                    I prefer depth over breadth, substance over style, and partnership over transaction.
                  </p>
                </div>

                <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    If this resonates, feel free to{' '}
                    <Link 
                      to="/#case-studies" 
                      className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      explore my case studies
                    </Link>
                    {' '}or{' '}
                    <a 
                      href="mailto:arifin.yeasin@gmail.com" 
                      className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      reach out
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
