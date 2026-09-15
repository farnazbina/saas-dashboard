# Color style guide

`app/globals.css` is the source of truth for all colors. The palette keeps the
blue primary and violet secondary brand colors with neutral surfaces. `:root` defines light mode and `.dark`
defines dark mode. The root theme provider follows the system preference until
the user chooses a theme with the header toggle.

Use semantic Tailwind utilities in every component; they switch themes
automatically. Add new color values to the palette instead of individual pages.

| Role | Utilities | Purpose |
| --- | --- | --- |
| Page | `bg-background text-foreground` | Default surface and body text |
| Dashboard canvas | `bg-background-layout` | Surface behind cards |
| Card | `bg-card text-card-foreground` | Panels and tables |
| Popover | `bg-popover text-popover-foreground` | Menus and floating content |
| Brand action | `bg-primary text-primary-foreground hover:bg-primary-hover` | Main buttons |
| Secondary action | `bg-secondary text-secondary-foreground` | Secondary brand buttons |
| Muted surface | `bg-muted` | Table headers and subdued areas |
| Secondary text | `text-muted-foreground` | Descriptions and metadata |
| Selection | `bg-accent text-accent-foreground` | Selected items |
| Dividers | `border-border` | Cards and separators |
| Form boundary | `border-input` | Visible input outlines |
| Keyboard focus | `focus-visible:ring-ring` | Focus indication |
| Sidebar | `bg-sidebar text-sidebar-foreground` | Navigation surface |
| Overlay | `bg-overlay/40` | Modal backdrops |

## Status and task colors

Each family provides three tokens: the main color, `-foreground` for text on
the solid color, and `-muted` for a subtle background. Use the main color as text
on the muted background. Do not use `-foreground` text on the muted background.

| Family | Meaning | Light | Dark |
| --- | --- | --- | --- |
| `primary` | Brand | `#378ADD` | `#378ADD` |
| `secondary` | Secondary brand | `#7C5CFC` | `#7C5CFC` |
| `success` | Active, paid, positive outcome | `#15803d` | `#4ade80` |
| `info` | Informational | `#1d4ed8` | `#93c5fd` |
| `warning` | Pending, medium priority | `#92400e` | `#fbbf24` |
| `error` / `destructive` | Overdue, high priority, destructive action | `#b91c1c` | `#fca5a5` |
| `task-todo` | To do | `#43628C` | `#8FADD6` |
| `task-progress` | In progress | `#1A7F86` | `#55C7CC` |
| `task-inreview` | In review | `#B8791E` | `#E8B255` |
| `task-blocked` | Blocked | `#8E2A3C` | `#D6748A` |
| `task-done` | Done | `#1F9D74` | `#4ADE9A` |

```tsx
<section className="border border-border bg-card text-card-foreground">
  <p className="text-muted-foreground">Project status</p>
  <span className="border border-success/30 bg-success-muted text-success">
    Active
  </span>
  <button className="bg-primary text-primary-foreground hover:bg-primary-hover">
    Create project
  </button>
</section>
```

Keep visible labels or icons alongside status colors. Use complete literal
Tailwind classes in lookup objects instead of constructing class names at runtime.
Charts and inline styles can use `var(--chart-1)` through `var(--chart-5)` or
task tokens such as `var(--task-progress)`. Existing status colors use Denim for To Do, Lagoon for In Progress, Amber Gold
for In Review, Garnet for Blocked, and Jade for Done. Chart colors follow these aliases. The shared navigation gradient is `var(--gradient-primary)`.

`text-text` remains a compatibility alias for `text-foreground`. Prefer
`text-foreground` in new code. Avoid fixed white/black text on themed surfaces;
always pair solid backgrounds with their matching foreground token.

## Brand interaction tokens

Primary uses `#378ADD`, hover `#2B6CB8`, and pressed `#1F4E8C`.
Secondary uses `#7C5CFC` and hover `#6B46E5`. These solid colors are shared
by both modes. Use `hover:bg-primary-hover active:bg-primary-pressed` and
`hover:bg-secondary-hover` for interactions.

Use `bg-primary-subtle-bg` and `bg-secondary-subtle-bg` for tinted surfaces.
Their light values are `#EFF6FF` and `#F5F3FF`; dark mode uses `#142b43` and
`#282044` to keep these surfaces dark.

## Task type palette

These tokens describe task types, separately from workflow statuses. The current
task data does not yet have a type field. Use the exact supplied text/icon color
on its paired muted background; `task-blocker` aliases `task-urgent`.

| Type token | Light text/icon | Light background | Dark text/icon | Dark background |
| --- | --- | --- | --- | --- |
| `task-feature` | `#1F9D74` | `#E6F7F0` | `#4ADE9A` | `#0F2A20` |
| `task-bug` | `#C1462E` | `#FBEAE6` | `#F0805F` | `#33170F` |
| `task-improvement` | `#B8791E` | `#FBF0DD` | `#E8B255` | `#362609` |
| `task-design` | `#8A4F9E` | `#F3E9F7` | `#C98EDD` | `#2E1A38` |
| `task-documentation` | `#43628C` | `#E8EEF6` | `#8FADD6` | `#16222F` |
| `task-research` | `#1A7F86` | `#E3F4F4` | `#55C7CC` | `#0C2A2C` |
| `task-marketing` | `#A84A63` | `#F7E7EC` | `#E28FA4` | `#331620` |
| `task-chore` | `#7D6A4C` | `#F0EBE1` | `#C1AD87` | `#2A2418` |
| `task-urgent` | `#8E2A3C` | `#F5E4E7` | `#D6748A` | `#2E1219` |

```tsx
<span className="bg-task-feature-muted text-task-feature border border-task-feature/30">
  Feature
</span>
```
