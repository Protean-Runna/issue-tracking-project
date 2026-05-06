'use client'; 

import { useEffect } from 'react';
import { Button, Flex, Text, Heading, Card } from '@radix-ui/themes';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // logs to console...Look into sentry or datadog later.
    console.error(error);
  }, [error]);

  return (
    <Card>
        <Flex direction="column" gap="3" align="center" justify="center" className="min-h-100">
            <div className="mb-4 p-4 bg-red-100 rounded-full">
            {/* Simple Warning Icon */}
            <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
            </svg>
        </div>
        <Heading as="h2" mb={'2'}>Error: Failed to load the Issues list</Heading>
        
        <Text color="gray" className='max-w-fit' mb={'6'} align={'center'}>
            We encountered an error while loading the issues. This might be a temporary database glitch.
        </Text>
        <Button
            size={'3'}
            style={{cursor:'pointer'}}
            onClick={() => window.location.reload()} // Refresh the page
        >
            Refresh Page
        </Button>
        {/* The error digest for debugging in production */}
        {error.digest && (
                <p className="mt-8 text-xs text-gray-400 font-mono">
                Error ID: {error.digest}
                </p>
            )}
        </Flex>
    </Card>
  );
}