'use client';

import type { CampaignRecipient } from '../types';

interface CampaignRecipientsProps {
  recipients: CampaignRecipient[];
  onExport: () => void;
}

const STATUS_STYLES = {
  pending: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

function formatDate(dateString?: string): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CampaignRecipients({ recipients, onExport }: CampaignRecipientsProps) {
  const statusCounts = recipients.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Destinataires ({recipients.length})</h3>
        <button onClick={onExport} className="btn btn-outline text-sm">
          Exporter CSV
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="text-sm">
            <span className={`px-2 py-1 rounded ${STATUS_STYLES[status as keyof typeof STATUS_STYLES]}`}>
              {status}: {count}
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3">Nom</th>
              <th className="text-left py-2 px-3">Email</th>
              <th className="text-left py-2 px-3">Téléphone</th>
              <th className="text-left py-2 px-3">Statut</th>
              <th className="text-left py-2 px-3">Envoyé Le</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr key={recipient.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-2 px-3 font-medium">{recipient.name}</td>
                <td className="py-2 px-3">{recipient.email || '-'}</td>
                <td className="py-2 px-3">{recipient.phone || '-'}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${STATUS_STYLES[recipient.status]}`}>
                    {recipient.status}
                  </span>
                  {recipient.error && (
                    <span className="ml-2 text-xs text-error" title={recipient.error}>
                      ⚠️
                    </span>
                  )}
                </td>
                <td className="py-2 px-3 text-secondary">{formatDate(recipient.sentAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
