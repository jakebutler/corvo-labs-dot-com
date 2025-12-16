# Corvo Labs Design System

A comprehensive component library for the Corvo Labs website, ensuring consistency and maintainability across all pages.

## Components

### Button System

The button system provides three main variants with consistent styling and animations:

- **Primary**: Gradient background with serif font for main CTAs
- **Secondary**: Light gray background for secondary actions
- **Outline**: Bordered style for tertiary actions

```tsx
import { PrimaryButton, SecondaryButton, OutlinedButton } from '@/components/ui'

<PrimaryButton size="lg" icon={<ArrowRight />}>
  Get Started
</PrimaryButton>

<SecondaryButton onClick={handleClick}>
  Learn More
</SecondaryButton>

<OutlinedButton loading={isLoading}>
  Submit
</OutlinedButton>
```

### Typography System

Consistent typography using the established font hierarchy:

- **Display**: Large serif headings (H1-H2)
- **Heading**: Medium serif headings (H3-H6)
- **Body**: Clean sans-serif text
- **Elegant**: Italic serif for special emphasis

```tsx
import { H1, H2, Paragraph, Subtitle } from '@/components/ui'

<H1 gradient>Your Main Heading</H1>
<H2>Section Title</H2>
<Paragraph size="lg" weight="medium">
  Your content text here
</Paragraph>
<Subtitle>
  Elegant italic subtitle text
</Subtitle>
```

### Section System

Consistent section layouts with different variants:

```tsx
import { Section, SectionHeader } from '@/components/ui'

<Section variant="gray" spacing="xl">
  <SectionHeader
    center
        title={<H2>Section Title</H2>}
        subtitle={<Paragraph>Section description</Paragraph>}
    />
  {/* Section content */}
</Section>
```

### Card System

Multiple card variants for different content types:

```tsx
import { FeatureCard, ServiceCard, StatCard } from '@/components/ui'

<FeatureCard
  icon={<CheckIcon />}
  title="Feature Title"
  description="Feature description"
/>

<ServiceCard
  title="Service Title"
  description="Service description"
  image="/path/to/image.png"
  features={["Feature 1", "Feature 2"]}
/>

<StatCard number="95%" label="Success Rate" />
```

## Design Tokens

### Colors
- **Primary**: `--accent` (coral orange #FF6B47)
- **Text**: `--text-gray-900` to `--text-gray-100`
- **Background**: `--bg-white`, `--bg-gray-50`, `--bg-gray-900`

### Typography
- **Display**: Playfair Display, weight 900, tight letter-spacing
- **Heading**: Playfair Display, weight 700
- **Body**: Inter, normal weight, relaxed line-height
- **Elegant**: Playfair Display, italic

### Spacing
- **Section**: py-12 (sm), py-16 (md), py-20 (lg), py-24 (xl)
- **Card**: p-4 (sm), p-6 (md), p-8 (lg)

### Animation
- **Hover**: scale(1.05) with spring easing
- **Fade-in**: opacity 0→1 with translateY
- **Stagger**: 0.1s delay between child elements

## Usage Guidelines

1. **Always import from `/components/ui`** for consistent components
2. **Use semantic variants** (Primary for main actions, Secondary for alternatives)
3. **Maintain spacing hierarchy** using the Section component
4. **Follow the typography scale** with H1-H6 components
5. **Keep content consistent** with appropriate card types

## Customization

Each component accepts `className` prop for additional styling while maintaining core design consistency. The design system is built to be extensible while ensuring brand coherence.

```tsx
<PrimaryButton className="custom-class">
  Extended styling while maintaining core design
</PrimaryButton>
```