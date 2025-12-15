import type { CampaignDetails } from '../types';

const FAKE_CAMPAIGN: CampaignDetails = {
  id: '1',
  name: 'Campagne de Bienvenue T1',
  description: 'Campagne trimestrielle de bienvenue pour les nouveaux clients',
  status: 'sent',
  target: {
    scope: 'client',
    count: 1250,
    ids: ['c1', 'c2', 'c3'],
  },
  channels: [
    {
      type: 'email',
      templateName: 'Email de Bienvenue',
      sentCount: 1250,
      deliveredCount: 1180,
      failedCount: 70,
    },
    {
      type: 'sms',
      templateName: 'Alerte SMS',
      sentCount: 1250,
      deliveredCount: 1220,
      failedCount: 30,
    },
  ],
  schedule: {
    type: 'scheduled',
    scheduledAt: '2024-01-15T10:00:00Z',
    cronExpression: null,
    timezone: 'Europe/Paris',
    lastRunAt: '2024-01-15T10:00:00Z',
    nextRunAt: null,
  },
  recipients: [
    { id: 'r1', name: 'John Doe', email: 'john@example.com', status: 'delivered', sentAt: '2024-01-15T10:01:00Z' },
    { id: 'r2', name: 'Jane Smith', email: 'jane@example.com', status: 'delivered', sentAt: '2024-01-15T10:01:00Z' },
    { id: 'r3', name: 'Bob Wilson', email: 'bob@example.com', status: 'failed', error: 'Invalid email' },
    { id: 'r4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567893', status: 'delivered', sentAt: '2024-01-15T10:02:00Z' },
    { id: 'r5', name: 'Charlie Davis', email: 'charlie@example.com', status: 'pending' },
  ],
  createdAt: '2024-01-14T09:00:00Z',
  createdBy: 'Jean Directeur',
  updatedAt: '2024-01-15T10:30:00Z',
};

export async function fetchCampaignDetails(id: string): Promise<CampaignDetails> {
  await new Promise((r) => setTimeout(r, 500));
  console.log('Fetching campaign details for:', id);
  return { ...FAKE_CAMPAIGN, id };
}

export async function cancelCampaign(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  console.log('Cancelled campaign:', id);
}

export async function retryCampaign(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  console.log('Retrying campaign:', id);
}

export async function exportRecipients(id: string): Promise<Blob> {
  await new Promise((r) => setTimeout(r, 500));
  console.log('Exporting recipients for campaign:', id);
  const csv = 'name,email,status\nJohn Doe,john@example.com,delivered';
  return new Blob([csv], { type: 'text/csv' });
}
