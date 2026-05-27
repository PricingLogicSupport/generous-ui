import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  AlertDialog,
  Accordion,
  ActionLink,
  AccessList,
  ActivityLog,
  AppFrame,
  AppFooter,
  AppHeader,
  AreaChart,
  AspectRatio,
  Avatar,
  BarChart,
  Badge,
  BulkActionBar,
  Button,
  ButtonGroup,
  CalendarMonth,
  Breadcrumbs,
  CheckboxField,
  CharacterCount,
  ChangeReview,
  ChoiceTile,
  CodeBlock,
  Collapsible,
  Combobox,
  Command,
  ComparisonList,
  ConfidencePanel,
  ConfirmationPanel,
  ConsentPanel,
  ContextActions,
  ContrastPair,
  CopyField,
  DataTable,
  DateField,
  DatePicker,
  DataUseList,
  DetailPanel,
  DecisionList,
  DescriptionList,
  Dialog,
  EmptyState,
  ErrorSummary,
  EvidenceList,
  FileDrop,
  FieldGroup,
  FilterChips,
  FilterSummary,
  FormField,
  HelpHint,
  HumanReviewPanel,
  InsetNotice,
  InlineEdit,
  Input,
  InputGroup,
  InvitePanel,
  Item,
  ItemGroup,
  JobQueue,
  Kbd,
  LineChart,
  ListRow,
  LoadingRegion,
  Menu,
  MenuBar,
  NavigationMenu,
  NavigationList,
  Meter,
  NativeSelect,
  NumberStepper,
  OtpInput,
  PageShell,
  PageTabs,
  Pagination,
  PasswordField,
  PermissionPanel,
  Popover,
  PresenceList,
  QualityChecklist,
  RadioGroup,
  ResultList,
  RequirementList,
  ReleaseGate,
  ResizablePanels,
  RetryPanel,
  SaveStatus,
  ScrollArea,
  Select,
  SelectionList,
  SegmentedControl,
  ShareSummary,
  Sidebar,
  ShortcutList,
  Skeleton,
  SkipLink,
  SliderField,
  SplitView,
  Spinner,
  Stat,
  SortControl,
  StatusBanner,
  Stepper,
  SuggestionList,
  SummaryCard,
  SwatchPicker,
  SwitchField,
  Tabs,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  ThemeScope,
  Timeline,
  TagInput,
  TaskList,
  TimeField,
  ToggleGroup,
  UndoNotice,
  ToastProvider,
  Toaster,
  Prose,
  useToasts
} from "../src";
import registry from "../generous-ui.registry.json";
import registryDetails from "./registry-details.json";
import "./styles.css";
import { Check, FolderOpen, LayoutGrid, Palette, Radio } from "lucide-react";

type RegistryComponent = {
  name: string;
  type: string;
  files: string[];
};

type RegistryDetail = RegistryComponent & {
  closure: string[];
  closureWithCss: string[];
  packages: string[];
};

const registryComponents = registry.components as RegistryComponent[];
const registryDetailComponents = registryDetails.components as RegistryDetail[];
const registryTypeRows = Object.entries(
  registryComponents.reduce<Record<string, number>>((groups, component) => {
    groups[component.type] = (groups[component.type] ?? 0) + 1;
    return groups;
  }, {})
)
  .map(([type, count]) => ({ type, count }))
  .sort((a, b) => a.type.localeCompare(b.type));
const registryTypes = ["all", ...registryTypeRows.map((row) => row.type)];

