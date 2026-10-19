# StepJourney: instructions for Claude Code

These instructions are for you, Claude Code. The user will only say something like
**"Use the step-journey-handoff design for the How It Works section"**. Work out everything else
yourself from this project. Do not ask the user to fill anything in; ask only if a decision below is
genuinely impossible to make from the code.

`StepJourney.tsx` in this folder is a finished, tested React component: an animated "N steps" section.
Your job is to put it in place of the steps section the user names, filled with that section's own
content and styled to this site's brand. Keep its graphics and motion exactly as they are.

## What the component does (do not change any of this)

- Desktop/tablet: a dashed wave line draws itself in when the section scrolls into view; numbered
  circles with icons pop in one after another along the wave (high, low, high, low...), each with a big
  serif step number at its top-left.
- The active step changes every ~3 seconds: the circle fills with the main colour, a ring pulses, the
  icon bobs, and a solid line fills the wave up to that step. Under the wave, "Step X of N" and that
  step's description fade in, with progress dots.
- Clicking or tabbing to a step selects it and pauses cycling; leaving the section resumes it.
- Phones: a vertical dashed line draws downward with the steps listed beside it.
- Honours prefers-reduced-motion.

Props: `steps` (3 to 7 items of `{ title, text, icon }`), `title`, `subtitle?`, `cta?` (ReactNode shown
under the animation), `colors?` (`primary`, `primarySoft`, `secondary`, `accent`, `ink`, `background`, any
CSS colour), `cycleMs?` (default 3200), `className?`.

## What to do

1. **Find the section.** Search the codebase for the section the user named (by its heading text,
   component name, id, or what it's about, e.g. "how it works", "process", "steps", "our approach").
   If several match, pick the one on the page the user is most likely to mean (usually the home page)
   and say which one you chose. Ask only if there is no reasonable match at all.

2. **Check the stack.** The component needs React 18+, Tailwind CSS 3+ and `framer-motion` 10+.
   - If the project uses the newer `motion` package instead, change the import to `motion/react`.
   - Install `framer-motion` (and `lucide-react`, if you need icons and the project has no icon set)
     only if missing, using the project's package manager.
   - If the project is not React + Tailwind, stop and tell the user what it uses before converting.

3. **Add the component.** Move `StepJourney.tsx` into the project's components folder, following its
   naming and folder conventions and its import alias. Leave its logic, timings and animation values
   unchanged. Fix only what's needed to compile in this project (imports, lint rules).

4. **Reuse the section's own content.**
   - Take the existing heading and subtitle as `title` and `subtitle`.
   - Take each existing step's title and description as the `steps`. Keep the wording. If a step has
     no description, write one plain sentence from what the section and site already say; don't
     invent facts, prices, timings or guarantees.
   - Keep the steps in their current order. If there are more than 7, tell the user and ask which to
     keep; if fewer than 3, keep the original section and tell the user why.
   - Icons: reuse the section's existing icons if it has them. Otherwise pick fitting ones from the
     project's icon library (or `lucide-react`).
   - Keep any buttons or links the section had and pass them through `cta`, styled with the project's
     own button component.
   - If the step data lives in a data file or CMS/API, read it from there rather than hard-coding it.

5. **Match the brand.**
   - `colors`: take them from the project's theme (Tailwind config, CSS variables, design tokens).
     `primary` = main brand colour, `primarySoft` = its lightest tint, `secondary` = a soft supporting
     colour, `accent` = the colour used for small highlights, `ink` = body text colour, `background` =
     the background the section had (or the page background). Never leave the Tannjes teal defaults.
   - Fonts: the step numbers and titles use `font-serif`. If the site has a heading or display font,
     swap those classes for it. Make the heading match the site's other section headings.
   - Spacing: if `py-20 md:py-28` doesn't match neighbouring sections, adjust the section padding
     through `className` or the outer classes only.

6. **Replace the section in place.** Swap the old markup for `<StepJourney ... />` at the same spot on
   the page. Keep any id/anchor the old section had (so existing links still work). Remove the old
   section's now-unused component or styles only if nothing else uses them.

7. **Copy rules**, for any text you write: plain sentences, no em dashes, no "it's not X, it's Y"
   phrasing, no slogans.

8. **Test and check.**
   - Add a test in the project's test setup: all steps render in order with accessible names
     "Step N: Title", and clicking a step sets `aria-current="step"` and shows its description.
     (The big step number is `aria-hidden`, so assert with `toHaveAccessibleName`, not `textContent`.
     The old description fades out first, so use `findByText` after the click.)
   - Run the type-check, lint, tests and build.
   - Start the dev server and look at the section at desktop and phone width. Confirm the circles
     sit on the wave line, the dashed line draws in, and the active step cycles.

9. **Report back briefly:** which section you replaced, where the component now lives, which colours
   and fonts you used, and anything you couldn't keep from the old section.

## Implementation notes (why the code looks the way it does; keep these)

- Circles are positioned with framer-motion's `x`/`y` style values, not Tailwind `translate` classes,
  because the pop-in `scale` animation would overwrite a Tailwind transform and push the circles off
  the line.
- The dashed line is revealed through an animated SVG mask; animating `pathLength` on a dashed path
  directly turns the dashes solid.
- Each instance gets its own mask id via `useId`, so two sections on one page don't clash.
- Tints use CSS `color-mix()`, supported by all current browsers.
