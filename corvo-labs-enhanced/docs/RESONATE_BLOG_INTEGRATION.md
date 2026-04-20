---
title: "Publishing blog posts from Resonate into corvo-labs-dot-com"
audience: "Resonate maintainer (owner of https://github.com/jakebutler/resonate)"
purpose: "Contract that keeps auto-generated blog PRs rendering correctly on the live Corvo Labs site."
---

# Publishing blog posts from Resonate into `corvo-labs-dot-com`

This is the contract that the Resonate publisher has to satisfy when it
opens a PR like #21 / #22 against `corvo-labs-dot-com`. It exists because
PR #22 shipped with three rendering bugs that all came from the same
root cause: the generated MDX didn't match what the Corvo Labs blog
renderer expects.

The Corvo Labs site now renders in a way that is more forgiving of
markdown-style image syntax and the `heroImage` frontmatter key Resonate
emits (see [this commit](#site-side-changes)). But to keep future posts
from regressing in subtle ways, Resonate itself should emit MDX that
follows the rules below.

---

## Where the post goes

- Path: `corvo-labs-enhanced/content/blog/<slug>.mdx`
- Slug: the filename (without `.mdx`) becomes the URL segment at
  `https://corvolabs.com/blog/<slug>`. Keep it kebab-case and prefix with
  the ISO date (`2026-04-20-3-hours-to-create-79-assets-go`) so the file
  list stays chronologically sorted.

## Required frontmatter

The site reads frontmatter via `gray-matter` in `src/lib/blog.ts`. It now
accepts either the legacy Corvo keys or the Resonate-native keys, but
there are fields that MUST be present for the post to render well:

```yaml
---
title: "3 Hours to Create 79 Assets. Go."          # required
date: "2026-04-20"                                 # required, ISO date
description: "..."                                 # used as excerpt on /blog cards
heroImage: "https://.../storage/<uuid>"            # shows on /blog cards and at top of post
heroImageAlt: "Descriptive alt text for the hero"  # REQUIRED for a11y + SEO
tags: ["AI workflow", "content operations"]        # 1-5 short tags; first 2 appear on the card
author: "Jake Butler"                              # default if omitted; set it explicitly
readTime: "5 min read"                             # default "5 min read" if omitted
category: "strategy"                               # default "strategy" if omitted
status: "scheduled"                                # "draft" hides the post; anything else publishes
---
```

Notes for Resonate:

- `heroImage` / `heroImageAlt` are aliased to `coverImage` / `coverImageAlt`
  in `src/lib/blog.ts`. Either name works, but pick one and be consistent;
  Resonate's current output uses `heroImage`, which is fine.
- `description` is aliased to `excerpt` for the blog card. Keep it <= 160
  characters — we also use it as the meta description.
- Do NOT put an in-body copy of the hero image. The post renderer already
  shows the hero on the detail page from frontmatter, and the blog index
  needs it in frontmatter to light up the card thumbnail. Duplicating it
  as a markdown `![alt](url)` right below the frontmatter creates a second
  copy with different styling.

## Body formatting rules

### 1. Every block-level thing gets its own blank-line-delimited block

This is the rule that actually fixes the "## heading rendered as literal
text" bug. Markdown parsers need a blank line before headings, images,
and lists to treat them as block-level. Resonate was emitting this:

```markdown
![hero_image](https://...)How We Produced 79 Visual Assets

![asset1_workflow_flowchart](https://...)## The prep work
```

which Markdown sees as a single paragraph starting with an image, so the
`## The prep work` renders as the text "## The prep work" instead of an
`<h2>`.

Always emit:

```markdown
![Descriptive alt text for the asset](https://...)

## The prep work that made the session possible
```

i.e. one blank line between the image and the next block, and one blank
line between any two block-level constructs (paragraph, heading, image,
list, blockquote, table).

### 2. Image alt text is content, not a slug

Resonate is currently writing placeholder slugs (`asset1_workflow_flowchart`,
`hero_image`) as alt text. Those are leaking to assistive tech and to
social cards.

Use the same natural-language caption you'd want a screen reader to read.
The site renders the alt text as a figcaption under every inline image,
so it's reader-visible too. Rule of thumb: 1 sentence, describes what
the diagram shows, no markup, no internal IDs.

Bad:

```markdown
![asset3_iteration_rules_card_v2](https://...)
```

Good:

```markdown
![Woodcut-style reference card listing the iteration rules locked in during the first article: legends below charts, 4:3 aspect ratio for reference cards, no 3D perspective on flat cards](https://...)
```

### 3. Inline images use plain markdown `![alt](src)`

The site now renders every markdown image with the same `<figure>` + soft
shadow + figcaption treatment that used to require the `<BlogImage />`
MDX component (see `src/app/blog/[slug]/page.tsx` → `components.img`).

So Resonate can keep emitting vanilla markdown:

```markdown
![Flowchart of the generation workflow, from content audit through final review](https://healthy-platypus-553.convex.cloud/api/storage/<uuid>)
```

and the site will wrap it in the standard card.

Rules:

- Image on its own line, with blank lines above and below.
- No other content on that line (no heading glued to the end, no trailing
  text).
- Use absolute URLs for Convex-hosted assets
  (`https://healthy-platypus-553.convex.cloud/api/storage/<uuid>`). The
  site's `next.config.js` is already configured for that host.

### 4. Headings: start at `##`

The post's title is rendered by the page template from frontmatter, so
the MDX body should:

- Never contain an `<h1>` or `# Title` line.
- Start the body with a paragraph (lede), not a heading.
- Use `##` for top-level body sections and `###` for nested ones.

PR #22's "How We Produced 79 Visual Assets in a Single Session" line at
the top of the body is an orphan that duplicates the title — Resonate
should drop lines like that.

### 5. Inline-escape sequences

Markdown-style escapes like `\[Year\]` are fine and will render as
`[Year]`. GFM is enabled (`remark-gfm`), so tables, task lists, and
autolinks work.

### 6. Lists, code, tables

- Lists: one blank line above the list, one blank line below.
- Inline code: single backticks.
- Tables: GFM pipe syntax, with a blank line on either side.

## Checklist Resonate should run before opening the PR

Before `git push` + PR creation, run these checks on the generated
`<slug>.mdx`:

- [ ] Frontmatter has `title`, `date`, `heroImage`, `heroImageAlt`,
  `description` or `excerpt`, `tags` (>=1).
- [ ] No markdown image points to the same URL as `heroImage` in the
  first 5 non-frontmatter lines.
- [ ] No line matches the regex `^!\[[^\]]*\]\([^)]+\)\S`. That's the
  "image glued to the next block" pattern that broke PR #22.
- [ ] No line matches `^!\[(hero_image|asset\d+_)` (enforces real alt
  text, not Resonate placeholder slugs).
- [ ] No `# ` (h1) in the body.
- [ ] File parses cleanly with `gray-matter` and the content section
  parses with a standard commonmark + GFM parser.

A tiny Ruby/Node linter that asserts these rules in Resonate's publisher
step is the cheapest way to keep this contract honest. Suggested failure
message for rule 3: `"Image alt text looks like a slug (\"hero_image\");
replace with a descriptive caption."`

## Site-side changes

For context, the following changes landed in `corvo-labs-dot-com` on the
same PR that fixed PR #22 styling:

- `src/lib/blog.ts` now treats `heroImage` / `heroImageAlt` /
  `description` / `status: "draft"` as aliases for the legacy keys.
- `src/app/blog/[slug]/page.tsx` now maps the MDX `img` element to the
  same styled `<figure>` used by `<BlogImage />`, and unwraps the
  wrapping `<p>` so the HTML stays valid.

That means Resonate's current output already renders correctly on the
site without any MDX author having to touch `<BlogImage />`. The rules
above are how we keep that contract stable going forward.
