'use client';

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Moteur de Communication & Alertes</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="btn btn-outline text-sm py-1">
          🔔 Notifications
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
            JM
          </div>
          <div className="text-sm">
            <div className="font-medium">Jean Directeur</div>
            <div className="text-xs text-secondary">Administrateur</div>
          </div>
        </div>
      </div>
    </header>
  );
}
