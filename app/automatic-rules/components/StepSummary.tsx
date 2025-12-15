'use client';

import type { RuleDraft, TableInfo, TableField, CommunicationDefinition } from '../types';

interface StepSummaryProps {
  draft: RuleDraft;
  tables: TableInfo[];
  fields: TableField[];
  communication: CommunicationDefinition | undefined;
}

const TRIGGER_EVENT_LABELS = {
  on_create: 'À la création',
  on_update: 'À la modification',
};

const SCHEDULE_TYPE_LABELS = {
  immediate: 'Immédiat',
  delayed: 'Différé',
  daily: 'Quotidien',
  monthly: 'Mensuel',
  cron: 'Expression Cron',
};

const OPERATOR_LABELS: Record<string, string> = {
  equals: '=',
  not_equals: '≠',
  contains: 'contient',
  is_null: 'est vide',
  is_not_null: 'n\'est pas vide',
  greater_than: '>',
  less_than: '<',
};

const CHANNEL_LABELS: Record<string, string> = {
  email: '📧 Email',
  sms: '📱 SMS',
  whatsapp: '💬 WhatsApp',
};

export function StepSummary({ draft, tables, fields, communication }: StepSummaryProps) {
  const tableName = tables.find((t) => t.name === draft.trigger.tableName)?.label || draft.trigger.tableName;
  const fieldLabel = (name: string) => fields.find((f) => f.name === name)?.label || name;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Résumé de la Règle</h3>
        <p className="text-secondary mb-4">
          Vérifiez tous les paramètres avant de créer la règle automatique.
        </p>
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-2">Informations Générales</h4>
        <div className="space-y-1">
          <p><strong>Nom :</strong> {draft.name || 'Non défini'}</p>
          {draft.description && <p><strong>Description :</strong> {draft.description}</p>}
          <p><strong>Statut :</strong> {draft.isActive ? '✅ Active' : '⏸️ Inactive'}</p>
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-2">🎯 Déclencheur</h4>
        <div className="space-y-1">
          <p><strong>Table :</strong> {tableName}</p>
          <p><strong>Événement :</strong> {TRIGGER_EVENT_LABELS[draft.trigger.event]}</p>
          {draft.trigger.fieldName && (
            <>
              <p><strong>Champ :</strong> {fieldLabel(draft.trigger.fieldName)}</p>
              <p>
                <strong>Transition :</strong>{' '}
                {draft.trigger.fromValue || 'N\'importe quelle valeur'} → {draft.trigger.toValue || 'N\'importe quelle valeur'}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-2">🔍 Conditions</h4>
        {draft.conditionGroup.conditions.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm">Logique : <strong>{draft.conditionGroup.logic}</strong></p>
            {draft.conditionGroup.conditions.map((c) => (
              <div key={c.id} className="p-2 bg-muted rounded text-sm">
                {fieldLabel(c.field)} {OPERATOR_LABELS[c.operator]} {c.value || ''}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary text-sm">Aucune condition (toujours déclenché)</p>
        )}
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-2">📨 Communication Liée</h4>
        {communication ? (
          <div className="space-y-2">
            <p><strong>{communication.name}</strong></p>
            <div className="flex flex-wrap gap-2">
              {communication.channels.map((ch) => (
                <span key={ch} className="px-2 py-1 bg-muted rounded text-xs">
                  {CHANNEL_LABELS[ch] || ch}
                </span>
              ))}
            </div>
            <p className="text-sm text-secondary">Sujet : {communication.subject}</p>
            {communication.attachments.length > 0 && (
              <p className="text-sm text-secondary">
                Pièces jointes : {communication.attachments.join(', ')}
              </p>
            )}
          </div>
        ) : (
          <p className="text-error text-sm">Aucune communication sélectionnée</p>
        )}
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-2">📅 Planification</h4>
        <p><strong>Type :</strong> {SCHEDULE_TYPE_LABELS[draft.schedule.type]}</p>
        {draft.schedule.delayMinutes && (
          <p className="text-sm mt-1">Délai : {draft.schedule.delayMinutes} minutes</p>
        )}
        {draft.schedule.scheduledTime && (
          <p className="text-sm mt-1">Heure : {draft.schedule.scheduledTime}</p>
        )}
        {draft.schedule.dayOfMonth && (
          <p className="text-sm mt-1">Jour du mois : {draft.schedule.dayOfMonth}</p>
        )}
        {draft.schedule.cronExpression && (
          <p className="text-sm mt-1 font-mono">Cron : {draft.schedule.cronExpression}</p>
        )}
        <p className="text-sm mt-1">Fuseau : {draft.schedule.timezone}</p>
      </div>
    </div>
  );
}
