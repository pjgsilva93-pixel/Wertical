# Wertical — Brand Guide

---

## 1. Brand Identity

**Studio Name:** Wertical  
**Tagline:** *"Ideas. Designed. Delivered."*  
**Sub-descriptor:** UX / UI / Graphic / Visual Lab  
**Positioning:** "We design smart. From idea to delivery, from concept to launch."  

**Founder:** Paulo Silva — UX/UI Designer, Graphic Designer & Developer  
**Credentials:** Google UX Design Certification · Graphic Design Certification, UCD Academy (University College Dublin)

---

## 2. Brand Voice & Tone

- **Direct** — Short, purposeful sentences. No filler.
- **Confident** — Statements, not questions.
- **Human** — Written by a person, not a corporation.
- **Smart** — References process, craft, and intent.

### Voice Examples
> "We create clear and consistent visual identities that express the essence of a brand."  
> "We design intuitive digital experiences focused on usability, clarity, and seamless interaction."  
> "I care deeply about how things look, how they feel, and how they work for real people."

---

## 3. Logo

- **File:** `/public/Logo.svg`
- **Formats:** SVG (primary), scalable
- **Usage sizes:**
  - Hero / Feature: 160 × 160px
  - Navigation / Compact: 32 × 32px
- **Clear space:** Maintain padding equal to the logo width on all sides when used standalone
- **Animations (web only):** Entrance (0.8s spring) + continuous subtle float (5s loop)

---

## 4. Color Palette

### Core

| Name | Hex | Usage |
|---|---|---|
| Black | `#000000` | Primary text, CTAs, borders |
| White | `#FFFFFF` | Backgrounds, reversed text |
| Surface Grey | `#F4F4F4` | Hero background, subtle panels |
| Neutral | `#F2F2F2` | Photo backgrounds, cards |

### Opacity Scale (Black)
Used throughout via Tailwind opacity modifiers:

| Token | Opacity | Typical Use |
|---|---|---|
| `black/60` | 60% | Secondary headings |
| `black/55` | 55% | Descriptions, tags |
| `black/50` | 50% | Supporting body text |
| `black/45` | 45% | Subtitles |
| `black/30` | 30% | Muted labels |
| `black/25` | 25% | Micro labels, dividers |
| `black/10` | 10% | Card borders |
| `black/5` | 5% | Tag backgrounds, subtle fills |

### Accent

| Name | Hex | Usage |
|---|---|---|
| Brand Blue | `#08487E` | Value proposition indicators |

### Status / Badge Colors

| Name | Usage |
|---|---|
| `bg-amber-50 / text-amber-700` | Concept badge |
| `bg-blue-50 / text-blue-700` | Collaboration badge |

### Portfolio Project Accents *(project-specific only)*

| Project | Color |
|---|---|
| Acai | `#4A47F2` |
| Kin Haus | `#2C6E49` |
| Spotify | `#1DB954` |
| OuterSignal | `#0A1A06` |
| Min Bark | `#0D0D0D` |
| AI Pitch Deck | `#EEEDE9` |
| Fold Studio | `#1A1918` |
| Finance App | `#0F1117` |
| Beethoven | `#0A0A0A` |

---

## 5. Typography

### Typeface
**Inter** (Google Fonts) — the single typeface for all copy.  
Fallback: `system-ui, -apple-system, sans-serif`  
Rendering: antialiased

### Type Scale

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero H1 | 48px | 700 Bold | −1.2px | 1.1 |
| Section H2 | 36px (24px mobile) | 700 Bold | tight | tight |
| Card H3 / Value | 24px | 600 Semibold | −0.48px | 1.2 |
| Lead Body | 16px | 600 Semibold | −0.1px | 1.65 |
| Body Standard | 14px | 500 Medium | — | 1.8 |
| Callout / Italic | 13px | 500 Medium Italic | — | 1.75 |
| CTA Button | 18px | 500 Medium | −0.09px | — |
| Badge / Tag | 10–12px | 600 Semibold | widest | — |

### Weights in Use
`300` Light · `400` Regular · `500` Medium · `600` Semibold · `700` Bold

---

## 6. Spacing & Layout

### Grid

