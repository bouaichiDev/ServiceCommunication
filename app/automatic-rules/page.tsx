'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRules } from './hooks/useRules';
import { RulesTable } from './components/RulesTable';

export default function AutomaticRulesPage() {
  const router = useRouter();
  const {
    rules,
    isLoading,
    error,
    activeCount,
    inactiveCount,
    handleToggleStatus,
    handleDelete,
    clearError,
  } = useRules();

  const handleView = (id: string) => {
    router.push(`/automatic-rules/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/automatic-rules/${id}/edit`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Règles Automatiques</h1>
          <p className="text-secondary">
            Gérez les règles qui déclenchent automatiquement l'envoi de communications.
          </p>
        </div>
        <Link href="/automatic-rules/new" className="btn btn-primary">
          + Nouvelle Règle
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-2xl font-bold">{rules.length}</div>
          <div className="text-sm text-secondary">Total des règles</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          <div className="text-sm text-secondary">Règles actives</div>
        </div>
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-500">{inactiveCount}</div>
          <div className="text-sm text-secondary">Règles inactives</div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
          <span className="text-error">{error}</span>
          <button onClick={clearError} className="text-error hover:text-red-700">
            ✕
          </button>
        </div>
      )}

      <RulesTable
        rules={rules}
        isLoading={isLoading}
        onView={handleView}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
