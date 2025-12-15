'use client';

import { useEffect } from 'react';
import type { CommunicationDefinition } from '../types';

interface StepCommunicationSelectProps {
  selectedId: string;
  communications: CommunicationDefinition[];
  isLoading: boolean;
  onSelect: (id: string) => void;
  onLoadCommunications: () => void;
}

const CHANNEL_LABELS: Record<string, string> = {
  email: '📧 Email',
  sms: '📱 SMS',
  whatsapp: '💬 WhatsApp',
};

const RECIPIENT_LABELS: Record<string, string> = {
  final_client: 'Client Final',
  client_all: 'Tous les Clients',
  staff: 'Personnel',
  role: 'Par Rôle',
  manual: 'Manuel',
};

const FREQUENCY_LABELS: Record<string, string> = {
  once: 'Une fois',
  daily: 'Quotidien',
  weekly: 'Hebdomadaire',
  monthly: 'Mensuel',
};

export function StepCommunicationSelect({
  selectedId,
  communications,
  isLoading,
  onSelect,
  onLoadCommunications,
}: StepCommunicationSelectProps) {
  useEffect(() => {
    onLoadCommunications();
  }, [onLoadCommunications]);

  const selectedComm = communications.find((c) => c.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sélectionner une Communication</h3>
        <p className="text-secondary mb-4">
          Choisissez la communication existante qui sera envoyée lorsque la règle se déclenche.
          Les communications sont définies séparément dans le Campaign Builder.
        </p>
      </div>

      <div className="card p-4">
        <label className="label">Communication *</label>
        {isLoading && communications.length === 0 ? (
          <div className="text-secondary">Chargement des communications...</div>
        ) : (
          <select
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
            className="input"
          >
            <option value="">Sélectionner une communication...</option>
            {communications.map((comm) => (
              <option key={comm.id} value={comm.id}>
                {comm.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedComm && (
        <div className="card p-4 bg-muted/50 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">{selectedComm.name}</h4>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              Lecture seule
            </span>
          </div>

          {selectedComm.description && (
            <p className="text-secondary text-sm mb-4">{selectedComm.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-secondary mb-1">Canaux</div>
              <div className="flex flex-wrap gap-1">
                {selectedComm.channels.map((ch) => (
                  <span key={ch} className="px-2 py-1 bg-white rounded border text-xs">
                    {CHANNEL_LABELS[ch] || ch}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-secondary mb-1">Destinataires</div>
              <div className="font-medium">
                {RECIPIENT_LABELS[selectedComm.recipientType] || selectedComm.recipientType}
              </div>
              <div className="text-xs text-secondary">{selectedComm.recipientDetails}</div>
            </div>

            <div>
              <div className="text-secondary mb-1">Fréquence</div>
              <div className="font-medium">
                {FREQUENCY_LABELS[selectedComm.frequency] || selectedComm.frequency}
              </div>
            </div>

            <div>
              <div className="text-secondary mb-1">Pièces Jointes</div>
              {selectedComm.attachments.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedComm.attachments.map((att, i) => (
                    <span key={i} className="text-xs bg-white px-2 py-1 rounded border">
                      📎 {att}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-secondary">Aucune</span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-secondary text-sm mb-1">Sujet</div>
            <div className="font-medium">{selectedComm.subject}</div>
          </div>

          <div className="mt-3">
            <div className="text-secondary text-sm mb-1">Aperçu du Contenu</div>
            <div className="p-3 bg-white rounded border text-sm whitespace-pre-wrap">
              {selectedComm.bodyPreview}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-secondary">
            Créée le {new Date(selectedComm.createdAt).toLocaleDateString('fr-FR')} par {selectedComm.createdBy}
          </div>
        </div>
      )}

      {!selectedId && communications.length > 0 && (
        <div className="text-center py-8 text-secondary bg-muted rounded-lg">
          Sélectionnez une communication pour voir ses détails.
        </div>
      )}
    </div>
  );
}
