# Performance Monitoring System

A comprehensive performance monitoring system for Corvo Labs Website 2.0, designed specifically for healthcare AI consulting websites with professional requirements and accessibility compliance.

## 🎯 Features

### Core Monitoring
- **Real-time FPS monitoring** with frame drop detection
- **Core Web Vitals tracking** (LCP, FID, CLS, FCP, TTFB)
- **Memory usage monitoring** with automatic cleanup
- **Bundle size analysis** and performance budget enforcement
- **Animation performance tracking** with queue management

### Healthcare-Specific Features
- **Accessibility compliance monitoring** (WCAG AA standards)
- **Professional appearance metrics** for healthcare audience
- **Trust and reliability scoring**
- **Reduced motion support** for vestibular disorders
- **High contrast and readability optimization**

### Development Tools
- **Real-time performance dashboard** with professional healthcare aesthetics
- **Performance alerts and recommendations**
- **Device capability detection** and adaptive optimization
- **Network-aware performance adjustments**
- **Component-level performance tracking**

### Production Analytics
- **Web Vitals integration** with Google Analytics, Vercel Analytics, Plausible
- **Performance trend analysis**
- **User experience monitoring**
- **Healthcare compliance reporting**
- **Automated performance insights**

## 🚀 Quick Start

### 1. Basic Setup

```typescript
// In your app/layout.tsx or _app.tsx
import { initializeAppPerformance } from '@/lib/performance/performance-integration-example'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const monitor = initializeAppPerformance()
    return () => monitor.stopMonitoring()
  }, [])

  return (
    <html>
      <body>
        {children}
        <PerformanceDashboard enabled={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  )
}
```

### 2. Component-Level Monitoring

```typescript
import { usePerformanceMonitoring, useAnimationPerformance } from '@/hooks/use-performance-monitoring'

function MyComponent() {
  const { metrics, getPerformanceScore, shouldUseReducedMotion } = usePerformanceMonitoring()
  const { getAnimationProps } = useAnimationPerformance('my-component')

  const animationProps = getAnimationProps()

  return (
    <motion.div
      transition={{
        duration: animationProps.duration,
        ease: animationProps.ease
      }}
      style={{
        willChange: shouldUseReducedMotion() ? 'auto' : 'transform, opacity'
      }}
    >
      <h1>Performance Score: {getPerformanceScore().score}/100</h1>
      <p>FPS: {metrics?.animation.averageFPS}</p>
    </motion.div>
  )
}
```

### 3. Healthcare-Optimized Component

```typescript
import { healthcarePerformanceUtils } from '@/lib/performance/performance-utils'

function HealthcareComponent() {
  const { shouldUseReducedMotion } = usePerformanceMonitoring()
  const healthcareSettings = healthcarePerformanceUtils.optimizeForMedicalProfessionals()

  return (
    <div
      style={{
        transition: shouldUseReducedMotion() ? 'none' : 'all 0.3s ease',
        fontSize: healthcareSettings.increaseFontSize ? '18px' : '16px'
      }}
      role="region"
      aria-label="Healthcare content"
    >
      {/* Healthcare content */}
    </div>
  )
}
```

## 📊 Performance Dashboard

The performance dashboard provides real-time monitoring with four main sections:

### Overview
- Overall performance score with color-coded status
- Quick stats for FPS and memory usage
- Device profile and network information
- Performance alerts and recommendations

### Web Vitals
- Real-time Core Web Vitals scores
- Visual progress bars with status indicators
- Target values and current performance
- Overall Web Vitals score

### Animations
- Current and average FPS
- Frame time analysis
- Dropped and long frames tracking
- Memory usage monitoring
- Performance recommendations

### History
- Performance trends over time
- Averages for key metrics
- Improvement/decline indicators
- Historical data analysis

## ⚙️ Configuration

### Environment-Specific Settings

```typescript
import { getEnvironmentConfig } from '@/lib/performance/performance-config'

const config = getEnvironmentConfig()

// Development: More lenient thresholds, real-time monitoring
// Production: Strict thresholds, sampling-based monitoring
```

### Custom Thresholds

```typescript
const customConfig = {
  thresholds: {
    targetFPS: 60,
    minimumFPS: 45,
    criticalFPS: 30,
    maxMemoryMB: 80,
    targetLCPScore: 95,
    targetFIDScore: 95,
    targetCLSScore: 95
  },
  enableAutoOptimization: true,
  enableReporting: true
}
```

### Healthcare Requirements

```typescript
import { HEALTHCARE_REQUIREMENTS } from '@/lib/performance/performance-config'

// Ensures compliance with healthcare standards:
// - Accessibility (WCAG AA)
// - Professional appearance
// - Trust and reliability
// - Error rate monitoring
```

## 🔧 Advanced Usage

### Custom Performance Tracking

```typescript
import { useCustomPerformanceTracking } from '@/lib/performance/performance-integration-example'

function CustomComponent() {
  const { metrics } = useCustomPerformanceTracking('CustomComponent')

  // Component implementation
}
```

### Image Optimization

```typescript
import { globalImageLoader } from '@/lib/performance/performance-utils'

// Preload critical images
globalImageLoader.preloadImages(['/hero-image.jpg'], true)

// Load images with optimization
const img = await globalImageLoader.loadImage('/content.jpg', {
  priority: false,
  quality: 0.8,
  lazy: true
})
```

### Animation Performance

```typescript
import { globalAnimationQueue } from '@/lib/animations/performance-utils'

// Batch animations for better performance
globalAnimationQueue.add(() => {
  // Animation logic
})
```

