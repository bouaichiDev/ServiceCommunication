'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { RuleListItem } from '../../types';
import { getRuleById } from '../../api/rules.api';
import { RulesWizard } from '../../components/RulesWizard';

export function EditRuleClient() {
  const params = useParams();
  const router = useRouter();
  const [rule, setRule] = useState<RuleListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const ruleId = params.id as string;

  useEffect(() => {
    async function loadRule() {
      setIsLoading(true);
      const data = await getRuleById(ruleId);
      setRule(data);
      setIsLoading(false);
    }
    loadRule();
  }, [ruleId]);

  const handleComplete = (updatedRuleId: string) => {
    console.log('Rule updated:', updatedRuleId);
    router.push(`/automatic-rules/${ruleId}`);
  };

  const handleCancel = () => {
    router.push(`/automatic-rules/${ruleId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-secondary">Chargement...</div>
      </div>
    );
  }

  if (!rule) {
    return (
      <div className="p-6">
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold mb-2">Règle non trouvée</h2>
          <Link href="/automatic-rules" className="btn btn-primary mt-4">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href={`/automatic-rules/${ruleId}`} className="text-secondary hover:text-primary">
            ← Retour aux détails
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Modifier la Règle</h1>
        <p className="text-secondary">
          Modifiez les paramètres de la règle "{rule.name}".
        </p>
      </div>

      <RulesWizard
        onComplete={handleComplete}
        onCancel={handleCancel}
      />
    </div>
  );
}
