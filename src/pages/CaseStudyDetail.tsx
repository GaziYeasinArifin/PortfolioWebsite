import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import caseStudy1 from '@/assets/case-study-1.jpg';

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
            back to work
          </Link>

          {/* Hero section */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>web design</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>2023</span>
            </div>
            <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
              e-commerce platform
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              seamless shopping experience for modern retailers — reimagining how users discover, explore, and purchase products online.
            </p>
          </div>

          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary mb-16 md:mb-24">
            <img
              src={caseStudy1}
              alt="E-commerce Platform"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Project overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 md:mb-24">
            <div className="space-y-2">
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">role</h3>
              <p className="font-display text-lg">lead product designer</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">timeline</h3>
              <p className="font-display text-lg">8 weeks</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">team</h3>
              <p className="font-display text-lg">3 designers, 5 engineers</p>
            </div>
          </div>

          {/* Content sections */}
          <div className="max-w-3xl space-y-16 md:space-y-24">
            {/* Challenge */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">the challenge</h2>
              <p className="text-muted-foreground leading-relaxed">
                modern e-commerce platforms often overwhelm users with options, leading to decision fatigue and abandoned carts. our challenge was to create an experience that guides users naturally through their shopping journey while maintaining the excitement of discovery.
              </p>
            </section>

            {/* Approach */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">the approach</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                we started with extensive user research, conducting interviews with 50+ shoppers to understand their pain points and desires. key insights emerged around the importance of visual hierarchy, personalized recommendations, and frictionless checkout.
              </p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary">
                <img
                  src={caseStudy1}
                  alt="Design process"
                  className="h-full w-full object-cover"
                />
              </div>
            </section>

            {/* Solution */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">the solution</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                the final design features a clean, minimal interface that puts products center stage. ai-powered recommendations adapt to user behavior in real-time, while a streamlined checkout process reduced cart abandonment by 40%.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary">
                  <img
                    src={caseStudy1}
                    alt="Final design"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="font-display text-2xl md:text-3xl font-medium mb-8">the results</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-display text-4xl md:text-5xl font-medium mb-2">40%</p>
                  <p className="text-sm text-muted-foreground">reduction in cart abandonment</p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl font-medium mb-2">2.5x</p>
                  <p className="text-sm text-muted-foreground">increase in conversion rate</p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl font-medium mb-2">85%</p>
                  <p className="text-sm text-muted-foreground">user satisfaction score</p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl font-medium mb-2">$2M+</p>
                  <p className="text-sm text-muted-foreground">additional revenue generated</p>
                </div>
              </div>
            </section>
          </div>

          {/* Next project */}
          <div className="mt-24 md:mt-32 pt-16 border-t border-border">
            <Link 
              to="/#case-studies" 
              className="group flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-2">next project</p>
                <h3 className="font-display text-2xl md:text-3xl font-medium">fintech mobile app</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-border transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                <ArrowUpRight className="h-5 w-5 transition-all duration-300 group-hover:text-background group-hover:rotate-45" />
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
