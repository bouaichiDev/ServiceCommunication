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
    <div className="flex items-center justify-between mb-8">
      {WIZARD_STEPS.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = index < currentIndex;
        const isClickable = index <= currentIndex;

        return (
          <div key={step} className="flex items-center flex-1">
            <button
              onClick={() => isClickable && onStepClick(step)}
              disabled={!isClickable}
              className={`flex items-center gap-2 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-secondary'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span
                className={`hidden md:block text-sm ${
                  isActive ? 'font-semibold text-foreground' : 'text-secondary'
                }`}
              >
                {STEP_LABELS[step]}
              </span>
            </button>

            {index < WIZARD_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentIndex ? 'bg-green-500' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
