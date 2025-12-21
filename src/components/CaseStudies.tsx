import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import brandingCaseStudy1 from '@/assets/branding-case-study-1.png';
import carepalWriting from '@/assets/carepal-writing.png';
import phantomFootprintThumbnail from '@/assets/phantom-footprint-thumbnail.png';
import screenlifeThumbnail from '@/assets/screenlife-thumbnail.png';
import amtvThumbnail from '@/assets/amtv-thumbnail.png';
import spotlightThumb from '@/assets/spotlight-thumb.png';
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

type TabType = 'ux-projects' | 'branding' | 'writing';

const tabConfig: { key: TabType; label: string; title: string }[] = [
  { key: 'ux-projects', label: 'UX PROJECTS', title: 'Case Studies' },
  { key: 'branding', label: 'BRANDING', title: 'Gallery' },
  { key: 'writing', label: 'WRITING', title: 'Articles' },
];

const caseStudiesData: Record<TabType, CaseStudy[]> = {
  'ux-projects': [
    {
      id: 1,
      title: 'Iterative Design Process',
      description: 'Designing the first mobile interactive video recorder',
      category: 'Mobile Design',
      image: screenlifeThumbnail,
      year: '2018',
      slug: 'screenlife',
    },
    {
      id: 2,
      title: 'Phantom Footprint',
      description: 'IoT-enhanced board game closing the climate feedback loop',
      category: 'UX Design + Physical Computing',
      image: phantomFootprintThumbnail,
      year: '2024',
      slug: 'phantom-footprint',
    },
    {
      id: 3,
      title: 'Add Music to Video',
      description: 'Redesigning a video editor for 50M+ users',
      category: 'Mobile Design',
      image: amtvThumbnail,
      year: '2023',
      slug: 'add-music-to-video',
    },
    {
      id: 4,
      title: 'Designing for the Spotlight',
      description: 'How three apps revolutionized creativity and topped the charts',
      category: 'Product Design',
      image: spotlightThumb,
      year: '2016-2023',
      slug: 'spotlight',
    },
  ],
  'branding': [
    {
      id: 1,
      title: 'Tech Startup Identity',
      description: 'Bold visual language for emerging tech brand',
      category: 'Brand Identity',
      image: brandingCaseStudy1,
      year: '2024',
      externalUrl: 'https://www.canva.com/design/DAG0BfinlkQ/UvL4uRgqPElvkLF6oUIEig/view?utm_content=DAG0BfinlkQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2ba7e72444',
    },
    {
      id: 2,
      title: 'Restaurant Rebrand',
      description: 'Modern refresh for a beloved local eatery',
      category: 'Visual Design',
      image: caseStudy3,
      year: '2023',
      slug: 'coming-soon',
    },
  ],
  'writing': [
    {
      id: 1,
      title: 'CarePal',
      description: 'Designing a wellness companion for everyday care',
      category: 'Article',
      image: carepalWriting,
      year: '2024',
      externalUrl: 'https://www.canva.com/design/DAGkpwN0h1k/xyIfEievf8rfQnLJM6ccvw/view?utm_content=DAGkpwN0h1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h30849d3be1',
    },
    {
      id: 2,
      title: 'UX Research Methods',
      description: 'Exploring modern user research techniques',
      category: 'Article',
      image: caseStudy3,
      year: '2024',
      slug: 'coming-soon',
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
                className={`text-xs font-medium tracking-[0.2em] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full ${
                  activeTab === tab.key
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
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
