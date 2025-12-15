'use client';

import type { CampaignTarget, TargetScope } from '../types';

interface CampaignTargetsProps {
  target: CampaignTarget;
}

const SCOPE_LABELS: Record<TargetScope, string> = {
  tenant: 'Locataires',
  client: 'Clients',
  final_client: 'Clients Finaux',
  staff: 'Personnel',
  role: 'Rôles',
};

const SCOPE_ICONS: Record<TargetScope, string> = {
  tenant: '🏢',
  client: '👥',
  final_client: '👤',
  staff: '💼',
  role: '🔑',
};

export function CampaignTargets({ target }: CampaignTargetsProps) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Audience Cible</h3>

      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <span className="text-3xl">{SCOPE_ICONS[target.scope]}</span>
        <div>
          <div className="font-semibold text-lg">{SCOPE_LABELS[target.scope]}</div>
          <div className="text-secondary">
            {target.count.toLocaleString()} destinataires sélectionnés
          </div>
        </div>
      </div>

      {target.ids.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-secondary mb-2">IDs Sélectionnés :</div>
          <div className="flex flex-wrap gap-2">
            {target.ids.map((id) => (
              <span
                key={id}
                className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono"
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
