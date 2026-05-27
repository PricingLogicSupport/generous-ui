# UI Rules For AI Agents

Use the library components before inventing UI.

Read `RESEARCH_BASE.md` before changing tokens, motion behavior, focus styles, target sizing, or component hierarchy.

Run `npm run registry:validate` after changing `generous-ui.registry.json`, registry schema, component file paths, or distribution metadata.
Run `npm run registry:coverage` after changing public exports in `src/index.ts`.
Run `npm run behavior:check` after changing interaction behavior, focus management, overlays, tabs, disclosure, toasts, or keyboard-resizable layouts.
Run `npm run visual:check` after substantial layout, styling, demo, RTL, or responsive changes.
Run `npm run pack:check` after changing package exports, build output, registry packaging, or npm `files`.
Use `npm run registry:add -- <Component> --to <target> --dry-run` before copying components into another project; review copied files and reported package imports, and do not overwrite target files unless explicitly requested.
Use `--base` or the explicit `--components-dir` / `--lib-dir` / `--patterns-dir` / `--theme-dir` / `--styles-dir` options when the target project does not want the library's original `src/...` folder layout.

## Hard Rules

- Use `Button variant="primary"` at most once per screen.
- Use `ChoiceTile` for selectable large options instead of hand-rolled cards.
- Use `DecisionList` for mutually exclusive text choices.
- Use `ComparisonList` when users need to compare two or more plans before choosing.
- Use `RequirementList` when users need to know what blocks a task before submit.
- Use `InsetNotice` for supporting guidance instead of generic cards.
- Use `HelpHint` for user-requested explanation; do not hide critical instructions in hover-only help.
- Use `PermissionPanel` for access requests; name the exact access and reason.
- Use `ConsentPanel` for consent choices; keep required and optional choices visually distinct.
- Use `DataUseList` when data leaves the product or is retained.
- Use `ShareSummary` for project visibility/link state.
- Use `InvitePanel` for adding collaborators; show the role before sending.
- Use `AccessList` for who has access and what role they have.
- Use `PresenceList` only for current collaborative activity that helps coordination.
- Use `QualityChecklist` for accessibility, robustness, and release checks that need visible status.
- Use `ContrastPair` when presenting or reviewing color token combinations.
- Use `ShortcutList` to document expert shortcuts, never as the only way to perform an action.
- Use `ReleaseGate` before publishing or deploying when blockers must be explicit.
- Use `SuggestionList` for AI-generated recommendations that need explicit accept or dismiss actions.
- Use `EvidenceList` when generated output depends on cited facts, observations, or source material.
- Use `ConfidencePanel` to state confidence and known limits; do not imply certainty where uncertainty remains.
- Use `HumanReviewPanel` when generated output affects access, consent, pricing, publishing, destructive actions, or other risky decisions.
- Use `Item` and `ItemGroup` for reusable rows with media, content, metadata, and actions before inventing a new card layout.
- Use `Collapsible` for one secondary detail section; use `Accordion` when there are multiple related sections.
- Use `AlertDialog` for destructive or irreversible interruptive confirmations.
- Use `Alert` for status, warning, and error messages.
- Use `SwitchField` for immediate binary settings and `CheckboxField` for agreement or inclusion choices.
- Use `DataTable` for structured comparison; do not fake tables with div grids.
- Use low-level `Table` primitives when row structure needs custom markup but the content is still tabular.
- Use `Badge` for compact status text, not as decorative labels.
- Use `Breadcrumbs` only when they help orientation.
- Use `Accordion` for secondary detail; do not hide primary tasks inside accordions.
- Use `Popover` for anchored supporting controls; do not use off-screen slide-ins.
- Use `Menu` for compact secondary actions. Do not pass a `Button` as the trigger; `Menu` renders its own button.
- Use `MenuBar` only for desktop-like tools with familiar top-level command groups.
- Use `NavigationMenu` when broad navigation needs visible labels and descriptions; do not replace it with hover-only navigation.
- Use `ContextActions` when an object is selected and actions should stay visible; do not hide primary actions behind right-click.
- Use `Command` for action search only when there are enough actions to justify search.
- Use `Stepper` for multi-step progress where position matters.
- Use `SegmentedControl` for two to four immediate mode choices.
- Use `SliderField` only for values where approximate adjustment is acceptable.
- Use `NumberStepper` when precise numeric control matters.
- Use `RadioGroup` for visible small-option sets; use `Combobox` only when a native select is not enough.
- Use `NativeSelect` for simple select controls and reserve richer selection components for richer jobs.
- Use `InputGroup` for attached prefixes, suffixes, icons, and inline field actions.
- Use `PasswordField` when reveal/hide is useful, with explicit labels.
- Use `CopyField` for copyable commands, IDs, or URLs.
- Use `FilterChips` for optional filters; use `TagInput` only where user-generated labels are genuinely useful.
- Use `FilterSummary` when filters are active so users can see and remove them.
- Use `SortControl` when order changes meaningfully affect a list.
- Use `SelectionList` for selectable rows and `BulkActionBar` for selected-item actions; never hide bulk actions behind selection alone.
- Use `ConfirmationPanel` for destructive inline confirmation; use `Dialog` when the confirmation interrupts a flow.
- Use `Meter` for bounded quality/readiness values, not fake progress.
- Use `StatusBanner` for page-level state that should remain visible.
- Use `SaveStatus` when edits can be unsaved, saving, saved, or failed.
- Use `JobQueue` when multiple async jobs can run or wait; keep each job in a stable row.
- Use `RetryPanel` for recoverable failures with a specific retry action.
- Use `UndoNotice` for reversible destructive or archival actions.
- Use `ActivityLog` when sequence matters but the user should not have to chase transient toasts.
- Use `NavigationList` for local navigation; keep labels visible.
- Use `AppHeader` and `AppFooter` for durable app chrome with conventional anchors and visible text labels.
- Use `Sidebar` for persistent side navigation with visible labels; do not collapse it into an icon-only rail.
- Use `SkipLink` whenever a screen has repeated navigation before the main content.
- Use `PageTabs` for route-like sections; use `Tabs` for in-page panels.
- Use `SplitView` only where side-by-side comparison improves the task; keep one panel clearly primary.
- Use `ResizablePanels` only for expert tools where resizing helps the work; make sure the layout still stacks on small screens.
- Use `ResultList` for search/browse results with clear titles and actions.
- Use `DateField` and `TimeField` instead of free-text temporal input.
- Use `DatePicker` when users benefit from both native date entry and visible date scanning; do not hide critical date choices behind hover.
- Use `SwatchPicker` for visual token choices with labels.
- Use `LoadingRegion` when async content must reserve exact space.
- Use `DescriptionList` for key/value facts instead of loose paragraphs.
- Use `ErrorSummary` at the top of invalid forms and link errors to fields.
- Use `FieldGroup` when related fields need one scannable question.
- Use `CharacterCount` where length limits affect whether the user can proceed.
- Use `TaskList` for completion and review flows.
- Use `SummaryCard` for review-before-submit sections.
- Use `ChangeReview` when the user needs to inspect before/after changes before saving.
- Use `DetailPanel` for inline secondary detail instead of a generic off-screen sheet.
- Use `InlineEdit` only when changing a value in place is clearer than navigating away.
- Use `AspectRatio` or `MediaSlot` to reserve media dimensions before content loads.
- Use `ButtonGroup` for sibling actions and keep at most one action primary.
- Use `ToggleGroup` for visible multi-select mode/state choices.
- Use `ScrollArea` only with an explicit max height.
- Use `Spinner` only as a last resort; prefer `Skeleton`, `LoadingRegion`, or `Progress` when dimensions or progress are known.
- Use `Prose` for readable document-like content.
- Use `AppFrame` for durable app layouts with visible navigation labels.
- Use `ThemeScope direction="rtl"` when testing right-to-left layouts. Direction is a locale/content property, not a decorative style toggle; isolate mixed-direction content with `dir="auto"` or an explicit direction.
- Use `OtpInput` only for short verification codes and keep every digit labeled.
- Use `CalendarMonth` for explicit date selection; prefer `DateField` when native input is enough.
- Use `BarChart` for simple comparisons, not decorative dashboard filler.
- Use `LineChart` and `AreaChart` only for meaningful change over time or accumulation; include exact values alongside the graphic.
- Use `Timeline` only when sequence over time matters.
- Use `Stat` for meaningful measures, never decorative numbers.
- Use `FileDrop` for uploads so the upload region reserves its dimensions.
- Use `CodeBlock` for copyable code or config examples.
- Give buttons explicit verbs: `Save changes`, `Delete account`, `Open file`.
- Reserve dimensions for async media with `MediaSlot` or explicit width, height, or aspect ratio.
- Use `Skeleton` only with explicit dimensions.
- Use `ToastProvider` and `useToasts`; toasts must overlay and never push layout. Toast actions are for quick reversals only, not primary workflows.
- Prefer `PageShell`, `ActionBar`, and `EmptyState` for screen structure.
- Preserve conventional anchors: back/home on the left, close/account on the right.

## Avoid By Default

- Gradient backgrounds, gradient text, glow, frosted blur, glass cards.
- Emoji in UI chrome.
- Pill-shaped everything.
- Card grids when a list would be clearer.
- Icon-only primary navigation.
- Decorative animation on routine actions.
- Autofocus on page load.
- Loading states for actions that should respond optimistically.

## Adaptation

Projects may change accent color, radius, density, and one signature device through tokens. They should not weaken contrast, remove clear affordances, shrink hit targets below 44px, or introduce layout shift.
