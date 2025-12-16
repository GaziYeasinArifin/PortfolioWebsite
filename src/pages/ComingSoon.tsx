import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display font-medium leading-[1.1] tracking-tight text-[48px] sm:text-[56px] md:text-[64px] mb-6">
                evolving the mobile editor
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                how we iterated from a cluttered utility to a top-charting creative tool through deep research and developer collaboration.
              </p>
              <p className="text-sm text-muted-foreground/70 tracking-wide">
                iterative cycle: 2016-2023 • role: lead ux designer
              </p>
            </div>
            
            {/* Process Banner Placeholder */}
            <div className="mt-12 md:mt-16">
              <div className="aspect-[21/9] bg-muted rounded flex items-center justify-center border border-border">
                <p className="text-sm text-muted-foreground text-center px-8">
                  [INSERT: a visual flow showing sketch → wireframe → final ui evolving left to right]
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Iteration 0: The Baseline */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div>
                <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                  the hypothesis
                </span>
                <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                  iteration 0: the baseline (2016)
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  we started with a functional but rigid app. user testing revealed that while the code worked, the "feeling" was wrong. users couldn't "feel" the beat when editing.
                </p>
                <div className="p-6 bg-muted/50 border-l-2 border-foreground">
                  <p className="text-foreground font-medium">
                    hypothesis: if we visualize audio structure like a dj deck, users will edit more intuitively.
                  </p>
                </div>
              </div>
              
              {/* Right: Placeholder */}
              <div>
                <div className="aspect-[9/16] max-w-xs mx-auto lg:mx-0 lg:ml-auto bg-muted rounded flex items-center justify-center border border-border">
                  <p className="text-sm text-muted-foreground text-center px-6">
                    [INSERT: the original 2016 "cluttered" interface]
                  </p>
                </div>
                <p className="text-xs text-muted-foreground text-center lg:text-right mt-4 max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                  the starting point: functional but friction-heavy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Iteration 1: The Logic Layer */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            {/* Step Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-medium">
                1
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Text Content */}
              <div>
                <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                  low-fidelity iteration
                </span>
                <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                  iteration 1: defining the logic
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  before touching pixels, I iterated on the rules.
                </p>
                <p className="text-muted-foreground text-lg">
                  I analyzed movie transitions and dj beat-matching to create a "transition grammar." I sketched these logic flows on paper to stress-test them with the cto before a single line of code was written.
                </p>
              </div>
              
              {/* Right: Placeholder */}
              <div>
                <div className="aspect-square bg-muted rounded flex items-center justify-center border border-border">
                  <p className="text-sm text-muted-foreground text-center px-6">
                    [INSERT: scanned images of handwritten logic/paper sketches]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Iteration 2: The Motion Layer */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            {/* Step Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-medium">
                2
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Placeholder */}
              <div>
                <div className="aspect-video bg-muted rounded flex items-center justify-center border border-border">
                  <p className="text-sm text-muted-foreground text-center px-6">
                    [INSERT: after effects timeline or gif placeholder of motion prototype]
                  </p>
                </div>
              </div>
              
              {/* Right: Text Content */}
              <div>
                <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                  mid-fidelity iteration
                </span>
                <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                  iteration 2: prototyping motion
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  static wireframes couldn't capture the timing of a video transition.
                </p>
                <p className="text-muted-foreground text-lg">
                  I moved to after effects to prototype the "physics" of the app. we iterated on the speed of the "slide" and the snap of the "cut" until it felt organic. this animation became the "spec" for developers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Iteration 3: The Refinement Loop */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                the dev loop
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                iteration 3: the developer sync
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                the most critical iteration happened in code.
              </p>
              <p className="text-muted-foreground text-lg">
                I sat with developers to review the build. we found glitches where the code didn't match the design physics. we iterated pixel-by-pixel, adjusting easing curves and touch targets until the live app matched the after effects prototype perfectly.
              </p>
            </div>
            
            {/* Wide Placeholder */}
            <div className="aspect-[21/9] bg-muted rounded flex items-center justify-center border border-border mb-8">
              <p className="text-sm text-muted-foreground text-center px-8">
                [INSERT: photo of "over-the-shoulder" collaboration with dev or redline document]
              </p>
            </div>
            
            {/* Quote */}
            <p className="text-center text-lg md:text-xl font-medium text-foreground italic">
              "the design isn't done until it feels right in code."
            </p>
          </div>
        </section>

        {/* The Final Polish */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                high-fidelity
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                the final state: a tactile interface
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                after 3 major iterative cycles, we launched the "dark mode" editor.
              </p>
              <p className="text-muted-foreground text-lg">
                the timeline was no longer just a bar—it was a touchable surface. the result was an experience that felt "expensive" and professional, leading to immediate chart success.
              </p>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-6 min-w-max">
                <div className="w-48">
                  <div className="aspect-[9/16] bg-muted rounded flex items-center justify-center border border-border">
                    <p className="text-xs text-muted-foreground text-center px-4">
                      [INSERT: final music picker]
                    </p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="aspect-[9/16] bg-muted rounded flex items-center justify-center border border-border">
                    <p className="text-xs text-muted-foreground text-center px-4">
                      [INSERT: final timeline editor]
                    </p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="aspect-[9/16] bg-muted rounded flex items-center justify-center border border-border">
                    <p className="text-xs text-muted-foreground text-center px-4">
                      [INSERT: final export screen]
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Label */}
            <p className="text-xs text-muted-foreground text-center mt-6 tracking-wide">
              shipped version 2017-2023
            </p>
          </div>
        </section>

        {/* Results / Impact */}
        <section className="py-16 md:py-24 border-t border-border">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl mb-6">
                the impact of iteration
              </h2>
              <p className="text-muted-foreground text-lg">
                by slowing down to iterate on logic and motion, we sped up adoption.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
              <div className="text-center">
                <p className="font-display font-medium text-5xl md:text-6xl lg:text-7xl mb-2">7+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">years on top charts</p>
              </div>
              <div className="text-center">
                <p className="font-display font-medium text-5xl md:text-6xl lg:text-7xl mb-2">22</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">team grew from 4</p>
              </div>
              <div className="text-center">
                <p className="font-display font-medium text-5xl md:text-6xl lg:text-7xl mb-2">16+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">projects expanded</p>
              </div>
            </div>
            
            {/* Full-width Placeholder */}
            <div className="aspect-[21/9] bg-muted rounded flex items-center justify-center border border-border">
              <p className="text-sm text-muted-foreground text-center px-8">
                [INSERT: growth graph or app store review snippets]
              </p>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-12 border-t border-border">
          <div className="container">
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              back to work
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;