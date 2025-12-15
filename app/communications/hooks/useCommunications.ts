'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Communication, CommunicationsFilters, CommunicationStatus, ChannelType } from '../types';
import { fetchCommunications, deleteCommunication, duplicateCommunication } from '../api/communications.api';

interface UseCommunicationsReturn {
  communications: Communication[];
  total: number;
  isLoading: boolean;
  error: string | null;
  filters: CommunicationsFilters;
  setStatusFilter: (status: CommunicationStatus | undefined) => void;
  setChannelFilter: (channel: ChannelType | undefined) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  refresh: () => void;
  handleDelete: (id: string) => Promise<void>;
  handleDuplicate: (id: string) => Promise<void>;
}

export function useCommunications(): UseCommunicationsReturn {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CommunicationsFilters>({
    page: 1,
    limit: 10,
  });

  const loadCommunications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCommunications(filters);
      setCommunications(response.data);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load communications');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadCommunications();
  }, [loadCommunications]);

  const setStatusFilter = useCallback((status: CommunicationStatus | undefined) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }, []);

  const setChannelFilter = useCallback((channel: ChannelType | undefined) => {
    setFilters((prev) => ({ ...prev, channel, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search: search || undefined, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteCommunication(id);
      await loadCommunications();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }, [loadCommunications]);

  const handleDuplicate = useCallback(async (id: string) => {
    try {
      await duplicateCommunication(id);
      await loadCommunications();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate');
    }
  }, [loadCommunications]);

  return {
    communications,
    total,
    isLoading,
    error,
    filters,
    setStatusFilter,
    setChannelFilter,
    setSearch,
    setPage,
    refresh: loadCommunications,
    handleDelete,
    handleDuplicate,
  };
}
