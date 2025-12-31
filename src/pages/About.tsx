import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Intro Section */}
        <section className="pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-28 md:pb-36">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8 sm:mb-10 md:mb-12 leading-[1.1] tracking-tight animate-fade-up opacity-0">
                Designing With Intent, Not Ego
              </h1>
              
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-up opacity-0 delay-200">
                <p>
                  I'm a Product & Interaction Designer with over a decade of experience building digital products people actually use. My work spans iOS applications, SaaS platforms, and AI-driven systems — products that have reached hundreds of thousands of users across different industries and contexts.
                </p>
                
                <p>
                  The early years of my career were about mastering craft: learning to push pixels, understanding interaction patterns, building fluency with tools and techniques. That foundation mattered. But over time, my focus shifted. I became more interested in <span className="text-foreground">decision-making</span>, in <span className="text-foreground">systems thinking</span>, in understanding how design choices ripple through organizations and affect business outcomes.
                </p>
                
                <p>
                  Today, I think less about what I can produce and more about what I can enable. Tools evolve constantly — they always have, and they always will. But <span className="text-foreground">judgment</span>, <span className="text-foreground">empathy</span>, and <span className="text-foreground">clarity</span> remain the most valuable skills a designer can develop. Those don't become obsolete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Philosophy Section */}
        <section className="py-20 sm:py-28 md:py-36 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-10 sm:mb-12 md:mb-16 tracking-tight">
                How I Think About Design
              </h2>
              
              <div className="space-y-12 sm:space-y-16">
                {/* Principle 1 */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                    Outcomes over artifacts
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I've learned to measure my work by what changed in the product, not by what was produced during the process. Wireframes, prototypes, and documentation are means to an end — they're not the end itself. The question I ask most often isn't "what did we make?" but "what's different now, and does it matter?"
                  </p>
                </div>

                {/* Principle 2 */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                    Clarity, not control
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    Senior designers don't choreograph experiences — they reduce complexity. The best work I've done has made decisions easier for teams, not harder. That means creating clear frameworks, establishing shared language, and enabling others to move forward without waiting for approval. The goal is to make the right path obvious, not to control every step along it.
                  </p>
                </div>

                {/* Principle 3 */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg sm:text-xl font-medium text-foreground">
                    AI as accelerator, not replacement
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I use AI tools extensively — for synthesis, exploration, and iteration. They help me move faster and consider more possibilities. But I treat them as accelerators, never as substitutes for human judgment, responsibility, or ethical decision-making. The hard parts of design — understanding context, making tradeoffs, taking ownership of outcomes — still require a human at the center.
                  </p>
                </div>
              </div>

              <p className="mt-12 sm:mt-16 text-base sm:text-lg leading-relaxed text-muted-foreground border-l-2 border-foreground/20 pl-6">
                These aren't theoretical opinions. They're lessons I've absorbed through years of real product work — through projects that succeeded, projects that failed, and everything in between.
              </p>
            </div>
          </div>
        </section>

        {/* UX Process Section */}
        <section className="relative">
          <div className="container px-4 sm:px-6 py-16 sm:py-20 md:py-24">
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground italic">
              "Over the years, my process evolved — not into something rigid, but into something adaptable."
            </p>
          </div>
          <Process />
        </section>

        {/* Closing Section */}
        <section className="py-20 sm:py-28 md:py-36">
          <div className="container px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  I'm drawn to <span className="text-foreground">complex systems</span> and <span className="text-foreground">ambiguous challenges</span> — the kind of problems where there's no obvious answer, where design decisions have real consequences, and where getting it right requires genuine understanding rather than pattern matching.
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
