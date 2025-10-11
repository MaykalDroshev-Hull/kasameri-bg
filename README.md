# Kasameri EOOD - Website

A modern, responsive website for Kasameri EOOD, an agricultural business specializing in quality fruits, vegetables, and 100% natural apple juice from the Lovech region of Bulgaria.

## 🌟 Features

- **Hero Section** - Stunning orchard background with compelling headline
- **Sticky Trust Bar** - Highlights 12+ years experience, location, and family business values
- **Products Grid** - Beautiful cards showcasing apples, cherries, pears, melons, tomatoes, potatoes, quinces, and their featured 100% apple juice
- **Process Timeline** - 6-step production process from harvest to bottling
- **Sustainability Section** - Water recycling, zero waste, and local employment initiatives
- **Distributor Partnership** - Form and benefits for potential distributors
- **Photo Gallery** - Interactive grid showcasing their operations
- **Testimonials** - Customer reviews with 5-star ratings
- **Contact Section** - Full contact info, map, and contact form
- **WhatsApp Float Button** - Easy customer communication

## 🎨 Design

The design uses warm, earthy colors that perfectly represent an organic, farm-to-table business:

- Burgundy `#7A0B18`
- Green `#4C8F3A`
- Cream `#FFF7ED`
- Golden `#EFBF3A`
- Brown `#6B4423`

All text is in Bulgarian with English subtitles where appropriate.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.0.0 or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🏗️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Ready for Vercel, Netlify, or any Node.js hosting

## 📁 Project Structure

```
kasameri-bg/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page component
├── components/
│   ├── Topbar.tsx           # Navigation with scroll effect
│   ├── Hero.tsx             # Hero section
│   ├── TrustBar.tsx         # Sticky trust indicators
│   ├── AboutUs.tsx          # Our Land section with map
│   ├── Product.tsx          # Products grid
│   ├── Process.tsx          # Production process timeline
│   ├── Sustainability.tsx   # Sustainability initiatives
│   ├── Distributors.tsx     # Distributor partnership section
│   ├── Gallery.tsx          # Photo gallery
│   ├── Testimonials.tsx     # Customer testimonials
│   ├── Contact.tsx          # Contact form and info
│   ├── Footer.tsx           # Footer with links
│   └── WhatsAppButton.tsx   # Floating WhatsApp button
├── public/                   # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Performance Optimizations

- Server-side rendering with Next.js
- Optimized images with WebP and AVIF formats
- CSS purging with Tailwind CSS
- Code splitting and lazy loading
- Production build removes console logs
- Smooth scroll behavior
- Hardware-accelerated animations

## 📝 Customization

To customize the website content:

1. **Products:** Edit the `products` array in `components/Product.tsx`
2. **Process Steps:** Edit the `processSteps` array in `components/Process.tsx`
3. **Testimonials:** Update testimonials in `components/Testimonials.tsx`
4. **Contact Info:** Update contact details in `components/Contact.tsx`
5. **Colors:** Modify colors in `tailwind.config.ts`

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder with a Node.js runtime.

## 📧 Contact

Kasameri EOOD  
Aleksandrovo 5572, Lovech, Bulgaria  
Email: info@kasameri.bg  
Sales: sales@kasameri.bg

## 📄 License

© 2025 Kasameri EOOD. All rights reserved.
