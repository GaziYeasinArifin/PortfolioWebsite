import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import brandingCaseStudy1 from '@/assets/branding-case-study-1.png';
import brandingIosIcons from '@/assets/branding-ios-icons.webp';
import brandingF1Design from '@/assets/branding-f1-design.webp';
import brandingHamburgerIcons from '@/assets/branding-hamburger-icons.webp';
import carepalWriting from '@/assets/carepal-writing.png';
import phantomFootprintThumbnail from '@/assets/phantom-footprint-thumbnail.png';
import screenlifeThumbnail from '@/assets/screenlife-thumbnail.png';
import amtvThumbnail from '@/assets/amtv-thumbnail.png';
import spotlightThumbnail from '@/assets/spotlight-thumbnail.png';
import articleStorytelling from '@/assets/article-storytelling.png';
import articleUserInterviews from '@/assets/article-user-interviews.png';
import articleNeuralNetwork from '@/assets/article-neural-network.png';
import articleProblemSolving from '@/assets/article-problem-solving.png';
import articleAiUx from '@/assets/article-ai-ux.png';
import articleTeslaPyramids from '@/assets/article-tesla-pyramids.png';
import academicThesis from '@/assets/academic-thesis.png';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  year: string;
  slug?: string;
  externalUrl?: string;
}

type TabType = 'ux-projects' | 'branding' | 'writing' | 'academic';

const tabConfig: { key: TabType; label: string; title: string }[] = [
  { key: 'ux-projects', label: 'UX PROJECTS', title: 'Case Studies' },
  { key: 'branding', label: 'BRANDING', title: 'Gallery' },
  { key: 'writing', label: 'WRITING', title: 'Articles' },
  { key: 'academic', label: 'ACADEMIC', title: 'Research' },
];

const caseStudiesData: Record<TabType, CaseStudy[]> = {
  'ux-projects': [
    {
      id: 1,
      title: 'Iterative Design Process',
      description: 'Designing the first interactive video recorder',
      category: 'Product Design',
      image: screenlifeThumbnail,
      year: '2018',
      slug: 'screenlife',
    },
    {
      id: 2,
      title: 'Add Music to Video',
      description: 'Redesigning a video editor for 22M+ users',
      category: 'UX Research+iOS+Android',
      image: amtvThumbnail,
      year: '2016-2023',
      slug: 'add-music-to-video',
    },
    {
      id: 3,
      title: 'Design System for the Spotlight',
      description: 'How three apps revolutionized creativity and topped the App Store charts',
      category: 'Product Design',
      image: spotlightThumbnail,
      year: '2016-2023',
      slug: 'spotlight',
    },
    {
      id: 4,
      title: 'Phantom Footprint',
      description: 'IoT-enhanced board game closing the climate feedback loop',
      category: 'UX Design + Physical Computing',
      image: phantomFootprintThumbnail,
      year: '2024',
      slug: 'phantom-footprint',
    },
  ],
  'branding': [
    {
      id: 1,
      title: 'Cal State EB Branding for ASI',
      description: 'Bold visual language for student govt.',
      category: 'Brand Identity',
      image: brandingCaseStudy1,
      year: '2024',
      externalUrl: 'https://www.canva.com/design/DAG0BfinlkQ/UvL4uRgqPElvkLF6oUIEig/view?utm_content=DAG0BfinlkQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2ba7e72444',
    },
    {
      id: 2,
      title: 'iOS App Icon Design',
      description: 'Crafting distinctive app icons for iOS',
      category: 'Visual Design',
      image: brandingIosIcons,
      year: '2020',
      externalUrl: 'https://dribbble.com/shots/12017945-iOS-App-Icon-Design',
    },
    {
      id: 3,
      title: 'F1 Game Design Concept',
      description: 'Formula One Grand Prix Monaco mobile app concept',
      category: 'UI Design',
      image: brandingF1Design,
      year: '2020',
      externalUrl: 'https://dribbble.com/shots/14884595-F1-Formula-One-Game-Design-Concept-Grand-Prix-Monaco',
    },
    {
      id: 4,
      title: 'Hamburger Menu Icons',
      description: 'Exploring delicious alternatives to the hamburger icon',
      category: 'Icon Design',
      image: brandingHamburgerIcons,
      year: '2020',
      externalUrl: 'https://dribbble.com/shots/14880132-There-are-other-delicious-foods-rather-than-the-Hamburger-icon',
    },
  ],
  'writing': [
    {
      id: 1,
      title: 'The Story of Storytelling in UX Design',
      description: 'Exploring the power of narrative in user experience',
      category: 'Article',
      image: articleStorytelling,
      year: '2023',
      externalUrl: 'https://medium.com/@yeasinarifin/the-story-of-storytelling-in-ux-design-b2570fd29c14',
    },
    {
      id: 2,
      title: 'User Interviews: The Secret Weapon',
      description: 'The secret weapon of UX practitioners',
      category: 'Article',
      image: articleUserInterviews,
      year: '2022',
      externalUrl: 'https://medium.com/@yeasinarifin/user-interviews-the-secret-weapon-of-ux-practitioners-a792146e70f6',
    },
    {
      id: 3,
      title: 'Neural Network: The Brainy World of AI',
      description: 'The brainy world of artificial intelligence',
      category: 'Article',
      image: articleNeuralNetwork,
      year: '2024',
      externalUrl: 'https://medium.com/@yeasinarifin/neural-network-the-brainy-world-of-artificial-intelligence-daa7970807a4',
    },
    {
      id: 4,
      title: 'The Science and Art of UX Problem-Solving',
      description: 'A deep dive into UX problem-solving methodologies',
      category: 'Article',
      image: articleProblemSolving,
      year: '2023',
      externalUrl: 'https://medium.com/@yeasinarifin/the-science-and-art-of-ux-problem-solving-180450a86f19',
    },
    {
      id: 5,
      title: 'The Power of AI in UX Design',
      description: 'Generating innovative ideas with artificial intelligence',
      category: 'Article',
      image: articleAiUx,
      year: '2024',
      externalUrl: 'https://medium.com/@yeasinarifin/unleashing-the-power-of-ai-in-ux-design-generating-innovative-ideas-71002f3e2ef6',
    },
    {
      id: 6,
      title: "Nikola Tesla's Research on Pyramids",
      description: 'Separating fact from fiction',
      category: 'Article',
      image: articleTeslaPyramids,
      year: '2021',
      externalUrl: 'https://medium.com/@yeasinarifin/nikola-teslas-research-on-pyramids-separating-fact-from-fiction-ec3e546bb33',
    },
  ],
  'academic': [
    {
      id: 1,
      title: 'CarePal',
      description: 'Designing a wellness companion for everyday care',
      category: 'Research',
      image: carepalWriting,
      year: '2024',
      externalUrl: 'https://www.canva.com/design/DAGkpwN0h1k/xyIfEievf8rfQnLJM6ccvw/view?utm_content=DAGkpwN0h1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h30849d3be1',
    },
    {
      id: 2,
      title: 'CarePal Thesis Document',
      description: 'Master\'s thesis research paper from CSU East Bay',
      category: 'Thesis',
      image: academicThesis,
      year: '2024',
      externalUrl: 'https://drive.google.com/file/d/1Be1mJV8ZjIJNeOyu6F4-KR-MvskellIJ/view?usp=sharing',
    },
  ],
};

