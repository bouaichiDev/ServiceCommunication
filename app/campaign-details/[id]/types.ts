export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed' | 'cancelled';

export type ChannelType = 'email' | 'sms' | 'whatsapp' | 'notification';

export type TargetScope = 'tenant' | 'client' | 'final_client' | 'staff' | 'role';

export interface CampaignTarget {
  scope: TargetScope;
  count: number;
  ids: string[];
}

export interface CampaignChannel {
  type: ChannelType;
  templateName: string;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'cron';
  scheduledAt: string | null;
  cronExpression: string | null;
  timezone: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
}

export interface CampaignRecipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  error?: string;
}

export interface CampaignDetails {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  target: CampaignTarget;
  channels: CampaignChannel[];
  schedule: CampaignSchedule;
  recipients: CampaignRecipient[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}
