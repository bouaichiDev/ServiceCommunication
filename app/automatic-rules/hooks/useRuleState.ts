'use client';

import { useState, useCallback, useMemo } from 'react';
import type {
  WizardStep,
  RuleDraft,
  TriggerDefinition,
  ConditionGroup,
  ScheduleConfig,
  Condition,
} from '../types';
import { WIZARD_STEPS } from '../types';
import { createEmptyDraft } from '../utils/ruleMapper';

export function useRuleState() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('trigger');
  const [draft, setDraft] = useState<RuleDraft>(createEmptyDraft);

  // Step Navigation
  const currentStepIndex = useMemo(
    () => WIZARD_STEPS.indexOf(currentStep),
    [currentStep]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex + 1]);
    }
  }, [currentStepIndex, isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex - 1]);
    }
  }, [currentStepIndex, isFirstStep]);

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  // Draft Setters
  const setName = useCallback((name: string) => {
    setDraft((prev) => ({ ...prev, name }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setDraft((prev) => ({ ...prev, description }));
  }, []);

  const setTrigger = useCallback((trigger: TriggerDefinition) => {
    setDraft((prev) => ({ ...prev, trigger }));
  }, []);

  const setConditionGroup = useCallback((conditionGroup: ConditionGroup) => {
    setDraft((prev) => ({ ...prev, conditionGroup }));
  }, []);

  const addCondition = useCallback((condition: Condition) => {
    setDraft((prev) => ({
      ...prev,
      conditionGroup: {
        ...prev.conditionGroup,
        conditions: [...prev.conditionGroup.conditions, condition],
      },
    }));
  }, []);

  const updateCondition = useCallback((id: string, updates: Partial<Condition>) => {
    setDraft((prev) => ({
      ...prev,
      conditionGroup: {
        ...prev.conditionGroup,
        conditions: prev.conditionGroup.conditions.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      },
    }));
  }, []);

  const removeCondition = useCallback((id: string) => {
    setDraft((prev) => ({
      ...prev,
      conditionGroup: {
        ...prev.conditionGroup,
        conditions: prev.conditionGroup.conditions.filter((c) => c.id !== id),
      },
    }));
  }, []);

  const setCommunicationId = useCallback((communicationId: string) => {
    setDraft((prev) => ({ ...prev, communicationId }));
  }, []);

  const setSchedule = useCallback((schedule: ScheduleConfig) => {
    setDraft((prev) => ({ ...prev, schedule }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(createEmptyDraft());
    setCurrentStep('trigger');
  }, []);

  return {
    currentStep,
    draft,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    setName,
    setDescription,
    setTrigger,
    setConditionGroup,
    addCondition,
    updateCondition,
    removeCondition,
    setCommunicationId,
    setSchedule,
    resetDraft,
  };
}

export type RuleState = ReturnType<typeof useRuleState>;
