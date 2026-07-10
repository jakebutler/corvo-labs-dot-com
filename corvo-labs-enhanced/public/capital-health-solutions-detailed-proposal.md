# Capital Health Solutions Growth Automation + Website Experience Proposal

**Prepared for:** Milan Kantaria and Dinesh Kantaria  
**Business:** Capital Health Solutions  
**Current website:** `veinpracticeexpert.com`  
**Prototype hosting target:** `corvolabs.com/capitalhealthsolutions/...`  
**Prepared by:** Jake Butler / Corvo Labs  
**Draft date:** May 21, 2026  

---

## 1. Executive Summary

Capital Health Solutions has a strong specialist position: it is not simply an ultrasound equipment reseller. It is a vein and vascular imaging partner that helps practices choose the right system, configure it for real clinical workflows, train the team, and keep the equipment useful after installation.

The growth opportunity is to make that high-touch support model scale.

Today, customers already rely on direct text/SMS support, Dinesh’s expertise, and relationship-based follow-up. That is a strength, but it also creates a scaling ceiling. Every support question, conference lead, renewal opportunity, technical escalation, and repeat-sale opportunity can get trapped in personal inboxes, text threads, memory, or one-off scripts.

This proposal recommends building a lightweight but powerful operating system around Capital Health Solutions:

1. **HubSpot CRM as the source of truth** for contacts, companies, machines, deals, support tickets, and account history.
2. **Day 1 SMS support concierge** using Twilio, Cloudflare Workers, HubSpot tickets, and technician escalation.
3. **Day 1 voice concierge** using Twilio and a custom AssemblyAI-based voice agent that answers all calls, routes sales calls quickly, and triages support calls.
4. **AI-assisted sales and account management workflows** for conference follow-up, 5-year replacement cycles, accessory/service opportunities, onboarding, and repeat sales.
5. **Conference lead capture and follow-up system** for the same-week New Orleans and Miami vascular/vein conferences.
6. **Website rebuild and content system** hosted under `corvolabs.com/capitalhealthsolutions/...`, using homepage prototype option 02 as the design direction.
7. **SEO/AEO content engine** that turns Capital Health Solutions into the most useful answer source for vein/vascular ultrasound selection, configuration, onboarding, and support.

The guiding principle:

> Capital Health Solutions should not automate away Dinesh’s expertise. It should make that expertise easier to access, easier to route, easier to document, and easier to scale.

---

## 2. Strategic Positioning

### Proposed positioning

**Capital Health Solutions helps vein clinics and vascular practices choose, configure, and operate ultrasound systems that fit real clinical workflows.**

This positioning deliberately avoids leading with “affordable equipment” or “used machines.” The price/value story can still exist in sales conversations, but the public positioning should emphasize:

- Vein and vascular specialization
- Multi-brand equipment expertise
- Mindray-forward recommendations where appropriate
- Configuration and workflow optimization
- On-site and remote training
- Same-day business-hours technical support
- Practical, human support from people who know the machines and the practice context

### Core message

> The right ultrasound system is not just the hardware. It is the selection process, the configuration, the training, the workflow, and the support after installation.

### Supporting message pillars

1. **Right-fit system selection**  
   Help practices avoid underbuying, overbuying, or choosing equipment that does not fit their workflow.

2. **Vein-specific configuration**  
   Configure presets, reporting workflows, imaging settings, and system setup around actual vein and vascular use cases.

3. **Hands-on training**  
   Support clinicians, technicians, and office staff so the machine is usable from day one.

4. **Ongoing support**  
   Provide responsive support by SMS, phone, email, and scheduled technician sessions.

5. **Workflow-aware growth**  
   Help practices improve imaging operations, reporting handoffs, training consistency, and long-term equipment planning.

---

## 3. Target Customers

### Primary growth target

**Multi-provider vein clinics and vascular surgery groups.**

These customers are attractive because they are large enough to have recurring needs but not so large that Capital Health Solutions is forced to compete head-to-head with major enterprise distributors.

### Geographic focus

Capital Health Solutions is headquartered in the San Francisco Bay Area.

Recommended market prioritization:

1. **Bay Area / Northern California**  
   Best for on-site support, local credibility, and high-touch training.

2. **California statewide**  
   Strong second circle because on-site support remains feasible.

