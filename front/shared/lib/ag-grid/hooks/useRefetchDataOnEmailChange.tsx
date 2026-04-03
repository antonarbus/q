import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { QueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'

type Props = {
  refetch: () => Promise<QueryObserverResult>
}

export const useRefetchDataOnEmailChange = (props: Props): void => {
  const email = reduxHolder.useSelector((state) => state.user.email)

  useEffect(() => {
    if (email !== null) {
      props.refetch()
    }
  }, [email])
}
