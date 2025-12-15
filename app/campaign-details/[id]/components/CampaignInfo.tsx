'use client';

import type { CampaignDetails, CampaignStatus } from '../types';

interface CampaignInfoProps {
  campaign: CampaignDetails;
}

const STATUS_STYLES: Record<CampaignStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-yellow-100 text-yellow-700',
  sent: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CampaignInfo({ campaign }: CampaignInfoProps) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">{campaign.name}</h2>
          {campaign.description && (
            <p className="text-secondary mt-1">{campaign.description}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLES[campaign.status]}`}>
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div>
          <div className="text-sm text-secondary">Créé Par</div>
          <div className="font-medium">{campaign.createdBy}</div>
        </div>
        <div>
          <div className="text-sm text-secondary">Créé Le</div>
          <div className="font-medium">{formatDate(campaign.createdAt)}</div>
        </div>
        <div>
          <div className="text-sm text-secondary">Dernière Mise à Jour</div>
          <div className="font-medium">{formatDate(campaign.updatedAt)}</div>
        </div>
        <div>
          <div className="text-sm text-secondary">Total Destinataires</div>
          <div className="font-medium">{campaign.target.count.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
