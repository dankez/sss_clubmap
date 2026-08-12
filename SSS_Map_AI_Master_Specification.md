# SSS Map — AI Agent Master Specification

> **Purpose:** This document is the single implementation brief for an AI coding agent building **SSS Map**, a public-facing visual map of Slovak speleology.
>
> **Language:** Slovak (including all UI labels and content written for the public).
>
> **Primary principle:** **VIZUÁL → JEDNODUCHOSŤ → PRAVDIVOSŤ → KONTAKT.**
>
> This project must resist feature creep. A technically interesting feature is not automatically a useful feature.

---

# 1. Product vision

SSS Map is **not a club management system**.

It is a visually impressive, simple, trustworthy public presentation of Slovak speleology.

The visitor should be able to answer four questions quickly:

1. **Kde je speleológia na Slovensku?**
2. **Ktoré krasové/oblasti sú zaujímavé?**
3. **Kto v danej oblasti pôsobí?**
4. **Koho mám kontaktovať, ak ma speleológia zaujíma?**

The application should feel closer to a **modern interactive editorial map / digital atlas** than to a database or administrative dashboard.

## Product rule

Before implementing any feature, ask:

> **Pomáha táto funkcia verejnosti lepšie pochopiť mapu, oblasť, skupinu alebo kontakt?**

If the answer is no, do not add it to MVP.

---

# 2. Scope

## 2.1 In scope

- interactive map of Slovakia
- visual representation of speleological areas
- overlapping group activity polygons
- clickable areas
- clickable groups
- group presentation cards
- area presentation cards
- aggregated, non-sensitive cave information
- links/contact to groups
- public photos/logos
- AI-assisted data ingestion
- YAML data packages
- Git versioning
- simple admin UI
- WordPress shortcode integration
- responsive desktop/mobile public UI

## 2.2 Explicitly out of scope

Do NOT turn this into:

- CRM
- member database
- attendance system
- club accounting
- expedition management
- internal club communication
- internal document management
- membership registration system
- detailed cave database
- precise cave entrance GPS database
- public cave entrance map
- underground route map
- sensitive cave-location disclosure system
- GIS administration suite
- complicated permissions system
- club ERP
- social network
- statistics dashboard full of charts

If a future project needs these things, build another system.

---

# 3. Visual priority

This is one of the most important parts of the specification.

## 3.1 The UI must NOT look like an admin database

Avoid:

- dense tables
- excessive borders
- tiny text
- grey enterprise UI
- dozens of badges
- dashboard-card overload
- generic Bootstrap appearance
- generic SaaS appearance
- excessive gradients
- excessive glassmorphism
- giant shadows
- neon colors
- unnecessary animation

The public application should feel:

- natural
- adventurous
- elegant
- modern
- trustworthy
- slightly mysterious
- connected to landscape and underground spaces
- readable
- calm

Think:

**Slovak landscape + limestone + cave darkness + exploration + scientific credibility.**

Not:

**corporate dashboard + generic map app.**

---

# 4. Design language

## 4.1 Visual concept

The visual language should combine:

### Surface
- forest
- mountains
- limestone
- moss
- rivers
- natural landscape

### Underground
- dark stone
- cave depth
- subtle mineral textures
- darkness
- warm headlamp-like highlights

### Information
- clean typography
- generous whitespace
- clear hierarchy
- restrained data visualization

The map itself should remain the hero.

---

# 5. Color system

Use a stable design token system. Never scatter arbitrary hex colors through components.

## 5.1 Core palette

```css
:root {
  --color-bg: #F4F1E8;
  --color-surface: #FFFCF5;
  --color-surface-elevated: #FFFFFF;

  --color-text: #1F2A24;
  --color-text-secondary: #526057;
  --color-text-muted: #7A847D;

  --color-forest: #23483A;
  --color-forest-dark: #17352B;
  --color-forest-light: #DCE8DF;

  --color-stone: #6E756F;
  --color-stone-light: #D8D5CA;
  --color-limestone: #E8E1D2;

  --color-cave: #17211D;
  --color-cave-soft: #27332D;

  --color-accent: #C47A32;
  --color-accent-light: #F0D6B5;

  --color-water: #3D7180;
  --color-water-light: #D9E9EC;

  --color-success: #3D6B50;
  --color-warning: #A96D24;
  --color-danger: #9B4D43;

  --color-border: #D8D5CA;
  --color-overlay: rgba(23, 33, 29, 0.72);
}
```

## 5.2 Color meaning

### Forest `#23483A`
Primary brand color.

Use for:
- primary buttons
- selected states
- headings in some contexts
- map controls
- important UI

### Dark cave `#17211D`
Use for:
- dark map overlays
- hero sections
- modal/detail backgrounds
- high-contrast presentation moments

### Warm amber `#C47A32`
Use sparingly.

It represents:
- exploration
- headlamp
- discovery
- CTA emphasis
- selected map highlight

Do not turn the whole interface orange.

### Limestone `#E8E1D2`
Natural neutral.

### Warm background `#F4F1E8`
Main public page background.

This should feel more natural than pure white.

### Water `#3D7180`
Use for:
- rivers/water
- secondary map information
- occasional visual accents

---

# 6. Polygon colors

Overlapping polygons are expected.

Do not use a different random color for every group.

Use a restrained translucent palette.

Example:

```css
.area-primary {
  fill-opacity: 0.28;
  stroke-opacity: 0.85;
}

.area-secondary {
  fill-opacity: 0.16;
  stroke-opacity: 0.60;
}
```

The map should remain readable when several polygons overlap.

When the visitor selects a group:

- selected polygon becomes stronger
- other polygons become slightly subdued
- map does NOT disappear underneath

When several groups overlap, the UI should explain the overlap rather than treat it as an error.

Example:

> **V tejto oblasti pôsobia 3 skupiny**

---

# 7. Typography

Slovak diacritics are mandatory.

The application must correctly render:

```text
á ä č ď é í ĺ ľ ň ó ô ŕ š ť ú ý ž
Á Ä Č Ď É Í Ĺ Ľ Ň Ó Ô Ŕ Š Ť Ú Ý Ž
```

## Recommended primary font

Use **Plus Jakarta Sans** for the main UI.

