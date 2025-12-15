'use client';

import type { CampaignSchedule as ScheduleType } from '../types';

interface CampaignScheduleProps {
  schedule: ScheduleType;
}

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

const SCHEDULE_TYPE_LABELS = {
  immediate: 'Immédiat',
  scheduled: 'Planifié',
  cron: 'Récurrent',
};

export function CampaignSchedule({ schedule }: CampaignScheduleProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Informations de Planification</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm text-secondary mb-1">Type de Planification</div>
          <div className="font-semibold">{SCHEDULE_TYPE_LABELS[schedule.type]}</div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm text-secondary mb-1">Fuseau Horaire</div>
          <div className="font-semibold">{schedule.timezone}</div>
        </div>

        {schedule.scheduledAt && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-secondary mb-1">Planifié Pour</div>
            <div className="font-semibold">{formatDate(schedule.scheduledAt)}</div>
          </div>
        )}

        {schedule.cronExpression && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-secondary mb-1">Expression Cron</div>
            <div className="font-mono font-semibold">{schedule.cronExpression}</div>
          </div>
        )}

        {schedule.lastRunAt && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-secondary mb-1">Dernière Exécution</div>
            <div className="font-semibold">{formatDate(schedule.lastRunAt)}</div>
          </div>
        )}

        {schedule.nextRunAt && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-secondary mb-1">Prochaine Exécution</div>
            <div className="font-semibold">{formatDate(schedule.nextRunAt)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
