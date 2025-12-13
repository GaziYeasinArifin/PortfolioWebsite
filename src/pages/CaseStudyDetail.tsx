import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Cpu, Figma, Lightbulb, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import phantomFootprintHero from '@/assets/phantom-footprint-hero.png';

const CaseStudyDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Back link */}
          <Link 
            to="/#case-studies" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-12 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to work
          </Link>

          {/* Hero section - The Hook */}
          <div className="mb-16 md:mb-24">
            <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6 uppercase">
              phantom footprint: closing the climate feedback loop
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              Challenge: Making climate consequences tangible for college students.<br />
              Solution: An IoT-enhanced, physical board game.
            </p>
            
            {/* Role & Tools */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Lead UX Designer, Researcher, Prototyper</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                <span>Design Thinking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span>Arduino Uno, RFID</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Figma className="h-4 w-4 text-muted-foreground" />
                <span>Figma</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">4 Months (Thesis Project)</p>
          </div>

          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary mb-24 md:mb-32">
            <img 
              src={phantomFootprintHero} 
              alt="Phantom Footprint - IoT-enhanced board game for climate education" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Chapter I: The Problem */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Problem</h2>
            </div>

            {/* The Status Quo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Overwhelmed User.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Climate education is inaccessible, abstract, and doesn't connect daily actions to global outcomes. Users feel disconnected from the consequences of their choices.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center px-4">image 1: research & card sort session</p>
              </div>
            </div>

            {/* Defining the User */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center order-2 lg:order-1">
                <p className="text-muted-foreground text-sm text-center px-4">image 2: persona/user insight graphic</p>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The College Student Archetype: Wanting Impact, Lacking Tools.</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  They are digitally engaged but feel passive about climate change.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>Passive learner vs. socially active advocate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>Need immediate, tangible feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    <span>Desire for meaningful action</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* The Gap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Opportunity: Interactivity {">"} Simulation.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Existing tools (calculators, digital apps) lack the hands-on, immediate, emotional connection required for behavioral change.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-[4px] bg-muted-foreground/20 flex items-center justify-center mb-2">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Boring screen</p>
                  </div>
                  <span className="text-muted-foreground">vs</span>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-[4px] bg-foreground/10 flex items-center justify-center mb-2">
                      <span className="text-2xl">🎲</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Tactile game</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter II: The Climax */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Climax</h2>
            </div>

            {/* Ideation & Sketch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">From Paper Prototype to Tangible Mechanic.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rapid prototyping phase using Double Diamond methodology. The game mechanic is built around choice cards representing daily actions with environmental consequences.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center px-4">image 3: initial paper prototype & game layout</p>
              </div>
            </div>

            {/* The Tech Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center order-2 lg:order-1">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm px-4 mb-4">image 4: arduino/led breadboard circuit</p>
                  <div className="flex justify-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Red/Yellow/Green LED system</p>
                </div>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Mapping Action to Immediate Feedback (Arduino + RFID).</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The core innovation: using RFID to scan a choice card and trigger an LED status light (red/yellow/green) via Arduino. This closes the feedback loop instantly, connecting user actions to environmental consequences.
                </p>
              </div>
            </div>

            {/* Building the System */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">From Wiring to Final Assembly.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Showcasing the hands-on nature of full-stack design thinking: digital UX combined with physical product development. Soldering, wiring, and final assembly of the board and sensor mechanism.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center px-4">video/gif 1: soldering, wiring & assembly demo</p>
              </div>
            </div>

            {/* Iteration Loop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center order-2 lg:order-1">
                <div className="text-center px-4">
                  <p className="text-muted-foreground text-sm mb-4">a/b test comparison</p>
                  <div className="flex gap-4 justify-center">
                    <div className="bg-background/50 p-3 rounded-[4px]">
                      <p className="text-xs font-medium mb-1">v1</p>
                      <div className="w-3 h-3 rounded-full bg-green-500 mx-auto" />
                      <p className="text-xs text-muted-foreground mt-1">positive only</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-[4px]">
                      <p className="text-xs font-medium mb-1">v2</p>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto" />
                      <p className="text-xs text-muted-foreground mt-1">nuanced</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Testing Ambiguity. Improving Nuance.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Key finding from usability testing: players craved nuance over simple positive/negative feedback. Iteration added a medium impact category (yellow LED) to better reflect real-world complexity.
                </p>
              </div>
            </div>
          </section>

          {/* Chapter III: The Resolution */}
          <section className="mb-24 md:mb-32">
            <div className="mb-12">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Resolution</h2>
            </div>

            {/* The Impact */}
            <div className="mb-16">
              <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-6">Bridging the Gap. 90% Engagement.</h3>
              <div className="bg-secondary rounded-[4px] p-8 md:p-12">
                <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
                  "The LED system helped players connect their choices to tangible results."
                </blockquote>
                <p className="text-center text-muted-foreground mt-4">— User Testing Feedback</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                Immediate feedback led to deeper reflection. Players connected choices to consequences, creating meaningful behavioral awareness.
              </p>
            </div>

            {/* What I Learned */}
            <div className="mb-16 text-center py-12">
              <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-8">Simplicity, Iteration, and the Power of Physical UX.</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div>
                  <p className="font-display text-lg font-medium mb-2">Simplicity Matters</p>
                  <p className="text-sm text-muted-foreground">Clear feedback over complex systems</p>
                </div>
                <div>
                  <p className="font-display text-lg font-medium mb-2">Iterative Design is Key</p>
                  <p className="text-sm text-muted-foreground">Testing revealed nuance requirements</p>
                </div>
                <div>
                  <p className="font-display text-lg font-medium mb-2">Immediate Feedback is Crucial</p>
                  <p className="text-sm text-muted-foreground">Closing the action-consequence loop</p>
                </div>
              </div>
            </div>

            {/* Looking Forward */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Scope: From Campus Game to Global Platform.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Future vision includes expanding to younger audiences, gamifying the concept further into a digital companion app, and creating scalable educational tools for climate awareness.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center px-4">image 7: future vision / digital companion app mock-up</p>
              </div>
            </div>
          </section>

          {/* Next project */}
          <div className="pt-16 border-t border-border">
            <Link 
              to="/#case-studies" 
              className="group flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-2">Next Project</p>
                <h3 className="font-display text-2xl md:text-3xl font-medium">Explore More Work</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-border transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                <ArrowLeft className="h-5 w-5 rotate-180 transition-all duration-300 group-hover:text-background" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
