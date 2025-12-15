'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/communications', label: 'Communications', icon: '📧' },
  { href: '/campaign-builder', label: 'Nouvelle Campagne', icon: '➕' },
  { href: '/automatic-rules', label: 'Règles Automatiques', icon: '⚡' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary">Comm Admin</h1>
          <p className="text-sm text-secondary">Moteur de Communication</p>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-secondary hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Floating Help Button - Fixed on right side */}
      <div className="fixed bottom-4 right-4 z-50">
        {isHelpOpen && (
          <div className="mb-2 p-4 bg-card border border-border rounded-lg shadow-lg w-64 animate-slide-in">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Besoin d'aide ?</div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-secondary hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-secondary mb-3">
              Consultez notre documentation pour des guides et tutoriels.
            </div>
            <a
              href="#"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              📖 Voir la Documentation
            </a>
          </div>
        )}
        <button
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors flex items-center justify-center text-xl"
          title="Besoin d'aide ?"
        >
          {isHelpOpen ? '✕' : '❓'}
        </button>
      </div>
    </>
  );
}
