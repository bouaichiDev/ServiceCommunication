// ============================================
// Automatic Rules Types
// ============================================

export type WizardStep = 'trigger' | 'conditions' | 'communication' | 'schedule' | 'summary';

export const WIZARD_STEPS: WizardStep[] = [
  'trigger',
  'conditions',
  'communication',
  'schedule',
  'summary',
];

export const STEP_LABELS: Record<WizardStep, string> = {
  trigger: 'Déclencheur',
  conditions: 'Conditions',
  communication: 'Communication',
  schedule: 'Planification',
  summary: 'Résumé',
};

// ============================================
// Trigger Types
// ============================================

export type TriggerEvent = 'on_create' | 'on_update';

export interface TriggerDefinition {
  tableName: string;
  event: TriggerEvent;
  fieldName?: string;
  fromValue?: string;
  toValue?: string;
}

// ============================================
// Condition Types
// ============================================

export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'is_null' | 'is_not_null' | 'greater_than' | 'less_than';
export type LogicalOperator = 'AND' | 'OR';

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value?: string;
}

export interface ConditionGroup {
  logic: LogicalOperator;
  conditions: Condition[];
}

// ============================================
// Schedule Types
// ============================================

export type ScheduleType = 'immediate' | 'delayed' | 'daily' | 'monthly' | 'cron';

export interface ScheduleConfig {
  type: ScheduleType;
  delayMinutes?: number;
  scheduledTime?: string;
  dayOfMonth?: number;
  cronExpression?: string;
  timezone: string;
}

// ============================================
// Rule Draft (links trigger to existing communication)
// ============================================

export interface RuleDraft {
  name: string;
  description: string;
  trigger: TriggerDefinition;
  conditionGroup: ConditionGroup;
  communicationId: string;
  schedule: ScheduleConfig;
  isActive: boolean;
}

// ============================================
// API Types - Tables & Fields
// ============================================

export interface TableInfo {
  name: string;
  label: string;
  description: string;
}

export interface TableField {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  possibleValues?: string[];
}

// ============================================
// Communication Definition (read-only reference)
// ============================================

export type ChannelType = 'email' | 'sms' | 'whatsapp';
export type RecipientType = 'final_client' | 'client_all' | 'staff' | 'role' | 'manual';
export type FrequencyType = 'once' | 'daily' | 'weekly' | 'monthly';

export interface CommunicationDefinition {
  id: string;
  name: string;
  description: string;
  channels: ChannelType[];
  recipientType: RecipientType;
  recipientDetails: string;
  frequency: FrequencyType;
  subject: string;
  bodyPreview: string;
  attachments: string[];
  createdAt: string;
  createdBy: string;
}

// ============================================
// Rule List Item (for display in table)
// ============================================

export interface RuleListItem {
  id: string;
  name: string;
  isActive: boolean;
  trigger: {
    table: string;
    event: 'create' | 'update';
    field?: string;
    fromValue?: string;
    toValue?: string;
  };
  linkedCommunication: {
    id: string;
    name: string;
    channels: ChannelType[];
  };
  schedule: {
    type: 'immediate' | 'delayed' | 'cron';
    expression?: string;
  };
  createdAt: string;
}
