'use client';

import { useState, useCallback } from 'react';
import type { 
  CampaignDraft, 
  WizardStep, 
  TargetSelection, 
  ChannelType, 
  FilterCriteria, 
  ScheduleConfig, 
  ChannelTemplate 
} from '../types';
import { WIZARD_STEPS } from '../types';
import { createEmptyDraft } from '../utils/campaignMapper';

interface UseCampaignStateReturn {
  draft: CampaignDraft;
  currentStep: WizardStep;
  stepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setTarget: (target: TargetSelection) => void;
  setChannels: (channels: ChannelType[]) => void;
  setFilters: (filters: FilterCriteria) => void;
  setSchedule: (schedule: ScheduleConfig) => void;
  setTemplates: (templates: ChannelTemplate[]) => void;
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetDraft: () => void;
}

export function useCampaignState(): UseCampaignStateReturn {
  const [draft, setDraft] = useState<CampaignDraft>(createEmptyDraft);
  const [currentStep, setCurrentStep] = useState<WizardStep>('target');

  const stepIndex = WIZARD_STEPS.indexOf(currentStep);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === WIZARD_STEPS.length - 1;

  const setName = useCallback((name: string) => {
    setDraft((prev) => ({ ...prev, name }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setDraft((prev) => ({ ...prev, description }));
  }, []);

  const setTarget = useCallback((target: TargetSelection) => {
    setDraft((prev) => ({ ...prev, target }));
  }, []);

  const setChannels = useCallback((channels: ChannelType[]) => {
    setDraft((prev) => ({ ...prev, channels }));
  }, []);

  const setFilters = useCallback((filters: FilterCriteria) => {
    setDraft((prev) => ({ ...prev, filters }));
  }, []);

  const setSchedule = useCallback((schedule: ScheduleConfig) => {
    setDraft((prev) => ({ ...prev, schedule }));
  }, []);

  const setTemplates = useCallback((templates: ChannelTemplate[]) => {
    setDraft((prev) => ({ ...prev, templates }));
  }, []);

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(WIZARD_STEPS[stepIndex + 1]);
    }
  }, [stepIndex, isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(WIZARD_STEPS[stepIndex - 1]);
    }
  }, [stepIndex, isFirstStep]);

  const resetDraft = useCallback(() => {
    setDraft(createEmptyDraft());
    setCurrentStep('target');
  }, []);

  return {
    draft,
    currentStep,
    stepIndex,
    isFirstStep,
    isLastStep,
    setName,
    setDescription,
    setTarget,
    setChannels,
    setFilters,
    setSchedule,
    setTemplates,
    goToStep,
    nextStep,
    prevStep,
    resetDraft,
  };
}
