'use client';

import { useEffect } from 'react';
import type { ChannelType, ChannelTemplate, Template } from '../types';

interface StepTemplatesProps {
  selectedChannels: ChannelType[];
  templates: ChannelTemplate[];
  availableTemplates: Template[];
  isLoading: boolean;
  onTemplatesChange: (templates: ChannelTemplate[]) => void;
  onLoadTemplates: () => void;
}

const CHANNEL_LABELS: Record<ChannelType, string> = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  notification: 'Notification Push',
};

export function StepTemplates({
  selectedChannels,
  templates,
  availableTemplates,
  isLoading,
  onTemplatesChange,
  onLoadTemplates,
}: StepTemplatesProps) {
  useEffect(() => {
    onLoadTemplates();
  }, [onLoadTemplates]);

  const getTemplateForChannel = (channel: ChannelType): ChannelTemplate | undefined => {
    return templates.find((t) => t.channel === channel);
  };

  const handleTemplateSelect = (channel: ChannelType, templateId: string) => {
    const template = availableTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const existing = templates.filter((t) => t.channel !== channel);
    onTemplatesChange([
      ...existing,
      {
        channel,
        templateId: template.id,
        subject: template.subject,
        body: template.body,
      },
    ]);
  };

  const handleBodyChange = (channel: ChannelType, body: string) => {
    const updated = templates.map((t) =>
      t.channel === channel ? { ...t, body } : t
    );
    onTemplatesChange(updated);
  };

  const handleSubjectChange = (channel: ChannelType, subject: string) => {
    const updated = templates.map((t) =>
      t.channel === channel ? { ...t, subject } : t
    );
    onTemplatesChange(updated);
  };

  if (selectedChannels.length === 0) {
    return (
      <div className="text-center py-12 text-secondary">
        Veuillez sélectionner au moins un canal à l'étape précédente.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Configurer les Modèles</h3>
        <p className="text-secondary mb-4">
          Configurez les modèles de message pour chaque canal sélectionné.
        </p>
      </div>

      {isLoading ? (
        <div className="text-secondary">Chargement des modèles...</div>
      ) : (
        <div className="space-y-6">
          {selectedChannels.map((channel) => {
            const channelTemplates = availableTemplates.filter((t) => t.channel === channel);
            const currentTemplate = getTemplateForChannel(channel);

            return (
              <div key={channel} className="card p-4">
                <h4 className="font-semibold mb-4">Modèle {CHANNEL_LABELS[channel]}</h4>

                <div className="space-y-4">
                  <div>
                    <label className="label">Sélectionner un Modèle</label>
                    <select
                      value={currentTemplate?.templateId || ''}
                      onChange={(e) => handleTemplateSelect(channel, e.target.value)}
                      className="input"
                    >
                      <option value="">Choisir un modèle...</option>
                      {channelTemplates.map((tpl) => (
                        <option key={tpl.id} value={tpl.id}>
                          {tpl.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {currentTemplate && channel === 'email' && (
                    <div>
                      <label className="label">Sujet</label>
                      <input
                        type="text"
                        value={currentTemplate.subject || ''}
                        onChange={(e) => handleSubjectChange(channel, e.target.value)}
                        className="input"
                        placeholder="Sujet de l'email..."
                      />
                    </div>
                  )}

                  {currentTemplate && (
                    <div>
                      <label className="label">Corps du Message</label>
                      <textarea
                        value={currentTemplate.body}
                        onChange={(e) => handleBodyChange(channel, e.target.value)}
                        className="input min-h-[120px]"
                        placeholder="Entrez votre message..."
                      />
                      <div className="text-xs text-secondary mt-1">
                        Utilisez {'{{name}}'}, {'{{email}}'} pour la personnalisation
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