Reason:
- excellent modern readability
- strong Slovak/Latin support
- good numbers
- modern but not corporate
- suitable for map UI and cards

## Recommended display font

Use **Source Serif 4** selectively for large editorial headings / area storytelling.

This gives the application a more atlas/editorial feeling.

Do not use the serif font everywhere.

### Typography roles

```text
Map UI / buttons / navigation:
Plus Jakarta Sans

Body:
Plus Jakarta Sans

Group names:
Plus Jakarta Sans, semibold

Large area title:
Source Serif 4, semibold

Hero numbers:
Plus Jakarta Sans, bold
```

## Font loading

Prefer local/self-hosted font files for predictable rendering and privacy.

Do not make the application dependent on an external font CDN.

---

# 8. Typography scale

Use a responsive type scale.

```css
--font-xs: 0.75rem;
--font-sm: 0.875rem;
--font-md: 1rem;
--font-lg: 1.125rem;
--font-xl: 1.5rem;
--font-2xl: 2rem;
--font-3xl: 2.75rem;
--font-4xl: 4rem;
```

Large headings should scale down gracefully on mobile.

Recommended:

```text
Desktop hero:
48–64px

Desktop area title:
40–56px

Group title:
28–40px

Body:
16–18px

Small metadata:
13–14px
```

Never sacrifice readability to fit more information.

---

# 9. Design principles

## 9.1 Map first

The map gets the largest visual area.

On desktop:

```text
┌────────────────────────────────────────────────┐
│ navigation / minimal header                    │
├────────────────────────────────────────────────┤
│                                                │
│                                                │
│                  MAP                           │
│                                                │
│                                                │
│                                  ┌───────────┐ │
│                                  │ map tools │ │
│                                  └───────────┘ │
└────────────────────────────────────────────────┘
```

Do not place a huge sidebar permanently beside the map.

Use floating panels / bottom sheets / contextual cards.

## 9.2 Progressive disclosure

Show little initially.

Then:

```text
map
 ↓
area
 ↓
group
 ↓
contact
```

Do not show all information at once.

## 9.3 One clear action

Each detail view should have one dominant CTA.

Examples:

> **Kontaktovať skupinu**

or:

> **Pozrieť skupiny v oblasti**

---

# 10. Public navigation

Keep navigation minimal.

Suggested desktop header:

```text
SSS
Mapa        Oblasti        Skupiny        O speleológii
```

Possibly a prominent:

> **Nájdi skupinu**

Do not create 15 navigation items.

On mobile:

```text
SSS
              ☰
```

or a minimal bottom navigation if testing proves it better.

---

# 11. Landing experience

The main route `/` should open directly into the map experience.

Possible introduction:

```text
SLOVENSKO POD POVRCHOM

Objavte svet slovenských jaskýň,
krasu a ľudí, ktorí ho skúmajú,
dokumentujú a chránia.

[ Preskúmať mapu ]
```

This hero may appear as a short overlay over a beautiful map/landscape visual.

Do not force a long marketing landing page before the map.

The visitor should reach the actual map immediately.

---

# 12. Map UX

Recommended map technology:

## MapLibre GL JS

Prefer MapLibre GL JS for the interactive map.

Reasons:
- modern vector rendering
- smooth zooming
- good styling control
- open ecosystem
- suitable for custom visual identity
- supports GeoJSON and vector sources

The application should be designed so the basemap provider can be changed without rewriting application logic.

Do not hard-code map provider logic throughout components.

Create a map abstraction.

---

# 13. Map base style

The base map should be subdued.

The public SSS data should visually dominate.

Recommended:
- muted beige/green land
- restrained roads
- subtle terrain
- subdued labels
- blue/grey water
- darker forests
- low-contrast urban areas

Avoid a bright Google-like road map.

The map should feel like an **illustrated natural atlas**.

---

# 14. Map hierarchy

At country zoom:

Show:
- Slovakia
- main geographical structure
- major kras areas
- high-level group presence

At regional zoom:

Show:
- area polygons
- area labels
- groups active in the area

At detailed zoom:

Show:
- group polygons
- group labels when useful
- no sensitive cave entrances

Never show exact cave entrances by default.

---

# 15. Map interactions

### Hover desktop

Subtle highlight:

```text
area → brighter border
```

Tooltip:

> Slovenský kras  
> 500+ jaskýň

### Click

Open contextual detail card.

### Mobile

Tap.

Use bottom sheet:

```text
┌──────────────────────────┐
│ Slovenský kras            │
│                           │
│ 500+ jaskýň               │
│                           │
│ 3 skupiny                 │
│                           │
│ [ Preskúmať oblasť ]      │
└──────────────────────────┘
```

---

# 16. Group presentation

A group should look like a real organization, not a database record.

Recommended card:

```text
┌─────────────────────────────────────┐
│                                     │
│             LOGO                    │
│                                     │
│     Speleoklub Cassovia             │
│                                     │
│     Košice · Slovenský kras         │
│                                     │
│     Prieskum · Výskum · Mapovanie   │
│                                     │
│     Krátky autentický popis...      │
│                                     │
│     [ KONTAKTOVAŤ ]                 │
│                                     │
│     Web →                            │
└─────────────────────────────────────┘
```

If a good photograph exists, prefer:

```text
image
 ↓
gradient/overlay
 ↓
group title
```

Use logos where appropriate.

Do not invent photos.

---

# 17. Group description

AI may create a short description from sources.

Target:
- 2–3 sentences
- human-readable
- factual
- no marketing hallucinations
- no unsupported claims

Avoid:

> "Najlepšia a najaktívnejšia skupina na Slovensku."

Unless a source explicitly supports it.

Prefer:

> "Skupina pôsobí v okolí ... a venuje sa prieskumu, dokumentácii a mapovaniu krasových javov."

---

# 18. Area presentation

Area detail should feel editorial.

Possible layout:

```text
┌──────────────────────────────────────────────┐
│ HERO IMAGE                                   │
│                                              │
│ Slovenský kras                               │
│                                              │
│ Jedna z najvýznamnejších krasových oblastí   │
└──────────────────────────────────────────────┘

        500+
        známych jaskýň

V oblasti pôsobia

[ GROUP CARD ]
[ GROUP CARD ]
```

