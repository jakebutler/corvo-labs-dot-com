# Animation Infrastructure for Corvo Labs Website 2.0

A comprehensive, production-ready animation system specifically designed for healthcare AI consulting websites with focus on performance, accessibility, and professional aesthetics.

## 🎯 Overview

This animation infrastructure provides:

- **60fps Performance**: Intelligent performance monitoring and adaptive quality
- **Accessibility First**: Full WCAG compliance with reduced motion support
- **Healthcare Themed**: Professional animations with medical precision timing
- **3D Interactions**: Advanced 3D transforms and gesture recognition
- **Mobile Optimized**: Responsive animations that adapt to device capabilities
- **TypeScript**: Full type safety and IntelliSense support

## 🚀 Quick Start

```tsx
import {
  ScrollReveal,
  Interactive3DCard,
  HeartbeatAnimation,
  useAnimationAccessibility
} from '@/lib/animations'

function MyComponent() {
  const { shouldReduceAnimation } = useAnimationAccessibility()

  return (
    <ScrollReveal>
      <Interactive3DCard disabled={shouldReduceAnimation()}>
        <HeartbeatAnimation active={true} />
      </Interactive3DCard>
    </ScrollReveal>
  )
}
```

## 📁 Architecture

```
src/lib/animations/
├── index.ts                    # Main exports
├── performance-utils.ts        # Performance monitoring
├── animation-hooks.ts          # Custom React hooks
├── accessibility-utils.ts      # Accessibility features
├── animation-config.ts         # Configuration system
└── README.md                   # This documentation

src/components/animations/
├── animation-primitives.tsx    # Core animation components
├── advanced/
│   ├── medical-animations.tsx  # Healthcare-themed animations
│   └── interactive-3d.tsx      # 3D interaction components
└── showcase/
    └── animation-showcase.tsx  # Demo component
```

## 🎨 Animation Components

### Core Primitives

#### `ScrollReveal`
Trigger animations when elements enter the viewport.

```tsx
<ScrollReveal
  variant="fadeInUp"
  delay={0.2}
  threshold={0.1}
  className="my-element"
>
  <div>Animated content</div>
</ScrollReveal>
```

**Props:**
- `variant`: Animation variant ('fadeIn', 'slideInLeft', 'scaleIn', etc.)
- `delay`: Delay in seconds before animation starts
- `threshold`: Visibility threshold (0-1)
- `once`: Whether animation should only trigger once

#### `Interactive3DCard`
3D card with mouse-tracking perspective effects.

```tsx
<Interactive3DCard
  intensity={15}
  perspective={1000}
  glowEffect={true}
  shadowColor="#3B82F6"
>
  <div>Card content</div>
</Interactive3DCard>
```

**Props:**
- `intensity`: Rotation intensity multiplier
- `perspective`: CSS perspective value
- `glowEffect`: Enable dynamic shadow effects
- `disabled`: Disable all interactions

#### `TextRevealAdvanced`
Sophisticated text animation with word/character staggering.

```tsx
<TextRevealAdvanced
  text="Healthcare AI Solutions"
  variant="word"
  animation="slideUp"
  staggerDelay={0.05}
  as="h1"
  className="text-4xl font-bold"
/>
```

**Props:**
- `variant`: 'word', 'char', or 'line' based animation
- `animation`: 'fadeIn', 'slideUp', 'scale', or 'rotate'
- `staggerDelay`: Delay between each animation unit

### Medical Animations

#### `HeartbeatAnimation`
Realistic heartbeat monitoring animation.

```tsx
<HeartbeatAnimation
  size={80}
  color="#EF4444"
  duration={1.5}
  active={true}
  showLabel={true}
  label="Vital Signs"
/>
```

#### `DNAHelix`
Animated DNA double helix for genetic analysis visualization.

```tsx
<DNAHelix
  size={100}
  color="#8B5CF6"
  duration={4}
  animated={true}
  label="AI Genome"
/>
```

#### `MedicalScanner`
Scanning animation for diagnostic procedures.

```tsx
<MedicalScanner
  width={300}
  height={200}
  scanDuration={2}
  active={true}
  onComplete={() => console.log('Scan complete')}
/>
```

#### `NeuralNetwork`
Animated neural network visualization for AI representation.

```tsx
<NeuralNetwork
  nodeCount={12}
  size={400}
  color="#EC4899"
  animated={true}
/>
```

### 3D Interactions

#### `FlippingCard3D`
3D card that flips to reveal content on the back.

```tsx
<FlippingCard3D
  width={300}
  height={200}
  flipDirection="horizontal"
  autoFlip={false}
  frontContent={<div>Front</div>}
  backContent={<div>Back</div>}
/>
```

