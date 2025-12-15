'use client';

interface RuleStatusBadgeProps {
  isActive: boolean;
}

export function RuleStatusBadge({ isActive }: RuleStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isActive ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
