# Sanity CMS Setup Guide

Complete guide to set up and use Sanity CMS for your Kidan Studios website.

---

## 📋 Overview

Your website now uses Sanity CMS to manage all content (projects, blog posts, images) separately from your code. This means you can update content without committing code changes to git.

**What's been set up:**
- ✅ Sanity Studio (CMS admin interface)
- ✅ Content schemas for projects, blog posts, and page content
- ✅ Next.js integration with automatic data fetching
- ✅ Image optimization through Sanity CDN
- ✅ TypeScript types for all content

---

## 🚀 Quick Start (First Time Setup)

### Step 1: Create a Sanity Account & Project

1. Go to [sanity.io](https://sanity.io) and sign up for a free account
2. Create a new project (you can do this via the CLI in step 2)

### Step 2: Initialize Sanity Studio

```bash
# Navigate to the studio folder
cd studio

# Install dependencies
npm install

# Initialize Sanity (follow the prompts)
npx sanity init

# When prompted:
# - Choose "Use existing project" if you created one, or "Create new project"
# - Select dataset: "production"
# - Confirm project details
```

This will create a `studio/.env` file with your project credentials.

### Step 3: Configure Environment Variables

1. **Copy the Sanity project ID** from `studio/.env`

2. **Create `.env.local` in your main project root:**

```bash
# From the main project root (not studio/)
cp .env.local.example .env.local
```

3. **Edit `.env.local`** and add your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 4: Deploy Sanity Schemas

```bash
# From the studio/ folder
cd studio
npx sanity schema deploy
```

This uploads your content schemas to Sanity.

### Step 5: Start Sanity Studio

```bash
# From the studio/ folder
npm run dev
```

Sanity Studio will open at **http://localhost:3333**

---

## 📝 Adding Your Content to Sanity

### Adding Projects

1. Open Sanity Studio at http://localhost:3333
2. Click **"Project"** in the sidebar
3. Click **"+ Create"**
4. Fill in the fields:

**Basic Info:**
- **Title:** e.g., "Kidan Coffee"
- **Slug:** Click "Generate" (creates URL: `kidan-coffee`)
- **Description:** Brief project description
- **Year:** "2026"
- **Role:** "Design & Development"
- **Status:** "Self-initiated build"

**Hero Image:**
- Click **"Upload"** and select your main project image
- Add alt text for accessibility

**Brief & Approach:**
- Write paragraphs in the rich text editor
- Format with headings, bold, italics as needed

**Built List:**
- Click **"+ Add item"** to create each column
- Add items for each column (e.g., "custom dawn theme", "origin content sections")

**Project Screenshots:**
- Click **"+ Add item"** for each screenshot
- Upload image, add alt text and caption
- Drag to reorder

**Related Project:**
- Select another project from the dropdown (add projects first)
- Upload 4 preview images for the related project section

4. Click **"Publish"** when done

**Repeat for all projects** (Kidan Coffee, Eco Cycles)

---

### Adding Blog Posts

1. Click **"Blog Post"** in Sanity Studio
2. Click **"+ Create"**
3. Fill in:

**Basic Info:**
- **Title:** Full blog post title
- **Slug:** Click "Generate"
- **Standfirst:** Brief intro/summary
- **Category:** Choose from dropdown (Tips & Tutorials, Industry Insights, etc.)
- **Published Date:** Select date
- **Read Time:** e.g., "7 min read"

**Featured Image:**
- Upload blog header image
- Add alt text

**Body Content:**
- Write your article in the rich text editor
- Use **H2** for main sections
- Use **H3** for subsections
- Add **links**, **bold**, *italic* formatting
- Insert images inline if needed
- All H2 headings automatically become anchor links

**Related Post:**
- Link to another blog post (optional)

4. Click **"Publish"**

**Repeat for all blog posts**

---

### Adding Home Page Content

1. Click **"Home Page Content"** in Sanity Studio
2. There should only be **one** home page document - edit it

Fill in all sections:
- **Hero Section:** Main heading, eyebrow, lede, status, CTAs
- **Trust Bar:** Four items with icons (i-globe, i-store, i-bolt, i-box)
- **Work Section:** Heading and subtitle
- **Services Section:** Heading and subtitle
- **Blog Section:** Heading and subtitle
- **Closing CTA:** Final call-to-action text

3. Click **"Publish"**

---

### Adding Site Settings

1. Click **"Site Settings"**
2. Edit the single document:
   - Site title, description, URL
   - Ticker messages (scrolling text)
   - Navigation links
   - Social links

3. Click **"Publish"**

---

## 🖼️ Image Migration

You need to upload your existing images from `/public/` to Sanity:

**Current images to upload:**

**Projects (Kidan Coffee):**
- `/public/img-cafe-wide.jpg` → Hero Image
- `/public/img-cafe-entrance.jpg` → Screenshot 1
- `/public/img-cafe-team.jpg` → Screenshot 2
- `/public/img-cafe-pastries.jpg` → Screenshot 3
- `/public/img-cafe-room.jpg` → Screenshot 4
- `/public/img-cafe-counter.jpg` → Screenshot 5
- Related project preview images

**Projects (Eco Cycles):**
- `/public/img-eco-hero.jpg` → Hero Image
- `/public/img-eco-rider.jpg` → Screenshot 1
- `/public/img-eco-bike.jpg` → Screenshot 2
- `/public/img-eco-cta.jpg` → Screenshot 3
- `/public/img-eco-nav.jpg` → Screenshot 4
- Related project preview images

**Blog Posts:**
- `/public/img-cafe-blog-a.jpg` → Featured image (Specialty Coffee post)
- `/public/img-cafe-blog-b.jpg` → Featured image (London Coffee Festival post)

**How to upload:**
1. When editing content in Sanity Studio
2. Click the image upload button
3. Select the corresponding image from `/public/`
4. Sanity will upload it to their CDN and optimize it automatically

**After migration:** You can delete images from `/public/` if you want (keep them as backup initially)

---

## 🔄 Daily Workflow

### To Update Content:

1. **Start Sanity Studio:**
   ```bash
   cd studio
   npm run dev
   ```

2. **Open** http://localhost:3333

3. **Edit your content** (projects, posts, images)

4. **Click "Publish"**

5. **Refresh your Next.js site** - changes appear immediately!

### To Update Your Website Code:

```bash
# From main project root
npm run dev
```

Open http://localhost:3000

---

## 🌐 Deployment

### Deploy Sanity Studio (CMS Admin)

**Option 1: Vercel (Recommended)**

1. Create a new project on Vercel
2. Point it to the `/studio` folder
3. Add environment variables from `studio/.env`
4. Deploy

Your CMS will be accessible at: `https://your-studio.vercel.app`

**Option 2: Sanity's Built-in Hosting**

```bash
cd studio
npx sanity deploy
```

Choose a studio hostname (e.g., `kidan-studios`)
Your CMS will be at: `https://kidan-studios.sanity.studio`

### Deploy Next.js Website

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

Your site will automatically fetch content from Sanity!

---

## 🎯 Content vs Code: What Goes Where

**Sanity (No code commits needed):**
- ✅ Project descriptions, images, screenshots
- ✅ Blog post content and images  
- ✅ Homepage hero text, trust bar
- ✅ Section headings and copy
- ✅ All images (automatically optimized)

**Code (Requires git commit):**
- ✅ Layout and design changes
- ✅ New components or features
- ✅ CSS/styling updates
- ✅ Site functionality

---

## 🛠️ Troubleshooting

### "Cannot connect to Sanity"

**Check:**
1. Is `studio/npm run dev` running?
2. Are environment variables set in `.env.local`?
3. Is the project ID correct?

### "No content showing on website"

**Check:**
1. Have you published content in Sanity Studio?
2. Are environment variables correct in `.env.local`?
3. Did you restart the Next.js dev server after adding `.env.local`?

### "Images not loading"

**Check:**
1. Are images uploaded and published in Sanity?
2. Is the project ID in environment variables correct?
3. Check browser console for errors

---

## 📚 Useful Commands

```bash
# Start Sanity Studio (CMS)
cd studio && npm run dev

# Start Next.js website
npm run dev

# Build for production
npm run build

# Deploy Sanity Studio
cd studio && npx sanity deploy

# View Sanity project in browser
cd studio && npx sanity manage
```

---

## 🔗 Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio](http://localhost:3333) (when running locally)
- [Next.js Documentation](https://nextjs.org/docs)
- Your Sanity Project: https://www.sanity.io/manage

---

## 💡 Tips

1. **Always publish** - Draft content won't appear on your site
2. **Use descriptive alt text** - Good for SEO and accessibility
3. **Optimize before upload** - While Sanity optimizes images, starting with reasonable file sizes helps
4. **Preview before publish** - Check your content looks right in Sanity
5. **Backup images** - Keep originals somewhere safe before deleting from `/public`

---

## 🎉 You're All Set!

Your content is now decoupled from your code. Update content anytime through Sanity Studio without touching code or committing to git!

**Questions?** Check the Sanity docs or Next.js documentation.