Do not turn area pages into scientific encyclopedia pages.

The map remains primary.

---

# 19. Safety and cave protection

This is a core product requirement.

Never expose:
- exact cave entrance coordinates
- sensitive cave entrances
- underground routes
- restricted caves
- vulnerable locations
- precise directions to sensitive caves

Aggregate information is allowed when reliable.

Examples:

> 500+ jaskýň

> desiatky kilometrov krasových javov

Only if verified.

The UI should never encourage amateur exploration of dangerous or protected caves.

A subtle public note may be used:

> **Citlivé lokality a presné polohy jaskýň nie sú na mape zobrazené. O možnostiach zapojenia sa informujte u príslušnej speleologickej skupiny.**

This supports the primary CTA.

---

# 20. Data philosophy

The application is deliberately data-light.

Public data should be limited to information that improves presentation:

### Group
- id
- name
- logo
- short description
- website
- public contact
- activities
- area relationships
- verification date

### Area
- id
- name
- description
- image
- aggregated cave count
- polygon
- groups

Everything else is optional and should only be added if it clearly improves public UX.

---

# 21. YAML repository

Recommended structure:

```text
sss-map-data/
├── README.md
├── schema/
│   ├── group.schema.yaml
│   └── area.schema.yaml
│
├── groups/
│   ├── group-001/
│   │   ├── group.yaml
│   │   ├── sources.yaml
│   │   ├── evidence.yaml
│   │   └── assets/
│   │       └── logo.png
│   │
│   └── ...
│
├── areas/
│   ├── slovensky-kras/
│   │   ├── area.yaml
│   │   ├── polygon.geojson
│   │   └── assets/
│   │
│   └── ...
│
└── scripts/
```

---

# 22. Schema

Every data package has:

```yaml
schema_version: "1.0"
```

The application must validate YAML before publishing.

Invalid data must never reach production.

Recommended validation:
- required fields
- valid IDs
- valid email format where applicable
- valid URL
- valid enum values
- polygon validity
- referenced group IDs exist
- referenced area IDs exist
- asset paths exist

---

# 23. Relationship model

Do NOT model:

```text
area belongs to group
```

Instead:

```text
group ↔ area
```

This is many-to-many.

A group may have several areas.

An area may have several groups.

Example:

```yaml
areas:
  - area_id: "slovensky-kras"
    relationship: "primary"

  - area_id: "volovske-vrchy"
    relationship: "cooperation"
```

Area:

```yaml
groups:
  - group_id: "sss-001"
    relationship: "primary"

  - group_id: "sss-014"
    relationship: "cooperation"
```

Overlapping polygons are valid.

Do not create complicated conflict-resolution logic in MVP.

The map simply communicates:

> **V tejto oblasti pôsobí viac skupín.**

---

# 24. AI ingestion

AI is a content extraction assistant.

It must NOT behave like an autonomous publisher.

## Input

Possible sources:

- official club website
- public club social pages when appropriate
- annual report PDFs
- SSS Spravodaj
- SSS public directory
- other clearly identified authoritative public sources

## Output

```text
group.yaml
sources.yaml
evidence.yaml
assets/
```

## Rules

1. Never invent facts.
2. Never invent contact details.
3. Never invent URLs.
4. Never invent activity types.
5. Never invent polygons as facts.
6. Clearly distinguish extracted fact from AI suggestion.
7. Use source evidence.
8. Leave uncertain values empty.
9. Do not publish automatically.
10. Preserve source references.

---

# 25. AI polygon estimation

Initial area polygons may be estimated from annual reports and other documents.

This is intentionally approximate.

The AI may produce:

```yaml
polygon_status: "estimated"
```

The public application can show the polygon, but it should be understood internally as a visual orientation rather than an authoritative legal boundary.

Later admin editing can refine it.

Do not pretend that the polygon represents exclusive ownership.

---

# 26. Draft → review → publish

The workflow is:

```text
source
  ↓
AI extraction
  ↓
draft
  ↓
human review
  ↓
Git diff
  ↓
merge
  ↓
published
```

AI must never directly modify production data.

---

# 27. Git

Git is the source of truth for YAML packages.

Benefits:
- history
- rollback
- diff
- review
- backups
- audit trail

The public application does not need to expose Git.

The admin UI can provide a simplified view of changes.

---

# 28. Admin UI

Keep it simple.

Main admin:

```text
SSS MAP ADMIN

[ Skupiny ] [ Oblasti ] [ Návrhy AI ]
```

Group list:

```text
Skupina                     Stav

Jaskyniarska skupina XY     ✓ overené
Speleoklub ABC              ⚠ návrh zmien
...
```

Group editor:

```text
Logo
Názov
Krátky popis
Web
Kontakt
Aktivity
Oblasti
Polygon
```

Do not expose dozens of fields.

---

# 29. Admin visual language

Admin can be more utilitarian than public UI.

Still:
- same typography
- same color system
- same components
- clean
- readable

Public UI gets design priority.

---

# 30. WordPress integration

The WordPress integration must remain thin.

MVP shortcodes:

```text
[sss_map]
```

and:

```text
[sss_group id="sss-001"]
```

The WordPress plugin:
- stores no master data
- contains no club database
- does not duplicate map logic
- embeds or loads the SSS Map public application
- can provide a responsive iframe/widget integration

Prefer an iframe initially if it significantly reduces integration complexity.

Design the public application so it can later support embeddable components without architectural rewrite.

---

# 31. Embed requirements

When embedded into WordPress:
- responsive width
- no horizontal scrolling
- correct height handling
- no duplicate navigation if using a group component
- accessible focus behavior
- lazy-load where appropriate
- postMessage-based auto-height can be added if useful

Do not overengineer the first version.

---

# 32. Accessibility

Target WCAG 2.2 AA where practical.

Minimum:
- keyboard navigation
- visible focus
- sufficient text contrast
- semantic HTML
- alt text for meaningful images
- decorative images marked appropriately
- buttons have accessible labels
- map interactions have non-map alternatives

A user must be able to find a group without understanding the map.

This is important.

Provide a simple list/search fallback:

> **Zoznam skupín**

---

# 33. Responsive behavior

