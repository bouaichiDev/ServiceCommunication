'use client';

import type { ConditionGroup, Condition, ConditionOperator, LogicalOperator, TableField } from '../types';
import { createEmptyCondition } from '../utils/ruleMapper';

interface StepConditionsProps {
  conditionGroup: ConditionGroup;
  fields: TableField[];
  onConditionGroupChange: (group: ConditionGroup) => void;
  onAddCondition: (condition: Condition) => void;
  onUpdateCondition: (id: string, updates: Partial<Condition>) => void;
  onRemoveCondition: (id: string) => void;
}

const OPERATORS: { value: ConditionOperator; label: string }[] = [
  { value: 'equals', label: 'Égal à' },
  { value: 'not_equals', label: 'Différent de' },
  { value: 'contains', label: 'Contient' },
  { value: 'is_null', label: 'Est vide' },
  { value: 'is_not_null', label: 'N\'est pas vide' },
  { value: 'greater_than', label: 'Supérieur à' },
  { value: 'less_than', label: 'Inférieur à' },
];

const LOGIC_OPTIONS: { value: LogicalOperator; label: string }[] = [
  { value: 'AND', label: 'ET (toutes les conditions)' },
  { value: 'OR', label: 'OU (au moins une condition)' },
];

export function StepConditions({
  conditionGroup,
  fields,
  onConditionGroupChange,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition,
}: StepConditionsProps) {
  const handleAddCondition = () => {
    onAddCondition(createEmptyCondition());
  };

  const handleLogicChange = (logic: LogicalOperator) => {
    onConditionGroupChange({ ...conditionGroup, logic });
  };

  const needsValue = (operator: ConditionOperator) => {
    return !['is_null', 'is_not_null'].includes(operator);
  };

  const getFieldByName = (name: string) => fields.find((f) => f.name === name);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Définir les Conditions</h3>
        <p className="text-secondary mb-4">
          Ajoutez des conditions supplémentaires pour filtrer quand la règle doit s'appliquer.
          Les conditions sont optionnelles.
        </p>
      </div>

      {conditionGroup.conditions.length > 1 && (
        <div className="card p-4">
          <label className="label">Logique de Combinaison</label>
          <div className="flex gap-4">
            {LOGIC_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="logic"
                  value={opt.value}
                  checked={conditionGroup.logic === opt.value}
                  onChange={() => handleLogicChange(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {conditionGroup.conditions.map((condition, index) => {
          const selectedField = getFieldByName(condition.field);
          return (
            <div key={condition.id} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-secondary">
                  Condition {index + 1}
                </span>
                <button
                  onClick={() => onRemoveCondition(condition.id)}
                  className="text-error hover:text-red-700 text-sm"
                >
                  Supprimer
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="label">Champ</label>
                  <select
                    value={condition.field}
                    onChange={(e) => onUpdateCondition(condition.id, { field: e.target.value })}
                    className="input"
                  >
                    <option value="">Sélectionner...</option>
                    {fields.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Opérateur</label>
                  <select
                    value={condition.operator}
                    onChange={(e) =>
                      onUpdateCondition(condition.id, {
                        operator: e.target.value as ConditionOperator,
                      })
                    }
                    className="input"
                  >
                    {OPERATORS.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                </div>

                {needsValue(condition.operator) && (
                  <div>
                    <label className="label">Valeur</label>
                    {selectedField?.possibleValues ? (
                      <select
                        value={condition.value || ''}
                        onChange={(e) => onUpdateCondition(condition.id, { value: e.target.value })}
                        className="input"
                      >
                        <option value="">Sélectionner...</option>
                        {selectedField.possibleValues.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={condition.value || ''}
                        onChange={(e) => onUpdateCondition(condition.id, { value: e.target.value })}
                        className="input"
                        placeholder="Valeur..."
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleAddCondition} className="btn btn-outline w-full">
        + Ajouter une Condition
      </button>

      {conditionGroup.conditions.length === 0 && (
        <div className="text-center py-6 text-secondary bg-muted rounded-lg">
          Aucune condition définie. La règle s'appliquera à chaque déclenchement.
        </div>
      )}
    </div>
  );
}