#### `Carousel3D`
3D rotating carousel with gesture support.

```tsx
<Carousel3D
  items={carouselItems}
  itemWidth={280}
  itemHeight={180}
  radius={250}
  autoRotate={true}
  showControls={true}
/>
```

## 🔧 Custom Hooks

### `useScrollAnimation`
Enhanced scroll-triggered animations with performance optimization.

```tsx
const { ref, inView, animationProps } = useScrollAnimation({
  threshold: 0.2,
  delay: 0.3,
  duration: 0.6,
  easing: [0.25, 0.46, 0.45, 0.94]
})
```

### `useAnimationAccessibility`
Comprehensive accessibility management.

```tsx
const {
  preferences,
  shouldReduceAnimation,
  getAccessibleAnimationProps,
  getAccessibleDuration,
  getAccessibleEasing
} = useAnimationAccessibility({
  respectReducedMotion: true,
  respectHighContrast: true,
  fallbackDuration: 0.15
})
```

### `useViewportAnimation`
Responsive animation configuration based on viewport size.

```tsx
const {
  viewport,
  isMobile,
  isTablet,
  isDesktop,
  animationConfig
} = useViewportAnimation()
```

### `useStagger`
Staggered animations for lists and grids.

```tsx
const { containerVariants, childVariants, getStaggerDelay } = useStagger(
  childrenCount,
  {
    staggerDelay: 0.1,
    reverse: false,
    from: 'first'
  }
)
```

### `useGestures`
Gesture recognition for mobile interactions.

```tsx
const { gestureState, gestureProps } = useGestures({
  drag: true,
  swipe: true,
  onSwipeLeft: () => console.log('Swiped left'),
  onSwipeRight: () => console.log('Swiped right')
})
```

## ⚡ Performance Optimization

### Performance Monitoring

The system includes automatic performance monitoring:

```tsx
import { globalPerformanceMonitor } from '@/lib/animations'

// Subscribe to performance metrics
const unsubscribe = globalPerformanceMonitor.subscribe((metrics) => {
  console.log('Current FPS:', metrics.fps)
  console.log('Memory usage:', metrics.memoryUsage)
  console.log('Dropped frames:', metrics.droppedFrames)
})

// Get current metrics
const currentMetrics = globalPerformanceMonitor.getMetrics()
```

### Adaptive Quality

Animations automatically adapt based on device performance:

- **High Performance**: Full animations with 3D effects
- **Medium Performance**: Reduced complexity, no 3D
- **Low Performance**: Minimal animations or disabled

### Memory Management

Automatic cleanup and memory tracking:

```tsx
import { globalMemoryTracker } from '@/lib/animations'

// Track animation memory usage
const stats = globalMemoryTracker.getStats()
console.log('Total animations:', stats.count)
console.log('Memory usage:', stats.totalSizeMB, 'MB')
```

## ♿ Accessibility Features

### Motion Preferences

Respects user's motion preferences automatically:

```tsx
// Automatically detects and respects:
// - prefers-reduced-motion: reduce
// - prefers-contrast: high
// - prefers-reduced-data: reduce
```

### Screen Reader Support

Automatic announcements for important animations:

```tsx
import { globalScreenReaderAnnouncer } from '@/lib/animations'

// Manual announcements
globalScreenReaderAnnouncer.announceAnimationStart('Analysis', 'Medical scan')
globalScreenReaderAnnouncer.announceAnimationEnd('Analysis', 'Medical scan completed')
```

### Keyboard Navigation

Full keyboard support for interactive components:

```tsx
import { useKeyboardNavigation } from '@/lib/animations'

const { focusedIndex, handleKeyDown } = useKeyboardNavigation(
  ['Item 1', 'Item 2', 'Item 3'],
  (item, index) => console.log('Selected:', item),
  { orientation: 'horizontal', loop: true }
)
```

## 🎨 Healthcare Theme

### Medical Timing Presets

Specialized timing for healthcare contexts:

```tsx
import { HEALTHCARE_ANIMATION_TIMING } from '@/lib/animations'

// Medical precision timing
HEALTHCARE_ANIMATION_TIMING.precision
// { duration: 0.4, ease: [0.87, 0, 0.13, 1] }

// Gentle, caring timing
HEALTHCARE_ANIMATION_TIMING.gentle
// { duration: 0.8, ease: [0.23, 1, 0.32, 1] }

// Confident, professional timing
HEALTHCARE_ANIMATION_TIMING.confident
// { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }

// Standard medical timing
HEALTHCARE_ANIMATION_TIMING.medical
// { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
```

### Healthcare Color Palette

Professional healthcare colors:

