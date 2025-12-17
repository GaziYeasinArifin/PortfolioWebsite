import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import personaClaire from '@/assets/screenlife-persona-claire.webp';
import personaSarah from '@/assets/screenlife-persona-sarah.webp';
import screenlifeWireframes from '@/assets/screenlife-wireframes.png';
import screenlifeHero from '@/assets/screenlife-hero.png';
import screenlifeSearchUi from '@/assets/screenlife-search-ui.webp';
import screenlifePlayerMinimized from '@/assets/screenlife-player-minimized.gif';
import screenlifeOnboarding from '@/assets/screenlife-onboarding-v2.gif';
import screenlifePlaylist from '@/assets/screenlife-playlist.gif';
import screenlifeUxFlows from '@/assets/screenlife-ux-flows.webp';
import screenlifeAuthorization from '@/assets/screenlife-authorization.png';
import screenlifeInteract from '@/assets/screenlife-interact.png';
import screenlifeCreateContent from '@/assets/screenlife-create-content.png';
import screenlifeProfile from '@/assets/screenlife-profile.png';
import screenlifeSearchDiscover from '@/assets/screenlife-search-discover.png';
import screenlifeAndroidUi from '@/assets/screenlife-android-ui.png';
import screenlifeDesignReviewBefore from '@/assets/screenlife-design-review-before.png';
import screenlifeDesignReviewAfter from '@/assets/screenlife-design-review-after.png';
import screenlifeRut1 from '@/assets/screenlife-rut-1.webp';
import screenlifeRut2 from '@/assets/screenlife-rut-2.webp';
import screenlifeRut3 from '@/assets/screenlife-rut-3.webp';
import screenlifeRutCards1 from '@/assets/screenlife-rut-cards-1.webp';
import screenlifeRutCards2 from '@/assets/screenlife-rut-cards-2.webp';
import screenlifeRutCards3 from '@/assets/screenlife-rut-cards-3.webp';
import screenlifeRemoteUsabilityTests from '@/assets/screenlife-remote-usability-tests.png';
import screenlifePermission1 from '@/assets/screenlife-permission-1.webp';
import screenlifePermission2 from '@/assets/screenlife-permission-2.webp';
import screenlifePermission3 from '@/assets/screenlife-permission-3.webp';
import screenlifeSigninBarrier from '@/assets/screenlife-signin-barrier.webp';
import screenlifeFiltering from '@/assets/screenlife-filtering.webp';
import screenlifeHashtagInput from '@/assets/screenlife-hashtag-input.webp';
import screenlifeV2Tabs from '@/assets/screenlife-v2-tabs.webp';
import screenlifeV2Social from '@/assets/screenlife-v2-social.webp';
import screenlifeV2BeforeAfter from '@/assets/screenlife-v2-before-after.webp';
// Custom hook for scroll-triggered animations
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Animated section wrapper component
const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Placeholder image component
const PlaceholderImage = ({ label, aspectRatio = '4/3', className = '' }: { label: string; aspectRatio?: string; className?: string }) => (
  <div 
    className={`relative w-full overflow-hidden rounded-[4px] bg-secondary group ${className}`}
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
      <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed">{label}</p>
    </div>
  </div>
);

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Back link */}
          <AnimatedSection>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="mb-16 md:mb-24">
              <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
                <span className="uppercase text-foreground">Iterative Design Process</span>
                <br />
                <span className="lowercase text-muted-foreground">designing the first mobile interactive video recorder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mb-8 leading-relaxed">
                Screenlife stands out from the competition because it saves recordings as interactive video files. When a user watches a Screenlife video, all links and buttons inside the recording remain <span className="text-foreground font-medium">clickable and active.</span>
              </p>
              
              {/* Role & Platform */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>UI/UX Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>iOS & Android</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero image */}
          <AnimatedSection delay={200}>
            <div className="relative w-full overflow-hidden rounded-[4px] group mb-24 md:mb-32">
              <img 
                src={screenlifeHero} 
                alt="Screenlife mobile app interface showcasing interactive video features" 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </AnimatedSection>

          {/* Chapter I: Context */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Context</h2>
              </div>
            </AnimatedSection>

            {/* The Background */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Background.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The product started as a Chrome extension. Stakeholders needed a mobile app to build a community and expand the user base beyond desktop users.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Challenge.</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Keep features simple despite complex recording technology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Move fast (startup speed) while maintaining quality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Adapt a comprehensive web platform to mobile screens</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter II: Research & Constraints */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Research & Constraints</h2>
              </div>
            </AnimatedSection>

            {/* Initial Research */}
            <AnimatedSection>
              <div className="space-y-8 mb-16">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    Initial research included <span className="text-foreground font-medium">competitive analysis</span>, review of Screenlife products, stakeholder interviews, and documenting all UX flows.
                  </p>
                </div>
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={screenlifeUxFlows} 
                    alt="UX flows documentation showing commenting flows on the Screenlife website" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Personas */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    Lacking access to real users initially, I created <span className="text-foreground font-medium">provisional personas</span> based on stakeholder interviews to guide the early design.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full overflow-hidden rounded-[4px] group">
                    <img 
                      src={personaClaire} 
                      alt="Provisional Persona: Claire - 25 year old blogger" 
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="relative w-full overflow-hidden rounded-[4px] group">
                    <img 
                      src={personaSarah} 
                      alt="Provisional Persona: Sarah - 23 year old student" 
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter III: Ideation */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Ideation</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    We used <span className="text-foreground font-medium">paper prototypes</span> to adapt web flows to mobile. This allowed developers to spot technical limitations before code was written. Low-fi prototypes allowed us to find the right ideas quickly.
                  </p>
                </div>
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={screenlifeWireframes} 
                    alt="Hand-drawn paper prototypes showing mobile app wireframes" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter IV: High-Fidelity Mockups */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iv</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">High-Fidelity Mockups and Animations</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Onboarding</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Moving to high-fidelity, we prioritized <span className="text-foreground font-medium">onboarding to explain the technology</span>. While we initially planned heavy animations, scope constraints pushed them to later versions. This proved beneficial, as usability testing later revealed the onboarding flow was already a significant friction point.
                    </p>
                  </div>
                  <div className="lg:col-span-2 flex justify-center">
                    <div className="relative w-[60%] overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeOnboarding} 
                        alt="High-fidelity onboarding animation mockup" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Authorization */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Authorization</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      I used Sketch to design the remaining iOS and Android mockups. To meet deadlines and reduce bugs, I prioritized <span className="text-foreground font-medium">native OS components over custom UI</span>, which significantly streamlined the development process.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeAuthorization} 
                        alt="Authorization screens showing password reset and sign in flows" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Interact with Recordings */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Interact with Recordings</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Video elements are fully clickable. Users can <span className="text-foreground font-medium">add products to a cart or visit websites</span> directly from the player.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeInteract} 
                        alt="Interactive video player showing clickable product elements" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Create Content */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Create Content</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Effortlessly record <span className="text-foreground font-medium">interactive tutorials, product tours, and immersive stories</span>.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeCreateContent} 
                        alt="Content creation screens showing recording and editing flows" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Build Your Profile */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Build Your Profile</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Curate recordings into <span className="text-foreground font-medium">private or public playlists</span> to share with friends and the Screenlife community.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeProfile} 
                        alt="User profile and playlist management screens" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Search & Discover */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Search & Discover</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Find content easily by searching <span className="text-foreground font-medium">hashtags, creators, or video titles</span>.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeSearchDiscover} 
                        alt="Search and discovery interface with hashtags and content filtering" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* The Android App */}
            <AnimatedSection>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h4 className="font-display text-xl md:text-2xl font-medium uppercase mb-4">The Android App</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Additional work has been done to make sure that users with <span className="text-foreground font-medium">low-resolution Android phones</span> would have a nice user experience too.
                </p>
              </div>
              <div className="relative w-full overflow-hidden rounded-[4px] group">
                <img 
                  src={screenlifeAndroidUi} 
                  alt="Android app UI designs showing various screens optimized for low-resolution devices" 
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Usability Testing Sessions - Not a chapter */}
          <AnimatedSection>
            <div className="mb-24 md:mb-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={screenlifeRut1} 
                    alt="Usability testing session showing user interacting with profile screen" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={screenlifeRut2} 
                    alt="Usability testing session showing user browsing screens list" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={screenlifeRut3} 
                    alt="Usability testing session showing user on sign in screen" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">First usability testing sessions</p>
            </div>
          </AnimatedSection>

          {/* Chapter V: Phase 1 Testing */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter v</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Phase 1: InVision Testing</h2>
              </div>
            </AnimatedSection>

            {/* Search Clarity - Full Width */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="inline-block bg-secondary px-3 py-1 rounded-[4px]">
                      <span className="text-xs font-medium tracking-wider uppercase">finding #1</span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Search Clarity</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Users couldn't distinguish between <span className="text-foreground font-medium">links, authors, and hashtags</span> in search results.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-1">solution:</p>
                      <p className="text-foreground font-medium">Added content type icons to each search result for instant recognition.</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifeSearchUi} 
                        alt="Before and after comparison of search UI showing content type indicators" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Finding 2: Playlist Creation - gif left, text right */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifePlaylist} 
                        alt="Playlist creation UI animation showing the new create button" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1 space-y-4 order-1 lg:order-2">
                    <div className="inline-block bg-secondary px-3 py-1 rounded-[4px]">
                      <span className="text-xs font-medium tracking-wider uppercase">finding #2</span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">No Playlist Creation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Users couldn't find how to create a new playlist within the app.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-1">solution:</p>
                      <p className="text-foreground font-medium">Added prominent "Create" button to the playlist screen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Finding 3: Player Behavior - text left, gif right */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="inline-block bg-secondary px-3 py-1 rounded-[4px]">
                      <span className="text-xs font-medium tracking-wider uppercase">finding #3</span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl font-medium uppercase">Player Behavior</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Users expected the player to <span className="text-foreground font-medium">minimize like YouTube</span> when navigating away.
                    </p>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground mb-1">solution:</p>
                      <p className="text-foreground font-medium">Added minimization logic with persistent mini-player.</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-[4px] group">
                      <img 
                        src={screenlifePlayerMinimized} 
                        alt="Player minimization animation showing the mini-player feature" 
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter VI: Design QA */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vi</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Design QA</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    With <span className="text-foreground font-medium">60+ screens</span> in development, I conducted design reviews to fix execution gaps in spacing and layout. Small details (margins, spacing) were missed during implementation, so I created design review docs to align code with design.
                  </p>
                </div>

                {/* Comments on left, Before/After images on right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Comments - Left on desktop, top on mobile */}
                  <div className="bg-secondary/50 p-6 md:p-8 rounded-[4px]">
                    <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-4">comments</p>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="text-foreground font-medium">1.</span>
                        <span>Change the status bar color from black to white #ffffff</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-foreground font-medium">2.</span>
                        <span>Change the font weight from Regular to Medium</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-foreground font-medium">3.</span>
                        <span>Change the cursor color from blue to white #ffffff</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-foreground font-medium">4.</span>
                        <span>Decrease the margin between fields by 50%</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-foreground font-medium">5.</span>
                        <span>Buttons should be disabled until the users enter their email and password</span>
                      </li>
                    </ol>
                  </div>

                  {/* Before and After Images - Right on desktop, bottom on mobile */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3 bg-muted p-4 rounded-[4px]">
                      <p className="text-xs font-medium tracking-wider uppercase text-foreground">before</p>
                      <div className="relative w-full overflow-hidden rounded-[4px] group">
                        <img 
                          src={screenlifeDesignReviewBefore} 
                          alt="Sign in screen before design review showing issues with spacing and styling" 
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 bg-foreground p-4 rounded-[4px]">
                      <p className="text-xs font-medium tracking-wider uppercase text-background">after</p>
                      <div className="relative w-full overflow-hidden rounded-[4px] group">
                        <img 
                          src={screenlifeDesignReviewAfter} 
                          alt="Sign in screen after design review with corrected spacing and styling" 
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Remote Usability Tests - Waterfall Section */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-16">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Remote Usability Tests</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl">
                  We validated core flows through remote unmoderated testing. While some feedback was subjective, the data successfully exposed critical friction points, specifically the need to refine our search filtration.
                </p>
              </div>
            </AnimatedSection>

            {/* Waterfall Layout */}
            <div className="space-y-8">
              {/* Image 1 */}
              <AnimatedSection delay={100}>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-3xl overflow-hidden rounded-[4px] border border-foreground/10 group">
                    <img 
                      src={screenlifeRutCards1}
                      alt="User feedback cards showing filter and sorting related issues" 
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Text 1 */}
              <AnimatedSection delay={200}>
                <div className="flex justify-center">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl">
                    Feedback highlighted friction with player controls and frustration with the forced landscape mode.
                  </p>
                </div>
              </AnimatedSection>

              {/* Image 2 */}
              <AnimatedSection delay={100}>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-3xl overflow-hidden rounded-[4px] border border-foreground/10 group">
                    <img 
                      src={screenlifeRutCards2}
                      alt="User feedback cards showing player control and navigation issues" 
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Text 2 */}
              <AnimatedSection delay={200}>
                <div className="flex justify-center">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl">
                    Some users hated our app, and some fell in love.
                  </p>
                </div>
              </AnimatedSection>

              {/* Image 3 */}
              <AnimatedSection delay={100}>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-3xl overflow-hidden rounded-[4px] border border-foreground/10 group">
                    <img 
                      src={screenlifeRutCards3}
                      alt="Mixed user feedback showing both negative and positive reactions" 
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Text 3 */}
              <AnimatedSection delay={200}>
                <div className="flex justify-center">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center max-w-2xl">
                    The results made it clear that we needed to continue testing for more robust feedback.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Chapter VIII: Phase 2 Testing */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter viii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Phase 2: Onsite Testing</h2>
                <p className="text-muted-foreground mt-4">24 Issues Found</p>
              </div>
            </AnimatedSection>

            {/* Permission Dialogs */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="space-y-2 mb-8">
                  <h4 className="font-display font-medium uppercase text-sm">Permission Dialogs</h4>
                  <p className="text-sm text-muted-foreground">Users denied native prompts immediately. We moved to custom pre-permission primers.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 no-border">
                  <img 
                    src={screenlifePermission1} 
                    alt="Permission dialog design showing notification prompt" 
                    className="h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] no-border"
                  />
                  <img 
                    src={screenlifePermission2} 
                    alt="Permission dialog design showing turn on notifications" 
                    className="h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] no-border"
                  />
                  <img 
                    src={screenlifePermission3} 
                    alt="Permission dialog design showing native iOS prompt" 
                    className="h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] no-border"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Sign-in Barrier */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="space-y-2 mb-8">
                  <h4 className="font-display font-medium uppercase text-sm">Sign-in Barrier</h4>
                  <p className="text-sm text-muted-foreground">Users missed the "Skip" button. We redesigned the header to make it prominent.</p>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={screenlifeSigninBarrier} 
                    alt="Sign-in screen showing skip button redesign" 
                    className="h-auto max-h-[400px] md:max-h-[500px]"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Filtering */}
            <AnimatedSection>
              <div className="mb-16 md:mb-20">
                <div className="space-y-2 mb-8">
                  <h4 className="font-display font-medium uppercase text-sm">Filtering</h4>
                  <p className="text-sm text-muted-foreground">Applied filter state was unclear to users. We added better active states.</p>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={screenlifeFiltering} 
                    alt="Filter UI with improved active state indicators" 
                    className="h-auto max-h-[400px] md:max-h-[500px]"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Hashtag Input */}
            <AnimatedSection>
              <div>
                <div className="space-y-2 mb-8">
                  <h4 className="font-display font-medium uppercase text-sm">Hashtag Input</h4>
                  <p className="text-sm text-muted-foreground">Users tried typing "#" manually. We added an auto-placeholder.</p>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={screenlifeHashtagInput} 
                    alt="Before and after comparison of hashtag input with auto-placeholder" 
                    className="h-auto w-full max-w-3xl"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter IX: Refinement & V2 */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ix</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Refinement & V2</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4 max-w-3xl mb-12">
                <p className="text-muted-foreground leading-relaxed">
                  Based on the 24 issues, we shipped a major redesign focusing on <span className="text-foreground font-medium">clarity and social features</span>. We added time/likes/views to thumbnails, sorting tabs (Popular/New/Following), and prioritized the Follow feature.
                </p>
              </div>
            </AnimatedSection>

            {/* Image 1: Before/After */}
            <AnimatedSection delay={100}>
              <div className="flex flex-col items-center mb-12">
                <img 
                  src={screenlifeV2BeforeAfter} 
                  alt="Before and after comparison showing new metadata on video cards" 
                  className="h-auto w-full max-w-xl border-0"
                />
                <p className="text-sm text-muted-foreground mt-4">Adding metadata (time, views, likes, device) to video cards</p>
              </div>
            </AnimatedSection>

            {/* Image 2: Tabs */}
            <AnimatedSection delay={200}>
              <div className="flex flex-col items-center mb-12">
                <img 
                  src={screenlifeV2Tabs} 
                  alt="New tab bar and category slider interface" 
                  className="h-auto w-full max-w-xs border-0"
                />
                <p className="text-sm text-muted-foreground mt-4">New tab bar and category slider for content discovery</p>
              </div>
            </AnimatedSection>

            {/* Image 3: Social Features */}
            <AnimatedSection delay={300}>
              <div className="flex flex-col items-center">
                <img 
                  src={screenlifeV2Social} 
                  alt="Profile, screens list, and followers interface" 
                  className="h-auto w-full max-w-2xl border-0"
                />
                <p className="text-sm text-muted-foreground mt-4">Enhanced social features: profiles, screens, and followers</p>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter X: Key Learnings */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter x</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Key Learnings</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">01</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Access to End Users is Vital</h4>
                    <p className="text-muted-foreground">Basing personas on assumptions was a risk. Direct user access would have accelerated validation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">02</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Jobs-to-be-Done over Personas</h4>
                    <p className="text-muted-foreground">JTBD framework better explains why users act. Focus on motivation, not demographics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">03</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Test Earlier</h4>
                    <p className="text-muted-foreground">We should have tested paper prototypes instead of waiting for high-fidelity. Validate logic before pixels.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Thank you section */}
          <AnimatedSection>
            <div className="text-center py-16 md:py-24">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6">thank you for reading</p>
              <Link 
                to="/#case-studies" 
                className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-display text-lg">back to all projects</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
