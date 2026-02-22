import { useState, useCallback, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import screenlifeThumbnail from '@/assets/screenlife-thumbnail.png';
import amtvThumbnail from '@/assets/amtv-thumbnail.png';
import spotlightThumbnail from '@/assets/spotlight-thumbnail.png';
import phantomFootprintThumbnail from '@/assets/phantom-footprint-thumbnail.png';
import brandingCaseStudy1 from '@/assets/branding-case-study-1.png';
import brandingIosIcons from '@/assets/branding-ios-icons.webp';
import brandingF1Design from '@/assets/branding-f1-design.webp';
import brandingHamburgerIcons from '@/assets/branding-hamburger-icons.webp';
import carepalWriting from '@/assets/carepal-writing.png';
import academicThesis from '@/assets/academic-thesis.png';
import articleStorytelling from '@/assets/article-storytelling.png';
import articleUserInterviews from '@/assets/article-user-interviews.png';
import articleNeuralNetwork from '@/assets/article-neural-network.png';
import articleProblemSolving from '@/assets/article-problem-solving.png';
import articleAiUx from '@/assets/article-ai-ux.png';
import articleTeslaPyramids from '@/assets/article-tesla-pyramids.png';
import placeholderSvg from '@/assets/placeholder-image.svg';

// ── Types ──────────────────────────────────────────────
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  year: string;
  slug?: string;
  externalUrl?: string;
  impactBadge?: string;
  roleTags?: string[];
  challengeResult?: string;
  filterTags: string[];
  featured?: boolean;
  glowType?: 'ai' | 'award';
}

type FilterKey = 'all' | 'ai-systems' | 'mobile' | 'saas' | 'design-systems' | 'writing' | 'branding' | 'academic';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'ai-systems', label: 'AI Systems' },
  { key: 'mobile', label: 'iOS / Mobile' },
  { key: 'saas', label: 'Enterprise SaaS' },
  { key: 'design-systems', label: 'Design Systems' },
  { key: 'branding', label: 'Branding' },
  { key: 'writing', label: 'Writing' },
  { key: 'academic', label: 'Academic' },
];

