# Advanced Hero Section

A sophisticated, production-ready hero section for the Corvo Labs website featuring 3D transforms, interactive elements, and professional healthcare AI consulting aesthetics.

## Features

### 🎨 Visual Effects
- **3D Transform Effects**: Perspective animations with mouse-tracking
- **Parallax Scrolling**: Multi-layer parallax with smooth transitions
- **Floating Geometric Shapes**: AI-inspired animated background elements
- **Gradient Mesh**: Professional gradient overlays with grid patterns
- **Pulse Waves**: Subtle animated wave effects
- **Text Reveal Animations**: Staggered word-by-word text animations

### 🎯 Interactive Elements
- **Mouse Tracking**: Real-time 3D rotation based on cursor position
- **Animated Stats Counter**: Smooth counting animations with easing
- **Interactive CTA Buttons**: 3D hover effects with shimmer animations
- **Feature Cards**: Hover states with transform and shadow effects
- **Performance Monitoring**: Real-time FPS tracking and optimization

### ⚡ Performance
- **60 FPS Optimization**: Hardware-accelerated animations
- **Reduced Motion Support**: Accessibility-first animation preferences
- **Mobile Optimization**: Responsive design with touch-friendly interactions
- **Performance Monitoring**: Built-in performance analytics
- **Lazy Loading**: Intersection Observer for efficient animations

### 🏥 Healthcare Aesthetics
- **Professional Color Scheme**: 85% monochromatic with strategic AI accent colors
- **Medical-Inspired Shapes**: DNA helix, neural network, hexagon patterns
- **Trustworthy Design**: Clean, professional appearance
- **Accessibility**: WCAG AA compliance with proper contrast and focus states

## Installation

```bash
# The hero section uses existing dependencies in the project
# No additional installation required
```

## Usage

### Basic Implementation

```tsx
import AdvancedHeroSection from '@/components/hero'

export default function HomePage() {
  return (
    <main>
      <AdvancedHeroSection />
      {/* Rest of your page content */}
    </main>
  )
}
```

### Custom Configuration

```tsx
import { AdvancedHeroSection, useHeroInteractions } from '@/components/hero'

export default function CustomHeroPage() {
  const interactions = useHeroInteractions({
    enableParallax: true,
    enable3D: true,
    parallaxStrength: 0.05,
    rotationStrength: 0.003
  })

  return (
    <AdvancedHeroSection />
  )
}
```

## Component Structure

```
src/components/hero/
├── index.ts                    # Exports and barrel file
├── advanced-hero-section.tsx   # Main hero component
├── hero-animations.tsx         # Animation components
├── interactive-elements.tsx    # Interactive UI elements
├── hero-styles.css            # Custom CSS styles
└── README.md                  # Documentation
```

## Customization

### Content Configuration

Edit the `HERO_CONTENT` object in `advanced-hero-section.tsx`:

```tsx
const HERO_CONTENT = {
  headline: "Your Custom Headline",
  subhead: "Your custom subheading text",
  ctaPrimary: {
    text: "Primary Button Text",
    href: "/your-link"
  },
  stats: [
    {
      value: 100,
      suffix: "+",
      label: "Custom Metric",
      description: "Metric description"
    }
  ],
  features: [
    {
      title: "Feature Title",
      description: "Feature description",
      icon: <YourIcon />
    }
  ]
}
```

### Animation Settings

Modify interaction settings:

```tsx
const interactions = useHeroInteractions({
  enableParallax: true,        // Enable/disable parallax effects
  enable3D: true,             // Enable/disable 3D transforms
  enableMouseTracking: true,  // Enable/disable mouse tracking
  parallaxStrength: 0.03,     // Parallax intensity (0-1)
  rotationStrength: 0.002,    // 3D rotation intensity (0-1)
  smoothness: 0.85           // Animation smoothness (0-1)
})
```

### Color Customization

Update colors in `FloatingShapes` component:

```tsx
const colors = [
  'rgba(59, 130, 246, 0.1)',  // Blue
  'rgba(147, 51, 234, 0.1)',  // Purple
  'rgba(236, 72, 153, 0.1)',  // Pink
  // Add your custom colors
]
```

## Performance Optimization

### Monitoring Performance

The hero section includes built-in performance monitoring:

```tsx
// Performance metrics are available in development mode
const { performanceMetrics } = useHeroInteractions()

console.log(`FPS: ${performanceMetrics.fps}`)
console.log(`Is Optimal: ${performanceMetrics.isOptimal}`)
```

### Optimization Tips

1. **Reduce Shape Count**: Lower the `count` prop in `FloatingShapes`
2. **Disable Animations**: Set `enableParallax: false` for better performance
3. **Use Reduced Motion**: Respects user's motion preferences automatically
4. **Monitor FPS**: Use the development FPS indicator for optimization

## Accessibility

### Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **High Contrast**: Supports `prefers-contrast: high` mode
- **Focus Management**: Visible focus indicators for all interactive elements

### WCAG Compliance

The hero section is designed to meet WCAG AA standards:

- **Color Contrast**: Minimum 4.5:1 contrast ratio for text
- **Keyboard Accessible**: All functionality available via keyboard
- **Screen Reader Friendly**: Proper heading hierarchy and descriptive text
- **Motion Control**: Users can disable animations

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Graceful degradation for older browsers

## Performance Metrics

### Target Performance
- **FPS**: 60 FPS on desktop, 30+ FPS on mobile
- **Load Time**: < 2 seconds initial load
- **Interaction Delay**: < 100ms response time
- **Core Web Vitals**: > 90 score

### Optimization Techniques
- **Hardware Acceleration**: GPU-accelerated transforms
- **Intersection Observer**: Efficient scroll-triggered animations
- **Spring Physics**: Smooth, natural-feeling animations
- **Lazy Loading**: Components load only when needed

## Troubleshooting

### Common Issues

**Low FPS on mobile:**
```tsx
// Reduce animation complexity
const interactions = useHeroInteractions({
  enable3D: false,  // Disable 3D transforms
  parallaxStrength: 0.01  // Reduce parallax intensity
})
```

**Animations not working:**
```tsx
// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Animations are disabled for accessibility
}
```

**Performance issues:**
```tsx
// Monitor performance in development
// Look at the FPS indicator in bottom-left corner
// Reduce shape count or disable effects if needed
```

## Contributing

When modifying the hero section:

1. **Test Performance**: Ensure 60 FPS on target devices
2. **Check Accessibility**: Verify WCAG AA compliance
3. **Test Responsiveness**: Ensure mobile compatibility
4. **Validate Animations**: Test with reduced motion preferences
5. **Monitor Bundle Size**: Keep component optimized

## License

This component is part of the Corvo Labs website project.