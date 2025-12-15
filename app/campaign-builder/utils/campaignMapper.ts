import type { CampaignDraft, ChannelTemplate } from '../types';

export interface CampaignPayload {
  name: string;
  description: string;
  target: {
    scope: string;
    ids: string[];
  };
  channels: string[];
  filters: {
    planned_only: boolean;
    date_range: {
      from: string | null;
      to: string | null;
    };
    attributes: Record<string, string>;
  };
  schedule: {
    type: string;
    scheduled_at: string | null;
    cron_expression: string | null;
    timezone: string;
  };
  templates: Array<{
    channel: string;
    template_id: string;
    subject?: string;
    body: string;
  }>;
}

function getTargetIds(draft: CampaignDraft): string[] {
  switch (draft.target.scope) {
    case 'tenant':
      return draft.target.tenantIds;
    case 'client':
      return draft.target.clientIds;
    case 'final_client':
      return draft.target.finalClientIds;
    case 'staff':
      return draft.target.staffIds;
    case 'role':
      return draft.target.roleIds;
    default:
      return [];
  }
}

export function mapDraftToPayload(draft: CampaignDraft): CampaignPayload {
  return {
    name: draft.name,
    description: draft.description,
    target: {
      scope: draft.target.scope,
      ids: getTargetIds(draft),
    },
    channels: draft.channels,
    filters: {
      planned_only: draft.filters.plannedOnly,
      date_range: {
        from: draft.filters.dateFrom,
        to: draft.filters.dateTo,
      },
      attributes: draft.filters.attributes,
    },
    schedule: {
      type: draft.schedule.type,
      scheduled_at: draft.schedule.scheduledAt,
      cron_expression: draft.schedule.cronExpression,
      timezone: draft.schedule.timezone,
    },
    templates: draft.templates.map((t: ChannelTemplate) => ({
      channel: t.channel,
      template_id: t.templateId,
      subject: t.subject,
      body: t.body,
    })),
  };
}

export function createEmptyDraft(): CampaignDraft {
  return {
    name: '',
    description: '',
    target: {
      scope: 'client',
      tenantIds: [],
      clientIds: [],
      finalClientIds: [],
      staffIds: [],
      roleIds: [],
    },
    channels: [],
    filters: {
      plannedOnly: false,
      dateFrom: null,
      dateTo: null,
      attributes: {},
    },
    schedule: {
      type: 'immediate',
      scheduledAt: null,
      cronExpression: null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    templates: [],
  };
}
