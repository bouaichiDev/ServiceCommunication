import type {
  TableInfo,
  TableField,
  RuleDraft,
  CommunicationDefinition,
  RuleListItem,
} from '../types';

// ============================================
// Fake Tables Data
// ============================================

const FAKE_TABLES: TableInfo[] = [
  { name: 'OT', label: 'Ordre de Travail', description: 'Table principale des ordres de travail' },
  { name: 'OTDetail', label: 'Détail OT', description: 'Lignes de détail des ordres de travail' },
  { name: 'OT_Packages', label: 'Colis OT', description: 'Colis associés aux ordres de travail' },
  { name: 'PLANS', label: 'Plans', description: 'Planification des livraisons' },
  { name: 'CLIENTS', label: 'Clients', description: 'Table des clients' },
  { name: 'STAFF', label: 'Personnel', description: 'Table du personnel' },
];

const FAKE_FIELDS: Record<string, TableField[]> = {
  OT: [
    { name: 'status', label: 'Statut', type: 'string', possibleValues: ['DRAFT', 'PLANNED', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'] },
    { name: 'delivery_date', label: 'Date de livraison', type: 'date' },
    { name: 'client_id', label: 'ID Client', type: 'string' },
    { name: 'priority', label: 'Priorité', type: 'number' },
    { name: 'is_urgent', label: 'Urgent', type: 'boolean' },
  ],
  OTDetail: [
    { name: 'quantity', label: 'Quantité', type: 'number' },
    { name: 'product_code', label: 'Code Produit', type: 'string' },
    { name: 'status', label: 'Statut', type: 'string', possibleValues: ['PENDING', 'PICKED', 'PACKED'] },
  ],
  OT_Packages: [
    { name: 'package_status', label: 'Statut Colis', type: 'string', possibleValues: ['CREATED', 'SHIPPED', 'DELIVERED'] },
    { name: 'weight', label: 'Poids', type: 'number' },
    { name: 'tracking_number', label: 'Numéro de suivi', type: 'string' },
  ],
  PLANS: [
    { name: 'plan_date', label: 'Date du plan', type: 'date' },
    { name: 'driver_id', label: 'ID Chauffeur', type: 'string' },
    { name: 'status', label: 'Statut', type: 'string', possibleValues: ['DRAFT', 'CONFIRMED', 'COMPLETED'] },
  ],
  CLIENTS: [
    { name: 'name', label: 'Nom', type: 'string' },
    { name: 'email', label: 'Email', type: 'string' },
    { name: 'is_active', label: 'Actif', type: 'boolean' },
  ],
  STAFF: [
    { name: 'name', label: 'Nom', type: 'string' },
    { name: 'role', label: 'Rôle', type: 'string' },
    { name: 'email', label: 'Email', type: 'string' },
  ],
};

// ============================================
// Fake Communications (existing definitions)
// ============================================

const FAKE_COMMUNICATIONS: CommunicationDefinition[] = [
  {
    id: 'comm1',
    name: 'Notification Livraison Planifiée',
    description: 'Informe le client que sa livraison est planifiée',
    channels: ['email', 'sms'],
    recipientType: 'final_client',
    recipientDetails: 'Client final lié à l\'OT',
    frequency: 'once',
    subject: 'Votre livraison est planifiée',
    bodyPreview: 'Bonjour {{client_name}}, votre commande sera livrée le {{delivery_date}}...',
    attachments: ['Bon de livraison'],
    createdAt: '2024-01-10T09:00:00Z',
    createdBy: 'Jean Directeur',
  },
  {
    id: 'comm2',
    name: 'Confirmation de Livraison',
    description: 'Confirme que la livraison a été effectuée',
    channels: ['email'],
    recipientType: 'final_client',
    recipientDetails: 'Client final lié à l\'OT',
    frequency: 'once',
    subject: 'Livraison effectuée',
    bodyPreview: 'Bonjour {{client_name}}, votre commande a été livrée avec succès...',
    attachments: ['Preuve de livraison', 'Facture'],
    createdAt: '2024-01-12T14:00:00Z',
    createdBy: 'Marie Admin',
  },
  {
    id: 'comm3',
    name: 'Alerte Retard Livraison',
    description: 'Alerte le gestionnaire en cas de retard',
    channels: ['email', 'whatsapp'],
    recipientType: 'role',
    recipientDetails: 'Gestionnaires',
    frequency: 'once',
    subject: 'Alerte: Retard de livraison',
    bodyPreview: 'Attention, l\'OT {{ot_id}} est en retard de livraison...',
    attachments: [],
    createdAt: '2024-01-15T10:00:00Z',
    createdBy: 'Admin Système',
  },
  {
    id: 'comm4',
    name: 'Rapport Quotidien',
    description: 'Rapport quotidien des opérations',
    channels: ['email'],
    recipientType: 'staff',
    recipientDetails: 'Tout le personnel',
    frequency: 'daily',
    subject: 'Rapport du {{date}}',
    bodyPreview: 'Voici le résumé des opérations du jour...',
    attachments: ['Rapport PDF'],
    createdAt: '2024-01-08T08:00:00Z',
    createdBy: 'Jean Directeur',
  },
];

// ============================================
// API Functions
// ============================================

export async function fetchAvailableTables(): Promise<TableInfo[]> {
  await new Promise((r) => setTimeout(r, 300));
  return FAKE_TABLES;
}

export async function fetchTableFields(tableName: string): Promise<TableField[]> {
  await new Promise((r) => setTimeout(r, 300));
  return FAKE_FIELDS[tableName] || [];
}

export async function fetchCommunications(): Promise<CommunicationDefinition[]> {
  await new Promise((r) => setTimeout(r, 400));
  return FAKE_COMMUNICATIONS;
}

export async function createRule(draft: RuleDraft): Promise<{ id: string }> {
  await new Promise((r) => setTimeout(r, 800));
  console.log('Creating automatic rule:', JSON.stringify(draft, null, 2));
  return { id: Date.now().toString() };
}

export async function validateRule(draft: RuleDraft): Promise<string[]> {
  const errors: string[] = [];
  if (!draft.name.trim()) errors.push('Le nom de la règle est requis');
  if (!draft.trigger.tableName) errors.push('Sélectionnez une table source');
  if (!draft.trigger.event) errors.push('Sélectionnez un type d\'événement');
  if (!draft.communicationId) errors.push('Sélectionnez une communication');
  return errors;
}

// ============================================
// Fake Rules Data
// ============================================

const FAKE_RULES: RuleListItem[] = [
  {
    id: 'rule1',
    name: 'Notification OT Planifié',
    isActive: true,
    trigger: {
      table: 'OT',
      event: 'update',
      field: 'status',
      fromValue: 'DRAFT',
      toValue: 'PLANNED',
    },
    linkedCommunication: {
      id: 'comm1',
      name: 'Notification Livraison Planifiée',
      channels: ['email', 'sms'],
    },
    schedule: { type: 'immediate' },
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'rule2',
    name: 'Confirmation Livraison Effectuée',
    isActive: true,
    trigger: {
      table: 'OT',
      event: 'update',
      field: 'status',
      toValue: 'DELIVERED',
    },
    linkedCommunication: {
      id: 'comm2',
      name: 'Confirmation de Livraison',
      channels: ['email'],
    },
    schedule: { type: 'delayed', expression: '15 min' },
    createdAt: '2024-01-16T14:00:00Z',
  },
  {
    id: 'rule3',
    name: 'Alerte Colis Expédié',
    isActive: false,
    trigger: {
      table: 'OT_Packages',
      event: 'update',
      field: 'package_status',
      toValue: 'SHIPPED',
    },
    linkedCommunication: {
      id: 'comm1',
      name: 'Notification Livraison Planifiée',
      channels: ['email', 'sms'],
    },
    schedule: { type: 'immediate' },
    createdAt: '2024-01-17T09:00:00Z',
  },
  {
    id: 'rule4',
    name: 'Rapport Quotidien Automatique',
    isActive: true,
    trigger: {
      table: 'PLANS',
      event: 'create',
    },
    linkedCommunication: {
      id: 'comm4',
      name: 'Rapport Quotidien',
      channels: ['email'],
    },
    schedule: { type: 'cron', expression: '0 18 * * *' },
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'rule5',
    name: 'Alerte Retard Livraison',
    isActive: true,
    trigger: {
      table: 'OT',
      event: 'update',
      field: 'status',
      toValue: 'CANCELLED',
    },
    linkedCommunication: {
      id: 'comm3',
      name: 'Alerte Retard Livraison',
      channels: ['email', 'whatsapp'],
    },
    schedule: { type: 'immediate' },
    createdAt: '2024-01-18T11:00:00Z',
  },
];

// ============================================
// Rules List API Functions
// ============================================

export async function getRules(): Promise<RuleListItem[]> {
  await new Promise((r) => setTimeout(r, 400));
  return [...FAKE_RULES];
}

export async function toggleRuleStatus(id: string): Promise<RuleListItem> {
  await new Promise((r) => setTimeout(r, 300));
  const rule = FAKE_RULES.find((r) => r.id === id);
  if (!rule) throw new Error('Rule not found');
  rule.isActive = !rule.isActive;
  return { ...rule };
}

export async function deleteRule(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 300));
  const index = FAKE_RULES.findIndex((r) => r.id === id);
  if (index !== -1) FAKE_RULES.splice(index, 1);
}

export async function getRuleById(id: string): Promise<RuleListItem | null> {
  await new Promise((r) => setTimeout(r, 300));
  return FAKE_RULES.find((r) => r.id === id) || null;
}