Desktop:
- map dominates
- floating detail cards

Tablet:
- map remains dominant
- cards become wider

Mobile:
- map full-screen
- bottom sheet for details
- large touch targets
- minimal controls

Do not simply shrink desktop UI.

Design mobile deliberately.

---

# 34. Performance

The public map must feel fast.

Goals:
- fast first paint
- lazy load images
- optimized logos
- compressed WebP/AVIF where supported
- cache public API/data
- avoid shipping all data unnecessarily
- load detailed data only after interaction
- simplify polygons at low zoom levels

Use:
- simplified geometry for overview
- detailed geometry only at appropriate zoom

Do not render hundreds of unnecessary DOM nodes for map geometry.

---

# 35. Data loading architecture

Suggested:

```text
Git YAML
   ↓
validation/build
   ↓
normalized JSON/index
   ↓
API/static data
   ↓
SSS Map frontend
```

The browser should not need to parse the entire Git repository.

Build-time normalization is preferred.

---

# 36. Suggested technical stack

The implementation should favor simplicity.

Recommended:

### Frontend
- TypeScript
- React
- Vite
- MapLibre GL JS
- modern CSS / CSS modules or a lightweight styling system

Avoid unnecessary framework complexity.

### Backend/API

For MVP, prefer a lightweight architecture.

Possible:
- Node.js
- TypeScript
- Fastify or equivalent lightweight API

If static build + CDN is sufficient for public data, use it.

Do not create a complex microservice architecture.

### Data
- YAML source
- Git
- normalized JSON / SQLite/PostgreSQL only if actually needed

### Validation
- JSON Schema / Zod / equivalent
- strict schema validation in CI

---

# 37. Architecture principle

Prefer:

```text
simple monolith
```

over:

```text
microservices
queues
event buses
Kubernetes
complex cloud infrastructure
```

There is no reason for this MVP to be distributed.

---

# 38. Suggested project structure

```text
sss-map/
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── schema/
│   ├── map-data/
│   └── ui/
│
├── wordpress/
│   └── sss-map-plugin/
│
├── scripts/
│   ├── validate-data.ts
│   ├── build-data.ts
│   └── import-data.ts
│
├── docs/
│
└── README.md
```

If the AI agent finds an even simpler structure suitable for the chosen stack, simplicity wins.

Do not follow this structure blindly.

---

# 39. Public group data seed

The following contacts are **initial source data only**.

They must NOT automatically be treated as permanently verified.

The AI/data pipeline should create drafts from them and subsequently verify public information.

