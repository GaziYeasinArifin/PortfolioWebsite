import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

const ComingSoon = () => {
  useEffect(() => {
    document.title = 'Coming Soon | Gazi Arifin';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="flex items-center justify-center min-h-[70vh]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              case study coming soon
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              this project is currently being documented. check back soon for the full case study.
            </p>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              back to all projects
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
