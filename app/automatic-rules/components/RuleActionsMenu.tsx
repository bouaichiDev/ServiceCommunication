'use client';

import { useState } from 'react';

interface RuleActionsMenuProps {
  ruleId: string;
  isActive: boolean;
  onView: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RuleActionsMenu({
  ruleId,
  isActive,
  onView,
  onToggleStatus,
  onEdit,
  onDelete,
}: RuleActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
      >
        <span className="text-lg">⋮</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-20">
            <button
              onClick={() => handleAction(() => onView(ruleId))}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
            >
              👁️ Voir les détails
            </button>
            <button
              onClick={() => handleAction(() => onToggleStatus(ruleId))}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
            >
              {isActive ? '⏸️ Désactiver' : '▶️ Activer'}
            </button>
            <button
              onClick={() => handleAction(() => onEdit(ruleId))}
              className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
            >
              ✏️ Modifier
            </button>
            <hr className="border-border" />
            <button
              onClick={() => handleAction(() => onDelete(ruleId))}
              className="w-full px-4 py-2 text-left text-sm text-error hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              🗑️ Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
