'use client';

import type { WizardStep } from '../types';
import { WIZARD_STEPS, STEP_LABELS } from '../types';

interface WizardStepperProps {
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
}

export function WizardStepper({ currentStep, onStepClick }: WizardStepperProps) {
  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="flex items-center flex-1">
              <button
                onClick={() => onStepClick(step)}
                className={`flex flex-col items-center gap-2 ${
                  isCompleted || isCurrent ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary text-white'
                      : 'bg-muted text-secondary'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span
                  className={`text-xs text-center max-w-[80px] ${
                    isCurrent ? 'font-medium text-primary' : 'text-secondary'
                  }`}
                >
                  {STEP_LABELS[step]}
                </span>
              </button>

              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    index < currentIndex ? 'bg-green-500' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
