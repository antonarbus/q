import { instance } from '@shared/instance'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()
export type QueryClientType = typeof queryClient

instance.queryClient = queryClient
