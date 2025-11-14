# Advanced Parallax System for Corvo Labs Website 2.0

A sophisticated mouse-tracking parallax effects system designed specifically for healthcare AI consulting websites. This system provides multi-layered parallax effects, performance optimization, and healthcare-themed animations while maintaining professional standards and accessibility.

## 🚀 Features

### Core Parallax Capabilities
- **Multi-Layer System**: Background, midground, and foreground parallax layers
- **Mouse Tracking**: Real-time mouse position tracking with smooth easing
- **Touch Support**: Mobile-optimized touch interactions
- **Performance Optimization**: 60fps target with intelligent scaling
- **Device Adaptation**: Automatic quality adjustment based on device capabilities

### Healthcare-Themed Effects
- **Medical Animations**: Heartbeat, breathing, pulse, and wave effects
- **Professional Aesthetics**: Subtle, trustworthy movement patterns
- **Accessibility First**: Reduced motion support and WCAG compliance
- **Color Psychology**: Healthcare-inspired color schemes

### Advanced Features
- **Performance Monitoring**: Real-time FPS tracking and optimization
- **Dynamic Configuration**: Runtime configuration adjustments
- **Context Management**: Centralized parallax state management
- **TypeScript Support**: Full type safety and IntelliSense

## 📦 Installation

The parallax system is already integrated into the Corvo Labs Website 2.0 project. All components are available for immediate use.

## 🎯 Quick Start

### Basic Parallax Container

```tsx
import { ParallaxContainer, ParallaxLayer } from '@/components/parallax'

function HeroSection() {
  return (
    <ParallaxContainer intensity={0.02} layerCount={3}>
      <ParallaxLayer depth={0.9} className="absolute inset-0">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100" />
      </ParallaxLayer>

      <ParallaxLayer depth={0.5} className="absolute inset-0">
        <h1 className="text-6xl font-bold">Advanced Parallax</h1>
      </ParallaxLayer>
    </ParallaxContainer>
  )
}
```

### Healthcare-Themed Parallax

```tsx
import { MedicalParallaxContainer, MedicalParallaxLayer } from '@/components/parallax'

function MedicalHero() {
  return (
    <MedicalParallaxContainer
      medicalEffect="heartbeat"
      colorMode="oxygen"
      intensity={0.03}
    >
      <MedicalParallaxLayer depth={0.6}>
        <div className="medical-content">
          Healthcare AI Solutions
        </div>
      </MedicalParallaxLayer>
    </MedicalParallaxContainer>
  )
}
```

### Performance-Optimized Parallax

```tsx
import { OptimizedParallaxContainer } from '@/components/parallax'

function PerformanceSection() {
  return (
    <OptimizedParallaxContainer
      performanceMode="high"
      targetFPS={60}
      showPerformanceMonitor={true}
    >
      {/* Content */}
    </OptimizedParallaxContainer>
  )
}
```

## 🏗️ Architecture

### Core Components

#### ParallaxContainer
Main container component that manages parallax state and provides the parallax context.

**Props:**
- `enabled`: Enable/disable parallax effects
- `intensity`: Parallax movement intensity (0-1)
- `layerCount`: Number of parallax layers
- `performanceMode`: Performance quality mode
- `medicalTheme`: Enable healthcare-themed effects
- `showPerformanceMonitor`: Show FPS overlay

#### ParallaxLayer
Individual parallax layer with depth-based movement.

**Props:**
- `depth`: Layer depth (0-1, where 1 is background)
- `intensity`: Layer-specific movement intensity
- `disabled`: Disable parallax for this layer
- `medicalEffect`: Medical animation type
- `customTransform`: Custom transform function

### Hooks

#### useParallax
Advanced hook for custom parallax implementations.

```tsx
const {
  containerRef,
  mousePosition,
  layers,
  getLayerTransform,
  performance,
  reset
} = useParallax({
  intensity: 0.02,
  layerCount: 3,
  medicalTheme: true,
  performanceMode: 'high'
})
```

#### useSimpleParallax
Hook for simple single-element parallax.

```tsx
const { style, ref, isOptimized } = useSimpleParallax(0.02)

return <div ref={ref} style={style}>Content</div>
```

### Utilities

