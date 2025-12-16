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