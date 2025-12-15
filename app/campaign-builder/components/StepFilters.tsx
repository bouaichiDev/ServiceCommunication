'use client';

import type { FilterCriteria } from '../types';

interface StepFiltersProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
}

export function StepFilters({ filters, onFiltersChange }: StepFiltersProps) {
  const handlePlannedOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, plannedOnly: checked });
  };

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value || null });
  };

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value || null });
  };

  const handleAttributeChange = (key: string, value: string) => {
    const attributes = { ...filters.attributes };
    if (value) {
      attributes[key] = value;
    } else {
      delete attributes[key];
    }
    onFiltersChange({ ...filters, attributes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Filtrer les Destinataires</h3>
        <p className="text-secondary mb-4">
          Affinez votre audience avec des filtres supplémentaires. Tous les filtres sont optionnels.
        </p>
      </div>

      <div className="card p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.plannedOnly}
            onChange={(e) => handlePlannedOnlyChange(e.target.checked)}
            className="w-5 h-5 rounded"
          />
          <div>
            <div className="font-medium">Destinataires Planifiés Uniquement</div>
            <div className="text-sm text-secondary">
              Inclure uniquement les destinataires avec des rendez-vous ou activités planifiés
            </div>
          </div>
        </label>
      </div>

      <div className="card p-4">
        <h4 className="font-medium mb-4">Filtre par Plage de Dates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Date de Début</label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleDateFromChange(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Date de Fin</label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleDateToChange(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h4 className="font-medium mb-4">Attributs Personnalisés</h4>
        <div className="space-y-4">
          <div>
            <label className="label">Région</label>
            <select
              value={filters.attributes['region'] || ''}
              onChange={(e) => handleAttributeChange('region', e.target.value)}
              className="input"
            >
              <option value="">Toutes les Régions</option>
              <option value="north">Nord</option>
              <option value="south">Sud</option>
              <option value="east">Est</option>
              <option value="west">Ouest</option>
            </select>
          </div>
          <div>
            <label className="label">Statut</label>
            <select
              value={filters.attributes['status'] || ''}
              onChange={(e) => handleAttributeChange('status', e.target.value)}
              className="input"
            >
              <option value="">Tous les Statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="text-sm text-secondary">
          <strong>Filtres Actifs :</strong>{' '}
          {filters.plannedOnly && <span className="mr-2">Planifiés Uniquement</span>}
          {filters.dateFrom && <span className="mr-2">De : {filters.dateFrom}</span>}
          {filters.dateTo && <span className="mr-2">À : {filters.dateTo}</span>}
          {Object.entries(filters.attributes).map(([k, v]) => (
            <span key={k} className="mr-2">{k}: {v}</span>
          ))}
          {!filters.plannedOnly && !filters.dateFrom && !filters.dateTo && 
           Object.keys(filters.attributes).length === 0 && 'Aucun'}
        </div>
      </div>
    </div>
  );
}
