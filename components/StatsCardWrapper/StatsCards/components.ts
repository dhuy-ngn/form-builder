import { FormListStats } from '../types';
type ValueKey = keyof FormListStats;

export type Stats = {
  title: string;
  description: string;
  valueKey: ValueKey;
  className?: string;
};

export const components: Stats[] = [
  {
    title: 'Total Visits',
    description: 'All time Form Visits',
    valueKey: 'visits',
    className: 'border-secondary/40 border-b-secondary'
  },
  {
    title: 'Total Submissions',
    description: 'All time Form Submission',
    valueKey: 'submissions',
    className: 'border-accent/40 border-b-accent'
  },
  {
    title: 'Submission Rate',
    description: 'Visits that results in form submissions',
    valueKey: 'submissionRate',
    className: 'border-success/40 border-b-success'
  },
  {
    title: 'Bounce Rate',
    description: 'Visits that leaves without interacting',
    valueKey: 'bounceRate',
    className: 'border-error/40 border-b-error'
  }
];
