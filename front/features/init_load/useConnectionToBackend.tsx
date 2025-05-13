import { useHealthCheck } from '@entities/dev'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const useConnectionToBackendCheck = (): void => {
  const { data, isError, isSuccess, error } = useHealthCheck()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'disconnected') {
        toast.warning(
          'Ups, looks like we have problems with database connection ☹️',
        )
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      console.error(error)

      toast.warning(
        'Ups, looks like we have problems with database connection ☹️',
      )
    }
  }, [isError])
}
