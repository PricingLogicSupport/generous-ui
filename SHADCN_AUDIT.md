# shadcn/ui Coverage Audit

This compares Generous UI against the broad shape of shadcn/ui, then applies the Generous UI philosophy instead of copying component names blindly.

Reference: https://ui.shadcn.com/docs/components

## Already Covered

Direct or close equivalents:

- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- BulkActionBar
- Button
- Card, kept for compatibility but discouraged as a default
- Checkbox
- Combobox
- Command
- Data Table / Table
- Dialog
- Dropdown Menu / Menu
- Menubar / MenuBar, for desktop-like tools only
- Empty State
- Field / FormField / FieldGroup
- Input
- Input OTP
- Kbd
- Label through field components
- Pagination
- Popover
- Progress
- Radio Group
- Select
- Separator / SectionBreak
- Skeleton
- Slider
- Switch
- Table / DataTable
- Tabs
- Textarea
- Toast
- Tooltip
- Calendar / DatePicker, covered as native-first `DatePicker` plus explicit `CalendarMonth`
- Navigation Menu, covered as visible `NavigationMenu`

Generous UI additions beyond shadcn's generic catalog:

- ActionLink
- AccessList
- ActivityLog
- AppFooter
- AppHeader
- CharacterCount
- ChangeReview
- ChoiceTile
- ComparisonList
- ConsentPanel
- ConfirmationPanel
- ContextActions
- ContrastPair
- CopyField
- DataUseList
- DecisionList
- DetailPanel
- ErrorSummary
- FilterChips
- FilterSummary
- HelpHint
- InlineEdit
- InsetNotice
- InvitePanel
- JobQueue
- LoadingRegion
- Meter
- NavigationList
- PageTabs
- PermissionPanel
- PresenceList
- QualityChecklist
- ResultList
- ReleaseGate
- RequirementList
- RetryPanel
- SaveStatus
- SelectionList
- ShareSummary
- ShortcutList
- SkipLink
- SplitView
- SortControl
- StatusBanner
- SummaryCard
- SwatchPicker
- TaskList
- Timeline
- UndoNotice

## Recently Added

- AspectRatio: reserve media dimensions without layout shift.
- ButtonGroup: group sibling actions without making all of them primary.
- ToggleGroup: visible multi-choice state with button-like affordance.
- ScrollArea: bounded overflow with explicit dimensions.
- Spinner: available, but documented as last resort behind skeleton/progress.
- Typography: headings/prose/list primitives to keep readable defaults.
- SkipLink: keyboard route past repeated chrome.
- PageTabs: route-like section navigation with real labels.
- DatePicker: native-first date entry with optional visible calendar scanning.
- SplitView: stable side-by-side task layout for expert tools.
- AppHeader and AppFooter: conventional app chrome without floating navigation islands.
- NavigationMenu: broad destinations with visible labels and descriptions.
- MenuBar: available for desktop-like tools, not consumer navigation.
- DetailPanel: inline sheet replacement that keeps secondary detail spatially attached.
- ContextActions: visible selected-object actions instead of right-click dependence.
- SaveStatus: durable save state without fake progress or ambiguous pending UI.
- ComparisonList and ChangeReview: review-before-action flows with visible consequences.
- HelpHint: deliberate help disclosure instead of hover-only hidden information.
- JobQueue: stable rows for queued/running/done/failed async work.
- RetryPanel and UndoNotice: recoverable failure and reversible action surfaces.
- ActivityLog: durable history instead of forcing users to catch transient toasts.
- RequirementList, PermissionPanel, ConsentPanel, and DataUseList: trust surfaces for blockers, access, consent, and data use.
- SelectionList, BulkActionBar, FilterSummary, and SortControl: visible list management instead of hidden table state.
- AccessList, InvitePanel, PresenceList, and ShareSummary: collaboration state without hidden sharing or vague roles.
- QualityChecklist, ContrastPair, ShortcutList, and ReleaseGate: visible QA and release-readiness surfaces.
- SuggestionList, EvidenceList, ConfidencePanel, and HumanReviewPanel: AI assistance surfaces that keep recommendations, proof, uncertainty, and human handoff visible.
- InputGroup, Item / ItemGroup, Collapsible, NativeSelect, and AlertDialog: common shadcn-style primitives tightened around clearer native controls, explicit rows, and destructive confirmation.
- ThemeScope direction support, Sidebar, and ResizablePanels: layout primitives for RTL checks, visible side navigation, and expert resizing without icon-only rails.
- LineChart, AreaChart, low-level Table primitives, and generous-ui.registry.json: data/display and distribution coverage without turning charts into decoration.

## Still Worth Building

- Registry CLI/install flow: the manifest now covers the exported surface and has export-coverage validation, listing, component inspection, local dependency closure copying, package import reporting, and a local copy/add command. Remote registry hosting is still missing.
- Chart refinements: tooltips, legends, and multi-series charts only when they preserve exact readable values and do not become dashboard filler.

## Avoid Or Delay

- Carousel: usually hides content and fights the "one thing in focus" principle.
- Drawer/Sheet: only when there is a clear mobile task need; avoid off-screen slide-in defaults.
- Context menu: avoid for primary behavior; `ContextActions` is the default replacement.
- Hover card: risks hiding important information behind hover.
- Toggle: low priority because `SwitchField`, `SegmentedControl`, and `ToggleGroup` cover clearer cases. A standalone toggle is only worth adding if it has an unambiguous pressed-state use.
- Sonner: already covered philosophically by `ToastProvider` / `Toaster`; do not add a second toast API unless compatibility becomes a real need.