```text
Jaskyniarska skupina Adama Vallu | Tomáš Hampl | 0948 392 752 | tomashampl@azet.sk
Moldavský jaskyniarsky klub Adonis Ten | Attila Dobos | 0903 656 664 | dobosati007@gmail.com
Jaskyniarska skupina Aragonit | Eduard Piovarči | 0904 800 011 | piovarci.aragonit@gmail.com
Jaskyniarska skupina Arachnos – Slovenský kras | Ladislav Juhász | 0911 226 472 | vizy18@gmail.com
Speleoklub Badizer Ardovo | Alexander Skokan | 0910 502 457 | skokan.alexander@gmail.com
Speleoklub Banská Bystrica | Ing. Štefan Mlynárik | 0903 514 704 | stevo.mlynarik@gmail.com | https://www.speleo.sk
Speleo Bratislava | Mgr. art. Peter Ševčík | 0908 983 646 | petersevo@gmail.com | https://www.speleobratislava.webnode.sk
Speleo Brezno | Ľubomír Múka | 0905 269 845 | speleobrezno@gmail.com | http://osbr.sss.sk
Speleoklub Cassovia | Ing. Jozef Thuróczy | 0905 515 979 | thuroczyjozef@gmail.com | https://www.cassovia.sss.sk
Oblastná skupina Čachtice | Lukáš Kubičina | 0914 230 387 | oscachtice@gmail.com
Speleologický klub Červené vrchy Slovakia | Ján Šmoll | 0903 512 283 | jan.smoll007@gmail.com | https://www.cervenevrchy-speleo.sk
CUC Bratislava | Miroslav Zverka | 0902 852 502 | zverka@ovsiste.sk
Jaskyniarsky klub Demänovská Dolina | Mgr. Pavel Herich | 0944 108 618 | herich@speleodd.sk | https://www.speleodd.sk
Speleo-Detva | Elena Hipmanová | 0910 993 703 | ehipmanova@gmail.com | https://www.speleodetva.sss.sk
Speleoklub Drienka Košice | Ing. Jozef Psotka | 0904 338 683 | jozef.psotka@gmail.com | https://www.drienka.netkosice.sk
Jaskyniarsky klub Dubnica nad Váhom | Peter Medzihradský | 0905 380 671 | pmedzihradsky@gmail.com | https://www.dubnica.sss.sk
Speleoklub Ďumbier | Stacho Mudrák | 0919 225 273 / 0905 135 535 | s.m@speleo.sk | https://www.jmn.sk
MEANDER – Hájsky klub športovej speleológie | Tomáš Fussgänger | 0944 592 831 | hufihu@seznam.cz | https://www.hkss.sss.sk
Jaskyniarsky klub Handlová | Peter Strečanský | 046/547 36 81 / 0908 642 970 | peter.strecansky@gmail.com | https://www.jkhandlova.webnode.sk
Speleoclub Chočské vrchy | Ing. Juraj Szunyog | 0910 555 654 | juraj.szunyog@mondigroup.com | https://www.schv.sk
Oblastná skupina Inovec | Ing. Ivan Demovič | 0908 420 545 | ivan.demovic1@gmail.com
Oblastná skupina Jána Majku | MVDr. Zbyněk Valenta | 0948 383 178 | zvcave@email.cz | https://www.osjm.sk
Oblastná skupina Liptovská Teplička | Vlastimil Knapp | 0908 903 798 | knapp.vl@gmail.com
Oblastná skupina Liptovský Mikuláš | Mgr. Ľubica Mareková PhD. | — | lub.luhova@gmail.com | https://speleolm.sss.sk/
Jaskyniarsky klub Liptovský Trnovec | Martin Vrabec | 0902 827 348 | vrabecma@gmail.com
Speleoklub Malá Fatra | Ing. Pavol Pokrievka | 043/422 37 01 / 0908 964 754 | pavolpokrievka@zoznam.sk | http://speleomalafatra.webnode.sk
Speleoklub Minotaurus | RNDr. Jaroslav Stankovič | 058/734 34 26 / 0905 412 048 | stankov@ke.psg.sk | https://www.krasnohorska-jaskyna.sk
Speleoklub Muránska planina | Ing. Milan Poprocký | 0905 743 148 | speleomp@gmail.com
Speleoklub Nicolaus | Ing. Peter Holúbek | 044/552 20 61 / 552 51 74 / 0904 333 613 | peter.holubek@smopaj.sk | https://www.nicolaus.sss.sk
Speleoklub Nitra | doc. Mgr. Tomáš Lánczos, PhD. | 0911 260 644 | tlanczos@gmail.com
Speleoklub Nitra | Boris Blaškovič | 0918 533 492 | felidae@felidae.sk
Speleoklub Nitra | Mário Sadecký | 0949 269 221 | mariosadecky90@gmail.com
Oblastná skupina Orava | Štefan Poláčik | 0903 950 231 | speleo.orava@gmail.com / stp.supran@gmail.com
Jaskyniari Plavecké Podhradie | JUDr. Marián Grúz | 0918 432 640 | marian.gruz@gmail.com / mariangruz@speleopp.sk | https://www.speleopp.sk
Oblastná skupina Prešov | Rudolf Košč | 0905 237 565 | kosc@zladiera.sk | https://www.zladiera.sk
Oblastná speleologická skupina Rimavská Sobota | Stanislav Scholtz / Igor Balciar | 0908 714 306 / 0904 862 248 | ossrs@jaskyne.info
Speleoklub Rokoš | Ľubomír Kubíček | 0948 879 898 | lubomir.kubicek@gmail.com
Speleo Rožňava | Mikuláš Repaszký | 0925 756 833 | mikulas.repaszky@gmail.com | https://www.speleoroznava.webnode.sk
Oblastná skupina Ružomberok | Bc. Miroslav Jurečka | 0905 793 351 / 0907 041 625 | jurecka@rknet.sk | https://www.speleork.sk
Speleologický klub Slovenský raj | Ing. Branislav Tulis | 0905 923 625 | tulis@tulis.sk / speleorajsk@gmail.com | https://www.speleoraj.sk
Sekcia speleopotápania | Peter Kubička | 0905 108 699 | kubi@kubi.sk | https://www.kubi.sk
Speleodiver | Mgr. Karol Kýška | 0948 693 191 | mgr.kyska@airtrend.sk
Jaskyniarska skupina Spišská Belá | Ľubomír Plučinský | 0944 214 107 | lplucinsky@gmail.com / info@speleo-spisskabela.sk | https://www.speleo-spisskabela.sk
Jaskyniarsky klub Strážovské vrchy | Mgr. Bohuslav Kortman | 0905 488 028 | bohuslav.kortman@speleostrazov.sk | https://www.speleostrazov.sk
Speleoklub Šariš | Ing. Peter Hurný | 0907 955 243 | hurny.peter@condornet.sk / speleosaris@gmail.com | https://www.speleosaris.estranky.cz
Speleoklub Tisovec | Ing. Dušan Hutka | 0908 914 017 | hutkatisovec@gmail.com
Trenčiansky speleoklub | Miroslav Sova | 0918 602 869 | sovamiro@gmail.com
Speleoklub Tribeč | Mgr. Vladimír Prutkay | 0902 949 921 | pqq@post.sk
Speleoklub Trnava | doc. RNDr. Alexander Lačný, PhD. | 0908 895 769 | sasol@speleott.sk | https://www.speleott.sk
Jaskyniarsky klub Speleo Turiec | Mgr. Pavol Pokrievka ml. | 0902 263 520 | palopokrievka@gmail.com | https://www.speleoturiec.sk
Oblastná skupina Uhrovec | Jozef Kováčik | 038/760 70 38 / 0903 273 475 | jzfkvck@gmail.com
Speleoklub Univerzity P. J. Šafárika, Košice | doc. RNDr. Zdenko Hochmuth, CSc. | 051/774 72 55 / 0908 977 594 | hoch@upjs.sk | http://speleoupjs.sk
Jaskyniarsky klub Varín | Pavol Cvacho | 0905 365 688 | jkvarin@centrum.sk / cvachopalo@gmail.com | http://speleovarin.sss.sk / http://jkvarin.estranky.sk
Oblastná skupina Veľká Fatra | Zuzana Hric | 0910 198 325 | zuzuvacekova@gmail.com
Žilinský jaskyniarsky klub | Tibor Pajtina | 0903 772 579 | jaskyniari@gmail.com
```

**Important:** The supplied contact list is seed/reference material. Do not automatically publish every personal contact as current without verification and an appropriate public-use decision.

---

# 40. Initial source document

A key initial source for area and cave information is the SSS Spravodaj PDF:

**Spravodaj 1/2026**

Source:
`https://sss.sk/wp-content/uploads/2026/06/Spravodaj_1_2026_vnutro_NET_web.pdf`

The AI ingestion pipeline should be able to:
- download/read the PDF
- identify annual-report sections
- identify clubs/groups
- identify area names
- identify cave-related aggregate information
- extract page references as evidence
- propose approximate area relationships

## Important

The annual reports are used initially to **estimate areas of activity**.

They are not authoritative GIS boundaries.

Initial polygons should therefore be marked internally as:

```yaml
polygon_status: "estimated"
```

and can be manually refined later.

Do not infer exact cave locations from the PDF for public display.

---

# 41. Initial data import task

The first implementation milestone should be:

1. create repository
2. create schemas
3. create all initial group folders
4. normalize supplied contact data
5. assign stable group IDs
6. preserve supplied values as seed data
7. mark unverified data appropriately
8. process Spravodaj PDF
9. extract evidence
10. propose area relationships
11. create approximate polygons
12. validate all YAML
13. build public map
14. review visually
15. publish only reviewed data

Do not spend the first milestone on advanced admin functionality.

---

# 42. Stable IDs

