import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh'
    }}>
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}