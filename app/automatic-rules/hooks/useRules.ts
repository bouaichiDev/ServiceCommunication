'use client';

import { useState, useCallback, useEffect } from 'react';
import type { RuleListItem } from '../types';
import { getRules, toggleRuleStatus, deleteRule } from '../api/rules.api';

export function useRules() {
  const [rules, setRules] = useState<RuleListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRules = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRules();
      setRules(data);
    } catch (err) {
      console.error('Failed to load rules:', err);
      setError('Échec du chargement des règles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  const handleToggleStatus = useCallback(async (id: string) => {
    try {
      const updatedRule = await toggleRuleStatus(id);
      setRules((prev) =>
        prev.map((r) => (r.id === id ? updatedRule : r))
      );
    } catch (err) {
      console.error('Failed to toggle rule status:', err);
      setError('Échec de la modification du statut');
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await deleteRule(id);
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete rule:', err);
      setError('Échec de la suppression de la règle');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const activeCount = rules.filter((r) => r.isActive).length;
  const inactiveCount = rules.filter((r) => !r.isActive).length;

  return {
    rules,
    isLoading,
    error,
    activeCount,
    inactiveCount,
    loadRules,
    handleToggleStatus,
    handleDelete,
    clearError,
  };
}
