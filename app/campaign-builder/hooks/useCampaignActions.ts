'use client';

import { useState, useCallback } from 'react';
import type { CampaignDraft, Recipient, SelectOption, Template, ChannelType } from '../types';
import { 
  fetchTenants, 
  fetchClients, 
  fetchRoles, 
  fetchTemplates, 
  previewRecipients, 
  createCampaign, 
  validateCampaign 
} from '../api/campaign.api';
import { mapDraftToPayload } from '../utils/campaignMapper';

interface UseCampaignActionsReturn {
  tenants: SelectOption[];
  clients: SelectOption[];
  roles: SelectOption[];
  templates: Template[];
  recipients: Recipient[];
  isLoading: boolean;
  isSending: boolean;
  errors: string[];
  loadTenants: () => Promise<void>;
  loadClients: (tenantId?: string) => Promise<void>;
  loadRoles: () => Promise<void>;
  loadTemplates: (channel?: ChannelType) => Promise<void>;
  loadRecipientPreview: (draft: CampaignDraft) => Promise<void>;
  submitCampaign: (draft: CampaignDraft) => Promise<string | null>;
  validate: (draft: CampaignDraft) => Promise<boolean>;
  clearErrors: () => void;
}

export function useCampaignActions(): UseCampaignActionsReturn {
  const [tenants, setTenants] = useState<SelectOption[]>([]);
  const [clients, setClients] = useState<SelectOption[]>([]);
  const [roles, setRoles] = useState<SelectOption[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const loadTenants = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTenants();
      setTenants(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadClients = useCallback(async (tenantId?: string) => {
    setIsLoading(true);
    try {
      const data = await fetchClients(tenantId);
      setClients(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchRoles();
      setRoles(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadTemplates = useCallback(async (channel?: ChannelType) => {
    setIsLoading(true);
    try {
      const data = await fetchTemplates(channel);
      setTemplates(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRecipientPreview = useCallback(async (draft: CampaignDraft) => {
    setIsLoading(true);
    try {
      const data = await previewRecipients(draft);
      setRecipients(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validate = useCallback(async (draft: CampaignDraft): Promise<boolean> => {
    const validationErrors = await validateCampaign(draft);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, []);

  const submitCampaign = useCallback(async (draft: CampaignDraft): Promise<string | null> => {
    const isValid = await validate(draft);
    if (!isValid) return null;

    setIsSending(true);
    try {
      const payload = mapDraftToPayload(draft);
      console.log('Submitting campaign payload:', payload);
      const result = await createCampaign(draft);
      return result.id;
    } catch (err) {
      setErrors([err instanceof Error ? err.message : 'Failed to create campaign']);
      return null;
    } finally {
      setIsSending(false);
    }
  }, [validate]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    tenants,
    clients,
    roles,
    templates,
    recipients,
    isLoading,
    isSending,
    errors,
    loadTenants,
    loadClients,
    loadRoles,
    loadTemplates,
    loadRecipientPreview,
    submitCampaign,
    validate,
    clearErrors,
  };
}
