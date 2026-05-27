# Generous UI

An opinionated, adaptable React UI library built around **generous clarity**: one clear action, strong affordances, stable layouts, honest states, and warmth through execution rather than decoration.

This starter is deliberately closer to `shadcn/ui` than Material UI: components are readable, themeable with CSS variables, and meant to be owned by the product using them.

The name is now locked as **Generous UI**. See [BRAND.md](./BRAND.md) for naming rules, CLI/package names, and voice.

## Install

```bash
npm install
npm run dev
```

## Visual QA

```bash
npm run behavior:check
npm run visual:check
```

The behavior check starts a local Vite server and exercises dialog, tabs, menu, popover, accordion, suggestion, collapsible, alert-dialog, and resizable-panel interactions. The visual check captures desktop, mobile, and RTL-preview screenshots into `.visual-snapshots`, and fails on console errors, horizontal overflow, suspiciously blank screenshots, or multiple primary actions.

## Package Check

```bash
npm run pack:check
npm run package:smoke
npm run release:check
```

The package check runs `npm pack --dry-run --json` and verifies the published shape includes the compiled bundle, CSS, declaration entrypoint, registry files, CLI files, and source files needed by `generous-ui add`, with no demo/generated QA folders.

The package smoke test packs the tarball, installs it into a blank temporary npm project, then runs `npx generous-ui init`, `show`, and `add` from the installed package. It verifies copied source paths, rewritten local imports, and shared CSS.

`release:check` is the publish gate used by `prepublishOnly`. It runs type checks, registry validation, registry coverage, package shape checks, and the packed-package smoke test.

## License

Generous UI is released under the [MIT License](./LICENSE).

## Use

```tsx
import { Button, PageShell } from "generous-ui";
import "generous-ui/styles.css";

export function Screen() {
  return (
    <PageShell title="Library">
      <Button variant="primary">Save changes</Button>
    </PageShell>
  );
}
```

## Components

Task structure:

- `PageShell`
- `AppFrame`
- `AppHeader`
- `AppFooter`
- `Sidebar`
- `ShareSummary`
- `ActionBar`
- `Toolbar`
- `SkipLink`
- `PageTabs`
- `SplitView`
- `ResizablePanels`
- `NavigationMenu`
- `MenuBar`
- `DetailPanel`
- `HelpHint`
- `PermissionPanel`
- `Breadcrumbs`
- `EmptyState`
- `InsetNotice`
- `Alert`
- `StatusBanner`
- `SectionBreak`
- `AspectRatio`
- `Accordion`
- `Collapsible`
- `Stepper`
- `Timeline`
- `NavigationList`
- `LoadingRegion`
- `ScrollArea`
- `FieldGroup`
- `TaskList`
- `JobQueue`
- `ActivityLog`
- `RequirementList`
- `AccessList`
- `PresenceList`
- `QualityChecklist`
- `ShortcutList`
- `ReleaseGate`
- `HumanReviewPanel`
- `Item`
- `ItemGroup`

Choice and input:

- `Button`
- `ButtonGroup`
- `BulkActionBar`
- `IconButton`
- `Popover`
- `Tooltip`
- `Menu`
- `ContextActions`
- `Command`
- `InputGroup`
- `SegmentedControl`
- `ToggleGroup`
- `ChoiceTile`
- `DecisionList`
- `ComparisonList`
- `ConsentPanel`
- `RadioGroup`
- `Combobox`
- `OtpInput`
- `Input`
- `InvitePanel`
- `CharacterCount`
- `SearchField`
- `PasswordField`
- `CopyField`
- `DateField`
- `DatePicker`
- `TimeField`
- `Textarea`
- `Select`
- `NativeSelect`
- `Slider`
- `SliderField`
- `NumberStepper`
- `Checkbox`
- `CheckboxField`
- `Switch`
- `SwitchField`
- `FileDrop`
- `FilterChips`
- `FilterSummary`
- `TagInput`
- `SwatchPicker`
- `InlineEdit`
- `CalendarMonth`
- `Tabs`
- `SelectionList`
- `SortControl`

Data, state, and feedback:

