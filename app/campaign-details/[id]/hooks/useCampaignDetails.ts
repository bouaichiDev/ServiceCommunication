'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CampaignDetails } from '../types';
import { fetchCampaignDetails, cancelCampaign, retryCampaign, exportRecipients } from '../api/campaignDetails.api';

interface UseCampaignDetailsReturn {
  campaign: CampaignDetails | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  handleCancel: () => Promise<void>;
  handleRetry: () => Promise<void>;
  handleExport: () => Promise<void>;
}

export function useCampaignDetails(id: string): UseCampaignDetailsReturn {
  const [campaign, setCampaign] = useState<CampaignDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaign = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCampaignDetails(id);
      setCampaign(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaign');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCampaign();
  }, [loadCampaign]);

  const handleCancel = useCallback(async () => {
    try {
      await cancelCampaign(id);
      await loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel');
    }
  }, [id, loadCampaign]);

  const handleRetry = useCallback(async () => {
    try {
      await retryCampaign(id);
      await loadCampaign();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retry');
    }
  }, [id, loadCampaign]);

  const handleExport = useCallback(async () => {
    try {
      const blob = await exportRecipients(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `campaign-${id}-recipients.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export');
    }
  }, [id]);

  return {
    campaign,
    isLoading,
    error,
    refresh: loadCampaign,
    handleCancel,
    handleRetry,
    handleExport,
  };
}
