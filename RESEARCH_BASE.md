# Research Base

This is the evidence layer behind Generous UI. It is not a claim that every component is scientifically perfect. It is a guardrail against taste drifting into fashion.

## What The Research Supports

### 1. Large Targets Reduce Motor Effort

Fitts' Law models pointing time as a function of target distance and target size. In interface terms: frequently used actions should be large, near the user's likely hand position, and separated from destructive or competing actions.

Library rules:

- Keep touch targets at least `44px` by `44px`.
- Make primary actions larger than nearby secondary actions when the task warrants it.
- Avoid tiny adjacent targets for destructive, irreversible, or frequent actions.
- Put the next likely action where the user already expects to reach.

Sources:

- Paul Fitts, "The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement" (1954), DOI: https://doi.org/10.1037/h0055392
- W3C WCAG 2.2 Target Size guidance: https://www.w3.org/TR/WCAG22/#target-size-enhanced

### 2. More Simultaneous Choices Increase Decision Cost

Hick's work on choice reaction time links response time to the amount of information in a choice. This does not mean every screen must have few total features. It means the interface should not ask the user to resolve too many equivalent-looking choices at once.

Library rules:

- One primary action per screen.
- Group secondary choices into visible, understandable sets.
- Prefer progressive disclosure when a choice is not needed yet.
- Do not make several unrelated buttons share the same visual weight.

Sources:

- W. E. Hick, "On the Rate of Gain of Information" (1952): https://doi.org/10.1080/17470215208416600

### 3. Preattentive Features Should Guide, Not Decorate

Visual search research suggests simple features such as color and orientation can be detected quickly, while conjunctions of features require more attention. This supports a restrained accent system: one accent, one selected-state marker, one clear focus language.

Library rules:

- Use accent color for state and action, not decoration.
- Do not use color as the only state cue.
- Prefer one recurring functional marker over many small motifs.
- Avoid interfaces where every object competes through color, icon, shadow, and shape at once.

Sources:

- Anne Treisman and Garry Gelade, "A Feature-Integration Theory of Attention" (1980): https://doi.org/10.1016/0010-0285(80)90005-5

### 4. Contrast Is More Than Aesthetic Preference

Human vision depends heavily on luminance contrast. WCAG gives practical minimums, and Generous UI should default above those minimums wherever possible. Low-contrast grey-on-grey UI is not subtle; it is missing information for many users.

Library rules:

- Text contrast must meet WCAG AA at minimum.
- Interactive component boundaries and focus indicators should meet non-text contrast expectations.
- Inputs, selected states, and focus rings must be visible without relying on hover or perfect eyesight.
- Prefer dark text on light surfaces unless a product explicitly needs dark mode and tests it properly.

Sources:

- W3C WCAG 2.2 Contrast Minimum: https://www.w3.org/TR/WCAG22/#contrast-minimum
- W3C Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Pelli and Bex, "Measuring contrast sensitivity" (2013): https://doi.org/10.1016/j.visres.2013.04.015

### 5. Hue Alone Is Fragile

Color vision varies across users. Red-green color vision differences are common enough that status systems must not rely on hue alone.

Library rules:

- Pair color with text, icon shape, position, or border treatment.
- Do not encode critical state with red/green alone.
- Make disabled, selected, danger, success, and warning states distinguishable in grayscale.
- Treat accent color as a signpost, not the message.

Sources:

- NCBI StatPearls, Color Vision: https://www.ncbi.nlm.nih.gov/books/NBK470227/

### 6. Motion Can Help Orientation, But It Can Also Harm

Motion should explain state changes, not create spectacle. WCAG calls out animation from interactions because non-essential movement can trigger vestibular symptoms for some users.

Library rules:

- No motion on routine high-frequency actions unless it directly confirms physical response.
- Respect `prefers-reduced-motion`.
- Avoid parallax, scroll-jacking, large spatial transitions, and off-screen slide-ins by default.
- Prefer instant state changes for menus, popovers, and repeated tool actions.

Sources:

- W3C Understanding Animation from Interactions: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html

### 7. Reading Interfaces Need Real Typographic Constraints

Screen readability is affected by line length, density, and available context. There is no single magic line length, but wide or cramped text blocks both create work for the eye.

Library rules:

- Use readable measure for prose, generally around `60ch` to `75ch` unless the content type demands otherwise.
- Keep form helper text close to the field it explains.
- Do not use viewport-scaled font sizes.
- Use line height and spacing to preserve scanning paths.

Sources:

- Duchnicky and Kolers, "Readability of Text Scrolled on Visual Display Terminals as a Function of Window Size" (1983): https://doi.org/10.1177/001872088302500605

## GOV.UK Lessons Worth Keeping

GOV.UK is a useful reference because it shows how far a service can get with plain language, functional color, high contrast, consistent patterns, and ruthless attention to user needs.

What Generous UI should borrow:

- Start with user needs.
- Do less.
- Do the hard work to make it simple.
- Be consistent, not uniform.
- Use functional colors for essential page elements.

Where Generous UI intentionally goes further:

- More generous targets by default.
- More inviting tactile affordances.
- A small amount of earned warmth through press states, timing, and selected-state language.
- More explicit protection against AI-generated decoration and competing primaries.

Sources:

- GOV.UK Government Design Principles: https://www.gov.uk/guidance/government-design-principles
- GOV.UK Design System colour guidance: https://design-system.service.gov.uk/styles/colour/

## Research-Backed Product Tests

Use these checks before adding or accepting a component:

- Can the main action be found in under one second?
- Is there exactly one primary action in the current task context?
- Can every interactive target be acquired comfortably on touch?
- Does the UI still work when color is removed?
- Does every async region reserve its final dimensions?
- Can focus be seen without relying on browser defaults alone?
- Does motion communicate a state change, or is it entertainment?
- Does the screen still make sense to a first-time user who reads only headings and button labels?
- Does the component remain usable at 200% text zoom?
- Does the design stay clear under slow network, fast clicking, and partial failure?

## Open Research Backlog

- Build a token contrast checker for all semantic color pairs.
- Add grayscale and color-vision simulation screenshots to visual QA.
- Add a "one primary action" lint rule for demo pages and app shells.
- Define motion tokens by purpose: press feedback, transition, attention, loading.
- Test channel tile sizing and press behavior on real touch screens.
