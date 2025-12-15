export type CommunicationStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';

export type ChannelType = 'email' | 'sms' | 'whatsapp' | 'notification';

export type TargetScope = 'tenant' | 'client' | 'final_client' | 'staff' | 'role';

export interface Communication {
  id: string;
  name: string;
  status: CommunicationStatus;
  channels: ChannelType[];
  targetScope: TargetScope;
  recipientCount: number;
  scheduledAt: string | null;
  sentAt: string | null;
  createdAt: string;
  createdBy: string;
}

export interface CommunicationsFilters {
  status?: CommunicationStatus;
  channel?: ChannelType;
  search?: string;
  page: number;
  limit: number;
}

export interface CommunicationsResponse {
  data: Communication[];
  total: number;
  page: number;
  limit: number;
}
