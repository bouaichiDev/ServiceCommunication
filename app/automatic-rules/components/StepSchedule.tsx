'use client';

import type { ScheduleConfig, ScheduleType } from '../types';

interface StepScheduleProps {
  schedule: ScheduleConfig;
  onScheduleChange: (schedule: ScheduleConfig) => void;
}

const SCHEDULE_TYPES: { value: ScheduleType; label: string; description: string }[] = [
  { value: 'immediate', label: 'Immédiat', description: 'Envoyer dès que l\'événement se produit' },
  { value: 'delayed', label: 'Différé', description: 'Envoyer après un délai défini' },
  { value: 'daily', label: 'Quotidien', description: 'Envoyer tous les jours à une heure fixe' },
  { value: 'monthly', label: 'Mensuel', description: 'Envoyer chaque mois à une date fixe' },
  { value: 'cron', label: 'Expression Cron', description: 'Planification personnalisée avec cron' },
];

const CRON_PRESETS = [
  { label: 'Tous les jours à 9h', value: '0 9 * * *' },
  { label: 'Tous les lundis à 9h', value: '0 9 * * 1' },
  { label: 'Le 1er du mois à 9h', value: '0 9 1 * *' },
  { label: 'Toutes les heures', value: '0 * * * *' },
];

const DELAY_OPTIONS = [
  { value: 5, label: '5 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 heure' },
  { value: 120, label: '2 heures' },
  { value: 1440, label: '24 heures' },
];

export function StepSchedule({ schedule, onScheduleChange }: StepScheduleProps) {
  const handleTypeChange = (type: ScheduleType) => {
    onScheduleChange({
      ...schedule,
      type,
      delayMinutes: type === 'delayed' ? schedule.delayMinutes || 15 : undefined,
      scheduledTime: ['daily', 'monthly'].includes(type) ? schedule.scheduledTime || '09:00' : undefined,
      dayOfMonth: type === 'monthly' ? schedule.dayOfMonth || 1 : undefined,
      cronExpression: type === 'cron' ? schedule.cronExpression : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Planifier l'Envoi</h3>
        <p className="text-secondary mb-4">
          Définissez quand la communication doit être envoyée après le déclenchement de la règle.
        </p>
      </div>

      <div className="card p-4">
        <label className="label">Type de Planification *</label>
        <div className="space-y-2">
          {SCHEDULE_TYPES.map((type) => (
            <label
              key={type.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                schedule.type === type.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="scheduleType"
                value={type.value}
                checked={schedule.type === type.value}
                onChange={() => handleTypeChange(type.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">{type.label}</div>
                <div className="text-sm text-secondary">{type.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {schedule.type === 'delayed' && (
        <div className="card p-4">
          <label className="label">Délai avant Envoi *</label>
          <select
            value={schedule.delayMinutes || 15}
            onChange={(e) => onScheduleChange({ ...schedule, delayMinutes: Number(e.target.value) })}
            className="input"
          >
            {DELAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-secondary mt-1">
            La communication sera envoyée après ce délai suivant le déclenchement.
          </p>
        </div>
      )}

      {schedule.type === 'daily' && (
        <div className="card p-4">
          <label className="label">Heure d'Envoi Quotidien *</label>
          <input
            type="time"
            value={schedule.scheduledTime || '09:00'}
            onChange={(e) => onScheduleChange({ ...schedule, scheduledTime: e.target.value })}
            className="input"
          />
          <p className="text-xs text-secondary mt-1">
            La communication sera envoyée tous les jours à cette heure.
          </p>
        </div>
      )}

      {schedule.type === 'monthly' && (
        <div className="card p-4 space-y-4">
          <div>
            <label className="label">Jour du Mois *</label>
            <select
              value={schedule.dayOfMonth || 1}
              onChange={(e) => onScheduleChange({ ...schedule, dayOfMonth: Number(e.target.value) })}
              className="input"
            >
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Heure d'Envoi *</label>
            <input
              type="time"
              value={schedule.scheduledTime || '09:00'}
              onChange={(e) => onScheduleChange({ ...schedule, scheduledTime: e.target.value })}
              className="input"
            />
          </div>
        </div>
      )}

      {schedule.type === 'cron' && (
        <div className="card p-4 space-y-4">
          <div>
            <label className="label">Expression Cron *</label>
            <input
              type="text"
              value={schedule.cronExpression || ''}
              onChange={(e) => onScheduleChange({ ...schedule, cronExpression: e.target.value })}
              placeholder="0 9 * * *"
              className="input font-mono"
            />
          </div>
          <div>
            <div className="text-sm text-secondary mb-2">Préréglages Rapides :</div>
            <div className="flex flex-wrap gap-2">
              {CRON_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onScheduleChange({ ...schedule, cronExpression: preset.value })}
                  className="btn btn-outline text-sm py-1"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-secondary">
        Fuseau Horaire : <strong>{schedule.timezone}</strong>
      </div>
    </div>
  );
}
