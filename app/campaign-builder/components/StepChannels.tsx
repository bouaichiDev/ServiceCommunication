'use client';

import type { ChannelType } from '../types';

interface StepChannelsProps {
  selectedChannels: ChannelType[];
  onChannelsChange: (channels: ChannelType[]) => void;
}

interface ChannelOption {
  value: ChannelType;
  label: string;
  icon: string;
  description: string;
}

const CHANNEL_OPTIONS: ChannelOption[] = [
  {
    value: 'email',
    label: 'Email',
    icon: '✉️',
    description: 'Envoyez des emails HTML riches avec pièces jointes',
  },
  {
    value: 'sms',
    label: 'SMS',
    icon: '💬',
    description: 'Messages texte courts (160 caractères)',
  },
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    icon: '📱',
    description: 'Messagerie riche avec support média',
  },
  {
    value: 'notification',
    label: 'Notification Push',
    icon: '🔔',
    description: 'Notifications push in-app et mobile',
  },
];

export function StepChannels({ selectedChannels, onChannelsChange }: StepChannelsProps) {
  const toggleChannel = (channel: ChannelType) => {
    if (selectedChannels.includes(channel)) {
      onChannelsChange(selectedChannels.filter((c) => c !== channel));
    } else {
      onChannelsChange([...selectedChannels, channel]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sélectionner les Canaux de Communication</h3>
        <p className="text-secondary mb-4">
          Choisissez un ou plusieurs canaux pour atteindre votre audience. Chaque canal nécessitera son propre modèle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHANNEL_OPTIONS.map((channel) => {
          const isSelected = selectedChannels.includes(channel.value);
          return (
            <button
              key={channel.value}
              onClick={() => toggleChannel(channel.value)}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-blue-50 shadow-md'
                  : 'border-border hover:border-primary/50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{channel.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{channel.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary' : 'border-border'
                      }`}
                    >
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                  <p className="text-sm text-secondary mt-1">{channel.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedChannels.length > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <div className="text-sm font-medium mb-2">Canaux Sélectionnés :</div>
          <div className="flex flex-wrap gap-2">
            {selectedChannels.map((channel) => {
              const option = CHANNEL_OPTIONS.find((c) => c.value === channel);
              return (
                <span
                  key={channel}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {option?.icon} {option?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
