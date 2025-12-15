'use client';

import type { Communication, CommunicationStatus, ChannelType } from '../types';

interface CommunicationsTableProps {
  communications: Communication[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const STATUS_STYLES: Record<CommunicationStatus, string> = {
  draft: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-blue-100 text-blue-700',
  sending: 'bg-yellow-100 text-yellow-700',
  sent: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

const CHANNEL_ICONS: Record<ChannelType, string> = {
  email: '✉️',
  sms: '💬',
  whatsapp: '📱',
  notification: '🔔',
};

function formatDate(dateString: string | null): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function CommunicationsTable({
  communications,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: CommunicationsTableProps) {
  if (communications.length === 0) {
    return (
      <div className="text-center py-12 text-secondary">
        Aucune communication trouvée. Créez votre première campagne !
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-secondary">Nom</th>
            <th className="text-left py-3 px-4 font-medium text-secondary">Statut</th>
            <th className="text-left py-3 px-4 font-medium text-secondary">Canaux</th>
            <th className="text-left py-3 px-4 font-medium text-secondary">Destinataires</th>
            <th className="text-left py-3 px-4 font-medium text-secondary">Planifié</th>
            <th className="text-left py-3 px-4 font-medium text-secondary">Créé</th>
            <th className="text-right py-3 px-4 font-medium text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((comm) => (
            <tr key={comm.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-4">
                <button
                  onClick={() => onView(comm.id)}
                  className="font-medium text-primary hover:underline"
                >
                  {comm.name}
                </button>
                <div className="text-sm text-secondary">{comm.createdBy}</div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[comm.status]}`}>
                  {comm.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-1">
                  {comm.channels.map((ch) => (
                    <span key={ch} title={ch}>{CHANNEL_ICONS[ch]}</span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">{comm.recipientCount.toLocaleString()}</td>
              <td className="py-3 px-4 text-sm">{formatDate(comm.scheduledAt)}</td>
              <td className="py-3 px-4 text-sm">{formatDate(comm.createdAt)}</td>
              <td className="py-3 px-4">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(comm.id)} className="btn btn-outline text-sm py-1 px-2">
                    Modifier
                  </button>
                  <button onClick={() => onDuplicate(comm.id)} className="btn btn-outline text-sm py-1 px-2">
                    Copier
                  </button>
                  <button
                    onClick={() => onDelete(comm.id)}
                    className="btn btn-outline text-sm py-1 px-2 text-error hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
