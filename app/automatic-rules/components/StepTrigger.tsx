'use client';

import { useEffect } from 'react';
import type { TriggerDefinition, TriggerEvent, TableInfo, TableField } from '../types';

interface StepTriggerProps {
  trigger: TriggerDefinition;
  tables: TableInfo[];
  fields: TableField[];
  isLoading: boolean;
  onTriggerChange: (trigger: TriggerDefinition) => void;
  onLoadTables: () => void;
  onLoadFields: (tableName: string) => void;
}

const TRIGGER_EVENTS: { value: TriggerEvent; label: string; description: string }[] = [
  { value: 'on_create', label: 'À la création', description: 'Déclenché quand un enregistrement est créé' },
  { value: 'on_update', label: 'À la modification', description: 'Déclenché quand un enregistrement est modifié' },
];

export function StepTrigger({
  trigger,
  tables,
  fields,
  isLoading,
  onTriggerChange,
  onLoadTables,
  onLoadFields,
}: StepTriggerProps) {
  useEffect(() => {
    onLoadTables();
  }, [onLoadTables]);

  useEffect(() => {
    if (trigger.tableName) {
      onLoadFields(trigger.tableName);
    }
  }, [trigger.tableName, onLoadFields]);

  const handleTableChange = (tableName: string) => {
    onTriggerChange({
      ...trigger,
      tableName,
      fieldName: undefined,
      fromValue: undefined,
      toValue: undefined,
    });
  };

  const handleEventChange = (event: TriggerEvent) => {
    onTriggerChange({ ...trigger, event });
  };

  const selectedField = fields.find((f) => f.name === trigger.fieldName);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Configurer le Déclencheur</h3>
        <p className="text-secondary mb-4">
          Définissez sur quelle table et quel événement la règle doit se déclencher.
        </p>
      </div>

      <div className="card p-4">
        <label className="label">Table Source *</label>
        {isLoading && tables.length === 0 ? (
          <div className="text-secondary">Chargement des tables...</div>
        ) : (
          <select
            value={trigger.tableName}
            onChange={(e) => handleTableChange(e.target.value)}
            className="input"
          >
            <option value="">Sélectionner une table...</option>
            {tables.map((table) => (
              <option key={table.name} value={table.name}>
                {table.label} ({table.name})
              </option>
            ))}
          </select>
        )}
        {trigger.tableName && (
          <p className="text-xs text-secondary mt-1">
            {tables.find((t) => t.name === trigger.tableName)?.description}
          </p>
        )}
      </div>

      <div className="card p-4">
        <label className="label">Type d'Événement *</label>
        <div className="space-y-2">
          {TRIGGER_EVENTS.map((evt) => (
            <label
              key={evt.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                trigger.event === evt.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="triggerEvent"
                value={evt.value}
                checked={trigger.event === evt.value}
                onChange={() => handleEventChange(evt.value)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">{evt.label}</div>
                <div className="text-sm text-secondary">{evt.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {trigger.tableName && trigger.event === 'on_update' && (
        <div className="card p-4 space-y-4">
          <label className="label">Champ à Surveiller (optionnel)</label>
          <select
            value={trigger.fieldName || ''}
            onChange={(e) => onTriggerChange({ ...trigger, fieldName: e.target.value || undefined })}
            className="input"
          >
            <option value="">Tous les champs</option>
            {fields.map((field) => (
              <option key={field.name} value={field.name}>
                {field.label} ({field.name})
              </option>
            ))}
          </select>

          {trigger.fieldName && selectedField && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Valeur Initiale (De)</label>
                {selectedField.possibleValues ? (
                  <select
                    value={trigger.fromValue || ''}
                    onChange={(e) => onTriggerChange({ ...trigger, fromValue: e.target.value || undefined })}
                    className="input"
                  >
                    <option value="">N'importe quelle valeur</option>
                    {selectedField.possibleValues.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={trigger.fromValue || ''}
                    onChange={(e) => onTriggerChange({ ...trigger, fromValue: e.target.value || undefined })}
                    className="input"
                    placeholder="N'importe quelle valeur"
                  />
                )}
              </div>
              <div>
                <label className="label">Valeur Finale (Vers)</label>
                {selectedField.possibleValues ? (
                  <select
                    value={trigger.toValue || ''}
                    onChange={(e) => onTriggerChange({ ...trigger, toValue: e.target.value || undefined })}
                    className="input"
                  >
                    <option value="">N'importe quelle valeur</option>
                    {selectedField.possibleValues.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={trigger.toValue || ''}
                    onChange={(e) => onTriggerChange({ ...trigger, toValue: e.target.value || undefined })}
                    className="input"
                    placeholder="Nouvelle valeur"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
