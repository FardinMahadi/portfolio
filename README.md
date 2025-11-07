# 🚀 FardinMahadi's Developer Portfolio

A futuristic, VS Code-inspired portfolio website for MERN stack developer **Mahadi Hasan Fardin**. Built with modern web technologies and featuring smooth animations, interactive elements, and a sleek dark mode interface.

## [Live Link ↗️](https://fardinmahadi.vercel.app/)

![Portfolio Preview](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop)

## ✨ Features

### 🎨 Design & UI

- **VS Code-Inspired Aesthetic** - Dark mode interface with charcoal/deep navy backgrounds
- **Futuristic Color Palette** - Cyan, electric blue, and violet accents with neon glows
- **Custom Typography** - JetBrains Mono for headings, Inter for body text
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices

### 🎭 Interactive Elements

- **Target Cursor** - Interactive cursor with corner brackets that expand on hover (desktop only)
- **Typing Animation Hero** - Dynamic code-style text animation in the hero section
- **Animated Navigation** - Sticky header with active section tracking and smooth scrolling
- **Terminal-Style Project Cards** - Showcase projects with developer-themed design
- **Command-Line Contact Form** - Terminal-inspired contact section with email integration
- **Motion-Driven Interactions** - Smooth transitions and animations throughout
- **Scroll Progress Indicator** - Visual progress bar showing scroll position
- **Magnetic Buttons** - Interactive buttons that subtly follow cursor movement
- **Glassmorphism Panels** - Frosted glass effect panels with backdrop blur
- **Animated Stats Counter** - Numbers that animate when scrolled into view

### 🛠️ Tech Stack Components

- **Animated Tech Icons** - Interactive display of technical skills
- **Blog Section** - Latest articles with category filtering
- **Project Showcase** - Highlight your best work with detailed project cards
- **About Section** - Professional introduction with animated stats
- **Work Experience Timeline** - Chronological display of professional journey
- **Contact Form** - Email-integrated contact form with Resend
- **Social Links** - GitHub, LinkedIn, Email, and Discord integration
- **Footer** - Social links and additional information

### 🎨 Theme & Customization

- **Multiple Color Palettes** - Switch between 6 different color themes
- **Theme-Aware Components** - All components adapt to selected color palette
- **Persistent Theme Selection** - Theme preference saved in localStorage
- **Dynamic CSS Variables** - Smooth theme transitions

## 🔧 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced cursor animations
- **Shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library
- **Resend** - Email service integration

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/FardinMahadi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

