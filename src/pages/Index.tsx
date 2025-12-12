import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import CaseStudies from '@/components/CaseStudies';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import Articles from '@/components/Articles';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <CaseStudies />
        <Process />
        <Stats />
        <Articles />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