## 📈 Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s (Target: 95+ score)
- **FID (First Input Delay):** < 100ms (Target: 95+ score)
- **CLS (Cumulative Layout Shift):** < 0.1 (Target: 95+ score)
- **FCP (First Contentful Paint):** < 1.8s
- **TTFB (Time to First Byte):** < 800ms

### Animation Performance
- **Target FPS:** 60
- **Minimum FPS:** 45
- **Critical FPS:** 30
- **Max Memory Usage:** 80MB
- **Max Dropped Frames:** 3 per session

### Healthcare-Specific
- **Animation Duration:** 200-500ms
- **Accessibility Score:** 90+
- **Professional Score:** 90+
- **Trust Signals:** 95+

## 🚨 Performance Alerts

The system provides real-time alerts for:

- **Critical:** FPS < 30, Memory > 100MB, Web Vitals < 60
- **Warning:** FPS < 45, Memory > 50MB, Web Vitals < 75

Alerts are displayed in the development dashboard and can be sent to analytics services in production.

## 📱 Device Optimization

The system automatically detects device capabilities and adjusts performance:

### High-End Devices
- Full animation quality
- 60 FPS target
- All features enabled

### Medium Devices
- Reduced animation complexity
- 45 FPS target
- Selective features

### Low-End Devices
- Minimal animations
- 30 FPS target
- Essential features only

## 🌐 Network Optimization

Network-aware performance adjustments:

- **4G:** Full quality, all features
- **3G:** Reduced quality, limited features
- **2G:** Minimal quality, essential features only
- **Slow-2G:** Text-only, no animations

## 🔍 Analytics Integration

### Google Analytics 4

```typescript
import { AnalyticsIntegrations } from '@/lib/performance/performance-analytics'

const ga4 = AnalyticsIntegrations.googleAnalytics4('GA_MEASUREMENT_ID')
```

### Vercel Analytics

```typescript
const vercel = AnalyticsIntegrations.vercelAnalytics()
```

### Plausible Analytics

```typescript
const plausible = AnalyticsIntegrations.plausibleAnalytics('yourdomain.com')
```

## 🛠️ Development Tools

### Performance Dashboard
```typescript
<PerformanceDashboard
  enabled={true}
  position="top-right"
  compact={false}
/>
```

### Performance Profiling
```typescript
import { performanceUtils } from '@/lib/performance/performance-utils'

const { result, duration } = performanceUtils.measureTime(
  () => expensiveOperation(),
  'Operation Name'
)
```

### Memory Monitoring
```typescript
const cleanup = performanceUtils.monitorMemoryUsage(() => {
  // Cleanup logic
}, 100) // 100MB threshold
```

## 📋 Best Practices

### For Healthcare Websites
1. **Prioritize accessibility** over animations
2. **Ensure professional appearance** with consistent performance
3. **Monitor trust signals** and reliability
4. **Optimize for medical professionals** who value efficiency
5. **Comply with WCAG AA** standards

### Performance Optimization
1. **Use performance monitoring** from the start of development
2. **Set performance budgets** and enforce them
3. **Optimize images and assets** for different devices
4. **Implement lazy loading** for non-critical resources
5. **Monitor real-user performance** in production

### Animation Guidelines
1. **Keep animations between 200-500ms** for healthcare accessibility
2. **Use GPU acceleration** for smooth performance
3. **Respect reduced motion preferences**
4. **Limit concurrent animations** based on device capabilities
5. **Test on real devices**, especially mobile and older hardware

## 🔍 Troubleshooting

### Common Issues

**Low FPS on mobile devices:**
- Reduce animation complexity
- Use CSS transforms instead of JavaScript animations
- Enable hardware acceleration

**High memory usage:**
- Clear image caches regularly
- Implement proper cleanup in useEffect
- Monitor for memory leaks

**Poor Web Vitals scores:**
- Optimize image loading with proper sizing and format
- Minimize JavaScript execution time
- Reduce server response time

### Debug Tools

```typescript
// Enable debug logging
const monitor = new PerformanceMonitor({
  developmentMode: true,
  enableReporting: true
})

// Get performance insights
const insights = monitor.getPerformanceInsights()
console.log('Performance Insights:', insights)
```

## 📚 API Reference

### Core Classes

- **PerformanceMonitor:** Main monitoring class
- **PerformanceAnalytics:** Production analytics
- **PerformanceImageLoader:** Optimized image loading
- **ComponentLazyLoader:** Lazy component loading

### React Hooks

- **usePerformanceMonitoring:** Main performance hook
- **useAnimationPerformance:** Animation-specific monitoring
- **useWebVitals:** Core Web Vitals tracking
- **usePerformanceAlerts:** Real-time alerts

### Configuration Objects

- **PerformanceConfig:** Main configuration
- **PerformanceThresholds:** Performance targets
- **BundleBudgets:** Resource budget limits
- **HealthcareRequirements:** Healthcare-specific settings

## 🤝 Contributing

When contributing to the performance monitoring system:

1. **Maintain healthcare accessibility standards**
2. **Test performance impact** of changes
3. **Update documentation** for new features
4. **Follow TypeScript strict mode** guidelines
5. **Ensure cross-browser compatibility**

## 📄 License

This performance monitoring system is part of the Corvo Labs Website 2.0 project and follows the same licensing terms.

---

For more information, see the [integration examples](./performance-integration-example.ts) and [configuration documentation](./performance-config.ts).