## 🏗️ Project Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── HeroSection.tsx        # Hero section with typing animation
│   ├── Navigation.tsx         # Sticky navigation with active tracking
│   ├── TargetCursor.tsx       # Interactive cursor with corner brackets
│   ├── AboutSection.tsx       # About section component
│   ├── ProjectsSection.tsx    # Projects showcase component
│   ├── BlogSection.tsx        # Blog/articles section
│   ├── ContactSection.tsx     # Terminal-style contact form
│   ├── Footer.tsx             # Footer component
│   └── ui/                    # Shadcn UI components
├── styles/
│   └── globals.css            # Global styles and custom tokens
└── README.md
```

## 🎨 Customization

### Color Palette

The portfolio supports multiple color palettes that can be switched via the palette switcher in the navigation:

- **Cyan Blue** (Default) - Cyan, electric blue, and violet accents
- **Purple Dream** - Purple, fuchsia, and violet tones
- **Emerald Forest** - Green, emerald, and cyan accents
- **Sunset Orange** - Orange, amber, and warm tones
- **Crimson Red** - Red, pink, and vibrant accents
- **Ocean Blue** - Blue, cyan, and oceanic tones

Palettes are defined in `src/lib/colorPalettes.ts` and managed via `src/contexts/ColorPaletteContext.tsx`.

### Customizing Colors

Edit `src/lib/colorPalettes.ts` to add or modify color palettes. Each palette includes:

- Primary, Secondary, and Accent colors
- Background, Surface, Text, and Border colors

### Typography

- **Headings**: JetBrains Mono (monospace)
- **Body**: Inter (sans-serif)

### Personal Information

Update the following files with your information:

- `components/HeroSection.tsx` - Name and title
- `components/AboutSection.tsx` - Bio and background
- `components/ProjectsSection.tsx` - Your projects
- `components/BlogSection.tsx` - Your articles
- `components/ContactSection.tsx` - Contact details and social links
- `components/Footer.tsx` - Footer information

### Navigation Sections

Modify sections in `components/Navigation.tsx`:

```tsx
const navItems = [
  { name: "Home", href: "#home", icon: "~/" },
  { name: "About", href: "#about", icon: "</>" },
  // Add or modify sections here
];
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The build output will be in the `.next/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 🎯 Key Features Explained

### Target Cursor

The cursor features:

- Rotating corner brackets that expand on hover
- Interactive hover states that form borders around clickable elements
- Smooth GSAP animations
- Click animations (scale feedback)
- Parallax effects when moving over targets

### Typing Animation

The hero section includes a realistic typing effect that displays:

```javascript
const dev = "Mahadi Hasan Fardin";
```

### Smooth Scroll Navigation

Navigation automatically:

- Highlights the active section as you scroll
- Provides smooth scrolling to sections
- Becomes translucent with backdrop blur when scrolled

## 📝 Adding Content

### Adding a New Project

In `components/ProjectsSection.tsx`, add to the projects array:

```tsx
{
  title: "Project Name",
  description: "Project description",
  tech: ["React", "Node.js", "MongoDB"],
  github: "https://github.com/...",
  demo: "https://demo-url.com"
}
```

### Adding a Blog Post

Blog posts are stored in `src/data/blogPosts.json`. Add a new entry:

```json
{
  "title": "Blog Post Title",
  "excerpt": "Brief description...",
  "date": "Jan 15, 2024",
  "readTime": "5 min read",
  "category": "Learning",
  "slug": "blog-post-slug",
  "content": "# Your markdown content here..."
}
```

### Setting Up Email Integration

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key from the Resend dashboard
3. Create `.env.local` file in the project root:

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev  # Or your verified domain
```

4. Restart your dev server: `npm run dev`

The contact form will automatically use Resend when `RESEND_API_KEY` is set, otherwise it logs to console for development.

## 📚 Documentation

- **[Style Guide](./doc/STYLE_GUIDE.md)** - Comprehensive coding style, patterns, and conventions
- **[AI Training Guide](./doc/AI_TRAINING_GUIDE.md)** - Quick reference for AI assistants
- **[Blog Topics](./doc/BLOG_TOPICS.md)** - Comprehensive list of blog topics for beginners

## 🎯 Key Features Explained

### Interactive Effects

- **Target Cursor** - GSAP-powered cursor with rotating corner brackets
- **Scroll Progress Indicator** - Top progress bar showing scroll position
- **Magnetic Buttons** - Buttons that subtly follow cursor movement
- **Glassmorphism Panels** - Frosted glass effect with backdrop blur
- **Animated Stats Counter** - Numbers that count up when scrolled into view

### Blog Features

- **Category Filtering** - Filter articles by category (YouTube-style)
- **JSON-Based Content** - Blog posts stored in `src/data/blogPosts.json`
- **Markdown Support** - Full markdown rendering with syntax highlighting
- **SEO Optimized** - Structured data and metadata for search engines

### Contact Form

- **Email Integration** - Resend API integration for sending emails
- **Form Validation** - Client-side validation with error handling
- **Success/Error States** - Visual feedback for form submissions
- **Development Mode** - Console logging when API key is not set

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

When contributing, please follow the [Style Guide](./doc/STYLE_GUIDE.md) to maintain consistency.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mahadi Hasan Fardin**

- MERN Stack Developer
- Portfolio: [fardinmahadi.vercel.com](https://fardinmahadi.vercel.app/)
- GitHub: [@FardinMahadi](https://github.com/FardinMahadi/)
- LinkedIn: [mahadi-hasan-fardin](https://www.linkedin.com/in/mahadi-hasan-fardin)

## 🙏 Acknowledgments

- Design inspiration from VS Code and modern developer tools
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Animations powered by [Motion (Framer Motion)](https://motion.dev/)

---

⭐ Star this repo if you find it helpful!

Made with 💙 by [@FardinMahadi](https://github.com/FardinMahadi/)