The system provides comprehensive utility functions for advanced parallax calculations:

- `calculateMousePosition()`: Calculate normalized mouse position
- `calculateParallaxTransform()`: Calculate layer transforms
- `generateParallaxLayers()`: Generate layer configurations
- `getDeviceCapabilities()`: Detect device performance
- `getMedicalParallaxEffect()`: Generate medical-themed effects

## 🎨 Healthcare Themes

### Medical Effects

The system includes healthcare-themed animations:

- **Heartbeat**: Pulsing effect mimicking heart rate (~72 bpm)
- **Breathing**: Gentle breathing pattern (~12 breaths/min)
- **Pulse**: Medical monitoring pulse effect
- **Wave**: Brain wave frequency simulation

### Color Modes

- **Oxygen**: Medical blue and cyan tones
- **Diagnostic**: Trust purple and health green
- **Healing**: Therapeutic green and blue combinations

## ⚡ Performance Optimization

### Device Adaptation

The system automatically adjusts based on device capabilities:

```tsx
// Automatic performance mode selection
const performanceMode = getOptimalPerformanceSettings(deviceCapabilities)

// Result: 'high' | 'medium' | 'low'
```

### FPS Monitoring

Real-time performance monitoring with automatic optimization:

```tsx
const performance = useParallaxPerformance()

// Performance metrics
console.log({
  fps: performance.metrics.fps,
  isOptimal: performance.metrics.fps >= 55,
  shouldReduceMotion: performance.shouldReduceMotion,
  deviceMemory: performance.metrics.deviceMemory
})
```

### Optimization Strategies

1. **Throttled Events**: Mouse events throttled to 60fps
2. **GPU Acceleration**: CSS 3D transforms for smooth animations
3. **Memory Management**: Intelligent garbage collection
4. **Reduced Motion**: Accessibility support with system preference detection

## 📱 Mobile Support

### Touch Interactions

```tsx
<ParallaxContainer
  enableTouch={true}
  disableOnMobile={false}
  intensity={0.01} // Reduced intensity for mobile
>
  {/* Content */}
</ParallaxContainer>
```

### Responsive Configuration

```tsx
const { isMobile, isTablet, reducedIntensity } = useResponsiveAnimation()

// Auto-adjust parallax settings
const config = {
  intensity: isMobile ? 0.01 : isTablet ? 0.02 : 0.03,
  layerCount: isMobile ? 2 : 3
}
```

## 🔧 Configuration

### Global Configuration

```tsx
<ParallaxProvider
  config={{
    enabled: true,
    intensity: 0.02,
    depthLayers: 5,
    performanceMode: 'high',
    respectReducedMotion: true
  }}
>
  {/* App content */}
</ParallaxProvider>
```

### Layer-Specific Configuration

```tsx
<ParallaxLayer
  depth={0.6}
  intensity={0.8}
  maxRotation={15}
  maxTranslation={30}
  blur={1}
  opacity={0.8}
  customTransform={(transform) => ({
    ...transform,
    scale: transform.scale * 1.1
  })}
>
  {/* Layer content */}
</ParallaxLayer>
```

## 🎭 Examples

### Hero Section with Medical Theme

```tsx
function HeroSection() {
  return (
    <MedicalParallaxContainer
      medicalEffect="heartbeat"
      intensity={0.03}
      layerCount={5}
    >
      <BackgroundParallaxLayer>
        <div className="bg-gradient-to-br from-blue-100 to-purple-100" />
      </BackgroundParallaxLayer>

      <MidgroundParallaxLayer>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      </MidgroundParallaxLayer>

      <ForegroundParallaxLayer>
        <h1 className="text-6xl font-bold">Healthcare AI Solutions</h1>
      </ForegroundParallaxLayer>
    </MedicalParallaxContainer>
  )
}
```

### Interactive Service Cards

```tsx
function ServiceCards() {
  return (
    <ParallaxContainer intensity={0.025}>
      {services.map((service, index) => (
        <InteractiveParallaxLayer
          key={service.id}
          depth={0.1 + index * 0.1}
          className="service-card"
        >
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </InteractiveParallaxLayer>
      ))}
    </ParallaxContainer>
  )
}
```

