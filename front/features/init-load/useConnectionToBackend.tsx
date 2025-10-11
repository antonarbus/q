import { useHealthCheckQuery } from '@entities/dev/api/useHealthCheckQuery'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const useConnectionToBackendCheck = (): void => {
  const healthCheckQuery = useHealthCheckQuery()

  useUpdateEffect(() => {
    if (healthCheckQuery.isError === true) {
      console.error(healthCheckQuery.error)

      if (healthCheckQuery.error.response?.data.message === 'disconnected') {
        toast.warning(
          'Ups, looks like we have problems with database connection ☹️',
        )
      }
    }
  }, [healthCheckQuery.isError])
}
