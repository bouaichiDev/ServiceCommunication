'use client';

import { useEffect } from 'react';
import type { TargetSelection, TargetScope, SelectOption } from '../types';

interface StepTargetProps {
  target: TargetSelection;
  tenants: SelectOption[];
  clients: SelectOption[];
  roles: SelectOption[];
  isLoading: boolean;
  onTargetChange: (target: TargetSelection) => void;
  onLoadTenants: () => void;
  onLoadClients: (tenantId?: string) => void;
  onLoadRoles: () => void;
}

const SCOPE_OPTIONS: { value: TargetScope; label: string; description: string }[] = [
  { value: 'tenant', label: 'Locataire', description: 'Tous les utilisateurs des locataires sélectionnés' },
  { value: 'client', label: 'Client', description: 'Organisations clientes spécifiques' },
  { value: 'final_client', label: 'Client Final', description: 'Utilisateurs finaux / clients' },
  { value: 'staff', label: 'Personnel', description: 'Membres du personnel interne' },
  { value: 'role', label: 'Rôle', description: 'Utilisateurs avec des rôles spécifiques' },
];

export function StepTarget({
  target,
  tenants,
  clients,
  roles,
  isLoading,
  onTargetChange,
  onLoadTenants,
  onLoadClients,
  onLoadRoles,
}: StepTargetProps) {
  useEffect(() => {
    onLoadTenants();
    onLoadClients();
    onLoadRoles();
  }, [onLoadTenants, onLoadClients, onLoadRoles]);

  const handleScopeChange = (scope: TargetScope) => {
    onTargetChange({ ...target, scope });
  };

  const handleSelectionChange = (ids: string[]) => {
    const updated = { ...target };
    switch (target.scope) {
      case 'tenant':
        updated.tenantIds = ids;
        break;
      case 'client':
        updated.clientIds = ids;
        break;
      case 'final_client':
        updated.finalClientIds = ids;
        break;
      case 'staff':
        updated.staffIds = ids;
        break;
      case 'role':
        updated.roleIds = ids;
        break;
    }
    onTargetChange(updated);
  };

  const getCurrentOptions = (): SelectOption[] => {
    switch (target.scope) {
      case 'tenant':
        return tenants;
      case 'client':
      case 'final_client':
      case 'staff':
        return clients;
      case 'role':
        return roles;
      default:
        return [];
    }
  };

  const getCurrentSelection = (): string[] => {
    switch (target.scope) {
      case 'tenant':
        return target.tenantIds;
      case 'client':
        return target.clientIds;
      case 'final_client':
        return target.finalClientIds;
      case 'staff':
        return target.staffIds;
      case 'role':
        return target.roleIds;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sélectionner la Portée Cible</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCOPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleScopeChange(option.value)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                target.scope === option.value
                  ? 'border-primary bg-blue-50'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-secondary">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sélectionner les Destinataires</h3>
        {isLoading ? (
          <div className="text-secondary">Chargement des options...</div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-3">
            {getCurrentOptions().map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-2 hover:bg-muted rounded">
                <input
                  type="checkbox"
                  checked={getCurrentSelection().includes(option.value)}
                  onChange={(e) => {
                    const current = getCurrentSelection();
                    const updated = e.target.checked
                      ? [...current, option.value]
                      : current.filter((id) => id !== option.value);
                    handleSelectionChange(updated);
                  }}
                  className="w-4 h-4"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
