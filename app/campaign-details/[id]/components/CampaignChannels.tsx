'use client';

import type { CampaignChannel, ChannelType } from '../types';

interface CampaignChannelsProps {
  channels: CampaignChannel[];
}

const CHANNEL_LABELS: Record<ChannelType, string> = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  notification: 'Notification Push',
};

const CHANNEL_ICONS: Record<ChannelType, string> = {
  email: '✉️',
  sms: '💬',
  whatsapp: '📱',
  notification: '🔔',
};

function calculateDeliveryRate(delivered: number, sent: number): string {
  if (sent === 0) return '0%';
  return `${Math.round((delivered / sent) * 100)}%`;
}

export function CampaignChannels({ channels }: CampaignChannelsProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Performance des Canaux</h3>

      <div className="space-y-4">
        {channels.map((channel) => {
          const deliveryRate = calculateDeliveryRate(channel.deliveredCount, channel.sentCount);
          const progressWidth = channel.sentCount > 0 
            ? (channel.deliveredCount / channel.sentCount) * 100 
            : 0;

          return (
            <div key={channel.type} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{CHANNEL_ICONS[channel.type]}</span>
                  <div>
                    <div className="font-medium">{CHANNEL_LABELS[channel.type]}</div>
                    <div className="text-sm text-secondary">{channel.templateName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">{deliveryRate}</div>
                  <div className="text-sm text-secondary">Taux de Livraison</div>
                </div>
              </div>

              <div className="h-2 bg-border rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-medium">{channel.sentCount.toLocaleString()}</div>
                  <div className="text-secondary">Envoyés</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">
                    {channel.deliveredCount.toLocaleString()}
                  </div>
                  <div className="text-secondary">Livrés</div>
                </div>
                <div>
                  <div className="font-medium text-red-600">
                    {channel.failedCount.toLocaleString()}
                  </div>
                  <div className="text-secondary">Échecs</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
