'use client';

import type { ScheduleConfig, ScheduleType } from '../types';

interface StepScheduleProps {
  schedule: ScheduleConfig;
  onScheduleChange: (schedule: ScheduleConfig) => void;
}

interface ScheduleOption {
  value: ScheduleType;
  label: string;
  description: string;
}

const SCHEDULE_OPTIONS: ScheduleOption[] = [
  {
    value: 'immediate',
    label: 'Envoyer Immédiatement',
    description: 'La campagne sera envoyée dès que vous confirmez',
  },
  {
    value: 'scheduled',
    label: 'Planifier pour Plus Tard',
    description: 'Choisissez une date et heure spécifiques pour l\'envoi',
  },
  {
    value: 'cron',
    label: 'Planification Récurrente',
    description: 'Configurez une campagne récurrente avec une expression cron',
  },
];

const COMMON_CRON_PRESETS = [
  { label: 'Quotidien à 9h', value: '0 9 * * *' },
  { label: 'Hebdomadaire le Lundi', value: '0 9 * * 1' },
  { label: 'Mensuel le 1er', value: '0 9 1 * *' },
  { label: 'Toutes les Heures', value: '0 * * * *' },
];

export function StepSchedule({ schedule, onScheduleChange }: StepScheduleProps) {
  const handleTypeChange = (type: ScheduleType) => {
    onScheduleChange({
      ...schedule,
      type,
      scheduledAt: type === 'scheduled' ? schedule.scheduledAt : null,
      cronExpression: type === 'cron' ? schedule.cronExpression : null,
    });
  };

  const handleScheduledAtChange = (value: string) => {
    onScheduleChange({ ...schedule, scheduledAt: value || null });
  };

  const handleCronChange = (value: string) => {
    onScheduleChange({ ...schedule, cronExpression: value || null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Planifier Votre Campagne</h3>
        <p className="text-secondary mb-4">
          Choisissez quand envoyer votre communication aux destinataires.
        </p>
      </div>

      <div className="space-y-3">
        {SCHEDULE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => handleTypeChange(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              schedule.type === option.value
                ? 'border-primary bg-blue-50'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  schedule.type === option.value ? 'border-primary bg-primary' : 'border-border'
                }`}
              >
                {schedule.type === option.value && <span className="text-white text-xs">✓</span>}
              </div>
              <div>
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-secondary">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {schedule.type === 'scheduled' && (
        <div className="card p-4">
          <label className="label">Sélectionner Date & Heure</label>
          <input
            type="datetime-local"
            value={schedule.scheduledAt || ''}
            onChange={(e) => handleScheduledAtChange(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="input"
          />
        </div>
      )}

      {schedule.type === 'cron' && (
        <div className="card p-4 space-y-4">
          <div>
            <label className="label">Expression Cron</label>
            <input
              type="text"
              value={schedule.cronExpression || ''}
              onChange={(e) => handleCronChange(e.target.value)}
              placeholder="0 9 * * *"
              className="input font-mono"
            />
          </div>
          <div>
            <div className="text-sm text-secondary mb-2">Préréglages Rapides :</div>
            <div className="flex flex-wrap gap-2">
              {COMMON_CRON_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleCronChange(preset.value)}
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
