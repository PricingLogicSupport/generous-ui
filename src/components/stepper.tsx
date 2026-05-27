import type { ReactNode } from "react";

export interface StepItem {
  title: string;
  description?: string;
  content?: ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="gui-stepper">
      {steps.map((step, index) => {
        const state = index < currentStep ? "complete" : index === currentStep ? "current" : "upcoming";
        return (
          <li key={step.title} data-state={state}>
            <span className="gui-step-marker">{index + 1}</span>
            <span className="gui-step-copy">
              <strong>{step.title}</strong>
              {step.description ? <small>{step.description}</small> : null}
              {step.content ? <span className="gui-step-content">{step.content}</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
