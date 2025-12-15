'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCampaignDetails } from './hooks/useCampaignDetails';
import { CampaignInfo } from './components/CampaignInfo';
import { CampaignTargets } from './components/CampaignTargets';
import { CampaignChannels } from './components/CampaignChannels';
import { CampaignSchedule } from './components/CampaignSchedule';
import { CampaignRecipients } from './components/CampaignRecipients';

export function CampaignDetailClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    campaign,
    isLoading,
    error,
    handleCancel,
    handleRetry,
    handleExport,
  } = useCampaignDetails(id);

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center py-12 text-secondary">Chargement des détails de la campagne...</div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="card p-6 text-center">
          <div className="text-error mb-4">{error || 'Campagne non trouvée'}</div>
          <button onClick={() => router.push('/communications')} className="btn btn-primary">
            Retour aux Communications
          </button>
        </div>
      </div>
    );
  }

  const canCancel = campaign.status === 'scheduled' || campaign.status === 'sending';
  const canRetry = campaign.status === 'failed';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/communications')}
            className="btn btn-outline"
          >
            ← Retour
          </button>
          <h1 className="text-2xl font-bold">Détails de la Campagne</h1>
        </div>
        <div className="flex gap-2">
          {canCancel && (
            <button onClick={handleCancel} className="btn btn-outline text-error">
              Annuler la Campagne
            </button>
          )}
          {canRetry && (
            <button onClick={handleRetry} className="btn btn-primary">
              Réessayer les Échecs
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <CampaignInfo campaign={campaign} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CampaignTargets target={campaign.target} />
          <CampaignSchedule schedule={campaign.schedule} />
        </div>

        <CampaignChannels channels={campaign.channels} />

        <CampaignRecipients recipients={campaign.recipients} onExport={handleExport} />
      </div>
    </div>
  );
}
