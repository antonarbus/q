import { useSelectorTyped } from '@lib_instances/store'
import type { QueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'

type Props = {
  refetch: () => Promise<QueryObserverResult>
}

export const useRefetchDataOnEmailChange = ({ refetch }: Props): void => {
  const email = useSelectorTyped((state) => state.user.email)

  useEffect(() => {
    if (email) {
      void refetch()
    }
  }, [email])
}