3. **National specialty practices**  
   Supported through remote consultation, scheduled technician support, shipping, and structured onboarding.

### Expansion segments

The website and content strategy should leave room for adjacent specialties without diluting the core.

Potential expansion segments:

- Vascular surgery
- Multi-site vein clinics
- Mobile ultrasound providers
- Cardiology groups with vascular workflows
- Pain management and procedural guidance
- OB/GYN or women’s health only if supported by actual equipment/service expertise
- MSK only as a later content/market experiment

---

## 4. Proposed Experience Hosted on Corvo Labs

The reviewable experience should be hosted at:

`https://corvolabs.com/capitalhealthsolutions/`

This is not necessarily the final production site. It is a reviewable, interactive, shareable prototype that lets Milan and Dinesh experience the proposed website, automation strategy, and content system before migrating anything.

### Recommended URL structure

```text
/capitalhealthsolutions/
  homepage

/capitalhealthsolutions/proposal/
  interactive proposal page

/capitalhealthsolutions/devices/
  device category hub

/capitalhealthsolutions/devices/[device-slug]/
  individual device detail pages

/capitalhealthsolutions/solutions/
  solution hub

/capitalhealthsolutions/solutions/vein-clinics/
  primary target segment page

/capitalhealthsolutions/solutions/vascular-surgery-groups/
  primary target segment page

/capitalhealthsolutions/training/
  training and onboarding page

/capitalhealthsolutions/support/
  support hub and SMS/phone CTA

/capitalhealthsolutions/resources/
  content hub

/capitalhealthsolutions/resources/[article-slug]/
  article detail pages

/capitalhealthsolutions/case-studies/
  case study hub

/capitalhealthsolutions/case-studies/[case-study-slug]/
  case study detail pages

/capitalhealthsolutions/compare/
  comparison hub

/capitalhealthsolutions/compare/[comparison-slug]/
  comparison article/detail page

/capitalhealthsolutions/conference/
  conference-specific landing page

/capitalhealthsolutions/contact/
  consultation / phone / SMS CTA
```

### Required review pages for the prototype

1. Homepage
2. Interactive proposal page
3. Devices hub
4. Device detail page
5. Solutions page for vein clinics
6. Solutions page for vascular surgery groups
7. Training page
8. Support page
9. Resources hub
10. At least 4 fully written article pages
11. Case studies hub with placeholder case studies
12. Conference landing page
13. Contact/consultation page

---

## 5. Design Direction

Use **homepage option 02** as the design foundation.

### Why option 02

Option 02 creates a premium, consultative, high-trust feel. It uses a navy/white/burgundy/steel-blue palette, editorial typography, large imagery, and the right kind of “specialist partner” framing.

The strongest reusable elements from option 02 are:

- Sticky premium navigation
- Hero with dark navy editorial treatment
- “Beyond Procurement” brand statement
- Four service pillars: system selection, configuration, training, workflow optimization
- Equipment showcase
- Practice environments section
- Workflow intelligence section
- Founder/expertise section
- Case-study proof section
- Premium footer

### Adjustments needed

The current prototype content should be made more accurate and less speculative.

Replace placeholders like:

- “Elite Healthcare Consulting”
- “PrimeVasc Elite Console”
- “Dr. Elena Sterling”
- “Vascular Center of Austin”
- Unsupported claims like “40% efficiency gain,” “99% staff adoption,” or “12k scans optimized”

With grounded, reviewable copy:

- “Vein & Vascular Ultrasound Systems, Training, and Support”
- Real device categories or verified model names
- Dinesh Kantaria / Capital Health Solutions
- Placeholder case studies clearly labeled as examples
- Claims framed as opportunities unless verified

### Visual style

- Premium clinical editorial
- White space-heavy
- Dark navy hero sections
- Burgundy accents for authority
- Steel blue for clinical trust
- Large real device imagery where available
- No fake doctor portraits
- No invented client metrics
- Use “workflow diagrams” and “support journey maps” as concrete visuals

---

## 6. Website Content Strategy

The SEO/AEO proposal identifies a strong opportunity: Capital Health Solutions can become the authoritative resource for vein-practice ultrasound selection, configuration, training, and support.

### Content pillars

#### Pillar 1: Equipment and buyer guidance

Purpose: Capture high-intent commercial search and support buyer decision-making.

