export type ChannelType = 'email' | 'sms' | 'whatsapp' | 'notification';

export type TargetScope = 'tenant' | 'client' | 'final_client' | 'staff' | 'role';

export type ScheduleType = 'immediate' | 'scheduled' | 'cron';

export type WizardStep = 'target' | 'channels' | 'filters' | 'schedule' | 'templates' | 'summary';

export interface TargetSelection {
  scope: TargetScope;
  tenantIds: string[];
  clientIds: string[];
  finalClientIds: string[];
  staffIds: string[];
  roleIds: string[];
}

export interface FilterCriteria {
  plannedOnly: boolean;
  dateFrom: string | null;
  dateTo: string | null;
  attributes: Record<string, string>;
}

export interface ScheduleConfig {
  type: ScheduleType;
  scheduledAt: string | null;
  cronExpression: string | null;
  timezone: string;
}

export interface ChannelTemplate {
  channel: ChannelType;
  templateId: string;
  subject?: string;
  body: string;
}

export interface CampaignDraft {
  name: string;
  description: string;
  target: TargetSelection;
  channels: ChannelType[];
  filters: FilterCriteria;
  schedule: ScheduleConfig;
  templates: ChannelTemplate[];
}

export interface Recipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: TargetScope;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface Template {
  id: string;
  name: string;
  channel: ChannelType;
  subject?: string;
  body: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  'target',
  'channels',
  'filters',
  'schedule',
  'templates',
  'summary',
];

export const STEP_LABELS: Record<WizardStep, string> = {
  target: 'Sélectionner la Cible',
  channels: 'Choisir les Canaux',
  filters: 'Appliquer les Filtres',
  schedule: 'Planification',
  templates: 'Modèles',
  summary: 'Révision & Envoi',
};