// ── Data ───────────────────────────────────────────────
const allStudies: CaseStudy[] = [
  {
    id: 'amtv',
    title: 'Add Music to Video',
    description: 'Redesigning the creative workflow for 22M+ creators',
    category: 'UX Research · iOS · Android',
    image: amtvThumbnail,
    year: '2016–2023',
    slug: 'add-music-to-video',
    impactBadge: '22M Users',
    roleTags: ['Product Strategy', 'ML Implementation', 'iOS Lead'],
    challengeResult: 'Challenge: Scale a video editor for 22M users. Result: 35% increase in retention.',
    filterTags: ['mobile', 'ai-systems'],
    featured: true,
    glowType: 'ai',
  },
  {
    id: 'spotlight',
    title: 'Design System for the Spotlight',
    description: 'How three apps revolutionized creativity and topped the App Store charts',
    category: 'Product Design',
    image: spotlightThumbnail,
    year: '2016–2023',
    slug: 'spotlight',
    impactBadge: 'Top 10 App',
    roleTags: ['Design Systems', 'Cross-Platform', 'Governance'],
    challengeResult: 'Challenge: Unify 3 creative apps. Result: Cross-platform design governance.',
    filterTags: ['design-systems', 'mobile'],
    featured: false,
    glowType: 'award',
  },
  {
    id: 'screenlife',
    title: 'Iterative Design Process',
    description: 'Designing the first interactive video recorder',
    category: 'Product Design',
    image: screenlifeThumbnail,
    year: '2018',
    slug: 'screenlife',
    impactBadge: 'First-of-Kind',
    roleTags: ['UX Research', 'Mobile', 'SaaS'],
    challengeResult: 'Challenge: Create the first interactive video recorder. Result: Novel interaction paradigm.',
    filterTags: ['mobile', 'saas'],
    featured: false,
  },
  {
    id: 'phantom',
    title: 'Phantom Footprint',
    description: 'IoT-enhanced board game closing the climate feedback loop',
    category: 'UX Design · Physical Computing',
    image: phantomFootprintThumbnail,
    year: '2024',
    slug: 'phantom-footprint',
    impactBadge: 'IoT Innovation',
    roleTags: ['AI / ML', 'IoT', 'Physical Computing'],
    challengeResult: 'Challenge: Close the climate feedback loop. Result: IoT-enhanced board game.',
    filterTags: ['ai-systems'],
    featured: true,
    glowType: 'ai',
  },
  // Branding
  {
    id: 'branding-asi',
    title: 'Cal State EB Branding for ASI',
    description: 'Bold visual language for student govt.',
    category: 'Brand Identity',
    image: brandingCaseStudy1,
    year: '2024',
    externalUrl: 'https://www.canva.com/design/DAG0BfinlkQ/UvL4uRgqPElvkLF6oUIEig/view?utm_content=DAG0BfinlkQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2ba7e72444',
    filterTags: ['branding'],
  },
  {
    id: 'branding-icons',
    title: 'iOS App Icon Design',
    description: 'Crafting distinctive app icons for iOS',
    category: 'Visual Design',
    image: brandingIosIcons,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/12017945-iOS-App-Icon-Design',
    filterTags: ['branding'],
  },
  {
    id: 'branding-f1',
    title: 'F1 Game Design Concept',
    description: 'Formula One Grand Prix Monaco mobile app concept',
    category: 'UI Design',
    image: brandingF1Design,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/14884595-F1-Formula-One-Game-Design-Concept-Grand-Prix-Monaco',
    filterTags: ['branding'],
  },
  {
    id: 'branding-hamburger',
    title: 'Hamburger Menu Icons',
    description: 'Exploring delicious alternatives to the hamburger icon',
    category: 'Icon Design',
    image: brandingHamburgerIcons,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/14880132-There-are-other-delicious-foods-rather-than-the-Hamburger-icon',
    filterTags: ['branding'],
  },
  // Writing
  {
    id: 'article-storytelling',
    title: 'The Story of Storytelling in UX Design',
    description: 'Exploring the power of narrative in user experience',
    category: 'Article',
    image: articleStorytelling,
    year: '2023',
    externalUrl: 'https://medium.com/@yeasinarifin/the-story-of-storytelling-in-ux-design-b2570fd29c14',
    filterTags: ['writing'],
  },
  {
    id: 'article-interviews',
    title: 'User Interviews: The Secret Weapon',
    description: 'The secret weapon of UX practitioners',
    category: 'Article',
    image: articleUserInterviews,
    year: '2022',
    externalUrl: 'https://medium.com/@yeasinarifin/user-interviews-the-secret-weapon-of-ux-practitioners-a792146e70f6',
    filterTags: ['writing'],
  },
  {
    id: 'article-neural',
    title: 'Neural Network: The Brainy World of AI',
    description: 'The brainy world of artificial intelligence',
    category: 'Article',
    image: articleNeuralNetwork,
    year: '2024',
    externalUrl: 'https://medium.com/@yeasinarifin/neural-network-the-brainy-world-of-artificial-intelligence-daa7970807a4',
    filterTags: ['writing'],
  },
  {
    id: 'article-problem',
    title: 'The Science and Art of UX Problem-Solving',
    description: 'A deep dive into UX problem-solving methodologies',
    category: 'Article',
    image: articleProblemSolving,
    year: '2023',
    externalUrl: 'https://medium.com/@yeasinarifin/the-science-and-art-of-ux-problem-solving-180450a86f19',
    filterTags: ['writing'],
  },
  {
    id: 'article-ai-ux',
    title: 'The Power of AI in UX Design',
    description: 'Generating innovative ideas with artificial intelligence',
    category: 'Article',
    image: articleAiUx,
    year: '2024',
    externalUrl: 'https://medium.com/@yeasinarifin/unleashing-the-power-of-ai-in-ux-design-generating-innovative-ideas-71002f3e2ef6',
    filterTags: ['writing'],
  },
  {
    id: 'article-tesla',
    title: "Nikola Tesla's Research on Pyramids",
    description: 'Separating fact from fiction',
    category: 'Article',
    image: articleTeslaPyramids,
    year: '2021',
    externalUrl: 'https://medium.com/@yeasinarifin/nikola-teslas-research-on-pyramids-separating-fact-from-fiction-ec3e546bb33',
    filterTags: ['writing'],
  },
  // Academic
  {
    id: 'carepal',
    title: 'CarePal',
    description: 'Designing a wellness companion for everyday care',
    category: 'Research',
    image: carepalWriting,
    year: '2024',
    externalUrl: 'https://www.canva.com/design/DAGkpwN0h1k/xyIfEievf8rfQnLJM6ccvw/view?utm_content=DAGkpwN0h1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h30849d3be1',
    filterTags: ['academic'],
  },
  {
    id: 'thesis',
    title: 'CarePal Thesis Document',
    description: "Master's thesis research paper from CSU East Bay",
    category: 'Thesis',
    image: academicThesis,
    year: '2024',
    externalUrl: 'https://drive.google.com/file/d/1Be1mJV8ZjIJNeOyu6F4-KR-MvskellIJ/view?usp=sharing',
    filterTags: ['academic'],
  },
];

// ── Lazy Image ─────────────────────────────────────────
const CaseStudyImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => setIsLoaded(true), []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted/30">
      {/* Internal 1px border to prevent image bleeding */}
      <div className="absolute inset-0 z-[2] pointer-events-none rounded-[inherit] border border-foreground/[0.06]" />
      <img
        src={placeholderSvg}
        alt=""
        className={`no-border absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        loading="lazy"
        className={`no-border h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
});
CaseStudyImage.displayName = 'CaseStudyImage';

