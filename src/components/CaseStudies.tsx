import { useState, useEffect } from 'react';
import caseStudy1 from '@/assets/case-study-1.jpg';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import { ArrowUpRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  year: string;
}

type TabType = 'ux-projects' | 'branding' | 'writing';

const tabConfig: { key: TabType; label: string; title: string }[] = [
  { key: 'ux-projects', label: 'ux projects', title: 'case studies' },
  { key: 'branding', label: 'branding', title: 'gallery' },
  { key: 'writing', label: 'writing', title: 'articles' },
];

const caseStudiesData: Record<TabType, CaseStudy[]> = {
  'ux-projects': [
    {
      id: 1,
      title: 'Fintech Mobile App',
      description: 'Reimagining personal finance for the next generation',
      category: 'Mobile Design',
      image: caseStudy1,
      year: '2024',
    },
    {
      id: 2,
      title: 'Museum Experience',
      description: 'Digital wayfinding for contemporary art spaces',
      category: 'Spatial Design',
      image: caseStudy2,
      year: '2024',
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Enterprise data visualization made intuitive',
      category: 'Web Design',
      image: caseStudy3,
      year: '2023',
    },
    {
      id: 4,
      title: 'E-commerce Platform',
      description: 'Seamless shopping experience for modern retailers',
      category: 'Web Design',
      image: caseStudy1,
      year: '2023',
    },
  ],
  'branding': [
    {
      id: 1,
      title: 'Tech Startup Identity',
      description: 'Bold visual language for emerging tech brand',
      category: 'Brand Identity',
      image: caseStudy2,
      year: '2024',
    },
    {
      id: 2,
      title: 'Restaurant Rebrand',
      description: 'Modern refresh for a beloved local eatery',
      category: 'Visual Design',
      image: caseStudy3,
      year: '2023',
    },
  ],
  'writing': [
    {
      id: 1,
      title: 'Design Systems Guide',
      description: 'Comprehensive guide to building scalable design systems',
      category: 'Article',
      image: caseStudy1,
      year: '2024',
    },
    {
      id: 2,
      title: 'UX Research Methods',
      description: 'Exploring modern user research techniques',
      category: 'Article',
      image: caseStudy3,
      year: '2024',
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
        <div className="mb-16 space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            selected works
          </p>
          
          {/* Tabs */}
          <div className="flex items-center gap-6 md:gap-8">
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-display text-lg md:text-xl font-medium transition-colors duration-200 link-underline ${
                  activeTab === tab.key
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Title with Typewriter */}
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
            <TypewriterTitle text={activeConfig.title} />
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {studies.map((study, index) => (
            <article
              key={`${activeTab}-${study.id}`}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[--radius] bg-secondary mb-6">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Floating action button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-lg opacity-0 scale-75 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full">
                    view project
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{study.category}</span>
                  <span>{study.year}</span>
                </div>
                <h3 className="font-display text-2xl font-medium transition-colors duration-300 group-hover:text-muted-foreground">
                  {study.title}
                </h3>
                <p className="text-muted-foreground">{study.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
