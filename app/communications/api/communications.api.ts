import type { Communication, CommunicationsFilters, CommunicationsResponse } from '../types';

const FAKE_COMMUNICATIONS: Communication[] = [
  {
    id: '1',
    name: 'Campagne de Bienvenue T1',
    status: 'sent',
    channels: ['email', 'sms'],
    targetScope: 'client',
    recipientCount: 1250,
    scheduledAt: null,
    sentAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-14T09:00:00Z',
    createdBy: 'Jean Directeur',
  },
  {
    id: '2',
    name: 'Newsletter Mensuelle',
    status: 'scheduled',
    channels: ['email'],
    targetScope: 'final_client',
    recipientCount: 5420,
    scheduledAt: '2024-02-01T08:00:00Z',
    sentAt: null,
    createdAt: '2024-01-20T14:00:00Z',
    createdBy: 'Marie Admin',
  },
  {
    id: '3',
    name: 'Rappel Formation Personnel',
    status: 'draft',
    channels: ['email', 'notification'],
    targetScope: 'staff',
    recipientCount: 85,
    scheduledAt: null,
    sentAt: null,
    createdAt: '2024-01-22T11:00:00Z',
    createdBy: 'Jean Directeur',
  },
  {
    id: '4',
    name: 'Alerte Promotion',
    status: 'sending',
    channels: ['sms', 'whatsapp'],
    targetScope: 'client',
    recipientCount: 3200,
    scheduledAt: null,
    sentAt: null,
    createdAt: '2024-01-23T16:00:00Z',
    createdBy: 'Équipe Marketing',
  },
  {
    id: '5',
    name: 'Avis Maintenance Système',
    status: 'failed',
    channels: ['email', 'sms', 'notification'],
    targetScope: 'tenant',
    recipientCount: 150,
    scheduledAt: '2024-01-10T22:00:00Z',
    sentAt: null,
    createdAt: '2024-01-09T10:00:00Z',
    createdBy: 'Admin Système',
  },
];

export async function fetchCommunications(
  filters: CommunicationsFilters
): Promise<CommunicationsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...FAKE_COMMUNICATIONS];

  if (filters.status) {
    filtered = filtered.filter((c) => c.status === filters.status);
  }

  if (filters.channel) {
    filtered = filtered.filter((c) => c.channels.includes(filters.channel!));
  }

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(search));
  }

  const start = (filters.page - 1) * filters.limit;
  const paginated = filtered.slice(start, start + filters.limit);

  return {
    data: paginated,
    total: filtered.length,
    page: filters.page,
    limit: filters.limit,
  };
}

export async function deleteCommunication(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`Deleted communication: ${id}`);
}

export async function duplicateCommunication(id: string): Promise<Communication> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const original = FAKE_COMMUNICATIONS.find((c) => c.id === id);
  if (!original) throw new Error('Communication not found');
  
  return {
    ...original,
    id: Date.now().toString(),
    name: `${original.name} (Copy)`,
    status: 'draft',
    sentAt: null,
    createdAt: new Date().toISOString(),
  };
}