Initial pages:

- Ultimate Buyer’s Guide to Vein Clinic Ultrasound Machines
- Portable vs. Console Ultrasound for Vein Clinics
- Mindray Resona I9T vs. GE Vivid
- Refurbished Ultrasound Systems for Vein Practices
- How Much Does a Vein Practice Ultrasound Cost?
- Best Ultrasound Systems for Multi-Provider Vein Clinics

#### Pillar 2: Clinical workflow and training

Purpose: Demonstrate practical expertise and support existing customers.

Initial pages:

- How to Set Up Your Ultrasound System for DVT Detection
- Venous Insufficiency Mapping: Workflow, Protocols, and Machine Settings
- Ultrasound-Guided Sclerotherapy: Imaging Workflow Considerations
- Training Your Entire Vein Practice Staff
- DICOM, PACS, and Reporting Workflow for Vein Clinics
- Ultrasound System Setup Checklist for New Vein Practices

#### Pillar 3: Support and operations

Purpose: Reduce support burden, improve customer experience, and create AI support content.

Initial pages:

- How to Prepare for Your Ultrasound Installation
- How to Describe an Ultrasound Support Issue by SMS
- What to Send Before a Technician Call
- Probe Care and Handling Basics
- How to Transfer Presets Between Systems
- How to Add Practice Logo and Report Settings on Supported Systems

#### Pillar 4: Comparisons and alternatives

Purpose: Win late-stage commercial searches.

Initial pages:

- Mindray vs. GE for Vein Practices
- Mindray vs. Philips for Vascular Workflows
- Portable vs. Handheld Vascular Ultrasound
- New vs. Refurbished Ultrasound Systems
- Console vs. Laptop Ultrasound for Multi-Room Practices

#### Pillar 5: Case studies and proof

Purpose: Convert prospects through practical examples.

Initial structure:

- “New vein clinic launch”
- “Multi-provider clinic upgrade”
- “Mobile ultrasound workflow”
- “Practice replacing aging equipment”
- “Technician training and support rescue”

Case studies can be anonymized at first, but should clearly state that they are representative or composite until verified.

---

## 7. First Content Set to Publish

The first content set should be built to support sales, SEO, AEO, and the support bot.

### Article 1

**Title:** The Ultimate Buyer’s Guide to Vein Clinic Ultrasound Machines  
**URL:** `/capitalhealthsolutions/resources/vein-clinic-ultrasound-machine-buyers-guide/`  
**Primary CTA:** Schedule a practice review  
**Secondary CTA:** Text 415-VEINS-R-US for help choosing a system

### Article 2

**Title:** Portable vs. Console Ultrasound for Vein Clinics  
**URL:** `/capitalhealthsolutions/resources/portable-vs-console-ultrasound-vein-clinics/`  
**Primary CTA:** Compare systems with Capital Health Solutions  
**Secondary CTA:** Request a configuration consultation

### Article 3

**Title:** How to Set Up Your Ultrasound System for DVT Detection  
**URL:** `/capitalhealthsolutions/resources/dvt-ultrasound-system-setup/`  
**Primary CTA:** Book a technician training session  
**Secondary CTA:** Text support with your system model

### Article 4

**Title:** Venous Insufficiency Mapping: Workflow, Protocols, and Machine Settings  
**URL:** `/capitalhealthsolutions/resources/venous-insufficiency-mapping-ultrasound-workflow/`  
**Primary CTA:** Schedule a workflow review  
**Secondary CTA:** Ask about vein-specific presets

These should be written with:

- 40–60 word answer blocks
- FAQ schema-ready sections
- comparison tables
- clear definitions
- citations or references where appropriate
- safety disclaimers where clinical interpretation could be implied
- internal links to devices, training, support, and consultation pages

---

## 8. Interactive Proposal Page

The prototype should include a polished proposal page at:

`/capitalhealthsolutions/proposal/`

### Page structure

1. Hero: “A scalable operating system for Capital Health Solutions”
2. Executive summary
3. Why now
4. Business model assumptions
5. Customer journeys
6. Automation architecture
7. SMS support flow
8. Voice concierge flow
9. HubSpot data model
10. Website + SEO/AEO roadmap
11. Conference lead capture plan
12. Implementation phases
13. Cost assumptions
14. GitHub issue roadmap
15. Open questions
16. Call to action: “Review with Milan and Dinesh”

