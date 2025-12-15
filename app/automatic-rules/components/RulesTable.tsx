'use client';

import type { RuleListItem } from '../types';
import { RuleStatusBadge } from './RuleStatusBadge';
import { RuleActionsMenu } from './RuleActionsMenu';

interface RulesTableProps {
  rules: RuleListItem[];
  isLoading: boolean;
  onView: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CHANNEL_ICONS: Record<string, string> = {
  email: '📧',
  sms: '📱',
  whatsapp: '💬',
};

const SCHEDULE_LABELS: Record<string, string> = {
  immediate: 'Immédiat',
  delayed: 'Différé',
  cron: 'Planifié',
};

function formatTrigger(trigger: RuleListItem['trigger']): string {
  const event = trigger.event === 'create' ? 'Création' : 'Modification';
  let text = `${trigger.table} • ${event}`;
  if (trigger.field) {
    text += ` • ${trigger.field}`;
    if (trigger.fromValue || trigger.toValue) {
      text += `: ${trigger.fromValue || '*'} → ${trigger.toValue || '*'}`;
    }
  }
  return text;
}

export function RulesTable({
  rules,
  isLoading,
  onView,
  onToggleStatus,
  onEdit,
  onDelete,
}: RulesTableProps) {
  if (isLoading) {
    return (
      <div className="card p-8 text-center text-secondary">
        Chargement des règles...
      </div>
    );
  }

  if (rules.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="font-semibold mb-2">Aucune règle automatique</h3>
        <p className="text-secondary">
          Créez votre première règle pour automatiser l'envoi de communications.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
              Nom de la Règle
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
              Déclencheur
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
              Communication
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
              Planification
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
              Statut
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-secondary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rules.map((rule) => (
            <tr key={rule.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium">{rule.name}</div>
                <div className="text-xs text-secondary">
                  Créée le {new Date(rule.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm">{formatTrigger(rule.trigger)}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm font-medium">
                  {rule.linkedCommunication.name}
                </div>
                <div className="flex gap-1 mt-1">
                  {rule.linkedCommunication.channels.map((ch) => (
                    <span key={ch} title={ch} className="text-sm">
                      {CHANNEL_ICONS[ch] || ch}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="text-sm">
                  {SCHEDULE_LABELS[rule.schedule.type] || rule.schedule.type}
                </div>
                {rule.schedule.expression && (
                  <div className="text-xs text-secondary font-mono">
                    {rule.schedule.expression}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <RuleStatusBadge isActive={rule.isActive} />
              </td>
              <td className="px-4 py-3 text-right">
                <RuleActionsMenu
                  ruleId={rule.id}
                  isActive={rule.isActive}
                  onView={onView}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
