import { EditRuleClient } from './EditRuleClient';

export async function generateStaticParams() {
  return [
    { id: 'rule1' },
    { id: 'rule2' },
    { id: 'rule3' },
    { id: 'rule4' },
    { id: 'rule5' },
  ];
}

export default function EditRulePage() {
  return <EditRuleClient />;
}