### Interactive components

- Workflow diagram cards
- Expandable issue groups
- Cost estimate calculator
- SMS support journey simulator
- Voice routing flow diagram
- Timeline by phase
- Before/after operating model
- “What requires human review?” guardrail matrix

---

## 9. HubSpot System Design

HubSpot should be the system of record.

### HubSpot objects

#### Contacts

Fields:

- Name
- Email
- Phone
- Preferred channel
- Role
- Practice/company
- Clinical specialty
- City/state
- Source
- Conference source
- SMS consent status
- Last contacted date
- Next follow-up date
- Owner

#### Companies

Fields:

- Practice name
- Practice type
- Number of providers
- Number of locations
- Geography
- Existing ultrasound systems
- Estimated growth opportunity
- Account status
- Support priority
- Last purchase date
- Next replacement window

#### Deals

Pipelines:

1. New system sale
2. Upgrade/replacement
3. Probe/accessory
4. Training/support package
5. Service issue with sales potential
6. Conference lead

Deal stages:

- New inquiry
- Qualified
- Discovery scheduled
- System recommendation
- Quote requested
- Quote sent
- Follow-up needed
- Verbal commitment
- Closed won
- Closed lost
- Long-term nurture

#### Tickets

Ticket categories:

- Onboarding
- Technical support
- Image quality / settings
- Probe/accessory
- DICOM/PACS/reporting
- Training request
- Warranty/service question
- Urgent workflow blocker
- Potential PHI / sensitive information
- Escalated customer frustration

Ticket priority:

- P0: urgent customer blocked / possible patient-care workflow disruption / customer upset
- P1: same-day technical issue
- P2: routine support or setup question
- P3: educational or enhancement request

#### Machine records

HubSpot may require custom properties rather than custom objects on the free plan. If custom objects are unavailable, machine records can initially live in a linked Google Sheet or Airtable-style table synced into HubSpot properties.

Fields:

- Manufacturer
- Model
- Serial number
- Purchase date
- Install date
- Warranty/service terms
- Customer/practice
- Primary use case
- Probe inventory
- Preset/configuration notes
- Training completed?
- Support history
- Estimated replacement window
- Notes

---

## 10. SMS Support Concierge

### Day 1 objective

Create a standout SMS support experience while staying safe and human-reviewed.

### Business number

Use placeholder:

`415-VEINS-R-US`

Assumptions:

- Owned by Capital Health Solutions
- Attached to a carrier business account
- Currently behaves like a mobile number
- Customers are used to texting it
- Porting to Twilio is preferable but not mandatory for the prototype
- Dedicated Twilio number is acceptable as a fallback

### First message behavior

When a customer texts the business number, the assistant responds:

> Thanks for contacting Capital Health Solutions. You’re chatting with our automated support assistant. I can collect details and notify our team right away. Please do not send patient names, dates of birth, medical record numbers, images containing patient identifiers, or other protected health information by text. If this involves patient-specific information, reply “urgent” and our team will handle it directly.

### Standard support flow

1. Incoming SMS received by Twilio.
2. Cloudflare Worker receives webhook.
3. Worker checks phone number against HubSpot contact records.
4. If known customer, pull company, machine, ticket history, support priority.
5. If unknown, ask for name, practice, and best callback number.
6. Bot classifies message:
   - Sales
   - Support
   - Onboarding
   - Technical question
   - Scheduling
   - Possible PHI
   - Urgent frustration
7. HubSpot ticket is created or updated.
8. Technician is notified by SMS and email.
9. Bot asks one or two targeted diagnostic questions.
10. If needed, bot offers available Google Calendar windows for support.
11. If issue is urgent/frustrated/PHI-sensitive, technician and Dinesh are both notified.
12. All replies are appended to HubSpot ticket timeline.

### Bot can send automatically

- Acknowledgment
- PHI warning
- Clarifying questions
- Scheduling links
- Support article links
- “A technician has been notified”
- “We’re reviewing this now”
- “Can you send the model number or a photo of the error screen? Please avoid patient information.”

### Bot should not send automatically

- Price commitments
- Warranty commitments
- Clinical interpretation
- Legal/regulatory statements
- Diagnosis or treatment advice
- Claims about machine performance
- Refund/return language
- Anything involving patient-specific information

