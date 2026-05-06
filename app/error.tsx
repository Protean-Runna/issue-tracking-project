'use client';

import { Button, Text, Card, Flex, Heading } from '@radix-ui/themes';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // logs to console...Look into sentry or datadog later.
    console.error('Captured Application Error:', error);
  }, [error]);

  return (
    <Card>
        <Flex 
        direction={'column'} 
        align={'center'} 
        justify={'center'} 
        className='min-h-100 text-center'>
        
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

        <Heading as='h2' mb={'2'}>
            Something went wrong
        </Heading>
        
        <Text as='p' color='gray' mb={'6'} className="max-w-md">
            An unexpected error occurred. This could be a temporary connection issue
            with our database or a glitch in the application.
        </Text>
        <Button
        size={'3'}
        onClick={() => window.location.reload()}
        style={{cursor:"pointer"}}>
        Refresh Page
        </Button>
        {/*The error digest for debugging in production */}
        {error.digest && (
            <p className="mt-8 text-xs text-gray-400 font-mono">
            Error ID: {error.digest}
            </p>
        )}
        </Flex>
    </Card>
  );
}