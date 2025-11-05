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

- **Custom Cursor Effect** - Rotating gradient ring with particle trails and interactive states
- **Typing Animation Hero** - Dynamic code-style text animation in the hero section
- **Animated Navigation** - Sticky header with active section tracking and smooth scrolling
- **Terminal-Style Project Cards** - Showcase projects with developer-themed design
- **Command-Line Contact Form** - Terminal-inspired contact section
- **Motion-Driven Interactions** - Smooth transitions and animations throughout

### 🛠️ Tech Stack Components

- **Animated Tech Icons** - Interactive display of technical skills
- **Blog Section** - Space for articles and technical writing
- **Project Showcase** - Highlight your best work with detailed project cards
- **About Section** - Professional introduction and background
- **Footer** - Social links and additional information

## 🔧 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
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
│   ├── CursorEffect.tsx       # Custom cursor with particle effects
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

The color scheme is defined in `styles/globals.css`. Key colors:

- **Background**: `#0a0e1a` (deep navy)
- **Primary Accent**: Cyan (`#06b6d4`)
- **Secondary Accent**: Blue (`#3b82f6`)
- **Tertiary Accent**: Violet (`#8b5cf6`)

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

### Custom Cursor Effect

The cursor features:

- Rotating gradient ring animation
- Particle trail system
- Interactive hover states (scales up, shows code brackets)
- Click ripple effects
- Smooth spring animations

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

In `components/BlogSection.tsx`, add to the posts array:

```tsx
{
  title: "Blog Post Title",
  excerpt: "Brief description...",
  date: "Jan 15, 2024",
  readTime: "5 min read",
  link: "/blog/post-slug"
}
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

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