---

## 11. Voice Concierge

### Day 1 routing model

Use Option C:

**Voice agent answers all calls, but new sales calls are identified and routed quickly.**

### Voice personality

“Dinesh-like concierge”:

- Calm
- Confident
- Practical
- Respectful of clinicians’ time
- Technically aware without overclaiming
- Fast to route when human help is better

### Voice call flow

1. Call comes into Twilio number.
2. Twilio opens a Media Stream to the voice agent backend.
3. AssemblyAI handles real-time speech-to-text.
4. LLM classifies intent and chooses route.
5. Agent responds using text-to-speech.
6. If sales: route quickly to Dinesh or create callback if unavailable.
7. If support: gather customer/machine/issue details, create HubSpot ticket, notify technician.
8. If urgent or frustrated: attempt live transfer to technician and notify Dinesh.
9. If after-hours: create ticket and offer scheduling.
10. Call transcript and summary saved to HubSpot.

### Supported call intents

- New system inquiry
- Existing customer support
- Onboarding/training request
- Probe/accessory question
- Conference lead follow-up
- Scheduling
- Vendor/supplier inquiry
- Wrong number/spam

### Call recording and transcript

Future calls should be recorded and summarized, with appropriate disclosure.

Recommended opening:

> Thanks for calling Capital Health Solutions. This call may be recorded and summarized so our team can support you better. I’m the automated assistant and can route you to the right person or collect details for a fast callback.

---

## 12. Google Calendar Scheduling

Create a dedicated Google Calendar:

**Capital Health Solutions Support Windows**

Availability:

- Monday–Friday
- 8:00am–6:00pm Pacific
- Default support session length: 30 minutes
- Urgent slots: protected blocks for same-day escalation
- Sales consultation length: 30 minutes
- Technical onboarding/training length: 45–60 minutes

### Scheduling flows

#### SMS support scheduling

Bot says:

> I’ve notified our technician. Would you like to book a support window? I can offer the next available 30-minute slots.

#### Voice scheduling

Agent says:

> I can either try to connect you now or schedule a technician call. Which would you prefer?

#### HubSpot integration

Each scheduled event should:

- Link to the HubSpot ticket
- Include customer/practice
- Include machine model
- Include issue summary
- Include SMS/call transcript link
- Include customer contact info

---

## 13. Conference Lead Capture System

Dinesh and Milan are splitting two same-week conferences:

- Dinesh: New Orleans
- Milan: Miami

The proposal should include a conference-specific lead capture and follow-up system.

### Conference landing page

URL:

`/capitalhealthsolutions/conference/`

### Recommended headline

**Meet Capital Health Solutions at the vascular conferences this week**

### Conference CTA

> Text your current ultrasound model and what you’re trying to improve. We’ll help you evaluate whether your current system is enough, needs better configuration, or should be upgraded.

### Lead capture form fields

- Name
- Email
- Mobile phone
- Practice/company
- City/state
- Specialty
- Number of providers
- Current ultrasound system
- Biggest imaging/workflow issue
- Timeline
- Interested in:
  - New system
  - Replacement/upgrade
  - Training
  - Configuration
  - Support
  - Probe/accessory
  - Workflow review
- Conference:
  - New Orleans
  - Miami
  - Other

### QR code destinations

1. General conference page
2. Dinesh New Orleans page
3. Milan Miami page
4. SMS deep link:
   - `sms:415VEINSRUS?body=Hi%20Capital%20Health%20Solutions%20-%20I%20met%20you%20at%20the%20conference%20and%20want%20to%20talk%20about%20ultrasound%20for%20my%20practice.`

### Follow-up sequence

#### Immediate

- SMS acknowledgment
- HubSpot contact created
- Conference source captured
- Dinesh/Milan owner assigned
- Meeting link offered

#### Day 1 after conference

- Personalized follow-up email draft
- Human review required before send

#### Day 3

- SMS check-in if consented

#### Day 7

- Educational content follow-up based on interest

#### Day 14

- Consultation reminder

#### Day 30

- Long-term nurture if no response

---

## 14. Website SEO/AEO Audit Workstream

The attached SEO/AEO proposal should be included as a formal workstream.

### Key audit findings to act on