| Context | Columns | Gap |
|---|---|---|
| Portfolio cards | 1 → 2 → 3 (mobile/md/lg) | `gap-6` (24px) |
| Feature cards | 1 → 2 | `gap-8` (32px) |
| Value propositions | 1 → 3 | `gap-6` (24px) |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `gap-8` | 32px | Section-level gaps |
| `gap-6` | 24px | Card grids |
| `gap-4` | 16px | Internal card spacing |
| `gap-2` | 8px | Inline / tight elements |
| `p-6` | 24px | Standard card padding |
| `px-8 md:px-16` | 32→64px | Page horizontal padding |
| `py-[120px]` | 120px | Hero vertical padding |

---

## 7. Border Radius

| Usage | Token | Value |
|---|---|---|
| Cards, images, callouts | `rounded-2xl` | 16px |
| Buttons, smaller cards | `rounded-xl` | 12px |
| Badges, tags | `rounded-md` / `rounded-full` | 6px / pill |

---

## 8. Borders & Dividers

| Type | Style |
|---|---|
| Card default | `border border-black/10` |
| Card hover | `border-black/25` |
| Dashed placeholder | `border-dashed border-black/15` |
| Section divider | `h-px bg-black/8` |
| Nav bottom | `border-b border-black/5` |

---

## 9. Shadows

| Context | Value |
|---|---|
| Card hover | `shadow-md` |
| Image drop shadow | `drop-shadow(0 8px 24px rgba(0,0,0,0.14))` |

---

## 10. Buttons & CTAs

### Primary Button
```
Background:    bg-black (#000)
Text:          white, 18px, medium, tracking: -0.09px
Padding:       px-6 py-3
Radius:        rounded-xl
Hover:         bg-black/80
Transition:    transition-colors
```

### Secondary / Ghost
```
Background:    transparent or subtle
Text:          sm, semibold
Padding:       px-5 py-2.5
Radius:        rounded-xl
```

---

## 11. Components

### Hero Pattern
- Animated logo (entrance + float)
- Bold H1, tight line-height
- Subtitle at 50–60% opacity
- Dotted grid background with gradient vignette

### Feature Card
- `rounded-2xl` image with hover scale (1.03×)
- Title + description below
- Consistent `p-6` internal padding

### Portfolio Card
- Type badge(s) at top right
- Bold project title
- Description body copy
- Skill tags row at bottom with `border-t` separator
- Hover: `shadow-md` + `border-black/25`

### Value Proposition Card
- Small `#08487E` dot indicator
- Title (semibold) + description (medium)
- `bg-black/5` background, `rounded-2xl`

### Badge / Tag
```
Type badge:     bg-black/5 · text-black/55 · rounded-full · px-3 py-1 · text-xs medium
Skill tag:      bg-black/5 · text-black/55 · rounded-md · px-2 py-0.5 · text-xs
Concept:        bg-amber-50 · text-amber-700 · border-amber-200
Collaboration:  bg-blue-50 · text-blue-700 · border-blue-200
```

---

## 12. Animation Principles

| Name | Duration | Easing | Behavior |
|---|---|---|---|
| `logoEntrance` | 0.8s | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale 0.8→1 + fade in |
| `logoFloat` | 5s ∞ | ease-in-out | Subtle translate + rotation |
| `fadeInUp` | — | ease-out | translateY +32px→0, scale 0.97→1, fade |
| `heroBgZoom` | — | — | Scale 1→1.12→1 |
| Image hover | 500ms | ease-out | `scale-[1.03]` |

**Principle:** Motion is subtle, purposeful, and never distracting. Entrance animations signal intent; hover states confirm interaction.

---

## 13. Services

| Service | Description |
|---|---|
| **Branding** | Clear, consistent visual identities recognisable across every touchpoint |
| **UX / UI** | Intuitive digital experiences and functional interfaces focused on usability and clarity |
| **Graphic Design** | Visually impactful solutions — concept, typography, composition |
| **Development & Automation** | Websites, apps, backend systems, AI agents, and automated workflows |

---

## 14. Microcopy Standards

**Navigation:** Home · Works · About · Contact · `EN / PT`  
**CTA headline:** "You think big, we create it."  
**Project types:** Brand Identity · Web Design · UX / UI Design · Graphic Design  
**Budget tiers:** Under €1k · €1k–€5k · €5k–€10k · €10k+  
**Timelines:** ASAP · Within a month · 1–3 months · Flexible

---

## 15. Tech Stack (for design-dev handoff)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Fonts | `next/font/google` (Inter) |
| Animations | CSS keyframes in `globals.css` |

---

*Last updated: April 2026*
