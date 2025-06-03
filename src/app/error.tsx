'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        Something went wrong!
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>
        Try again
      </Button>
    </div>
  );
}