// ── Impact Badge (standardized glassmorphism pill) ─────
const ImpactBadge = ({ text }: { text: string }) => (
  <div className="absolute top-4 right-4 z-10 rounded-full px-3.5 py-1.5
    bg-black/50 backdrop-blur-xl border border-white/15
    shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
    <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-white">
      {text}
    </span>
  </div>
);

// ── Filter Pill Bar ────────────────────────────────────
const FilterBar = ({ active, onChange }: { active: FilterKey; onChange: (k: FilterKey) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center gap-1.5">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`relative z-10 px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-colors duration-300 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ${active === f.key
              ? 'text-background'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          {active === f.key && (
            <motion.div
              layoutId="active-filter-pill"
              className="absolute inset-0 rounded-md bg-foreground"
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          )}
          {f.label}
        </button>
      ))}
    </div>
  );
};

// ── Card Component (Unified "Frame" family) ───────────
const CaseStudyCard = ({ study, index, isFeatured }: { study: CaseStudy; index: number; isFeatured: boolean }) => {
  const isExternal = !!study.externalUrl;
  const isInternal = !!study.slug;
  const CardWrapper = isExternal ? 'a' : isInternal ? Link : 'div';
  const cardProps = isExternal
    ? { href: study.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : isInternal
      ? { to: `/case-study/${study.slug}` }
      : {};

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: index * 0.06, duration: 0.5, ease: 'easeOut' },
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      className={isFeatured ? 'md:col-span-2' : ''}
    >
      <CardWrapper
        {...(cardProps as any)}
        className="group cursor-pointer block rounded-card overflow-hidden transition-all duration-500 ease-out
          bg-surface-card border border-surface-card-border
          hover:scale-[1.02] hover:-translate-y-1
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        style={{
          boxShadow: 'var(--surface-shadow)',
        }}
        onMouseEnter={(e: any) => {
          e.currentTarget.style.boxShadow = 'var(--surface-shadow-hover)';
        }}
        onMouseLeave={(e: any) => {
          e.currentTarget.style.boxShadow = 'var(--surface-shadow)';
        }}
      >
        <article className="h-full flex flex-col">
          {/* Image Frame — consistent aspect ratio */}
          <div className="relative overflow-hidden aspect-[16/10]">
            <CaseStudyImage src={study.image} alt={study.title} />

            {study.impactBadge && <ImpactBadge text={study.impactBadge} />}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* View arrow — fades in bottom-right */}
            <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/90 dark:bg-black/70 backdrop-blur-sm">
                <ArrowUpRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>

            {/* Progressive disclosure */}
            {study.challengeResult && (
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[13px] leading-relaxed text-white/90 font-medium">
                  {study.challengeResult}
                </p>
              </div>
            )}
          </div>

          {/* Metadata — fixed position & weights for every card */}
          <div className="p-6 flex flex-col gap-2 flex-1">
            {/* Row 1: Category · Year */}
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground tracking-wider uppercase">
              <span>{study.category}</span>
              <span>{study.year}</span>
            </div>

            {/* Row 2: Title — always same weight/size */}
            <h3 className="font-display text-xl font-bold leading-tight text-foreground">
              {study.title}
            </h3>

            {/* Row 3: Description */}
            <p className="text-muted-foreground text-sm">{study.description}</p>

            {/* Row 4: Role Tags (always at bottom) */}
            {study.roleTags && study.roleTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {study.roleTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-sm bg-secondary text-muted-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </CardWrapper>
    </motion.div>
  );
};

// ── Main Section ───────────────────────────────────────
const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = activeFilter === 'all'
    ? allStudies
    : allStudies.filter((s) => s.filterTags.includes(activeFilter));

  // Determine if we should use bento (asymmetric) layout
  const uxFilters: FilterKey[] = ['all', 'mobile', 'ai-systems', 'saas', 'design-systems'];
  const isBentoLayout = uxFilters.includes(activeFilter) && filtered.some((s) => s.featured);

  // Sort featured first for bento
  const sortedStudies = isBentoLayout
    ? [...filtered].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      })
    : filtered;

  // Grid class
  const gridClass = isBentoLayout
    ? 'grid gap-8 grid-cols-1 md:grid-cols-2'
    : filtered.some((s) => s.filterTags.includes('writing'))
      ? 'grid gap-8 grid-cols-1 md:grid-cols-3'
      : 'grid gap-8 grid-cols-1 md:grid-cols-2';

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container">
        {/* Section header */}
        <div className="mb-16 space-y-6">
          <motion.h2
            className="font-display font-bold leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Works
          </motion.h2>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <LayoutGroup>
              <FilterBar active={activeFilter} onChange={setActiveFilter} />
            </LayoutGroup>
          </motion.div>
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className={gridClass}>
            <AnimatePresence mode="popLayout">
              {sortedStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={index}
                  isFeatured={isBentoLayout && !!study.featured}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground py-20 text-lg"
            >
              No projects match this filter.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;