- `Avatar`
- `Badge`
- `CodeBlock`
- `BarChart`
- `LineChart`
- `AreaChart`
- `Table`
- `TableHeader`
- `TableBody`
- `TableRow`
- `TableHead`
- `TableCell`
- `TableCaption`
- `DataTable`
- `DataUseList`
- `DescriptionList`
- `ContrastPair`
- `SummaryCard`
- `Kbd`
- `ListRow`
- `ResultList`
- `ActionLink`
- `ChangeReview`
- `SuggestionList`
- `EvidenceList`
- `ConfidencePanel`
- `Dialog`
- `AlertDialog`
- `ConfirmationPanel`
- `ErrorSummary`
- `Meter`
- `Pagination`
- `Progress`
- `Stat`
- `SaveStatus`
- `RetryPanel`
- `UndoNotice`
- `Spinner`
- `ToastProvider`
- `Toaster`
- `Skeleton`
- `MediaSlot`
- `Heading`
- `Prose`

## Audit

See [SHADCN_AUDIT.md](./SHADCN_AUDIT.md) for the current comparison against shadcn/ui and the list of components we intentionally copy, rename, delay, or avoid.

## Registry

The reusable manifest lives at [generous-ui.registry.json](./generous-ui.registry.json). It covers the exported component surface with component names, type buckets, source files, and local dependencies discovered by the registry tooling.

The package exposes a `generous-ui` CLI so projects can install source the same way they would with a registry-first library:

```bash
npx generous-ui@latest init
npx generous-ui@latest list
npx generous-ui@latest show Button
npx generous-ui@latest add Button --dry-run
npx generous-ui@latest add AlertDialog
npx generous-ui@latest add --type form --dry-run
npx generous-ui@latest add --all --dry-run
npx generous-ui@latest doctor
```

`init` writes `generous-ui.json` in the current project. By default it maps copied files into `src/ui/components`, `src/ui/patterns`, `src/ui/lib`, `src/ui/theme`, and `src/ui/styles`, and enables copying the shared stylesheet when components are added.

`doctor` checks a consuming project for `generous-ui.json`, safe configured paths, copied source files, copied CSS, package availability, `tsconfig.json`, and TypeScript availability. It exits non-zero when required pieces are missing.

For local library development, the same registry engine is available through npm scripts:

```bash
npm run registry:validate
npm run registry:list
npm run registry:coverage
npm run registry:show -- Button
npm run registry:add -- Button --to ./vendor/generous-ui --dry-run
npm run registry:add -- AlertDialog --to ./app --base src/ui --with-css --dry-run
```

The schema lives at [generous-ui.registry.schema.json](./generous-ui.registry.schema.json). Validation checks the manifest shape, duplicate component names, allowed type buckets, referenced local files, local imports, and registry coverage against public exports from `src/index.ts`.

`registry:add` copies the component files and local TypeScript import closure into the target directory. It accepts one or more component names, `--type <bucket>` for a full registry type, or `--all` for the complete source library. It refuses to overwrite existing files unless `--force` is passed. Add `--with-css` when the target project also needs the shared stylesheet copied. `registry:show` and `registry:add` also report package imports such as `react` or `lucide-react` so the target project can install them deliberately.

By default, copied files preserve their source paths. Use `--base src/ui` to map files into `src/ui/components`, `src/ui/patterns`, `src/ui/lib`, `src/ui/theme`, and `src/ui/styles`. Override individual destinations with `--components-dir`, `--patterns-dir`, `--lib-dir`, `--theme-dir`, or `--styles-dir`. Local TypeScript imports are rewritten to the mapped target paths during real copies.

## Adapt Without Breaking The Philosophy

Change the CSS variables on `.gui-theme` or use `ThemeScope` for local variation. Keep these constraints intact:

- one primary action per screen
- visible affordances before cleverness
- minimum 44px touch targets
- reserved dimensions for async content
- toasts overlay instead of pushing layout
- shadows only where elevation means something
- no gradients, glass, glow, emoji chrome, or card-everything defaults
- prefer job-based primitives like `ChoiceTile`, `InsetNotice`, `EmptyState`, and `PageShell` over generic boxes

## Evidence Base

The design rules are backed by a living research note in [RESEARCH_BASE.md](./RESEARCH_BASE.md), covering target size, decision load, visual search, contrast, color perception, motion sensitivity, typography, and GOV.UK service design lessons.
