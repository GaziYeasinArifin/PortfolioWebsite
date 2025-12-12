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

const caseStudies: CaseStudy[] = [
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
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected Works
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
            Case Studies
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className="group card-hover cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="image-reveal relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-6">
                <img
                  src={study.image}
                  alt={study.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{study.category}</span>
                  <span>{study.year}</span>
                </div>
                <h3 className="font-display text-2xl font-medium">{study.title}</h3>
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
