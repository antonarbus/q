import { useSelector } from '@shared/lib/redux'
import type { QueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'

type Props = {
  refetch: () => Promise<QueryObserverResult>
}

export const useRefetchDataOnEmailChange = ({ refetch }: Props): void => {
  const email = useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      void refetch()
    }
  }, [email])
}