IDs must be stable.

Do not generate IDs from names at runtime.

Recommended:

```text
sss-001
sss-002
sss-003
...
```

Once assigned, an ID should not change merely because the group changes its display name.

---

# 43. Data normalization

The AI should normalize:

- whitespace
- phone number formatting
- URLs
- email formatting
- duplicated contacts
- multiple contacts
- social links

But it must not silently change factual content.

For example:

```text
www.example.sk
```

may normalize to:

```text
https://www.example.sk
```

only if the URL is valid/reachable.

Do not assume every supplied URL is correct.

---

# 44. Social links

Social links are optional.

They should not clutter the main card.

If present, use a compact row:

```text
Web   Facebook   Instagram   YouTube
```

Do not give social links more visual prominence than the main contact CTA.

---

# 45. Contact design

The contact button should be highly visible.

Possible actions:

- email
- website
- contact page

Do not require showing a person's name unless that is intentionally public.

Prefer organization-level contact whenever available.

---

# 46. Empty states

Never show ugly empty fields.

Bad:

```text
Website: —
Email: —
Description: —
```

Good:

If no website exists:

> **Kontaktovať skupinu**

If no description exists:

Simply omit the description block.

The UI should gracefully adapt to incomplete data.

---

# 47. Truthfulness

The application should have a strong internal distinction:

```text
known
estimated
unknown
```

Public UI should usually display only `known`.

Estimated geometry can be displayed when useful, but the data pipeline must preserve its estimated status.

Unknown values should normally be omitted.

Never fill missing information with plausible AI text.

---

# 48. Verification

Each group should have:

```yaml
verified_at: "YYYY-MM-DD"
```

This means a human reviewed the public information.

It does not mean that every historical fact is guaranteed permanently true.

When information becomes stale, it can be flagged for review.

Do not create a complex automated expiry system in MVP.

---

# 49. Images

Visual quality depends heavily on imagery.

Rules:
- use original/publicly authorized images
- preserve source/credit metadata internally
- optimize images for web
- never invent images
- never use unrelated stock photos merely to fill a card

If a group has no suitable image:
- use logo
- use a tasteful neutral visual treatment
- do not fabricate a photo

---

# 50. Image treatment

Recommended:
- large rounded corners
- subtle shadows
- natural crop
- no excessive overlays
- dark gradient only where text must overlay image

Use `object-fit: cover`.

Suggested radius:

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-xl: 30px;
```

Cards should feel soft and modern, but not like a generic SaaS dashboard.

---

# 51. Motion

Motion is part of the wow effect but must remain restrained.

Use:
- 200–300ms UI transitions
- 400–800ms map transitions
- subtle card entrance
- smooth polygon highlight
- gentle zoom transitions

Avoid:
- bouncing
- excessive parallax
- constant movement
- long loading animations

The user should feel:

> **"The map is alive."**

not:

> **"The interface is showing off."**

---

# 52. Loading experience

Initial loading can use a simple SSS visual.

Example:

```text
SSS

Objavujeme slovenské podzemie...
```

A subtle line/contour animation is acceptable.

Do not create a 5-second splash screen.

Show content as soon as possible.

---

# 53. Search

Search is useful but must remain simple.

MVP:

```text
🔎 Nájsť oblasť alebo skupinu
```

Search:
- group name
- area name
- locality/region if represented in data

Result:

```text
Skupiny
Oblasti
```

No complex faceted search.

---

# 54. "Find my group"

This is a key feature.

The user may enter:

> Košice

or:

> Slovenský kras

or select an area on the map.

The application returns relevant groups.

The algorithm should prefer:
1. groups explicitly associated with the area
2. primary relationships
3. cooperation relationships
4. geographic proximity where reliable

Do not pretend that a group is "nearest" unless there is enough geographic data to support it.

---

# 55. Map labels

Labels must not overwhelm the map.

At low zoom:
- major area labels

At medium zoom:
- area names
- selected group names

At high zoom:
- contextual group labels

Use collision handling.

Never show every label simultaneously.

---

# 56. Mobile map

Mobile is a first-class experience.

Controls:
- zoom
- locate if implemented
- search
- legend if necessary

Detail:

```text
map
 ↓
tap
 ↓
bottom sheet
```

Do not use desktop sidebars squeezed into 390px.

---

# 57. Public legend

A very simple legend:

```text
● oblasť pôsobnosti
● spolupráca
```

If the distinction is visually obvious, the legend may be omitted.

Never require the visitor to learn a complicated GIS symbology.

---

# 58. Security

Minimum:
- sanitize all imported text
- validate URLs
- sanitize HTML
- never render raw AI HTML
- escape YAML-derived content
- CSP where practical
- rate limit admin endpoints
- protect admin authentication
- no secrets in repository
- no API keys in frontend

AI-generated content is untrusted input.

---

# 59. Privacy

The public application should minimize personal data.

Contact details are displayed only when intentionally part of the public seed/verified data.

Prefer organization-level email addresses.

If a personal contact is used, it must be deliberately approved for public presentation.

Do not create public member profiles.

---

# 60. Accessibility and language

Primary language:

**Slovenčina**

All UI must support Slovak diacritics.

Do not replace:

```text
ľ → l
š → s
č → c
ž → z
```

Never strip diacritics from visible names.

For search, however, optionally support diacritic-insensitive matching.

Example:

```text
"cachtice"
```

should find:

```text
"Čachtice"
```

---

# 61. SEO

Public group and area pages should be indexable where appropriate.

Each group should have:
- unique title
- meta description
- canonical URL
- Open Graph image

Example:

```text
/ skupiny / speleoklub-cassovia
```

Area:

```text
/ oblasti / slovensky-kras
```

Do not expose sensitive geographic data through SEO metadata.

---

# 62. URLs

Prefer human-readable stable URLs.

Examples:

```text
/
 /mapa
 /skupiny
 /skupiny/speleoklub-cassovia
 /oblasti/slovensky-kras
