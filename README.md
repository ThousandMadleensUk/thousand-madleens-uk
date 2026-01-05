# Thousand Madleens to Gaza - UK Delegation Website

Campaign website for the UK delegation of the Thousand Madleens to Gaza flotilla, sailing Spring 2026.

## Development

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Management

Content is managed through [Decap CMS](https://decapcms.org/) (formerly Netlify CMS):

- **Local development:** Access at [http://localhost:3000/admin](http://localhost:3000/admin)
- **Production:** Access at your-domain.com/admin

All content is stored in `content.json` and committed to the repository.

### CMS Features
- Edit site copy, mission statements, goals
- Manage events with detail pages
- Update press releases and social links
- Configure navigation and footer

## Deployment

The site is deployed to **Cloudflare Pages** with automatic builds from the `main` branch.

Uses [@cloudflare/next-on-pages](https://www.npmjs.com/package/@cloudflare/next-on-pages) to adapt Next.js for Cloudflare's edge runtime.

**Build settings:**
- Build command: `npx @cloudflare/next-on-pages`
- Build output directory: `.vercel/output/static`

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Decap CMS](https://decapcms.org/) - Content management
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting
