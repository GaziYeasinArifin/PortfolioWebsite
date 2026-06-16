# gaziarifin.com — Personal Portfolio

The source for my personal portfolio: [gaziarifin.com](https://gaziarifin.com)

I am **Gazi Yeasin Arifin**, a Product Designer and Design Engineer. I design AI-first product experiences and build them end to end, from interaction concept through production code. This site is where my case studies, shipped products, and writing live, and it is built to a high craft bar as a sample of how I think about motion, performance, and detail.

## Highlights

- **Motion-led interaction design** — Framer Motion for choreography, Lenis for smooth scroll, plus custom magnetic and reveal interactions.
- **Bespoke visual components** — kinetic and atmospheric backgrounds (NeuralField, GeometricKinetic, AtmosphericBackground) rather than off-the-shelf templates.
- **Full case studies** — long-form, image-rich write-ups for Screenlife, Phantom Footprint, Add Music to Video, and Spotlight.
- **Light and dark themes** — a complete token-driven theming system with no flash of incorrect theme on load.
- **Accessible, responsive, performance-minded** — semantic markup, optimized image loading, and font preconnect.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite (SWC) |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Motion | Framer Motion + Lenis |
| Routing | React Router |
| Data/State | TanStack Query |
| Icons | lucide-react |

## Getting Started

Requires Node.js 18+ and npm.

    git clone https://github.com/GaziYeasinArifin/PortfolioWebsite.git
    cd PortfolioWebsite
    npm install
    npm run dev

## Scripts

| Command | Description |
| --- | --- |
| npm run dev | Start the Vite dev server with hot reload |
| npm run build | Produce a production build in dist/ |
| npm run preview | Preview the production build locally |
| npm run lint | Run ESLint across the project |

## Project Structure

    public/                 Static assets (favicon, resume PDF, OG image, robots.txt)
    src/
      assets/               Case-study imagery and media
      components/           Section + interaction components (Hero, CaseStudies, Contact, ...)
        ui/                 shadcn/ui primitives
      hooks/                Custom hooks (use-lenis, use-magnetic, use-mobile, ...)
      lib/                  Utilities
      pages/                Routed pages (Index, About, case studies, NotFound)
      index.css             Tailwind layers + design tokens (light/dark)
      App.tsx               App shell, providers, and routes
      main.tsx              Entry point
    index.html              Document shell, meta/OG tags, font + theme bootstrap
    tailwind.config.ts      Tailwind + design-system configuration
    vite.config.ts          Vite configuration

## Routes

| Path | Page |
| --- | --- |
| / | Home |
| /about | About |
| /case-study/screenlife | Screenlife case study |
| /case-study/phantom-footprint | Phantom Footprint case study |
| /case-study/add-music-to-video | Add Music to Video case study |
| /case-study/spotlight | Spotlight case study |

## Deployment

The app builds to a static dist/ bundle and can be hosted on any static host (Vercel, Netlify, Cloudflare Pages, etc.):

    npm run build
    npm run preview

## License

This repository is shared as a portfolio reference. The code may be read for reference, but the content, copy, branding, and case-study material are not licensed for reuse. Please reach out before repurposing any part of it.

## Contact

- Portfolio: [gaziarifin.com](https://gaziarifin.com)
- Email: arifin.yeasin@gmail.com
