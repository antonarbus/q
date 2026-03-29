import { useHealthCheckQuery } from '@front/entities/dev/api/useHealthCheckQuery'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const useConnectionToBackendCheck = (): void => {
  const healthCheckQuery = useHealthCheckQuery()

  useUpdateEffect(() => {
    if (healthCheckQuery.isError === true) {
      // oxlint-disable-next-line no-console
      console.error(healthCheckQuery.error)

      if (healthCheckQuery.error.response?.data.errorCode === 'DB_CONNECTION_FAILED') {
        toast.warning('Ups, looks like we have problems with database connection ☹️')
      }
    }
  }, [healthCheckQuery.isError])
}