- Add educational content/blog/resource hub.
- Add structured data: Organization, LocalBusiness, Product, FAQ, Article, BreadcrumbList.
- Add AI-readable files: `/llms.txt`, `/pricing.md`, `/AGENTS.md`.
- Rewrite homepage and category copy with stronger vein/vascular ultrasound keywords.
- Add FAQ blocks to every product/service page.
- Add comparison tables and definition blocks.
- Build content clusters around equipment, training, clinical workflows, and comparisons.
- Improve internal linking across devices, resources, training, and support.
- Create case studies and proof assets.
- Monitor traditional search and AI answer visibility.

### AEO positioning

> Capital Health Solutions should become the answer engine for vein and vascular ultrasound selection, configuration, onboarding, and support.

### Machine-readable files

#### `/llms.txt`

Purpose: tell AI crawlers what Capital Health Solutions does and where to find authoritative content.

#### `/pricing.md`

Purpose: provide structured “contact for quote” pricing context, typical factors, and disclaimers without publishing exact pricing.

#### `/AGENTS.md`

Purpose: define how AI agents should use site content, safety constraints, support boundaries, and preferred citations.

---

## 15. Cost Assumptions

These are planning estimates only and should be confirmed at setup time.

### HubSpot

Recommended start:

- HubSpot Free CRM + Service tools
- Contacts, companies, deals, tasks, email tracking, meeting scheduling
- Free ticketing if sufficient
- Upgrade later only if simple automation, reporting, or multiple ticket pipelines become limiting

### Twilio number

Assume one US local number or ported business number.

Planning estimate:

- Local number: approximately low single-digit dollars per month
- Toll-free option: slightly higher monthly number cost
- Bring-your-own-number: possible if current carrier and number type support porting
- Additional regulatory fees/taxes may apply

### SMS

Planning model:

- Twilio US SMS usage billed per message segment
- Assume 1 inbound + 1 outbound = 2 message segments per exchange
- Support conversations may include 4–10 segments depending on length
- Conference follow-up can create bursts of outbound SMS

Example volume assumptions:

| Scenario | Conversations/month | Avg message segments/conversation | Estimated SMS segments/month |
|---|---:|---:|---:|
| Low | 100 | 6 | 600 |
| Moderate | 300 | 8 | 2,400 |
| Higher | 750 | 10 | 7,500 |

At low/moderate volume, SMS costs should likely remain operationally modest. The bigger costs are setup, QA, compliance guardrails, and support process design.

### Voice

Voice cost components:

- Twilio voice minutes
- AssemblyAI streaming transcription / voice agent usage
- LLM usage
- Text-to-speech usage
- Call recording/storage, if enabled

Example planning assumptions:

| Scenario | Calls/month | Avg minutes/call | Voice minutes/month |
|---|---:|---:|---:|
| Low | 100 | 4 | 400 |
| Moderate | 300 | 5 | 1,500 |
| Higher | 750 | 6 | 4,500 |

Voice should be monitored closely in the first month. The Day 1 goal is reliable routing and context capture, not long AI conversations.

### Cloudflare Workers

Likely sufficient on free or low-cost tier for:

- SMS webhooks
- HubSpot lookups
- Simple classification
- Routing
- PHI detection guardrails
- Support article retrieval
- Ticket creation

### Trigger.dev

Use for:

- Longer-running jobs
- Scheduled follow-ups
- CRM enrichment
- Daily owner digest
- Conference sequence steps
- Document parsing jobs
- Retryable workflows

### Document parsing

Options:

- Docling: open-source, good for local/controlled parsing
- LlamaParse: good for complex PDFs and structured extraction
- LlamaIndex: useful for indexing and retrieval over parsed documents
- Google Drive API: source retrieval
- HubSpot attachments or linked Drive docs: output storage

---

## 16. Implementation Phases

### Phase 0: Alignment and access

Duration: 1 week

Deliverables:

- Confirm phone number strategy
- Confirm HubSpot account
- Confirm Google Workspace access
- Confirm website/prototype repo
- Confirm support escalation rules
- Confirm Dinesh/Milan/technician roles
- Confirm conference dates, landing page needs, and QR workflows

### Phase 1: HubSpot foundation

Duration: 1–2 weeks

Deliverables:

