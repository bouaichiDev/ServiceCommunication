'use client';

import { useState, useCallback } from 'react';
import type {
  TableInfo,
  TableField,
  RuleDraft,
  CommunicationDefinition,
} from '../types';
import {
  fetchAvailableTables,
  fetchTableFields,
  fetchCommunications,
  createRule,
  validateRule,
} from '../api/rules.api';

export function useRuleActions() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [fields, setFields] = useState<TableField[]>([]);
  const [communications, setCommunications] = useState<CommunicationDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const loadTables = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAvailableTables();
      setTables(data);
    } catch (err) {
      console.error('Failed to load tables:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadFields = useCallback(async (tableName: string) => {
    if (!tableName) {
      setFields([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchTableFields(tableName);
      setFields(data);
    } catch (err) {
      console.error('Failed to load fields:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCommunications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCommunications();
      setCommunications(data);
    } catch (err) {
      console.error('Failed to load communications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validate = useCallback(async (draft: RuleDraft): Promise<boolean> => {
    const validationErrors = await validateRule(draft);
    setErrors(validationErrors);
    return validationErrors.length === 0;
  }, []);

  const submit = useCallback(async (draft: RuleDraft): Promise<string | null> => {
    setErrors([]);
    const isValid = await validate(draft);
    if (!isValid) return null;

    setIsSending(true);
    try {
      const result = await createRule(draft);
      return result.id;
    } catch (err) {
      console.error('Failed to create rule:', err);
      setErrors(['Échec de la création de la règle. Veuillez réessayer.']);
      return null;
    } finally {
      setIsSending(false);
    }
  }, [validate]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getCommunicationById = useCallback(
    (id: string) => communications.find((c) => c.id === id),
    [communications]
  );

  return {
    tables,
    fields,
    communications,
    isLoading,
    isSending,
    errors,
    loadTables,
    loadFields,
    loadCommunications,
    validate,
    submit,
    clearErrors,
    getCommunicationById,
  };
}

export type RuleActions = ReturnType<typeof useRuleActions>;
