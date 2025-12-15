'use client';

import type { CommunicationStatus, ChannelType } from '../types';

interface CommunicationsFiltersProps {
  statusFilter?: CommunicationStatus;
  channelFilter?: ChannelType;
  search: string;
  onStatusChange: (status: CommunicationStatus | undefined) => void;
  onChannelChange: (channel: ChannelType | undefined) => void;
  onSearchChange: (search: string) => void;
}

const STATUSES: CommunicationStatus[] = ['draft', 'scheduled', 'sending', 'sent', 'failed'];
const CHANNELS: ChannelType[] = ['email', 'sms', 'whatsapp', 'notification'];

export function CommunicationsFilters({
  statusFilter,
  channelFilter,
  search,
  onStatusChange,
  onChannelChange,
  onSearchChange,
}: CommunicationsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Rechercher des communications..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <select
          value={statusFilter || ''}
          onChange={(e) => onStatusChange((e.target.value as CommunicationStatus) || undefined)}
          className="input min-w-[150px]"
        >
          <option value="">Tous les statuts</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={channelFilter || ''}
          onChange={(e) => onChannelChange((e.target.value as ChannelType) || undefined)}
          className="input min-w-[150px]"
        >
          <option value="">Tous les canaux</option>
          {CHANNELS.map((channel) => (
            <option key={channel} value={channel}>
              {channel.charAt(0).toUpperCase() + channel.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
