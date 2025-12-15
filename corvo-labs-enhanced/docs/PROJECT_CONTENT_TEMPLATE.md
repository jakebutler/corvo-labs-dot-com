# Project Content Template

This document provides a comprehensive template for creating new project entries in the Corvo Labs projects section.

## Content Requirements Checklist

Use this checklist when creating a new project entry:

- [ ] **id** - Unique numeric identifier
- [ ] **title** - Project name
- [ ] **category** - Project category (clinical, administrative, patient, analytics)
- [ ] **client** - Client/organization name
- [ ] **location** - Geographic location
- [ ] **duration** - Project timeline
- [ ] **challenge** - Problem statement
- [ ] **solution** - Solution description
- [ ] **process** - Implementation steps (array)
- [ ] **results** - Quantifiable outcomes (array)
- [ ] **technologies** - Technologies used (array)
- [ ] **image** - Image file path

## Detailed Field Descriptions

### 1. Challenge
**Purpose**: Provides context behind the initial problem the project is meant to solve.

**Guidelines**:
- Clearly articulate pain points, inefficiencies, or issues
- Include quantifiable metrics when possible (wait times, error rates, costs)
- Keep it concise but specific (1-2 sentences)

**Example from Patient Engagement Chatbot**:
```
"High call volume to appointment line and inconsistent patient communication leading to missed appointments and poor patient experience."
```

### 2. Solution
**Purpose**: Explains the solution implemented to address the challenge.

**Guidelines**:
- Describe the approach and key features
- Explain how it solves the problem
- Mention integration points if relevant
- Keep it focused and clear (2-3 sentences)

**Example from Patient Engagement Chatbot**:
```
"Implemented intelligent chatbot for appointment scheduling, medication reminders, and patient education. The system handles 80% of routine patient inquiries and integrates with hospital scheduling systems."
```

### 3. Process
**Purpose**: Describes the methodology and implementation steps taken during the project.

**Guidelines**:
- List steps in chronological order
- Each step should be a concise, actionable statement
- Typically 4-6 steps
- Use past tense (e.g., "Analyzed", "Designed", "Implemented")

**Example from Patient Engagement Chatbot**:
```typescript
[
  "Analyzed patient communication patterns",
  "Designed conversational AI flows",
  "Integrated with hospital scheduling system",
  "Created multilingual support (English/Spanish)",
  "Implemented escalation to human agents"
]
```

### 4. Results
**Purpose**: Showcases quantifiable outcomes and achievements from the project.

**Guidelines**:
- Prioritize quantifiable metrics (percentages, numbers, scores)
- Include time savings, cost reductions, efficiency improvements
- List 3-5 key results
- Use specific numbers rather than vague statements

**Example from Patient Engagement Chatbot**:
```typescript
[
  "Handled 45,000 patient interactions per month",
  "Reduced call center volume by 60%",
  "Improved appointment show rates by 28%",
  "Patient satisfaction score of 4.6/5"
]
```

### 5. Technologies
**Purpose**: Highlights the technical capabilities and tools used in the project.

**Guidelines**:
- Use consistent naming conventions
- Capitalize properly
- Avoid abbreviations unless widely recognized
- List 3-5 key technologies
- Focus on technologies that differentiate the solution

**Example from Patient Engagement Chatbot**:
```typescript
["Conversational AI", "Scheduling Integration", "Multi-language Support", "Sentiment Analysis"]
```

## Complete Template

```typescript
{
  id: [NEXT_ID],
  title: "[Project Name]",
  category: "[clinical|administrative|patient|analytics]",
  client: "[Client Name]",
  location: "[State or City]",
  duration: "[X weeks/months]",
  challenge: "[1-2 sentences describing the problem]",
  solution: "[2-3 sentences describing the solution]",
  process: [
    "[Step 1: Action taken]",
    "[Step 2: Action taken]",
    "[Step 3: Action taken]",
    "[Step 4: Action taken]",
    "[Step 5: Action taken]"
  ],
  results: [
    "[Quantifiable result 1 with specific numbers]",
    "[Quantifiable result 2 with specific numbers]",
    "[Quantifiable result 3 with specific numbers]",
    "[Quantifiable result 4 with specific numbers]"
  ],
  technologies: [
    "[Technology 1]",
    "[Technology 2]",
    "[Technology 3]",
    "[Technology 4]"
  ],
  image: "/images/[project-image-name].jpg"
}
```

## Reference: Patient Engagement Chatbot (Complete Example)

```typescript
{
  id: 3,
  title: "Patient Engagement Chatbot",
  category: "patient",
  client: "Children's Hospital",
  location: "New York",
  duration: "10 weeks",
  challenge: "High call volume to appointment line and inconsistent patient communication leading to missed appointments and poor patient experience.",
  solution: "Implemented intelligent chatbot for appointment scheduling, medication reminders, and patient education. The system handles 80% of routine patient inquiries and integrates with hospital scheduling systems.",
  process: [
    "Analyzed patient communication patterns",
    "Designed conversational AI flows",
    "Integrated with hospital scheduling system",
    "Created multilingual support (English/Spanish)",
    "Implemented escalation to human agents"
  ],
  results: [
    "Handled 45,000 patient interactions per month",
    "Reduced call center volume by 60%",
    "Improved appointment show rates by 28%",
    "Patient satisfaction score of 4.6/5"
  ],
  technologies: ["Conversational AI", "Scheduling Integration", "Multi-language Support", "Sentiment Analysis"],
  image: "/images/patient-chatbot.jpg"
}
```

## Category Options

- **clinical**: Clinical applications and patient care solutions
- **administrative**: Administrative automation and operational efficiency
- **patient**: Patient engagement and experience solutions
- **analytics**: Data analytics and predictive solutions

## Image Requirements

- **Location**: Place images in `public/images/` directory
- **Format**: JPG or PNG
- **Recommended Size**: 1200x800px or similar aspect ratio
- **Optimization**: Compress images before adding to reduce load times
- **Naming**: Use descriptive, kebab-case names (e.g., `patient-chatbot.jpg`)

## Quick Start Guide

1. **Gather Information**: Collect all project details, metrics, and outcomes
2. **Prepare Image**: Optimize and add project image to `public/images/`
3. **Open File**: Navigate to `src/app/projects/page.tsx`
4. **Find Array**: Locate the `projects` array (around line 32)
5. **Add Entry**: Insert new project object following the template
6. **Verify**: Check that the project appears correctly on `/projects` page
7. **Test**: Ensure filtering works correctly with the selected category