function uniqueValues(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function Demo() {
  return (
    <StrictMode>
      <ToastProvider>
        <Workbench />
        <Toaster />
      </ToastProvider>
    </StrictMode>
  );
}

function Workbench() {
  const { addToast } = useToasts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const [starter, setStarter] = useState("workspace");
  const [accent, setAccent] = useState("#006adc");
  const [reserveSpace, setReserveSpace] = useState(true);
  const [onePrimary, setOnePrimary] = useState(true);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("guided");
  const [confidence, setConfidence] = useState(82);
  const [screens, setScreens] = useState(3);
  const [audience, setAudience] = useState("broad");
  const [filters, setFilters] = useState(["stable"]);
  const [tags, setTags] = useState(["clarity", "contrast"]);
  const [framework, setFramework] = useState("react");
  const [notes, setNotes] = useState("Keep the main action obvious.");
  const [projectName, setProjectName] = useState("Kitchen planner");
  const [toggles, setToggles] = useState(["contrast"]);
  const [otp, setOtp] = useState("123");
  const [selectedDay, setSelectedDay] = useState(new Date(2026, 4, 26));
  const [scheduleDate, setScheduleDate] = useState("2026-05-26");
  const [structureSection, setStructureSection] = useState("overview");
  const [expertSection, setExpertSection] = useState("files");
  const [saveState, setSaveState] = useState<"unsaved" | "saving" | "saved" | "error">("unsaved");
  const [selectedPlan, setSelectedPlan] = useState("guided");
  const [undoVisible, setUndoVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [consent, setConsent] = useState({ terms: true, training: false, updates: false });
  const [selectedProjects, setSelectedProjects] = useState(["kitchen"]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [registryQuery, setRegistryQuery] = useState("");
  const [registryType, setRegistryType] = useState("all");
  const [selectedRegistryName, setSelectedRegistryName] = useState(registryComponents[0]?.name ?? "Button");
  const [activeListFilters, setActiveListFilters] = useState([
    { id: "status", label: "Status", value: "Ready" },
    { id: "owner", label: "Owner", value: "Design" }
  ]);
  const roleOptions = [
    { value: "viewer", label: "Viewer" },
    { value: "commenter", label: "Commenter" },
    { value: "editor", label: "Editor" }
  ];
  const [inviteEmail, setInviteEmail] = useState("teammate@example.com");
  const [inviteRole, setInviteRole] = useState("viewer");
  const [accessMembers, setAccessMembers] = useState([
    { id: "owner", name: "Avery Stone", email: "avery@example.com", role: "editor", status: "owner" as const },
    { id: "mira", name: "Mira Patel", email: "mira@example.com", role: "editor", status: "active" as const },
    { id: "jon", name: "Jon Bell", email: "jon@example.com", role: "viewer", status: "pending" as const }
  ]);
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: "simplify-copy",
      title: "Shorten the primary goal copy",
      description: "Keeps the screen easier to scan before the user commits.",
      confidence: "high" as const
    },
    {
      id: "add-motion",
      title: "Add transition to review section",
      description: "Only use this if the motion clarifies what changed.",
      confidence: "medium" as const
    }
  ]);
  const reviewRows = [
    { rule: "Primary action", status: "Ready", score: 100 },
    { rule: "Async layout", status: reserveSpace ? "Ready" : "Review", score: reserveSpace ? 100 : 60 },
    { rule: "Contrast", status: "Ready", score: 96 }
  ];
  const registrySearch = registryQuery.trim().toLowerCase();
  const filteredRegistryComponents = registryComponents.filter((component) => {
    const matchesQuery = !registrySearch || component.name.toLowerCase().includes(registrySearch);
    const matchesType = registryType === "all" || component.type === registryType;
    return matchesQuery && matchesType;
  });
  const visibleRegistryComponents = filteredRegistryComponents.slice(0, 18);
  const selectedRegistryComponent =
    registryComponents.find((component) => component.name === selectedRegistryName) ??
    filteredRegistryComponents[0] ??
    registryComponents[0];
  const selectedRegistryDetails =
    registryDetailComponents.find((component) => component.name === selectedRegistryComponent.name) ??
    registryDetailComponents[0];
  const selectedRegistryFiles = selectedRegistryDetails.files;
  const selectedRegistryClosure = selectedRegistryDetails.closureWithCss;
  const selectedRegistryPackages = selectedRegistryDetails.packages;
  const selectedTypeDetails = registryDetailComponents.filter((component) => component.type === selectedRegistryComponent.type);
  const selectedTypeClosure = uniqueValues(selectedTypeDetails.flatMap((component) => component.closureWithCss));
  const selectedTypePackages = uniqueValues(selectedTypeDetails.flatMap((component) => component.packages));
  const allRegistryClosure = uniqueValues(registryDetailComponents.flatMap((component) => component.closureWithCss));
  const registryDefaultCommand = `npx generous-ui@latest add ${selectedRegistryComponent.name} --dry-run`;
  const registryMappedCommand = `npx generous-ui@latest add ${selectedRegistryComponent.name} --to ./app --base src/ui --with-css --dry-run`;
  const registryFlowCommand = [
    "npx generous-ui@latest init",
    "npx generous-ui@latest list",
    `npx generous-ui@latest show ${selectedRegistryComponent.name}`,
    registryDefaultCommand,
    `npx generous-ui@latest add --type ${selectedRegistryComponent.type} --dry-run`,
    registryMappedCommand.replace(" --dry-run", ""),
    "npx generous-ui@latest doctor"
  ].join("\n");

  return (
    <ThemeScope accent={accent}>
      <SkipLink href="#main-content" />
      <PageShell
        id="main-content"
        eyebrow="Generous UI"
        title="Set project defaults"
        primaryAction={{
          label: "Save changes",
          onClick: () =>
            addToast({
              title: "Changes saved",
              message: "The interface responds now and reconciles quietly.",
              tone: "success"
            })
        }}
      >
        <Breadcrumbs
          items={[
            { label: "Library", href: "#" },
            { label: "Defaults", current: true }
          ]}
        />
        <section className="demo-layout" aria-label="Component workbench">
          <div className="demo-main">
            <div className="demo-section-heading">
              <h2>Choose a starter</h2>
              <p>Large targets, plain labels, one selected path.</p>
            </div>
            <div className="demo-choice-grid">
              <ChoiceTile
                title="Workspace"
                description="Start from a clear project home."
                icon={<FolderOpen aria-hidden="true" />}
                selected={starter === "workspace"}
                onClick={() => setStarter("workspace")}
              />
              <ChoiceTile
                title="Tokens"
                description="Tune color, radius, and density."
                icon={<Palette aria-hidden="true" />}
                selected={starter === "tokens"}
                onClick={() => setStarter("tokens")}
              />
              <ChoiceTile
                title="Patterns"
                description="Start from whole task screens."
                icon={<LayoutGrid aria-hidden="true" />}
                selected={starter === "patterns"}
                onClick={() => setStarter("patterns")}
              />
              <ChoiceTile
                title="States"
                description="Check loading, empty, and error paths."
                icon={<Radio aria-hidden="true" />}
                selected={starter === "states"}
                onClick={() => setStarter("states")}
              />
            </div>

            <section className="demo-form-panel">
              <div>
                <h2>Describe the product</h2>
                <p>Style variation changes the surface, not the rules.</p>
              </div>
              <FormField label="Product name" description="Use plain words people already understand.">
                <Input placeholder="Kitchen planner" />
              </FormField>
              <FormField label="Primary user goal">
                <Textarea placeholder="Help someone choose what to do next without hunting." />
              </FormField>
              <FormField label="Default density" description="Comfortable is the baseline for broad audiences.">
                <Select defaultValue="comfortable">
                  <option value="comfortable">Comfortable</option>
                  <option value="compact">Compact for expert tools</option>
                </Select>
              </FormField>
              <div className="demo-rule-stack">
                <SwitchField
                  label="Reserve async space"
                  description="Images and loading regions keep their final dimensions."
                  checked={reserveSpace}
                  onCheckedChange={setReserveSpace}
                />
                <CheckboxField
                  label="Enforce one primary action"
                  description="Screens should not present several equally loud next steps."
                  checked={onePrimary}
                  onChange={(event) => setOnePrimary(event.currentTarget.checked)}
                />
              </div>
              <Alert title="Ready to save" tone={onePrimary && reserveSpace ? "success" : "warning"}>
                <p>
                  The current defaults keep the task clear, stable, and readable before any style variation is applied.
                </p>
              </Alert>
            </section>
          </div>

          <aside className="demo-side">
            <DecisionList
              label="Style direction"
              value={accent}
              onValueChange={setAccent}
              items={[
                {
                  value: "#006adc",
                  title: "Clear blue",
                  description: "Clear, familiar, and direct.",
                  meta: <span className="demo-swatch" style={{ background: "#006adc" }} />
                },
                {
                  value: "#b25400",
                  title: "Amber",
                  description: "Warmer without turning decorative.",
                  meta: <span className="demo-swatch" style={{ background: "#b25400" }} />
                },
                {
                  value: "#0f7b62",
                  title: "Green",
                  description: "Calm, practical, and grounded.",
                  meta: <span className="demo-swatch" style={{ background: "#0f7b62" }} />
                }
              ]}
            />
            <InsetNotice
              title="Review a hard case"
              action={<Button onClick={() => setDialogOpen(true)}>Open dialog</Button>}
            >
              <p>Destructive flows keep the action specific and the close control anchored.</p>
            </InsetNotice>
            <Tabs
              label="Quality checks"
              items={[
                {
                  value: "loading",
                  label: "Loading",
                  content: (
                    <section className="demo-loading-region" aria-label="Stable loading example">
                      <h2>Stable loading</h2>
                      <p>The skeleton reserves exactly what it replaces.</p>
                      <div className="demo-skeleton-stack" aria-hidden="true">
                        <Skeleton width="100%" height={18} />
                        <Skeleton width="72%" height={18} />
                        <Skeleton width="100%" height={156} />
                      </div>
                    </section>
                  )
                },
                {
                  value: "review",
                  label: "Review",
                  content: (
                    <DataTable
                      caption="Default checks"
                      rows={reviewRows}
                      getRowKey={(row) => row.rule}
                      columns={[
                        { key: "rule", header: "Rule", cell: (row) => row.rule },
                        {
                          key: "status",
                          header: "Status",
                          cell: (row) => (
                            <Badge tone={row.status === "Ready" ? "success" : "warning"}>{row.status}</Badge>
                          )
                        },
                        { key: "score", header: "Score", align: "end", cell: (row) => `${row.score}%` }
                      ]}
                    />
                  )
                },
                {
                  value: "tools",
                  label: "Tools",
                  content: (
                    <div className="demo-utility-stack">
                      <ListRow
                        title="Maintainer"
                        description="Owns the default rules for this project."
                        leading={<Avatar name="Generous UI" />}
                        trailing={
                          <Menu
                            label="Maintainer actions"
                            trigger="Actions"
                            items={[
                              {
                                label: "Open profile",
                                onSelect: () => addToast({ title: "Profile opened" })
                              },
                              {
                                label: "Remove maintainer",
                                destructive: true,
                                onSelect: () => addToast({ title: "Maintainer kept", tone: "danger" })
                              }
                            ]}
                          />
                        }
                      />
                      <Command
                        label="Project commands"
                        placeholder="Find an action"
                        items={[
                          {
                            value: "save",
                            label: "Save changes",
                            description: "Commit the current defaults.",
                            onSelect: () => addToast({ title: "Changes saved", tone: "success" })
                          },
                          {
                            value: "dialog",
                            label: "Open destructive flow",
                            description: "Review the hard-case dialog.",
                            onSelect: () => setDialogOpen(true)
                          }
                        ]}
                      />
                      <Popover trigger="Details" title="Maintainer details">
                        <p>Anchored supporting detail opens next to its trigger and closes with Escape.</p>
                      </Popover>
                      <Stepper
                        currentStep={1}
                        steps={[
                          { title: "Choose", description: "Pick the project starter." },
                          { title: "Describe", description: "Name the product and user goal." },
                          { title: "Save", description: "Apply the defaults." }
                        ]}
                      />
                      <SegmentedControl
                        label="Build mode"
                        value={mode}
                        onValueChange={setMode}
                        items={[
                          { value: "guided", label: "Guided" },
                          { value: "expert", label: "Expert" }
                        ]}
                      />
                      <SliderField
                        label="Confidence"
                        valueLabel={`${confidence}%`}
                        min={0}
                        max={100}
                        value={confidence}
                        onChange={(event) => setConfidence(Number(event.currentTarget.value))}
                      />
                      <NumberStepper
                        label="Screens to generate"
                        value={screens}
                        min={1}
                        max={6}
                        onValueChange={setScreens}
                      />
                      <div className="demo-stat-grid">
                        <Stat label="Screens" value={screens} description="Kept small enough to review." />
                        <Stat label="Confidence" value={`${confidence}%`} tone="success" description="Based on current defaults." />
                      </div>
                      <DescriptionList
                        items={[
                          { term: "Mode", detail: mode === "guided" ? "Guided" : "Expert" },
                          { term: "Shortcut", detail: <><Kbd>⌘</Kbd> <Kbd>S</Kbd></> }
                        ]}
                      />
                      <Timeline
                        items={[
                          { title: "Defaults chosen", time: "Now", description: "The selected starter and style direction are set." },
                          { title: "Review next", time: "Next", description: "Check error, empty, and loading states before publishing." }
                        ]}
                      />
                      <FileDrop label="Attach reference" description="PDF, image, or brief. Space is reserved before upload." />
                      <Pagination page={page} pageCount={3} onPageChange={setPage} />
                      <CodeBlock code={'<Button variant="primary">Save changes</Button>'} language="tsx" />
                    </div>
                  )
                },
                {
                  value: "forms",
                  label: "Forms",
                  content: (
                    <div className="demo-utility-stack">
                      <RadioGroup
                        label="Audience"
                        value={audience}
                        onValueChange={setAudience}
                        options={[
                          { value: "broad", label: "Broad audience", description: "Use generous spacing and plain words." },
                          { value: "expert", label: "Expert tool", description: "Allow density once the task is proven." }
                        ]}
                      />
                      <Combobox
                        label="Framework"
                        value={framework}
                        onValueChange={setFramework}
                        options={[
                          { value: "react", label: "React" },
                          { value: "vue", label: "Vue" },
                          { value: "svelte", label: "Svelte" }
                        ]}
                      />
                      <PasswordField label="Access key" placeholder="Enter key" />
                      <CopyField label="Install command" value="npm install generous-ui" />
                      <Meter label="Readiness" value={confidence} tone={confidence > 70 ? "success" : "warning"} />
                      <FilterChips
                        label="Quality filters"
                        values={filters}
                        onValuesChange={setFilters}
                        chips={[
                          { value: "stable", label: "Stable layout" },
                          { value: "contrast", label: "High contrast" },
                          { value: "motion", label: "Reduced motion" }
                        ]}
                      />
                      <TagInput label="Principles" tags={tags} onTagsChange={setTags} />
                      <ConfirmationPanel
                        title="Reset these defaults?"
                        message="This is destructive, so the action names exactly what will happen."
                        confirmLabel="Reset defaults"
                        onConfirm={() => addToast({ title: "Defaults kept", tone: "danger" })}
                      />
                    </div>
                  )
                },
                {
                  value: "display",
                  label: "Display",
                  content: (
                    <div className="demo-utility-stack">
                      <StatusBanner
                        title="Defaults are ready"
                        message="This keeps status visible without creating another primary action."
                        tone="success"
                      />
                      <NavigationList
                        label="Demo navigation"
                        items={[
                          { label: "Defaults", current: true },
                          { label: "States" },
                          { label: "Publish" }
                        ]}
                      />
                      <ResultList
                        label="Matched patterns"
                        results={[
                          {
                            title: "Settings screen",
                            description: "A stable form layout with one save action.",
                            meta: "Pattern",
                            action: <Button>Open</Button>
                          },
                          {
                            title: "Review screen",
                            description: "A comparison view for checks and readiness.",
                            meta: "Pattern",
                            action: <Button>Open</Button>
                          }
                        ]}
                      />
                      <div className="demo-stat-grid">
                        <DateField label="Review date" />
                        <TimeField label="Review time" />
                      </div>
                      <SwatchPicker
                        label="Accent"
                        value={accent}
                        onValueChange={setAccent}
                        options={[
                          { value: "#006adc", label: "Clear blue" },
                          { value: "#b25400", label: "Amber" },
                          { value: "#0f7b62", label: "Green" }
                        ]}
                      />
                      <LoadingRegion
                        loading
                        label="Reserved preview"
                        skeleton={
                          <div className="demo-skeleton-stack" aria-hidden="true">
                            <Skeleton width="100%" height={18} />
                            <Skeleton width="80%" height={18} />
                            <Skeleton width="100%" height={120} />
                          </div>
                        }
                      >
                        <p>Loaded content</p>
                      </LoadingRegion>
                    </div>
                  )
                },
                {
                  value: "review-flow",
                  label: "Review flow",
                  content: (
                    <div className="demo-utility-stack">
                      <ErrorSummary
                        items={[
                          {
                            fieldId: "project-notes",
                            message:
                              notes.length > 80
                                ? "Project notes must be 80 characters or fewer"
                                : "Example error summary link"
                          }
                        ]}
                      />
                      <FieldGroup
                        legend="Review details"
                        description="Group related fields so the screen can be scanned in chunks."
                      >
                        <CharacterCount
                          label="Project notes"
                          value={notes}
                          maxLength={80}
                          onValueChange={setNotes}
                        />
                        <InlineEdit label="Project name" value={projectName} onValueChange={setProjectName} />
                      </FieldGroup>
                      <TaskList
                        title="Before saving"
                        items={[
                          { title: "Choose starter", description: "Pick one path.", status: <Badge tone="success">Done</Badge> },
                          { title: "Check states", description: "Review empty, loading, and failure.", status: <Badge tone="warning">Review</Badge> },
                          { title: "Save defaults", description: "Commit the final setup.", status: <Badge>Next</Badge> }
                        ]}
                      />
                      <SummaryCard title="Project summary" action={<ActionLink href="#">Change</ActionLink>}>
                        <DescriptionList
                          items={[
                            { term: "Name", detail: projectName },
                            { term: "Framework", detail: framework },
                            { term: "Audience", detail: audience === "broad" ? "Broad audience" : "Expert tool" }
                          ]}
                        />
                      </SummaryCard>
                    </div>
                  )
                },
                {
                  value: "audit",
                  label: "Audit",
                  content: (
                    <div className="demo-utility-stack">
                      <StatusBanner
                        title="shadcn coverage audit"
                        message="We copy useful primitives, rename job-based patterns, and delay components that fight the philosophy."
                      />
                      <AspectRatio ratio="16 / 9">
                        <div className="demo-aspect-fill">Reserved 16:9 preview</div>
                      </AspectRatio>
                      <ButtonGroup label="Audit actions">
                        <Button>Open audit</Button>
                        <Button>Compare list</Button>
                      </ButtonGroup>
                      <ToggleGroup
                        label="Checks"
                        values={toggles}
                        onValuesChange={setToggles}
                        items={[
                          { value: "contrast", label: "Contrast" },
                          { value: "motion", label: "Motion" },
                          { value: "layout", label: "Layout" }
                        ]}
                      />
                      <ScrollArea maxHeight={160}>
                        <Prose>
                          <p>
                            Calendar, OTP, charts, and app frames are still worth building. Carousel, hover card,
                            and generic drawers stay delayed until a task proves they are needed.
                          </p>
                          <p>
                            Spinner exists for compatibility, but skeletons and honest progress should remain the
                            default loading language.
                          </p>
                        </Prose>
                      </ScrollArea>
                      <div>
                        <Spinner label="Checking audit" />
                      </div>
                      <OtpInput label="Verification code" value={otp} onValueChange={setOtp} />
                      <CalendarMonth
                        month={new Date(2026, 4, 1)}
                        selectedDate={selectedDay}
                        onDateSelect={setSelectedDay}
                      />
                      <BarChart
                        label="Component readiness"
                        items={[
                          { label: "Forms", value: 92 },
                          { label: "Display", value: 86 },
                          { label: "Flows", value: 78 }
                        ]}
                        max={100}
                      />
                      <AppFrame
                        title="App frame"
                        nav={[
                          { label: "Home", current: true },
                          { label: "Settings" },
                          { label: "Review" }
                        ]}
                      >
                        <Prose>
                          <p>Visible navigation labels, stable content area, and one footer action.</p>
                        </Prose>
                      </AppFrame>
                    </div>
                  )
                },
                {
                  value: "failure",
                  label: "Failure",
                  content: (
                    <Alert title="Could not reach the server" tone="danger">
                      <p>Check the connection, then try saving again.</p>
                    </Alert>
                  )
                }
              ]}
            />
            <Accordion
              items={[
                {
                  value: "why",
                  title: "Why these defaults?",
                  content:
                    "They protect the user from hidden state, layout shift, vague actions, and low-contrast ambiguity."
                },
                {
                  value: "adapt",
                  title: "How can projects vary?",
                  content:
                    "Change accent, density, and one signature interaction. Keep target size, contrast, and hierarchy intact."
                }
              ]}
            />
          </aside>
        </section>

        <section className="demo-wide-panel" aria-labelledby="structure-patterns-title">
          <div>
            <h2 id="structure-patterns-title">Structure patterns</h2>
            <p>App-scale primitives get enough room to show their hierarchy instead of pretending a rail is a screen.</p>
          </div>
          <AppHeader
            brand="Kitchen Planner"
            nav={[
              { label: "Plan", current: true },
              { label: "Budget" },
              { label: "Review" }
            ]}
            actions={<Button>Account</Button>}
          />
          <PageTabs
            label="Project sections"
            items={[
              {
                label: "Overview",
                current: structureSection === "overview",
                onClick: () => setStructureSection("overview")
              },
              {
                label: "Rooms",
                current: structureSection === "rooms",
                onClick: () => setStructureSection("rooms")
              },
              {
                label: "Costs",
                current: structureSection === "costs",
                onClick: () => setStructureSection("costs")
              }
            ]}
          />
          <SplitView
            primaryLabel="Plan preview"
            secondaryLabel="Plan details"
            primary={
              <Prose>
                <h2>{structureSection === "overview" ? "Overview stays in focus" : "Section stays in focus"}</h2>
                <p>
                  Split views are reserved for tools where side-by-side comparison helps the task. The secondary
                  panel defers instead of competing for attention.
                </p>
              </Prose>
            }
            secondary={
              <DescriptionList
                items={[
                  { term: "Current", detail: structureSection },
                  { term: "Rule", detail: "One main panel, one support panel" }
                ]}
              />
            }
          />
          <DatePicker
            label="Review deadline"
            description="Native input first, visible calendar when the task benefits from scanning dates."
            value={scheduleDate}
            onValueChange={setScheduleDate}
            showCalendar
            calendarMonth={new Date(2026, 4, 1)}
          />
          <AppFooter
            links={[
              { label: "Accessibility", href: "#" },
              { label: "Privacy", href: "#" },
              { label: "Support", href: "#" }
            ]}
          >
            <p>Footer links stay plain, predictable, and low-priority.</p>
          </AppFooter>
        </section>

        <section className="demo-wide-panel" aria-labelledby="expert-patterns-title">
          <div>
            <h2 id="expert-patterns-title">Expert patterns</h2>
            <p>Advanced controls stay visible, anchored, and secondary. They support the task instead of becoming the task.</p>
          </div>
          <MenuBar
            label="Workspace commands"
            groups={[
              {
                label: "File",
                items: [
                  { label: "New project", onSelect: () => addToast({ title: "New project" }) },
                  { label: "Export summary", onSelect: () => addToast({ title: "Summary exported" }) }
                ]
              },
              {
                label: "View",
                items: [
                  { label: "Show details", onSelect: () => setExpertSection("details") },
                  { label: "Show files", onSelect: () => setExpertSection("files") }
                ]
              }
            ]}
          />
          <NavigationMenu
            label="Workspace areas"
            items={[
              {
                label: "Files",
                description: "Visible destination for project documents.",
                current: expertSection === "files",
                onClick: () => setExpertSection("files")
              },
              {
                label: "Details",
                description: "Facts and settings that support the current task.",
                current: expertSection === "details",
                onClick: () => setExpertSection("details")
              },
              {
                label: "History",
                description: "Sequence only when timing helps understanding.",
                current: expertSection === "history",
                onClick: () => setExpertSection("history")
              }
            ]}
          />
          <DetailPanel
            title={expertSection === "details" ? "Project details" : "Selected project"}
            description="This replaces a generic slide-in sheet when the detail should remain spatially connected to the page."
            action={<Button onClick={() => addToast({ title: "Details opened" })}>Open details</Button>}
          >
            <DescriptionList
              items={[
                { term: "Area", detail: expertSection },
                { term: "Pattern", detail: "Inline detail, not off-screen mystery state" }
              ]}
            />
          </DetailPanel>
          <ContextActions
            label="Actions for selected project"
            subject="Kitchen planner is selected. Actions are exposed directly instead of hidden behind right-click."
            actions={[
              { label: "Duplicate project", onSelect: () => addToast({ title: "Project duplicated" }) },
              { label: "Archive project", onSelect: () => addToast({ title: "Project archived" }) },
              { label: "Delete project", destructive: true, onSelect: () => setDialogOpen(true) }
            ]}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="review-patterns-title">
          <div>
            <h2 id="review-patterns-title">Review patterns</h2>
            <p>These primitives make consequence, evidence, and save state visible before the user commits.</p>
          </div>
          <SaveStatus
            state={saveState}
            message={
              saveState === "saving"
                ? "The interface responds immediately, then confirms the durable state."
                : "State is explicit so the user never has to infer whether work is safe."
            }
            action={{
              label: saveState === "saving" ? "Mark saved" : "Simulate save",
              onClick: () => setSaveState((current) => (current === "saving" ? "saved" : "saving"))
            }}
          />
          <ComparisonList
            label="Compare generation plans"
            items={[
              {
                title: "Guided plan",
                description: "Best for broad audiences and unfamiliar workflows.",
                selected: selectedPlan === "guided",
                recommended: true,
                facts: [
                  { label: "Density", value: "Comfortable" },
                  { label: "Review", value: "Step by step" }
                ],
                action: <Button onClick={() => setSelectedPlan("guided")}>Choose guided</Button>
              },
              {
                title: "Expert plan",
                description: "Use when the same person repeats the task all day.",
                selected: selectedPlan === "expert",
                facts: [
                  { label: "Density", value: "Compact" },
                  { label: "Review", value: "Side by side" }
                ],
                action: <Button onClick={() => setSelectedPlan("expert")}>Choose expert</Button>
              }
            ]}
          />
          <ChangeReview
            title="Changes before saving"
            description="Review screens show what changes, not just that something will change."
            changes={[
              {
                label: "Plan",
                before: selectedPlan === "guided" ? "Expert" : "Guided",
                after: selectedPlan === "guided" ? "Guided" : "Expert"
              },
              {
                label: "Accent",
                before: "Default blue",
                after: accent === "#006adc" ? "Clear blue" : accent === "#b25400" ? "Amber" : "Green"
              },
              {
                label: "Async space",
                before: reserveSpace ? "Not enforced" : "Enforced",
                after: reserveSpace ? "Enforced" : "Not enforced"
              }
            ]}
          />
          <HelpHint label="Why this review step?" title="Review is part of the action">
            <p>
              A good review step reduces surprise. It explains the consequence in plain language and keeps the final
              action specific.
            </p>
          </HelpHint>
        </section>

        <section className="demo-wide-panel" aria-labelledby="recovery-patterns-title">
          <div>
            <h2 id="recovery-patterns-title">Recovery patterns</h2>
            <p>Long-running work, failures, and reversals are visible and specific instead of vague loading theater.</p>
          </div>
          <JobQueue
            title="Generation queue"
            description="Every item keeps its place, even when the status changes."
            jobs={[
              { title: "Create settings screen", description: "Layout and form states", status: "done" },
              { title: "Check contrast", description: "Token pair validation", status: "running", progress: 64 },
              { title: "Publish package", description: "Waits until review is complete", status: "queued" }
            ]}
          />
          <RetryPanel
            title="Could not sync package metadata"
            message="The registry did not respond. Your local changes are still available."
            retryLabel={retryCount ? "Try sync again" : "Retry sync"}
            onRetry={() => {
              setRetryCount((count) => count + 1);
              addToast({ title: "Sync retried", message: "The retry happened in place." });
            }}
            secondaryAction={{
              label: "Keep working locally",
              onClick: () => addToast({ title: "Working locally" })
            }}
          />
          {undoVisible ? (
            <UndoNotice
              title="Project archived"
              message="The project is hidden from active lists, but this action can still be reversed."
              onUndo={() => {
                setUndoVisible(false);
                addToast({ title: "Archive undone", tone: "success" });
              }}
              onDismiss={() => setUndoVisible(false)}
            />
          ) : (
            <StatusBanner
              title="Undo resolved"
              message="The recovery surface leaves the layout stable after the user responds."
              tone="success"
            />
          )}
          <ActivityLog
            title="Recent activity"
            items={[
              { title: "Contrast check started", description: "The running job is visible in the queue.", time: "Now", tone: "warning" },
              { title: "Settings screen generated", description: "The page kept one primary action.", time: "2 min ago", tone: "success" },
              { title: "Metadata sync failed", description: "A retry path is available without losing context.", time: "5 min ago", tone: "danger" }
            ]}
          />
          <ContextActions
            label="Undo toast example"
            subject="Toast actions are reserved for quick reversals, not primary workflows."
            actions={[
              {
                label: "Archive with toast",
                onSelect: () =>
                  addToast({
                    title: "Project archived",
                    message: "You can reverse this immediately.",
                    action: {
                      label: "Undo archive",
                      onClick: () => addToast({ title: "Archive undone", tone: "success" })
                    }
                  })
              }
            ]}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="trust-patterns-title">
          <div>
            <h2 id="trust-patterns-title">Trust patterns</h2>
            <p>Permission, consent, and data use are stated plainly so the interface stays honest under pressure.</p>
          </div>
          <RequirementList
            title="Before publishing"
            description="Requirements are visible and testable, not hidden until submit."
            requirements={[
              { label: "Readable contrast", description: "Text and controls pass the project threshold.", met: true },
              { label: "Privacy copy reviewed", description: "Someone must confirm the data-use language.", met: consent.terms },
              { label: "Export destination chosen", description: "Publishing needs a destination before it can run.", met: false }
            ]}
          />
          <PermissionPanel
            title="Allow project export?"
            message="Export needs access only to the selected project. Nothing else is read."
            permissions={[
              { label: "Selected project files", reason: "Used to create the export bundle." },
              { label: "Export destination", reason: "Used to save the bundle where you choose." }
            ]}
            grantLabel="Allow export"
            onGrant={() => addToast({ title: "Export allowed", tone: "success" })}
            denyLabel="Keep local"
            onDeny={() => addToast({ title: "Kept local" })}
          />
          <ConsentPanel
            title="Consent choices"
            description="Required and optional choices are separate, with no pretense that optional means required."
            items={[
              {
                id: "terms",
                label: "I understand what will be exported",
                description: "Required because the action moves project data out of the workspace.",
                checked: consent.terms,
                required: true
              },
              {
                id: "training",
                label: "Use anonymized patterns to improve recommendations",
                description: "Optional. The product must still work if this is off.",
                checked: consent.training
              },
              {
                id: "updates",
                label: "Send product update emails",
                description: "Optional messages about library changes and releases.",
                checked: consent.updates
              }
            ]}
            onItemChange={(id, checked) => setConsent((current) => ({ ...current, [id]: checked }))}
          />
          <DataUseList
            title="Data use"
            description="People should be able to inspect what is collected, why, and for how long."
            items={[
              { data: "Project name", purpose: "Labels the export and activity log.", retention: "Until project deletion" },
              { data: "Selected files", purpose: "Creates the export bundle.", retention: "Not stored after export" },
              { data: "Consent choices", purpose: "Records what the user allowed.", retention: "Until changed" }
            ]}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="list-patterns-title">
          <div>
            <h2 id="list-patterns-title">List patterns</h2>
            <p>Selection, sorting, and filters stay visible so list tools do not become guessing games.</p>
          </div>
          <FilterSummary
            filters={activeListFilters}
            onRemove={(id) => setActiveListFilters((current) => current.filter((filter) => filter.id !== id))}
            onClearAll={() => setActiveListFilters([])}
          />
          <SortControl
            label="Sort projects"
            value={sortOrder}
            onValueChange={setSortOrder}
            options={[
              { value: "recent", label: "Most recent first" },
              { value: "name", label: "Project name" },
              { value: "readiness", label: "Readiness score" }
            ]}
          />
          <SelectionList
            label="Projects"
            selectedIds={selectedProjects}
            onSelectionChange={setSelectedProjects}
            items={[
              {
                id: "kitchen",
                title: "Kitchen planner",
                description: "Ready to publish after privacy copy is reviewed.",
                meta: <Badge tone="success">Ready</Badge>
              },
              {
                id: "bathroom",
                title: "Bathroom estimator",
                description: "Needs contrast and empty-state review.",
                meta: <Badge tone="warning">Review</Badge>
              },
              {
                id: "studio",
                title: "Studio booking",
                description: "Waiting for export destination.",
                meta: <Badge>Queued</Badge>
              }
            ]}
          />
          <BulkActionBar
            selectedCount={selectedProjects.length}
            itemLabel="project"
            onClearSelection={() => setSelectedProjects([])}
            actions={[
              { label: "Archive selected", onSelect: () => addToast({ title: "Selected projects archived" }) },
              { label: "Export selected", onSelect: () => addToast({ title: "Export started" }) }
            ]}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="sharing-patterns-title">
          <div>
            <h2 id="sharing-patterns-title">Sharing patterns</h2>
            <p>Access, roles, and presence are visible so collaboration does not depend on hidden state.</p>
          </div>
          <ShareSummary
            title="Kitchen planner sharing"
            description="Only invited people can open this project."
            visibility="Private link"
            onCopyLink={() => addToast({ title: "Project link copied" })}
          />
          <PresenceList
            label="Working now"
            people={[
              { id: "avery", name: "Avery Stone", detail: "Editing copy" },
              { id: "mira", name: "Mira Patel", detail: "Reviewing states" }
            ]}
          />
          <InvitePanel
            title="Invite someone"
            description="Invites name the role before sending, so access is never implied."
            email={inviteEmail}
            role={inviteRole}
            roleOptions={roleOptions}
            onEmailChange={setInviteEmail}
            onRoleChange={setInviteRole}
            onInvite={() =>
              addToast({
                title: "Invite sent",
                message: `${inviteEmail} was invited as ${roleOptions.find((role) => role.value === inviteRole)?.label ?? inviteRole}.`
              })
            }
          />
          <AccessList
            title="People with access"
            description="Role changes are inline and the owner cannot be removed by accident."
            members={accessMembers}
            roleOptions={roleOptions}
            onRoleChange={(id, role) =>
              setAccessMembers((members) =>
                members.map((member) => (member.id === id ? { ...member, role } : member))
              )
            }
            onRemove={(id) => setAccessMembers((members) => members.filter((member) => member.id !== id))}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="quality-patterns-title">
          <div>
            <h2 id="quality-patterns-title">Quality patterns</h2>
            <p>Accessibility, contrast, shortcuts, and release readiness are product surfaces, not private notes.</p>
          </div>
          <QualityChecklist
            title="Accessibility checks"
            description="Checks are stated as observable behavior so they can be reviewed by humans and agents."
            items={[
              {
                label: "One primary action",
                description: "Only the sticky save action uses primary emphasis.",
                status: "pass"
              },
              {
                label: "Keyboard route",
                description: "Skip link and visible focus styles are present.",
                status: "pass"
              },
              {
                label: "Mobile density",
                description: "Full-page sections still need a focused mobile screenshot pass.",
                status: "review"
              }
            ]}
          />
          <ComparisonList
            label="Contrast samples"
            items={[
              {
                title: "Primary action",
                description: "Accent ink over accent background.",
                action: (
                  <ContrastPair
                    label="Clear blue action"
                    foreground="#ffffff"
                    background="#006adc"
                    ratio="5.5:1"
                    passes
                    sample="Save changes"
                  />
                )
              },
              {
                title: "Muted copy",
                description: "Body support text against the page background.",
                action: (
                  <ContrastPair
                    label="Muted support copy"
                    foreground="#55554d"
                    background="#f7f7f3"
                    ratio="6.8:1"
                    passes
                    sample="Clear enough to read"
                  />
                )
              }
            ]}
          />
          <ShortcutList
            title="Keyboard shortcuts"
            description="Shortcuts are visible support for expert tools, never the only path."
            shortcuts={[
              { action: "Save changes", description: "Same action as the visible save button.", keys: ["Ctrl", "S"] },
              { action: "Find command", description: "Opens command search when a tool has enough actions.", keys: ["Ctrl", "K"] },
              { action: "Close overlay", description: "Dismisses dialogs, menus, and popovers.", keys: ["Esc"] }
            ]}
          />
          <ReleaseGate
            title="Publish readiness"
            description="Publishing stays blocked until the visible checks are resolved."
            readiness={82}
            blockers={["Mobile screenshot pass needed", "Privacy copy needs approval"]}
            action={{
              label: "Publish library",
              onClick: () => addToast({ title: "Published" })
            }}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="ai-patterns-title">
          <div>
            <h2 id="ai-patterns-title">AI assistance patterns</h2>
            <p>Generated help shows suggestions, evidence, confidence, and review paths without pretending to be certainty.</p>
          </div>
          <ConfidencePanel
            title="Recommendation confidence"
            level="medium"
            reason="The recommendation matches the stated goal, but it has not been checked against a live user session."
            limits={["No analytics sample is attached", "Mobile behavior still needs a screenshot pass"]}
          />
          <SuggestionList
            title="Suggested changes"
            description="Every generated suggestion needs a clear accept or dismiss action."
            suggestions={aiSuggestions}
            onAccept={(id) => {
              setAiSuggestions((current) => current.filter((suggestion) => suggestion.id !== id));
              addToast({ title: "Suggestion accepted", message: "The change is now ready for review." });
            }}
            onDismiss={(id) => setAiSuggestions((current) => current.filter((suggestion) => suggestion.id !== id))}
          />
          <EvidenceList
            title="Evidence used"
            description="Claims stay attached to the information that supports them."
            evidence={[
              {
                title: "The screen has one visible primary action",
                detail: "Only the persistent save action uses primary emphasis.",
                source: "Local component audit",
                strength: "strong"
              },
              {
                title: "The loading region reserves dimensions",
                detail: "The skeleton width, text rows, and media slot keep the layout stable.",
                source: "Demo fixture",
                strength: "medium"
              }
            ]}
          />
          <HumanReviewPanel
            title="Needs human review"
            message="Use this when a generated recommendation changes consent, access, pricing, publishing, or destructive behavior."
            reviewer="Design owner reviews before release."
            action={{
              label: "Send for review",
              onClick: () => addToast({ title: "Sent for review", message: "The next action is now owned by a person." })
            }}
            secondaryAction={{
              label: "Mark not needed",
              onClick: () => addToast({ title: "Review skipped", message: "The decision is recorded in the activity log." })
            }}
          />
        </section>

        <section className="demo-wide-panel" aria-labelledby="coverage-patterns-title">
          <div>
            <h2 id="coverage-patterns-title">Coverage patterns</h2>
            <p>These fill common shadcn-style gaps while keeping native controls, disclosure, and destructive actions explicit.</p>
          </div>
          <FieldGroup
            legend="Composed inputs"
            description="Input groups keep prefixes and actions attached to the field without inventing a new mental model."
          >
            <FormField label="Budget" description="Prefix and suffix are part of the field, not loose text.">
              <InputGroup leading="$" trailing="USD">
                <Input inputMode="decimal" placeholder="1200" />
              </InputGroup>
            </FormField>
            <FormField label="Template type" description="Use the native control when a simple select is enough.">
              <NativeSelect value={starter} onChange={(event) => setStarter(event.currentTarget.value)}>
                <option value="workspace">Workspace</option>
                <option value="tokens">Tokens</option>
                <option value="patterns">Patterns</option>
              </NativeSelect>
            </FormField>
          </FieldGroup>
          <ItemGroup
            title="Reusable item rows"
            description="Rows expose media, content, metadata, and actions without turning every list into a custom card."
          >
            <Item
              media={<Avatar name="UI" size="md" />}
              title="Project defaults"
              description="One focused setup surface with stable supporting panels."
              meta={<Badge tone="success">Ready</Badge>}
              actions={<Button>Review</Button>}
              selected
            />
            <Item
              media={<Avatar name="QA" size="md" />}
              title="Release checks"
              description="Accessibility and robustness gates remain visible before publish."
              meta={<Badge tone="warning">Review</Badge>}
              actions={<Button>Open</Button>}
            />
          </ItemGroup>
          <Collapsible title="Advanced settings" description="Secondary detail stays available without stealing focus.">
            <p>
              Use collapsible detail for supporting configuration only. If the user must read it to finish the task,
              keep it visible instead.
            </p>
          </Collapsible>
          <Alert
            title="Destructive confirmation uses its own surface"
            tone="warning"
            action={<Button onClick={() => setAlertDialogOpen(true)}>Open alert dialog</Button>}
          >
            <p>The confirm action uses danger emphasis and names the consequence.</p>
          </Alert>
        </section>

        <section className="demo-wide-panel" aria-labelledby="layout-patterns-title">
          <div>
            <h2 id="layout-patterns-title">Layout patterns</h2>
            <p>Durable navigation, direction support, and resizing are available for expert tools without hiding labels.</p>
          </div>
          <SegmentedControl
            label="Text direction"
            value={direction}
            onValueChange={(value) => setDirection(value as "ltr" | "rtl")}
            items={[
              { value: "ltr", label: "Left to right" },
              { value: "rtl", label: "Right to left" }
            ]}
          />
          <ThemeScope direction={direction} className="demo-direction-preview">
            <ResizablePanels
              startLabel="Plan workspace"
              endLabel="Review sidebar"
              resizeLabel="Resize plan and review panels"
              start={
                <Prose dir="auto">
                  <h3>Kitchen plan</h3>
                  <p>
                    Resizing is reserved for expert tools where side-by-side work genuinely helps the task. On small
                    screens the panels stack instead of forcing a cramped handle.
                  </p>
                </Prose>
              }
              end={
                <Sidebar
                  title="Review"
                  description="Visible labels stay available."
                  items={[
                    { label: "Overview", description: "Main decision", current: true },
                    { label: "Rooms", description: "Space list" },
                    { label: "Costs", description: "Budget check" }
                  ]}
                  footer={<span dir="auto">No icon-only rail. No hidden navigation.</span>}
                />
              }
            />
          </ThemeScope>
        </section>

        <section className="demo-wide-panel" aria-labelledby="data-patterns-title">
          <div>
            <h2 id="data-patterns-title">Data patterns</h2>
            <p>Charts and tables carry exact values with the graphic, so data stays readable instead of becoming decoration.</p>
          </div>
          <div className="demo-chart-grid">
            <LineChart
              label="Readiness trend"
              points={[
                { label: "Mon", value: 62 },
                { label: "Tue", value: 70 },
                { label: "Wed", value: 74 },
                { label: "Thu", value: 82 }
              ]}
              max={100}
            />
            <AreaChart
              label="Resolved checks"
              points={[
                { label: "Start", value: 8 },
                { label: "Forms", value: 15 },
                { label: "Flows", value: 24 },
                { label: "Review", value: 31 }
              ]}
            />
          </div>
          <Table>
            <TableCaption>Low-level table primitives</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Primitive</TableHead>
                <TableHead>Use when</TableHead>
                <TableHead align="end">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell>Rows need custom structure but still need real table semantics.</TableCell>
                <TableCell align="end">
                  <Badge tone="success">Ready</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>DataTable</TableCell>
                <TableCell>Columns and row keys can be declared from data.</TableCell>
                <TableCell align="end">
                  <Badge tone="success">Ready</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <CodeBlock code={'import registry from "generous-ui/registry";'} language="ts" />
        </section>

        <section className="demo-wide-panel" aria-labelledby="registry-patterns-title">
          <div>
            <h2 id="registry-patterns-title">Registry</h2>
            <p>Choose the source you want to copy into an app, inspect the files, then run the add command.</p>
          </div>
          <div className="demo-registry-summary">
            <Stat label="Registry entries" value={registryComponents.length} description="Named exports available to add." />
            <Stat label="Type buckets" value={registryTypeRows.length} description="Grouped by job, not visual trend." />
          </div>
          <div className="demo-registry-tools">
            <FormField label="Search registry" description="Filter by component name before you add source.">
              <Input
                value={registryQuery}
                onChange={(event) => setRegistryQuery(event.currentTarget.value)}
                placeholder="Button"
              />
            </FormField>
            <FormField label="Component type" description="Narrow by the job the component does.">
              <NativeSelect value={registryType} onChange={(event) => setRegistryType(event.currentTarget.value)}>
                {registryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All types" : type}
                  </option>
                ))}
              </NativeSelect>
            </FormField>
          </div>
          <div className="demo-registry-browser">
            <div>
              <Table>
                <TableCaption>Registry coverage by type</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead align="end">Entries</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registryTypeRows.map((row) => (
                    <TableRow key={row.type}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell align="end">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="demo-registry-list" role="list" aria-label="Registry components">
                {visibleRegistryComponents.map((component) => (
                  <button
                    key={component.name}
                    type="button"
                    aria-pressed={component.name === selectedRegistryComponent.name}
                    onClick={() => setSelectedRegistryName(component.name)}
                  >
                    <span>
                      <strong>{component.name}</strong>
                      <small>{component.type}</small>
                    </span>
                    <Badge tone="neutral">
                      {registryDetailComponents.find((detail) => detail.name === component.name)?.closureWithCss.length ??
                        component.files.length}{" "}
                      files
                    </Badge>
                  </button>
                ))}
                {filteredRegistryComponents.length > visibleRegistryComponents.length ? (
                  <p>{filteredRegistryComponents.length - visibleRegistryComponents.length} more entries match this filter.</p>
                ) : null}
                {filteredRegistryComponents.length === 0 ? <p>No registry entries match this filter.</p> : null}
              </div>
            </div>
            <div className="demo-registry-detail">
              <DescriptionList
                items={[
                  { term: "Selected", detail: selectedRegistryComponent.name },
                  { term: "Type", detail: selectedRegistryComponent.type },
                  { term: "Direct files", detail: `${selectedRegistryFiles.length}` },
                  { term: "Copied with CSS", detail: `${selectedRegistryClosure.length}` },
                  { term: "Package imports", detail: selectedRegistryPackages.length ? selectedRegistryPackages.join(", ") : "none" },
                  {
                    term: "Type bucket",
                    detail: `${selectedTypeDetails.length} entries / ${selectedTypeClosure.length} files`
                  },
                  { term: "Full library", detail: `${registryDetailComponents.length} entries / ${allRegistryClosure.length} files` }
                ]}
              />
              <div className="demo-registry-package-list" aria-label="Package imports needed">
                {selectedRegistryPackages.length ? (
                  selectedRegistryPackages.map((packageName) => (
                    <Badge key={packageName} tone="accent">
                      {packageName}
                    </Badge>
                  ))
                ) : (
                  <Badge tone="neutral">no package imports</Badge>
                )}
              </div>
              <Table>
                <TableCaption>Direct registry files for {selectedRegistryComponent.name}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRegistryFiles.map((file) => (
                    <TableRow key={file}>
                      <TableCell>{file}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table>
                <TableCaption>Full copied closure with shared CSS</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRegistryClosure.map((file) => (
                    <TableRow key={file}>
                      <TableCell>{file}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CodeBlock code={registryFlowCommand} language="bash" />
            </div>
          </div>
        </section>

        <EmptyState
          icon={<Check aria-hidden="true" size={32} />}
          title="Nothing extra survived the cut"
          message="Empty states do a job: explain what happened and offer the next useful action."
          action={{
            label: "Create first item",
            variant: "secondary",
            onClick: () => addToast({ title: "Ready to create", message: "The primary action is explicit." })
          }}
        />

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Clear destructive flows"
          description="The close control is anchored, the copy is specific, and the action says what it does."
          footer={
            <>
              <Button onClick={() => setDialogOpen(false)}>Keep project</Button>
              <Button
                variant="danger"
                onClick={() => {
                  setDialogOpen(false);
                  addToast({
                    title: "Project removed",
                    message: "Undo would live here if the product supports it.",
                    tone: "danger"
                  });
                }}
              >
                Delete project
              </Button>
            </>
          }
        >
          <p>
            This pattern avoids vague confirmation labels and keeps routine dialog motion restrained.
          </p>
        </Dialog>
        <AlertDialog
          open={alertDialogOpen}
          onOpenChange={setAlertDialogOpen}
          title="Remove generated draft?"
          description="This cannot be undone from this demo."
          actionLabel="Remove draft"
          onConfirm={() => {
            setAlertDialogOpen(false);
            addToast({ title: "Draft removed", tone: "danger" });
          }}
        >
          <p>The draft, its suggestions, and its review notes will be removed from this workspace.</p>
        </AlertDialog>
      </PageShell>
    </ThemeScope>
  );
}

createRoot(document.getElementById("root")!).render(<Demo />);
