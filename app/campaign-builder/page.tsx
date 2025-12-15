'use client';

import { useRouter } from 'next/navigation';
import { CampaignWizard } from './components/CampaignWizard';

export default function CampaignBuilderPage() {
  const router = useRouter();

  const handleComplete = (campaignId: string) => {
    router.push(`/campaign-details/${campaignId}`);
  };

  const handleCancel = () => {
    router.push('/communications');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Créer une Campagne</h1>
        <p className="text-secondary">Créez et envoyez des communications à votre audience</p>
      </div>

      <CampaignWizard onComplete={handleComplete} onCancel={handleCancel} />
    </div>
  );
}
