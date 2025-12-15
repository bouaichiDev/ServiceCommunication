'use client';

import { useRuleState } from '../hooks/useRuleState';
import { useRuleActions } from '../hooks/useRuleActions';
import { WizardStepper } from './WizardStepper';
import { StepTrigger } from './StepTrigger';
import { StepConditions } from './StepConditions';
import { StepCommunicationSelect } from './StepCommunicationSelect';
import { StepSchedule } from './StepSchedule';
import { StepSummary } from './StepSummary';

interface RulesWizardProps {
  onComplete: (ruleId: string) => void;
  onCancel: () => void;
}

export function RulesWizard({ onComplete, onCancel }: RulesWizardProps) {
  const state = useRuleState();
  const actions = useRuleActions();

  const handleSubmit = async () => {
    const ruleId = await actions.submit(state.draft);
    if (ruleId) {
      onComplete(ruleId);
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 'trigger':
        return (
          <StepTrigger
            trigger={state.draft.trigger}
            tables={actions.tables}
            fields={actions.fields}
            isLoading={actions.isLoading}
            onTriggerChange={state.setTrigger}
            onLoadTables={actions.loadTables}
            onLoadFields={actions.loadFields}
          />
        );
      case 'conditions':
        return (
          <StepConditions
            conditionGroup={state.draft.conditionGroup}
            fields={actions.fields}
            onConditionGroupChange={state.setConditionGroup}
            onAddCondition={state.addCondition}
            onUpdateCondition={state.updateCondition}
            onRemoveCondition={state.removeCondition}
          />
        );
      case 'communication':
        return (
          <StepCommunicationSelect
            selectedId={state.draft.communicationId}
            communications={actions.communications}
            isLoading={actions.isLoading}
            onSelect={state.setCommunicationId}
            onLoadCommunications={actions.loadCommunications}
          />
        );
      case 'schedule':
        return (
          <StepSchedule
            schedule={state.draft.schedule}
            onScheduleChange={state.setSchedule}
          />
        );
      case 'summary':
        return (
          <StepSummary
            draft={state.draft}
            tables={actions.tables}
            fields={actions.fields}
            communication={actions.getCommunicationById(state.draft.communicationId)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <WizardStepper currentStep={state.currentStep} onStepClick={state.goToStep} />

      {state.currentStep === 'trigger' && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="label">Nom de la Règle *</label>
            <input
              type="text"
              value={state.draft.name}
              onChange={(e) => state.setName(e.target.value)}
              className="input"
              placeholder="Ex: Notification livraison planifiée"
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={state.draft.description}
              onChange={(e) => state.setDescription(e.target.value)}
              className="input min-h-[60px]"
              placeholder="Description optionnelle..."
            />
          </div>
        </div>
      )}

      {actions.errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <ul className="list-disc list-inside text-error text-sm">
            {actions.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card p-6 mb-6">{renderStep()}</div>

      <div className="flex justify-between">
        <div>
          {state.isFirstStep ? (
            <button onClick={onCancel} className="btn btn-secondary">
              Annuler
            </button>
          ) : (
            <button onClick={state.prevStep} className="btn btn-secondary">
              Précédent
            </button>
          )}
        </div>
        <div>
          {state.isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={actions.isSending}
              className="btn btn-primary"
            >
              {actions.isSending ? 'Création...' : 'Créer la Règle'}
            </button>
          ) : (
            <button onClick={state.nextStep} className="btn btn-primary">
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
