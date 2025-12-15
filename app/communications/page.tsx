'use client';

import { useRouter } from 'next/navigation';
import { useCommunications } from './hooks/useCommunications';
import { CommunicationsTable } from './components/CommunicationsTable';
import { CommunicationsFilters } from './components/CommunicationsFilters';
import { Pagination } from './components/Pagination';

export default function CommunicationsPage() {
  const router = useRouter();
  const {
    communications,
    total,
    isLoading,
    error,
    filters,
    setStatusFilter,
    setChannelFilter,
    setSearch,
    setPage,
    handleDelete,
    handleDuplicate,
  } = useCommunications();

  const handleView = (id: string) => {
    router.push(`/campaign-details/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/campaign-builder?edit=${id}`);
  };

  const handleCreateNew = () => {
    router.push('/campaign-builder');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Communications</h1>
          <p className="text-secondary">Gérez vos campagnes et alertes</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary">
          + Nouvelle Campagne
        </button>
      </div>

      <div className="card p-4 mb-4">
        <CommunicationsFilters
          statusFilter={filters.status}
          channelFilter={filters.channel}
          search={filters.search || ''}
          onStatusChange={setStatusFilter}
          onChannelChange={setChannelFilter}
          onSearchChange={setSearch}
        />
      </div>

      <div className="card">
        {error && (
          <div className="p-4 bg-red-50 text-error border-b border-border">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 text-center text-secondary">Chargement...</div>
        ) : (
          <>
            <CommunicationsTable
              communications={communications}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
            <div className="px-4 border-t border-border">
              <Pagination
                currentPage={filters.page}
                totalItems={total}
                itemsPerPage={filters.limit}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
