import { Progress } from "./progress";
import { Badge } from "./badge";
import { cn } from "../lib/cn";

export type JobQueueStatus = "queued" | "running" | "done" | "failed";

export interface JobQueueItem {
  title: string;
  description?: string;
  status: JobQueueStatus;
  progress?: number;
}

export interface JobQueueProps {
  title: string;
  description?: string;
  jobs: JobQueueItem[];
  className?: string;
}

const toneByStatus: Record<JobQueueStatus, "neutral" | "success" | "warning" | "danger"> = {
  queued: "neutral",
  running: "warning",
  done: "success",
  failed: "danger"
};

const labelByStatus: Record<JobQueueStatus, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  failed: "Failed"
};

export function JobQueue({ title, description, jobs, className }: JobQueueProps) {
  return (
    <section className={cn("gui-job-queue", className)}>
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <ol>
        {jobs.map((job, index) => (
          <li key={`${job.title}-${index}`} data-status={job.status}>
            <div>
              <strong>{job.title}</strong>
              {job.description ? <p>{job.description}</p> : null}
            </div>
            <Badge tone={toneByStatus[job.status]}>{labelByStatus[job.status]}</Badge>
            {job.status === "running" && typeof job.progress === "number" ? (
              <Progress value={job.progress} label={`${job.title} progress`} />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