```

Stable IDs remain internal.

Slugs are presentation URLs.

---

# 63. Analytics

If analytics are added, keep them privacy-conscious.

Useful metrics:
- map opened
- area clicked
- group opened
- contact clicked
- website clicked
- search used

The most important success metric is:

> **How often does a visitor reach a relevant group/contact?**

Do not optimize for page views alone.

---

# 64. Performance budget

Aim for:
- fast initial render
- minimal JavaScript
- lazy-loaded images
- compressed assets
- no unnecessary libraries

Avoid adding a library for functionality that can be implemented simply.

---

# 65. Testing

At minimum:

### Data tests
- YAML validation
- schema validation
- broken reference detection
- broken URL detection where automated checks are safe
- invalid polygon detection

### UI tests
- map loads
- group opens
- area opens
- contact works
- mobile layout
- keyboard navigation

### Visual tests
Use screenshots at:
- desktop 1440px
- tablet 1024px
- mobile 390px

Visual regressions are important because design is a core product requirement.

---

# 66. Definition of "beautiful"

The agent must not interpret "wow" as "more effects".

A beautiful SSS Map should have:

- strong composition
- excellent typography
- calm colors
- high-quality images
- generous spacing
- smooth transitions
- clear map hierarchy
- excellent mobile behavior
- very little clutter

The visitor should notice the **landscape and map**, not the framework.

---

# 67. Definition of done for visual work

A feature is not done merely because it functions.

Before marking it complete, check:

- Is the hierarchy obvious?
- Is the primary action obvious?
- Is the map still the hero?
- Is there unnecessary text?
- Are colors consistent?
- Are fonts readable?
- Are Slovak characters correct?
- Does it work on mobile?
- Does it look good with real data?
- Does it look good when data is missing?
- Does overlapping geography remain understandable?

---

# 68. Seed data and verification

The supplied group list is a starting dataset.

It must be treated as:

```text
SOURCE / SEED
```

not:

```text
VERIFIED CURRENT DATABASE
```

The AI agent must preserve supplied information but should use official/current sources to verify it before publishing.

Potential discrepancies should be surfaced, not silently corrected.

---

# 69. Initial Spravodaj source

Use:

```text
https://sss.sk/wp-content/uploads/2026/06/Spravodaj_1_2026_vnutro_NET_web.pdf
```

Purpose:
- annual reports
- area activity evidence
- cave aggregate information
- historical/current context
- group identification

Initial area boundaries may be approximate.

Do not expose exact cave entrances found in source material.

---

# 70. AI agent behavior

The coding agent must work in this order:

## Phase 1 — understand

Read this document completely.

Do not immediately start coding.

Create a concise internal implementation plan.

## Phase 2 — schema

Implement:
- group schema
- area schema
- relationship schema
- validation

## Phase 3 — seed data

Import initial groups.

## Phase 4 — data pipeline

Build:
- YAML loader
- validator
- normalized build output

## Phase 5 — map

Build the public map first.

## Phase 6 — public presentation

Build:
- area cards
- group cards
- contact CTA
- search

## Phase 7 — visual polish

Spend substantial effort here.

## Phase 8 — WordPress

Implement the thin shortcode plugin.

## Phase 9 — admin

Only after the public experience works.

---

# 71. Implementation priority

Use this priority order:

```text
P0
Map
Data model
Group cards
Area cards
Contact CTA

P1
Search
Responsive UX
AI draft import
Git workflow
Admin editing

P2
Polish
SEO
analytics
additional embeds

NOT MVP
advanced GIS
roles
notifications
exports
club management
```

---

# 72. Do not overengineer

Do not introduce:
- microservices
- Kubernetes
- event sourcing
- complex message queues
- elaborate RBAC
- GraphQL unless genuinely necessary
- complex state management unless genuinely necessary
- proprietary GIS backend if GeoJSON is enough
- full CMS
- custom database schema for every tiny field

Start simple.

The project is small.

---

# 73. Important implementation principle

The source data and frontend architecture must allow future expansion, but the MVP UI must not expose that complexity.

In other words:

> **Architecture may be extensible. UX must remain simple.**

---

# 74. Example user journey

### Visitor sees:

```text
SLOVENSKO POD POVRCHOM

[ mapa ]
```

They zoom toward eastern Slovakia.

A beautiful polygon appears:

> Slovenský kras

They click.

```text
SLOVENSKÝ KRAS

500+ jaskýň

Oblasť s výnimočným krasovým
reliéfom a bohatou speleologickou
históriou.

V oblasti pôsobia:

[ Arachnos ]
[ Cassovia ]
[ ... ]

[ NÁJSŤ SKUPINU ]
```

They select a group.

```text
SPELEOKLUB CASSOVIA

Košice · Slovenský kras

Prieskum
Mapovanie
Dokumentácia

Krátky autentický popis...

