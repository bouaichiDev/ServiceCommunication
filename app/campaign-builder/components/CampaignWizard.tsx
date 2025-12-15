'use client';

import { useCampaignState } from '../hooks/useCampaignState';
import { useCampaignActions } from '../hooks/useCampaignActions';
import { WizardStepper } from './WizardStepper';
import { StepTarget } from './StepTarget';
import { StepChannels } from './StepChannels';
import { StepFilters } from './StepFilters';
import { StepSchedule } from './StepSchedule';
import { StepTemplates } from './StepTemplates';
import { StepSummary } from './StepSummary';

interface CampaignWizardProps {
  onComplete: (campaignId: string) => void;
  onCancel: () => void;
}

export function CampaignWizard({ onComplete, onCancel }: CampaignWizardProps) {
  const state = useCampaignState();
  const actions = useCampaignActions();

  const handleSubmit = async () => {
    const campaignId = await actions.submitCampaign(state.draft);
    if (campaignId) {
      onComplete(campaignId);
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 'target':
        return (
          <StepTarget
            target={state.draft.target}
            tenants={actions.tenants}
            clients={actions.clients}
            roles={actions.roles}
            isLoading={actions.isLoading}
            onTargetChange={state.setTarget}
            onLoadTenants={actions.loadTenants}
            onLoadClients={actions.loadClients}
            onLoadRoles={actions.loadRoles}
          />
        );
      case 'channels':
        return (
          <StepChannels
            selectedChannels={state.draft.channels}
            onChannelsChange={state.setChannels}
          />
        );
      case 'filters':
        return (
          <StepFilters
            filters={state.draft.filters}
            onFiltersChange={state.setFilters}
          />
        );
      case 'schedule':
        return (
          <StepSchedule
            schedule={state.draft.schedule}
            onScheduleChange={state.setSchedule}
          />
        );
      case 'templates':
        return (
          <StepTemplates
            selectedChannels={state.draft.channels}
            templates={state.draft.templates}
            availableTemplates={actions.templates}
            isLoading={actions.isLoading}
            onTemplatesChange={state.setTemplates}
            onLoadTemplates={actions.loadTemplates}
          />
        );
      case 'summary':
        return (
          <StepSummary
            draft={state.draft}
            recipients={actions.recipients}
            isLoading={actions.isLoading}
            onLoadPreview={() => actions.loadRecipientPreview(state.draft)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <WizardStepper currentStep={state.currentStep} onStepClick={state.goToStep} />

      {state.currentStep === 'target' && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="label">Nom de la Campagne *</label>
            <input
              type="text"
              value={state.draft.name}
              onChange={(e) => state.setName(e.target.value)}
              className="input"
              placeholder="Entrez le nom de la campagne..."
            />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              value={state.draft.description}
              onChange={(e) => state.setDescription(e.target.value)}
              className="input min-h-[80px]"
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
              {actions.isSending ? 'Envoi en cours...' : 'Envoyer la Campagne'}
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
