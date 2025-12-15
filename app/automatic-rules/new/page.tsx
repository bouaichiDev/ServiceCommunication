'use client';

import { useRouter } from 'next/navigation';
import { RulesWizard } from '../components/RulesWizard';

export default function NewRulePage() {
  const router = useRouter();

  const handleComplete = (ruleId: string) => {
    console.log('Rule created with ID:', ruleId);
    router.push('/automatic-rules');
  };

  const handleCancel = () => {
    router.push('/automatic-rules');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Créer une Règle Automatique</h1>
        <p className="text-secondary">
          Configurez une règle qui déclenche automatiquement une communication existante
          lors d'événements système.
        </p>
      </div>

      <RulesWizard onComplete={handleComplete} onCancel={handleCancel} />
    </div>
  );
}