[ KONTAKTOVAŤ SKUPINU ]
```

This is the success state.

---

# 75. Product success

The application succeeds if someone who knows nothing about speleology can open it and within a minute understand:

> **"Aha. Toto je slovenská speleológia. Toto sú oblasti. Toto sú ľudia/skupiny, ktoré tam pôsobia. A toto je skupina, ktorú môžem kontaktovať."**

Everything else is secondary.

---

# 76. Final instruction to AI agent

Build SSS Map as a **small, beautiful, trustworthy public product**.

Do not build a generic admin application and then add a map.

Build the **map experience first**.

Do not optimize for the number of fields.

Optimize for:
- visual clarity
- geographic understanding
- emotional appeal
- trustworthy information
- contact conversion
- performance
- accessibility

When forced to choose between:

```text
more information
```

and

```text
better presentation of less information
```

choose:

> **better presentation of less information.**

When forced to choose between:

```text
AI-generated guess
```

and

```text
empty field
```

choose:

> **empty field.**

When forced to choose between:

```text
precise sensitive cave information
```

and

```text
safe aggregated information
```

choose:

> **safe aggregated information.**

When forced to choose between:

```text
another feature
```

and

```text
better map / typography / imagery / animation / usability
```

choose:

> **better map / typography / imagery / animation / usability.**

## The final product should feel like:

**a beautiful interactive atlas of Slovak speleology — not a database.**

---

# Appendix A — Initial group seed

The initial seed list supplied for this project contains the following organizations:

1. Jaskyniarska skupina Adama Vallu
2. Moldavský jaskyniarsky klub Adonis Ten
3. Jaskyniarska skupina Aragonit
4. Jaskyniarska skupina Arachnos – Slovenský kras
5. Speleoklub Badizer Ardovo
6. Speleoklub Banská Bystrica
7. Speleo Bratislava
8. Speleo Brezno
9. Speleoklub Cassovia
10. Oblastná skupina Čachtice
11. Speleologický klub Červené vrchy Slovakia
12. CUC Bratislava
13. Jaskyniarsky klub Demänovská Dolina
14. Speleo-Detva
15. Speleoklub Drienka Košice
16. Jaskyniarsky klub Dubnica nad Váhom
17. Speleoklub Ďumbier
18. MEANDER – Hájsky klub športovej speleológie
19. Jaskyniarsky klub Handlová
20. Speleoclub Chočské vrchy
21. Oblastná skupina Inovec
22. Oblastná skupina Jána Majku
23. Oblastná skupina Liptovská Teplička
24. Oblastná skupina Liptovský Mikuláš
25. Jaskyniarsky klub Liptovský Trnovec
26. Speleoklub Malá Fatra
27. Speleoklub Minotaurus
28. Speleoklub Muránska planina
29. Speleoklub Nicolaus
30. Speleoklub Nitra
31. Oblastná skupina Orava
32. Jaskyniari Plavecké Podhradie
33. Oblastná skupina Prešov
34. Oblastná speleologická skupina Rimavská Sobota
35. Speleoklub Rokoš
36. Speleo Rožňava
37. Oblastná skupina Ružomberok
38. Speleologický klub Slovenský raj
39. Sekcia speleopotápania
40. Speleodiver
41. Jaskyniarska skupina Spišská Belá
42. Jaskyniarsky klub Strážovské vrchy
43. Speleoklub Šariš
44. Speleoklub Tisovec
45. Trenčiansky speleoklub
46. Speleoklub Tribeč
47. Speleoklub Trnava
48. Jaskyniarsky klub Speleo Turiec
49. Oblastná skupina Uhrovec
50. Speleoklub Univerzity P. J. Šafárika, Košice
51. Jaskyniarsky klub Varín
52. Oblastná skupina Veľká Fatra
53. Žilinský jaskyniarsky klub

Note: Speleoklub Nitra has multiple supplied contacts. Treat them as contacts for the same organization, not three separate groups.

---

# Appendix B — Initial external links from supplied seed

The supplied seed included these URLs:

- https://www.speleo.sk
- https://www.speleobratislava.webnode.sk
- http://osbr.sss.sk
- https://www.cassovia.sss.sk
- https://www.cervenevrchy-speleo.sk
- https://www.speleodd.sk
- https://www.speleodetva.sss.sk
- https://www.drienka.netkosice.sk
- https://www.dubnica.sss.sk
- https://www.jmn.sk
- https://www.hkss.sss.sk
- https://www.jkhandlova.webnode.sk
- https://www.schv.sk
- https://www.osjm.sk
- https://speleolm.sss.sk/
- http://speleomalafatra.webnode.sk
- https://www.krasnohorska-jaskyna.sk
- https://www.nicolaus.sss.sk
- https://www.speleopp.sk
- https://www.zladiera.sk
- https://www.speleoroznava.webnode.sk
- https://www.speleork.sk
- https://www.speleoraj.sk
- https://www.kubi.sk
- https://www.speleo-spisskabela.sk
- https://www.speleostrazov.sk
- https://www.speleosaris.estranky.cz
- https://www.speleott.sk
- https://www.speleoturiec.sk
- http://speleoupjs.sk
- http://speleovarin.sss.sk
- http://jkvarin.estranky.sk

These links are **seed data and must be verified before publication**.

---

# Appendix C — Social links supplied for initial seed

For Oblastná skupina Ružomberok:

- https://www.facebook.com/speleork
- https://www.instagram.com/speleork
- https://www.tiktok.com/@speleork

For Jaskyniarska skupina Spišská Belá:

- Facebook: `Speleo – Spišská Bela`
- Instagram: `speleota3`
- YouTube: `@Speleo-SpisskaBela`

These should be treated as optional presentation data and verified before publication.

---

# Appendix D — Initial data quality warning

The contact list and URLs were supplied manually as project seed data.

The AI agent MUST NOT assume:
- all phone numbers are current
- all emails are current
- all websites are active
- all listed people remain the current contact
- all groups still use exactly the same names
- all social profiles are official
- all area relationships can be inferred from the organization name

The correct behavior is:

```text
supplied seed
     ↓
verify
     ↓
source evidence
     ↓
draft
     ↓
human review
     ↓
published
```

This is essential for the product principle:

> **Pravdivosť je dôležitejšia než úplnosť.**

---

# Appendix E — Suggested initial acceptance checklist

Before first public release:

## Data
- [ ] all group IDs stable
- [ ] YAML validates
- [ ] no duplicate IDs
- [ ] no broken internal references
- [ ] seed contacts reviewed
- [ ] websites verified where possible
- [ ] sensitive information removed
- [ ] area polygons marked estimated where appropriate
- [ ] cave counts have evidence
- [ ] group descriptions have sources

## Map
- [ ] Slovakia visible immediately
- [ ] areas visually distinct
- [ ] overlapping polygons understandable
- [ ] no sensitive cave entrances
- [ ] map works on mobile
- [ ] map remains readable at all supported zoom levels

## UX
- [ ] visitor can reach group from map
- [ ] visitor can reach contact in minimal clicks
- [ ] search works
- [ ] empty data does not produce ugly UI
- [ ] keyboard navigation works

## Visual
- [ ] typography supports Slovak diacritics
- [ ] color palette is consistent
- [ ] map remains visual hero
- [ ] cards look editorial, not database-like
- [ ] animations are subtle
- [ ] images are optimized
- [ ] mobile experience is deliberately designed

## Technical
- [ ] production build succeeds
- [ ] schema validation runs automatically
- [ ] Git history exists
- [ ] no secrets committed
- [ ] frontend has no exposed private API keys
- [ ] WordPress shortcode works
- [ ] public data can be rebuilt from Git

---

# End

**Build less. Show better. Verify everything important.**

**SSS Map = slovenská speleológia ako krásna, jednoduchá a dôveryhodná mapa.**