## 🐛 Debug Mode

Enable debug mode to visualize parallax layers and performance:

```tsx
<ParallaxContainer
  debug={true}
  showPerformanceMonitor={true}
  showBounds={true}
>
  {/* Content */}
</ParallaxContainer>
```

Debug features:
- **Layer bounds visualization**: Visual indicators for layer boundaries
- **Depth indicators**: Show layer depth values
- **Performance overlay**: Real-time FPS and performance metrics
- **Mouse position tracker**: Visual mouse position indicator

## 📊 Performance Metrics

The system provides comprehensive performance monitoring:

```tsx
const metrics = {
  fps: 60,                    // Current frames per second
  isOptimal: true,           // FPS >= target
  isOptimized: false,        // Performance optimizations active
  isMobile: false,           // Mobile device detected
  shouldReduceMotion: false, // System reduced motion preference
  deviceMemory: 8,           // Device RAM in GB
  layerCount: 5,             // Active parallax layers
  isMouseActive: true        // Mouse interaction active
}
```

## 🎯 Best Practices

### Performance
1. **Limit Layer Count**: Use 3-5 layers for optimal performance
2. **Adjust Intensity**: Lower intensity for mobile devices
3. **Monitor FPS**: Use performance monitoring to detect issues
4. **Respect Preferences**: Honor reduced motion settings

### Healthcare Design
1. **Subtle Effects**: Keep animations professional and calming
2. **Medical Colors**: Use healthcare-approved color schemes
3. **Accessibility**: Ensure WCAG compliance and screen reader support
4. **Trust Signals**: Maintain professional appearance

### Development
1. **TypeScript**: Use type safety for all parallax implementations
2. **Component Structure**: Keep parallax logic separate from business logic
3. **Testing**: Test across devices and performance levels
4. **Documentation**: Document custom parallax implementations

## 🔗 Integration

The parallax system integrates seamlessly with existing animation infrastructure:

```tsx
import { ScrollReveal } from '@/components/animations/animation-primitives'
import { ParallaxContainer, ParallaxLayer } from '@/components/parallax'

function CombinedAnimation() {
  return (
    <ParallaxContainer>
      <ParallaxLayer depth={0.5}>
        <ScrollReveal variant="fadeIn">
          <h1>Combined Animations</h1>
        </ScrollReveal>
      </ParallaxLayer>
    </ParallaxContainer>
  )
}
```

## 📈 Monitoring

Use the built-in performance monitoring to track parallax performance:

```tsx
const { performance } = useParallax()

// Log performance issues
useEffect(() => {
  if (performance.fps < 30) {
    console.warn('Low FPS detected:', performance)
    // Implement performance optimization
  }
}, [performance.fps])
```

## 🎨 Customization

### Custom Transforms

Create custom parallax effects:

```tsx
const customTransform = (transform) => ({
  ...transform,
  rotateZ: transform.rotateX + transform.rotateY,
  scale: transform.scale * (1 + Math.abs(transform.translateX) * 0.001)
})

<ParallaxLayer customTransform={customTransform}>
  {/* Content */}
</ParallaxLayer>
```

### Medical Effects

Custom medical-themed animations:

```tsx
const medicalEffect = getMedicalParallaxEffect(0.5, 'heartbeat')
// Returns: { amplitude: 2.5, frequency: 1.2, phase: 0 }
```

## 📋 Browser Support

- **Modern Browsers**: Full support with GPU acceleration
- **Mobile Browsers**: Touch support and performance optimization
- **Legacy Browsers**: Graceful degradation with reduced motion
- **Accessibility**: Screen reader support and reduced motion preferences

## 🤝 Contributing

When contributing to the parallax system:

1. **Performance**: Ensure 60fps on target devices
2. **Accessibility**: Test reduced motion and screen reader support
3. **Healthcare**: Maintain professional medical aesthetic
4. **Documentation**: Update documentation for new features
5. **Testing**: Test across devices and performance levels

## 📞 Support

For parallax system support:
- Review this documentation
- Check the demo showcase examples
- Test with debug mode enabled
- Monitor performance metrics

---

**Advanced Parallax System** - Professional, performant, and healthcare-compliant parallax effects for modern web applications.