```tsx
import { HEALTHCARE_COLORS } from '@/lib/animations'

HEALTHCARE_COLORS.primary.blue    // #3B82F6
HEALTHCARE_COLORS.accent.purple   // #8B5CF6
HEALTHCARE_COLORS.success.green   // #10B981
HEALTHCARE_COLORS.warning.yellow  // #F59E0B
HEALTHCARE_COLORS.error.red       // #EF4444
```

## 🔧 Configuration

### Global Configuration

Configure the entire animation system:

```tsx
import { globalAnimationConfig } from '@/lib/animations'

globalAnimationConfig.updateConfig({
  timing: 'medical',
  performanceTier: 'high',
  enable3D: true,
  enableParallax: true,
  medicalTheme: true,
  accessibility: {
    respectReducedMotion: true,
    respectHighContrast: true,
    fallbackDuration: 0.15
  }
})
```

### Responsive Configuration

Automatic responsive adjustments:

```tsx
import { RESPONSIVE_CONFIG } from '@/lib/animations'

// Mobile configuration
RESPONSIVE_CONFIG.mobile
// { maxDuration: 0.3, reducedMotion: true, intensity: 0.5 }

// Tablet configuration
RESPONSIVE_CONFIG.tablet
// { maxDuration: 0.5, reducedMotion: false, intensity: 0.75 }

// Desktop configuration
RESPONSIVE_CONFIG.desktop
// { maxDuration: 0.8, reducedMotion: false, intensity: 1 }
```

## 📱 Best Practices

### Performance

1. **Use Smart Containers**: Wrap complex animations in `SmartAnimationContainer`
2. **Monitor Performance**: Subscribe to performance metrics in development
3. **Respect Device Limits**: Let the system auto-adapt to device capabilities
4. **Clean Up Animations**: Use `useAnimationState` hook for proper cleanup

### Accessibility

1. **Always Respect Preferences**: Use `useAnimationAccessibility` hook
2. **Provide Alternatives**: Ensure content is accessible without animations
3. **Announce Important Changes**: Use screen reader announcements for state changes
4. **Test with Tools**: Use accessibility testing tools regularly

### Healthcare Context

1. **Use Medical Timing**: Apply `HEALTHCARE_ANIMATION_TIMING` presets
2. **Professional Aesthetics**: Maintain clean, professional appearance
3. **Subtle Effects**: Use gentle animations that don't distract from medical content
4. **Color Compliance**: Ensure sufficient contrast for medical information

## 🎭 Examples

### Medical Dashboard

```tsx
function MedicalDashboard() {
  const { shouldReduceAnimation } = useAnimationAccessibility()

  return (
    <div className="medical-dashboard">
      <ScrollReveal variant="fadeInDown">
        <h1>Patient Overview</h1>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollReveal delay={0.1}>
          <Interactive3DCard disabled={shouldReduceAnimation()}>
            <HeartbeatAnimation active={true} />
            <div className="mt-4">
              <h3>Heart Rate</h3>
              <p className="text-2xl font-bold">72 bpm</p>
            </div>
          </Interactive3DCard>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <MedicalScanner active={true} />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <MedicalDataVisualization
            data={[85, 92, 78]}
            labels={['BP', 'O2', 'Temp']}
          />
        </ScrollReveal>
      </div>
    </div>
  )
}
```

### AI Solution Showcase

```tsx
function AISolutionShowcase() {
  const solutions = [
    { title: 'Diagnostics', icon: '🔬', color: 'blue' },
    { title: 'Monitoring', icon: '📊', color: 'green' },
    { title: 'Research', icon: '🔍', color: 'purple' },
    { title: 'Treatment', icon: '💊', color: 'orange' }
  ]

  const { containerVariants, childVariants } = useStagger(solutions.length)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="solution-showcase"
    >
      <Carousel3D
        items={solutions.map((solution, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className={`solution-card bg-${solution.color}-500`}
          >
            <div className="text-4xl mb-4">{solution.icon}</div>
            <h3>{solution.title}</h3>
          </motion.div>
        ))}
        autoRotate={true}
        showControls={true}
      />
    </motion.div>
  )
}
```

## 📚 Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)
- [Reduced Motion Preferences](https://web.dev/prefers-reduced-motion/)

## 🤝 Contributing

When contributing to this animation system:

1. **Maintain Accessibility**: Always test with reduced motion preferences
2. **Performance First**: Ensure 60fps on target devices
3. **Healthcare Context**: Keep animations professional and medical-appropriate
4. **TypeScript Safety**: Provide proper types for all components and hooks
5. **Documentation**: Update this README for new features

## 📄 License

This animation infrastructure is part of the Corvo Labs Website 2.0 project and follows the same licensing terms.