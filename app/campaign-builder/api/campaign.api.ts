import type { 
  CampaignDraft, 
  Recipient, 
  SelectOption, 
  Template, 
  ChannelType 
} from '../types';

const FAKE_TENANTS: SelectOption[] = [
  { value: 't1', label: 'Société Acme' },
  { value: 't2', label: 'Industries Globales' },
  { value: 't3', label: 'Solutions Tech SARL' },
];

const FAKE_CLIENTS: SelectOption[] = [
  { value: 'c1', label: 'Client Alpha' },
  { value: 'c2', label: 'Client Bêta' },
  { value: 'c3', label: 'Client Gamma' },
  { value: 'c4', label: 'Client Delta' },
];

const FAKE_ROLES: SelectOption[] = [
  { value: 'r1', label: 'Administrateur' },
  { value: 'r2', label: 'Gestionnaire' },
  { value: 'r3', label: 'Membre du Personnel' },
  { value: 'r4', label: 'Lecteur' },
];

const FAKE_TEMPLATES: Template[] = [
  { id: 'tpl1', name: 'Email de Bienvenue', channel: 'email', subject: 'Bienvenue !', body: 'Bonjour {{name}}...' },
  { id: 'tpl2', name: 'Email de Rappel', channel: 'email', subject: 'Rappel', body: 'Ceci est un rappel...' },
  { id: 'tpl3', name: 'Alerte SMS', channel: 'sms', body: 'Alerte : {{message}}' },
  { id: 'tpl4', name: 'Bienvenue WhatsApp', channel: 'whatsapp', body: 'Bienvenue dans notre service !' },
  { id: 'tpl5', name: 'Notification Push', channel: 'notification', body: 'Vous avez un nouveau message' },
];

const FAKE_RECIPIENTS: Recipient[] = [
  { id: 'rec1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', type: 'client' },
  { id: 'rec2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', type: 'client' },
  { id: 'rec3', name: 'Bob Wilson', email: 'bob@example.com', phone: '+1234567892', type: 'staff' },
  { id: 'rec4', name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567893', type: 'final_client' },
  { id: 'rec5', name: 'Charlie Davis', email: 'charlie@example.com', type: 'tenant' },
];

export async function fetchTenants(): Promise<SelectOption[]> {
  await new Promise((r) => setTimeout(r, 300));
  return FAKE_TENANTS;
}

export async function fetchClients(tenantId?: string): Promise<SelectOption[]> {
  await new Promise((r) => setTimeout(r, 300));
  console.log('Fetching clients for tenant:', tenantId);
  return FAKE_CLIENTS;
}

export async function fetchRoles(): Promise<SelectOption[]> {
  await new Promise((r) => setTimeout(r, 200));
  return FAKE_ROLES;
}

export async function fetchTemplates(channel?: ChannelType): Promise<Template[]> {
  await new Promise((r) => setTimeout(r, 300));
  if (channel) {
    return FAKE_TEMPLATES.filter((t) => t.channel === channel);
  }
  return FAKE_TEMPLATES;
}

export async function previewRecipients(draft: CampaignDraft): Promise<Recipient[]> {
  await new Promise((r) => setTimeout(r, 500));
  console.log('Preview recipients for draft:', draft);
  return FAKE_RECIPIENTS.filter((r) => {
    if (draft.target.scope === r.type) return true;
    return draft.target.scope === 'tenant';
  });
}

export async function createCampaign(draft: CampaignDraft): Promise<{ id: string }> {
  await new Promise((r) => setTimeout(r, 800));
  console.log('Creating campaign with payload:', JSON.stringify(draft, null, 2));
  return { id: Date.now().toString() };
}

export async function validateCampaign(draft: CampaignDraft): Promise<string[]> {
  const errors: string[] = [];
  if (!draft.name.trim()) errors.push('Le nom de la campagne est requis');
  if (draft.channels.length === 0) errors.push('Sélectionnez au moins un canal');
  if (draft.templates.length === 0) errors.push('Configurez au moins un modèle');
  return errors;
}
