'use client';

import { useEffect } from 'react';
import type { CampaignDraft, Recipient, ChannelType } from '../types';

interface StepSummaryProps {
  draft: CampaignDraft;
  recipients: Recipient[];
  isLoading: boolean;
  onLoadPreview: () => void;
}

const CHANNEL_LABELS: Record<ChannelType, string> = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  notification: 'Notification Push',
};

export function StepSummary({ draft, recipients, isLoading, onLoadPreview }: StepSummaryProps) {
  useEffect(() => {
    onLoadPreview();
  }, [onLoadPreview]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Révisez Votre Campagne</h3>
        <p className="text-secondary mb-4">
          Veuillez vérifier tous les détails avant d'envoyer votre campagne.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h4 className="font-medium text-secondary mb-2">Nom de la Campagne</h4>
          <p className="font-semibold">{draft.name || 'Campagne Sans Titre'}</p>
          {draft.description && (
            <p className="text-sm text-secondary mt-1">{draft.description}</p>
          )}
        </div>

        <div className="card p-4">
          <h4 className="font-medium text-secondary mb-2">Portée Cible</h4>
          <p className="font-semibold capitalize">{draft.target.scope.replace('_', ' ')}</p>
        </div>

        <div className="card p-4">
          <h4 className="font-medium text-secondary mb-2">Canaux</h4>
          <div className="flex flex-wrap gap-2">
            {draft.channels.map((ch) => (
              <span key={ch} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                {CHANNEL_LABELS[ch]}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h4 className="font-medium text-secondary mb-2">Planification</h4>
          <p className="font-semibold capitalize">{draft.schedule.type}</p>
          {draft.schedule.scheduledAt && (
            <p className="text-sm text-secondary">
              {new Date(draft.schedule.scheduledAt).toLocaleString()}
            </p>
          )}
          {draft.schedule.cronExpression && (
            <p className="text-sm font-mono text-secondary">{draft.schedule.cronExpression}</p>
          )}
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-3">Modèles Configurés</h4>
        <div className="space-y-3">
          {draft.templates.map((tpl) => (
            <div key={tpl.channel} className="p-3 bg-muted rounded-lg">
              <div className="font-medium">{CHANNEL_LABELS[tpl.channel]}</div>
              {tpl.subject && <div className="text-sm">Sujet : {tpl.subject}</div>}
              <div className="text-sm text-secondary truncate">{tpl.body}</div>
            </div>
          ))}
          {draft.templates.length === 0 && (
            <p className="text-secondary">Aucun modèle configuré</p>
          )}
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-medium text-secondary mb-3">
          Aperçu des Destinataires ({isLoading ? '...' : recipients.length})
        </h4>
        {isLoading ? (
          <div className="text-secondary">Chargement des destinataires...</div>
        ) : (
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Nom</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {recipients.slice(0, 10).map((r) => (
                  <tr key={r.id} className="border-b border-border">
                    <td className="py-2">{r.name}</td>
                    <td className="py-2">{r.email || '-'}</td>
                    <td className="py-2">{r.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recipients.length > 10 && (
              <p className="text-sm text-secondary mt-2">
                Et {recipients.length - 10} autres destinataires...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
