import { instance } from '@shared/instance'
import { QueryClient } from '@tanstack/react-query'

export const reactQuery = new QueryClient()
export type ReactQuery = typeof reactQuery

instance.reactQuery = reactQuery
