# Corvo Labs Website 2.0

A sophisticated healthcare AI consulting website built with Next.js 15, TypeScript, and TailwindCSS, featuring enhanced animations, modern UI/UX, and optimized performance.

## 🚀 Features

### Core Capabilities
- **Modern Tech Stack**: Next.js 15.4.3 with App Router, TypeScript, and TailwindCSS
- **Advanced Animations**: Framer Motion 12.23.24 with parallax effects and scroll animations
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Healthcare Focus**: Specialized content for healthcare AI consulting and workflow automation
- **Performance Optimized**: Image optimization, lazy loading, and efficient bundle management

### Key Components
- **Enhanced Hero Section**: Animated crow logo, company branding, and CTAs with hover effects
- **Services Showcase**: Detailed service offerings with transparent icons and descriptions
- **About Page**: Company story, healthcare domain expertise, leadership timeline, and trust indicators
- **Interactive Navigation**: Dropdown menus with smooth animations and mobile responsiveness
- **Contact Forms**: Multi-step contact forms with validation and professional layout
- **Call-to-Action**: Gradient-based CTA sections with compelling messaging

### Visual Enhancements
- **Transparent Background Icons**: All icons use *-no-bg.png versions for clean integration
- **Optimized Images**: Compressed image assets (~87% size reduction)
- **Professional Animations**: Smooth transitions, parallax scrolling, and micro-interactions
- **Modern Color Scheme**: Healthcare-appropriate color palette with accent colors
- **Typography**: Optimized font hierarchy for readability and professional appearance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.3 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 3.4.18
- **Animations**: Framer Motion 12.23.24
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component + custom compression

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd corvo-labs-enhanced
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
corvo-labs-enhanced/
├── public/
│   └── images/              # Optimized image assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── about/           # About page with timeline and expertise
│   │   ├── blog/            # Blog listing and individual posts
│   │   ├── contact/         # Contact form and information
│   │   ├── projects/        # Projects showcase
│   │   ├── services/        # Services details
│   │   ├── layout.tsx       # Root layout with navigation
│   │   └── page.tsx         # Homepage with hero section
│   ├── components/
│   │   ├── enhanced-*.tsx   # Enhanced UI components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   └── hooks/               # Custom React hooks
├── docs/                    # Documentation from previous versions
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Healthcare-appropriate blues and whites
- **Accent**: Golden/yellow highlights for CTAs
- **Text**: High contrast for accessibility
- **Gradients**: Professional gradient overlays for visual interest

### Typography
- **Headings**: Bold, professional fonts for hierarchy
- **Body**: Clean, readable fonts for content
- **UI Elements**: Consistent sizing and spacing

### Animation Guidelines
- **Entrance Animations**: Smooth fade-ins with stagger effects
- **Hover States**: Subtle scale and color transitions
- **Scroll Effects**: Parallax and reveal animations
- **Loading States**: Professional loading indicators

## 📱 Responsive Design

- **Mobile**: 320px and up - Single column layout, touch-friendly navigation
- **Tablet**: 768px and up - Multi-column layouts, hover interactions
- **Desktop**: 1024px and up - Full layout experience, enhanced animations

## ⚡ Performance Optimizations

- **Image Optimization**: WebP format, lazy loading, proper sizing
- **Code Splitting**: Automatic route-based and component-based splitting
- **Bundle Optimization**: Tree shaking, minification, compression
- **Caching**: Proper caching headers and strategies

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality

- **TypeScript**: Strict type checking for better code quality
- **ESLint**: Consistent code formatting and error prevention
- **Prettier**: Code formatting (configured via ESLint)
- **Git Hooks**: Pre-commit hooks for code quality

## 📊 Analytics & Monitoring

- **Performance Monitoring**: Built-in Next.js analytics
- **Error Tracking**: Comprehensive error boundaries and logging
- **User Interactions**: Track engagement with CTA buttons and forms

## 🚀 Deployment

### Build Process

```bash
npm run build
npm run start
```

The application is optimized for deployment on:
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with good Next.js support
- **AWS Amplify**: Enterprise-grade hosting

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```bash
# Analytics and monitoring
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Contact form and API endpoints
CONTACT_API_ENDPOINT=your_contact_api
```

## 📝 Documentation

Additional documentation is available in the `/docs` directory:

- `MAILERLITE_SETUP.md` - Newsletter integration setup
- `PROJECT_DATA_STRUCTURE.md` - Project showcase data structure
- `COMMENTS_SETUP.md` - Comment system configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and TypeScript patterns
- Ensure all animations are smooth and performant
- Test responsive design at all breakpoints
- Validate accessibility (WCAG 2.1 AA compliance)
- Update documentation for new features

## 📄 License

This project is proprietary software for Corvo Labs. All rights reserved.

## 📞 Support

For support or questions about the website:
- Visit [Corvo Labs](https://corvo-labs.com)
- Email: info@corvo-labs.com

---

**Version**: 2.0.0
**Last Updated**: November 2024
**Framework**: Next.js 15.4.3