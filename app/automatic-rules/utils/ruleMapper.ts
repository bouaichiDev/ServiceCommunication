import type {
  RuleDraft,
  TriggerDefinition,
  ConditionGroup,
  ScheduleConfig,
  Condition,
} from '../types';

// ============================================
// Create Empty Draft
// ============================================

export function createEmptyDraft(): RuleDraft {
  return {
    name: '',
    description: '',
    trigger: {
      tableName: '',
      event: 'on_update',
      fieldName: undefined,
      fromValue: undefined,
      toValue: undefined,
    },
    conditionGroup: {
      logic: 'AND',
      conditions: [],
    },
    communicationId: '',
    schedule: {
      type: 'immediate',
      timezone: 'Europe/Paris',
    },
    isActive: true,
  };
}

// ============================================
// Create Empty Condition
// ============================================

export function createEmptyCondition(): Condition {
  return {
    id: `cond_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    field: '',
    operator: 'equals',
    value: '',
  };
}

// ============================================
// Map Draft to API Payload
// ============================================

export interface RulePayload {
  name: string;
  description: string;
  trigger: {
    table: string;
    event: string;
    field?: string;
    from_value?: string | null;
    to_value?: string | null;
  };
  conditions: {
    logic: string;
    rules: Array<{
      field: string;
      operator: string;
      value: string | null;
    }>;
  };
  communication_id: string;
  schedule: {
    type: string;
    delay_minutes?: number;
    scheduled_time?: string;
    day_of_month?: number;
    cron?: string;
    timezone: string;
  };
  is_active: boolean;
}

export function mapDraftToPayload(draft: RuleDraft): RulePayload {
  return {
    name: draft.name,
    description: draft.description,
    trigger: mapTrigger(draft.trigger),
    conditions: mapConditions(draft.conditionGroup),
    communication_id: draft.communicationId,
    schedule: mapSchedule(draft.schedule),
    is_active: draft.isActive,
  };
}

function mapTrigger(trigger: TriggerDefinition) {
  return {
    table: trigger.tableName,
    event: trigger.event,
    field: trigger.fieldName,
    from_value: trigger.fromValue || null,
    to_value: trigger.toValue || null,
  };
}

function mapConditions(group: ConditionGroup) {
  return {
    logic: group.logic,
    rules: group.conditions.map((c) => ({
      field: c.field,
      operator: c.operator,
      value: c.value || null,
    })),
  };
}

function mapSchedule(schedule: ScheduleConfig) {
  return {
    type: schedule.type,
    delay_minutes: schedule.delayMinutes,
    scheduled_time: schedule.scheduledTime,
    day_of_month: schedule.dayOfMonth,
    cron: schedule.cronExpression,
    timezone: schedule.timezone,
  };
}
