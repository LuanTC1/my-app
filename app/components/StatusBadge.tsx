import clsx from 'clsx';

interface StatusBadgeProps {
  status: 'pending' | 'paid';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-gray-100 text-gray-700': status === 'pending',
          'bg-green-100 text-green-700': status === 'paid',
        }
      )}
    >
      {status === 'pending' ? '⏳ Pending' : '✓ Paid'}
    </span>
  );
}
