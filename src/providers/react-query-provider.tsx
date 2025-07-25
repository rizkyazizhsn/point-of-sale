'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const ReactQueryProvider = ({ children }: { children: React.ReactNode}) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false
      }
    }
  })
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider