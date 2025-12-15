import { RuleDetailClient } from './RuleDetailClient';

export async function generateStaticParams() {
  return [
    { id: 'rule1' },
    { id: 'rule2' },
    { id: 'rule3' },
    { id: 'rule4' },
    { id: 'rule5' },
  ];
}

export default function RuleDetailPage() {
  return <RuleDetailClient />;
}
