'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { RuleListItem } from '../types';
import { getRuleById, toggleRuleStatus } from '../api/rules.api';
import { RuleStatusBadge } from '../components/RuleStatusBadge';

const CHANNEL_ICONS: Record<string, string> = {
  email: '📧 Email',
  sms: '📱 SMS',
  whatsapp: '💬 WhatsApp',
};

const SCHEDULE_LABELS: Record<string, string> = {
  immediate: 'Immédiat',
  delayed: 'Différé',
  cron: 'Planifié (Cron)',
};

export function RuleDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [rule, setRule] = useState<RuleListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const ruleId = params.id as string;

  useEffect(() => {
    async function loadRule() {
      setIsLoading(true);
      const data = await getRuleById(ruleId);
      setRule(data);
      setIsLoading(false);
    }
    loadRule();
  }, [ruleId]);

  const handleToggleStatus = async () => {
    if (!rule) return;
    const updated = await toggleRuleStatus(rule.id);
    setRule(updated);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-secondary">Chargement...</div>
      </div>
    );
  }

  if (!rule) {
    return (
      <div className="p-6">
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold mb-2">Règle non trouvée</h2>
          <Link href="/automatic-rules" className="btn btn-primary mt-4">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href="/automatic-rules" className="text-secondary hover:text-primary">
              ← Retour
            </Link>
          </div>
          <h1 className="text-2xl font-bold">{rule.name}</h1>
          <p className="text-secondary">
            Créée le {new Date(rule.createdAt).toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleToggleStatus} className="btn btn-secondary">
            {rule.isActive ? '⏸️ Désactiver' : '▶️ Activer'}
          </button>
          <Link href={`/automatic-rules/${rule.id}/edit`} className="btn btn-primary">
            ✏️ Modifier
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="font-semibold text-secondary mb-3">Statut</h3>
          <RuleStatusBadge isActive={rule.isActive} />
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-secondary mb-3">Planification</h3>
          <div className="font-medium">{SCHEDULE_LABELS[rule.schedule.type]}</div>
          {rule.schedule.expression && (
            <div className="text-sm text-secondary font-mono mt-1">
              {rule.schedule.expression}
            </div>
          )}
        </div>
      </div>

      <div className="card p-4 mt-6">
        <h3 className="font-semibold text-secondary mb-3">🎯 Déclencheur</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-secondary">Table</div>
            <div className="font-medium">{rule.trigger.table}</div>
          </div>
          <div>
            <div className="text-sm text-secondary">Événement</div>
            <div className="font-medium">
              {rule.trigger.event === 'create' ? 'Création' : 'Modification'}
            </div>
          </div>
          {rule.trigger.field && (
            <>
              <div>
                <div className="text-sm text-secondary">Champ surveillé</div>
                <div className="font-medium">{rule.trigger.field}</div>
              </div>
              <div>
                <div className="text-sm text-secondary">Transition</div>
                <div className="font-medium">
                  {rule.trigger.fromValue || '*'} → {rule.trigger.toValue || '*'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card p-4 mt-6">
        <h3 className="font-semibold text-secondary mb-3">📨 Communication Liée</h3>
        <div className="font-medium text-lg mb-2">{rule.linkedCommunication.name}</div>
        <div className="flex gap-2">
          {rule.linkedCommunication.channels.map((ch) => (
            <span key={ch} className="px-3 py-1 bg-muted rounded-full text-sm">
              {CHANNEL_ICONS[ch] || ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