- HubSpot account setup
- CRM schema
- Pipeline setup
- Ticket categories
- Gmail integration
- Technician access
- Contact/company import
- Machine data import plan
- Owner dashboard

### Phase 2: Day 1 SMS support

Duration: 1–2 weeks

Deliverables:

- Twilio number setup or porting plan
- SMS webhook
- Cloudflare Worker
- HubSpot ticket creation
- SMS/email technician alerts
- PHI warning
- Bot classification logic
- Support scheduling integration
- Test suite and human review workflow

### Phase 3: Day 1 voice concierge

Duration: 2–4 weeks

Deliverables:

- Twilio voice number routing
- AssemblyAI voice agent backend
- Intent classification
- Live transfer rules
- HubSpot ticket/deal creation
- Call summaries
- Recording disclosure
- Technician/Dinesh escalation
- Monitoring and fallback handling

### Phase 4: Conference engine

Duration: 1–2 weeks, ideally before conference week

Deliverables:

- Conference landing page
- QR code flows
- Conference lead form
- SMS deep link
- HubSpot source tagging
- Dinesh/Milan assignment rules
- Follow-up email/SMS sequences
- Daily lead summary

### Phase 5: Website prototype

Duration: 2–4 weeks

Deliverables:

- Next.js site under `corvolabs.com/capitalhealthsolutions`
- Option 02 design system adapted
- Homepage
- Proposal page
- Devices hub/detail
- Solutions pages
- Training page
- Support page
- Resources hub
- First 4 articles
- Case study placeholders
- Contact/consultation page
- SEO metadata
- Schema markup
- Analytics

### Phase 6: Content/AEO engine

Duration: ongoing

Deliverables:

- Content publishing workflow
- Support article system
- FAQ schema blocks
- `/llms.txt`
- `/pricing.md`
- `/AGENTS.md`
- Internal linking
- Search Console monitoring
- AI answer visibility tracking

---

## 17. Risk and Guardrail Matrix

| Area | Risk | Guardrail |
|---|---|---|
| SMS support | Patient details sent by SMS | Warning in first response; PHI classifier; immediate human escalation |
| Voice agent | Bad routing or overlong AI interaction | Quick intent classification; live transfer; fallback voicemail/callback |
| Sales | AI overpromises pricing or availability | Human review required for outbound sales and quote language |
| Support | Bot gives incorrect technical instructions | Only approved troubleshooting; escalate when uncertain |
| Warranty/service | Bot makes commitments | No warranty/service promises without human approval |
| Clinical questions | Bot gives medical advice | Bot only discusses equipment operation/workflow; no clinical interpretation |
| CRM hygiene | Data becomes stale | Required owner fields, weekly cleanup, dashboard review |
| Conference follow-up | Over-messaging leads | Short sequence, opt-out language, human-reviewed sales emails |
| Website proof | Unsupported claims | Mark placeholders; avoid invented metrics; collect real case evidence |

---

## 18. GitHub Issue Plan

The project should be implemented as a structured issue backlog with labels by workstream:

- `setup`
- `design-system`
- `website`
- `content`
- `seo-aeo`
- `hubspot`
- `sms`
- `voice`
- `calendar`
- `conference`
- `data-migration`
- `support-ops`
- `security-compliance`
- `analytics`
- `proposal-page`
- `qa`

A CSV issue backlog is included separately in this package.

---

## 19. Reference Files

Use these uploaded files as source/reference material:

1. `capital-health-solutions-proposal.md`  
   SEO/AEO audit and content proposal.

2. `capital-health-solutions-homepage-01.html`  
   Homepage prototype option 01.

3. `capital-health-solutions-homepage-02.html`  
   Selected homepage prototype option 02. Use as the primary visual direction.

4. `captial-healthsolutions-homepage-03.html`  
   Homepage prototype option 03. Useful for more operational/performance-oriented components.

---

## 20. Recommended Next Step

Build the reviewable prototype and proposal page first.

The best deliverable for Milan and Dinesh is not a static PDF. It is a live, navigable prototype at:

`corvolabs.com/capitalhealthsolutions/`

They should be able to click through:

- the proposed homepage
- the interactive proposal
- the SMS/voice support model
- the conference lead capture flow
- the first content/articles
- the SEO/AEO strategy
- the implementation roadmap

That will make the proposal feel concrete, useful, and easier to approve.