const TypewriterTitle = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      <span 
        className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
      />
    </span>
  );
};

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ux-projects');
  const activeConfig = tabConfig.find(t => t.key === activeTab)!;
  const studies = caseStudiesData[activeTab];

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 space-y-8">
          {/* Tabs - ALL CAPS */}
          <div className="flex items-center gap-6 md:gap-8">
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs tracking-[0.2em] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 ${
                  activeTab === tab.key
                    ? 'text-foreground font-bold after:w-full'
                    : 'text-muted-foreground font-medium after:w-0 hover:text-foreground hover:after:w-full'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Title with Typewriter - Hero sized */}
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]">
            <TypewriterTitle text={activeConfig.title} />
          </h2>
        </div>

        <div className={`grid gap-8 grid-cols-1 ${activeTab === 'writing' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {studies.map((study, index) => {
            const isExternal = !!study.externalUrl;
            const isInternal = !!study.slug;
            const isComingSoon = study.slug === 'coming-soon';
            const CardWrapper = isExternal ? 'a' : isInternal ? Link : 'div';
            const cardProps = isExternal 
              ? { href: study.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
              : isInternal 
                ? { to: isComingSoon ? '/coming-soon' : `/case-study/${study.slug}` } 
                : {};
            
            return (
              <CardWrapper
                key={`${activeTab}-${study.id}`}
                {...cardProps as any}
                className="group cursor-pointer animate-fade-up block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-secondary mb-6">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale"
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* Floating action button - top right on hover */}
                    <div className="absolute top-4 right-4 opacity-0 scale-75 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-background shadow-lg">
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                      </div>
                    </div>
                    {/* Bottom info bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-[4px]">
                        view project
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{study.category}</span>
                      <span>{study.year}</span>
                    </div>
                    <h3 className="font-display text-2xl font-medium">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground">{study.description}</p>
                  </div>
                </article>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
