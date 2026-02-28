# Random Image Gallery

A simple Next.js website that displays a different random image each time you visit.

![Random Image Gallery](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-teal)

## Features

- 🖼️ Random image display from Unsplash
- 🔄 "Show Another Image" button to fetch new images
- ⏳ Loading state while fetching
- 📱 Responsive design with Tailwind CSS
- 🌓 Dark mode support
- ⚡ API route for fetching images

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Unsplash Source API

## API Route

### GET /api/random-image

Returns a random image URL and photographer information.

**Response:**
```json
{
  "imageUrl": "https://images.unsplash.com/...",
  "photographer": "Unsplash Photographer"
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nimbus-kallosoft/random-image-kallossoft-co)

## Custom Domain

To deploy with the custom domain `random-image.kallossoft.co`:

1. Deploy the project to Vercel
2. Add the domain in Vercel dashboard:
   - Go to Project Settings → Domains
   - Add `random-image.kallossoft.co`
3. Configure DNS:
   - Add a CNAME record pointing to `cname.vercel-dns.com`

## License

MIT
