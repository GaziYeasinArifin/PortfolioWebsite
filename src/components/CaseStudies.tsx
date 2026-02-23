import { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '@/hooks/use-magnetic';
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
interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  label: string;
  image: string;
  year: string;
  slug?: string;
  externalUrl?: string;
  impactBadge?: string;
  category: CategoryKey;
}

type CategoryKey = 'ux' | 'branding' | 'writing' | 'academic';

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'ux', label: 'UX Projects' },
  { key: 'branding', label: 'Branding' },
  { key: 'writing', label: 'Writing' },
  { key: 'academic', label: 'Academic' },
];

// ── Data ───────────────────────────────────────────────
const allWorks: WorkItem[] = [
  // UX Projects
  {
    id: 'amtv',
    title: 'Add Music to Video',
    subtitle: 'Redesigning the creative workflow for 22M+ creators',
    label: 'Case Study',
    image: amtvThumbnail,
    year: '2016–2023',
    slug: 'add-music-to-video',
    impactBadge: '22M Users',
    category: 'ux',
  },
  {
    id: 'spotlight',
    title: 'Design System for the Spotlight',
    subtitle: 'Three apps revolutionized creativity and topped App Store charts',
    label: 'Case Study',
    image: spotlightThumbnail,
    year: '2016–2023',
    slug: 'spotlight',
    impactBadge: 'Top 10 App',
    category: 'ux',
  },
  {
    id: 'screenlife',
    title: 'Iterative Design Process',
    subtitle: 'Designing the first interactive video recorder',
    label: 'Case Study',
    image: screenlifeThumbnail,
    year: '2018',
    slug: 'screenlife',
    impactBadge: 'First-of-Kind',
    category: 'ux',
  },
  {
    id: 'phantom',
    title: 'Phantom Footprint',
    subtitle: 'IoT-enhanced board game closing the climate feedback loop',
    label: 'Case Study',
    image: phantomFootprintThumbnail,
    year: '2024',
    slug: 'phantom-footprint',
    impactBadge: 'IoT Innovation',
    category: 'ux',
  },
  // Branding
  {
    id: 'branding-asi',
    title: 'Cal State EB Branding for ASI',
    subtitle: 'Bold visual language for student government',
    label: 'Brand Identity',
    image: brandingCaseStudy1,
    year: '2024',
    externalUrl: 'https://www.canva.com/design/DAG0BfinlkQ/UvL4uRgqPElvkLF6oUIEig/view?utm_content=DAG0BfinlkQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2ba7e72444',
    category: 'branding',
  },
  {
    id: 'branding-icons',
    title: 'iOS App Icon Design',
    subtitle: 'Crafting distinctive app icons for iOS',
    label: 'Visual Design',
    image: brandingIosIcons,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/12017945-iOS-App-Icon-Design',
    category: 'branding',
  },
  {
    id: 'branding-f1',
    title: 'F1 Game Design Concept',
    subtitle: 'Formula One Grand Prix Monaco mobile app concept',
    label: 'UI Design',
    image: brandingF1Design,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/14884595-F1-Formula-One-Game-Design-Concept-Grand-Prix-Monaco',
    category: 'branding',
  },
  {
    id: 'branding-hamburger',
    title: 'Hamburger Menu Icons',
    subtitle: 'Exploring delicious alternatives to the hamburger icon',
    label: 'Icon Design',
    image: brandingHamburgerIcons,
    year: '2020',
    externalUrl: 'https://dribbble.com/shots/14880132-There-are-other-delicious-foods-rather-than-the-Hamburger-icon',
    category: 'branding',
  },
  // Writing
  {
    id: 'article-storytelling',
    title: 'The Story of Storytelling in UX Design',
    subtitle: 'Exploring the power of narrative in user experience',
    label: 'Essay',
    image: articleStorytelling,
    year: '2023',
    externalUrl: 'https://medium.com/@yeasinarifin/the-story-of-storytelling-in-ux-design-b2570fd29c14',
    category: 'writing',
  },
  {
    id: 'article-interviews',
    title: 'User Interviews: The Secret Weapon',
    subtitle: 'The secret weapon of UX practitioners',
    label: 'Essay',
    image: articleUserInterviews,
    year: '2022',
    externalUrl: 'https://medium.com/@yeasinarifin/user-interviews-the-secret-weapon-of-ux-practitioners-a792146e70f6',
    category: 'writing',
  },
  {
    id: 'article-neural',
    title: 'Neural Network: The Brainy World of AI',
    subtitle: 'The brainy world of artificial intelligence',
    label: 'Essay',
    image: articleNeuralNetwork,
    year: '2024',
    externalUrl: 'https://medium.com/@yeasinarifin/neural-network-the-brainy-world-of-artificial-intelligence-daa7970807a4',
    category: 'writing',
  },
  {
    id: 'article-problem',
    title: 'The Science and Art of UX Problem-Solving',
    subtitle: 'A deep dive into UX problem-solving methodologies',
    label: 'Essay',
    image: articleProblemSolving,
    year: '2023',
    externalUrl: 'https://medium.com/@yeasinarifin/the-science-and-art-of-ux-problem-solving-180450a86f19',
    category: 'writing',
  },
  {
    id: 'article-ai-ux',
    title: 'The Power of AI in UX Design',
    subtitle: 'Generating innovative ideas with artificial intelligence',
    label: 'Essay',
    image: articleAiUx,
    year: '2024',
    externalUrl: 'https://medium.com/@yeasinarifin/unleashing-the-power-of-ai-in-ux-design-generating-innovative-ideas-71002f3e2ef6',
    category: 'writing',
  },
  {
    id: 'article-tesla',
    title: "Nikola Tesla's Research on Pyramids",
    subtitle: 'Separating fact from fiction',
    label: 'Essay',
    image: articleTeslaPyramids,
    year: '2021',
    externalUrl: 'https://medium.com/@yeasinarifin/nikola-teslas-research-on-pyramids-separating-fact-from-fiction-ec3e546bb33',
    category: 'writing',
  },
  // Academic
  {
    id: 'carepal',
    title: 'CarePal',
    subtitle: 'Designing a wellness companion for everyday care',
    label: 'Research',
    image: carepalWriting,
    year: '2024',
    externalUrl: 'https://www.canva.com/design/DAGkpwN0h1k/xyIfEievf8rfQnLJM6ccvw/view?utm_content=DAGkpwN0h1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h30849d3be1',
    category: 'academic',
  },
  {
    id: 'thesis',
    title: 'CarePal Thesis Document',
    subtitle: "Master's thesis research paper from CSU East Bay",
    label: 'Thesis',
    image: academicThesis,
    year: '2024',
    externalUrl: 'https://drive.google.com/file/d/1Be1mJV8ZjIJNeOyu6F4-KR-MvskellIJ/view?usp=sharing',
    category: 'academic',
  },
];

