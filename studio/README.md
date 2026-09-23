# Kidan Studios - Sanity Studio

This is the content management system (CMS) for the Kidan Studios website.

## Getting Started

### First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Sanity (if not done already):**
   ```bash
   npx sanity init
   ```
   
   Follow the prompts to connect to your Sanity project.

3. **Start the studio:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3333](http://localhost:3333) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the studio for production
- `npx sanity deploy` - Deploy the studio to Sanity's hosting
- `npx sanity schema deploy` - Deploy/update content schemas

## Content Types

### Project
Portfolio projects with images, descriptions, and case study details.

### Blog Post
Articles with rich text content, featured images, and related posts.

### Home Page Content
Homepage sections: hero, trust bar, work section, services, blog section.

### Site Settings
Global settings: navigation, social links, ticker messages.

## Deployment

Deploy to Sanity's hosting:
```bash
npx sanity deploy
```

Or deploy to Vercel/Netlify by pointing to this `/studio` folder.

## Learn More

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Docs](https://www.sanity.io/docs/schema-types)
- [Main Setup Guide](../SANITY_SETUP.md)
