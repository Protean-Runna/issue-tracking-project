'use client'

import { QueryClient, QueryClientProvider as ReactQClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
    return(
    <ReactQClientProvider client={queryClient}>{children}</ReactQClientProvider>
    );

}

export default QueryClientProvider;