// ── Lazy Image ─────────────────────────────────────────
const CardImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => setIsLoaded(true), []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-muted/30">
      <div className="absolute inset-0 z-[2] pointer-events-none border border-foreground/[0.06]" />
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
        className={`no-border h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
});
CardImage.displayName = 'CardImage';

// ── Impact Badge ──────────────────────────────────────
const ImpactBadge = ({ text }: { text: string }) => (
  <div className="absolute top-4 right-4 z-10 rounded-full px-3.5 py-1.5
    bg-black/50 backdrop-blur-xl border border-white/15
    shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
    <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-white">
      {text}
    </span>
  </div>
);

// ── Category Controller ────────────────────────────────
const CategoryController = ({
  active,
  onChange,
}: {
  active: CategoryKey;
  onChange: (k: CategoryKey) => void;
}) => (
  <div className="flex items-center gap-8">
    {categories.map((cat) => (
      <button
        key={cat.key}
        onClick={() => onChange(cat.key)}
        className={`relative pb-3 text-[13px] font-medium uppercase tracking-[0.05em] transition-colors duration-300 focus-visible:outline-none
          ${active === cat.key ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'}`}
      >
        {cat.label}
        {active === cat.key && (
          <motion.div
            layoutId="works-category-underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    ))}
  </div>
);

// ── Card Component ────────────────────────────────────
const magneticSpring = { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 };

const WorkCard = ({ item, index }: { item: WorkItem; index: number }) => {
  const isExternal = !!item.externalUrl;
  const isInternal = !!item.slug;
  const CardWrapper = isExternal ? 'a' : isInternal ? Link : 'div';
  const cardProps = isExternal
    ? { href: item.externalUrl, target: '_blank', rel: 'noopener noreferrer' }
    : isInternal
      ? { to: `/case-study/${item.slug}` }
      : {};

  const { ref, disabled, cardAnimateProps, imageAnimateProps, glowStyle, isHovered, handlers } =
    useMagnetic({ radius: 100, maxOffset: 15, parallaxOffset: 5 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
    >
      <motion.div
        ref={ref}
        {...handlers}
        animate={cardAnimateProps}
        transition={magneticSpring}
        style={{ willChange: disabled ? 'auto' : 'transform' }}
      >
        <CardWrapper
          {...(cardProps as any)}
          className={`group cursor-pointer block overflow-hidden transition-all duration-500
            bg-[hsl(var(--works-card-bg))] border
            ${isHovered
              ? 'border-[hsla(0,0%,0%,0.25)] dark:border-[hsla(0,0%,100%,0.2)]'
              : 'border-[hsl(var(--works-card-border))] dark:border-[hsla(0,0%,100%,0.1)]'}
            hover:border-[hsl(var(--works-card-border-hover))]
            dark:hover:border-[hsla(0,0%,100%,0.2)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          style={{ borderRadius: '16px' }}
        >
          <article className="h-full flex flex-col relative">
            {/* Glow overlay */}
            {!disabled && isHovered && (
              <div
                className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300"
                style={{ ...glowStyle, borderRadius: '16px', opacity: isHovered ? 1 : 0 }}
              />
            )}

            {/* 4:3 Media Frame with parallax */}
            <div className="relative overflow-hidden aspect-[3/4]">
              <motion.div
                className="h-full w-full"
                animate={imageAnimateProps}
                transition={magneticSpring}
                style={{ scale: 1.05 }}
              >
                <CardImage src={item.image} alt={item.title} />
              </motion.div>
              {item.impactBadge && <ImpactBadge text={item.impactBadge} />}

              {/* View arrow on hover */}
              <div className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-white/90 dark:bg-black/70 backdrop-blur-sm">
                  <ArrowUpRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </div>
            </div>

            {/* Content — 32px internal padding */}
            <div className="p-8 flex flex-col gap-2 flex-1">
              <span className="text-[10px] font-mono font-medium uppercase tracking-[0.1em] text-muted-foreground">
                {item.label} · {item.year}
              </span>
              <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">
                {item.subtitle}
              </p>
            </div>
          </article>
        </CardWrapper>
      </motion.div>
    </motion.div>
  );
};

// ── Main Section ───────────────────────────────────────
const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('ux');

  const filtered = allWorks.filter((w) => w.category === activeCategory);

  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container">
        {/* Section header */}
        <div className="mb-16 space-y-8">
          <motion.h2
            className="font-display font-bold leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Works
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <LayoutGroup>
              <CategoryController active={activeCategory} onChange={setActiveCategory} />
            </LayoutGroup>
          </motion.div>
        </div>

        {/* Uniform 2-column grid — 40px gap */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '40px' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <WorkCard key={item.id} item={item} index={index} />
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
              No projects in this category yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudies;
