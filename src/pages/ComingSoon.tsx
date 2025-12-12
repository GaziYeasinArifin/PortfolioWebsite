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
      
      <main className="flex-1 flex items-center justify-center pt-20 pb-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Coming soon text */}
            <div className="mb-8">
              <span className="inline-block text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase mb-6">
                case study
              </span>
              <h1 className="font-display font-medium leading-[1.1] tracking-tight text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                coming soon
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                this case study is currently being crafted. check back soon for the full story.
              </p>
            </div>

            {/* Animated dots */}
            <div className="flex items-center justify-center gap-2 mb-12">
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>

            {/* Back link */}
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              back to work
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
