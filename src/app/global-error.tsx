'use client';

import React from 'react';
import { Button } from '@presentation/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md text-center">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <Button onClick={reset} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
