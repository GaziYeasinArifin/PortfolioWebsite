import { ArrowUpRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'The Psychology of Micro-interactions',
    excerpt: 'How subtle animations create emotional connections with users.',
    date: 'Dec 2024',
    readTime: '5 min read',
    link: '#',
  },
  {
    id: 2,
    title: 'Designing for Accessibility First',
    excerpt: 'Why inclusive design should be your starting point, not an afterthought.',
    date: 'Nov 2024',
    readTime: '7 min read',
    link: '#',
  },
  {
    id: 3,
    title: 'The Future of Spatial Computing',
    excerpt: 'Preparing for the next paradigm shift in human-computer interaction.',
    date: 'Oct 2024',
    readTime: '8 min read',
    link: '#',
  },
];

const Articles = () => {
  return (
    <section id="articles" className="bg-secondary/30 py-24 md:py-32">
      <div className="container">
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Thoughts
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
              Articles & Insights
            </h2>
          </div>
          <a
            href="#"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium"
          >
            read all on medium
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="divide-y divide-border">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              className="group flex flex-col gap-4 py-8 transition-all first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-medium transition-colors group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm text-muted-foreground">
                <span>{article.date}</span>
                <span className="text-border">•</span>
                <span>{article.readTime}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
