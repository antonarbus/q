import { useHealthCheck } from '@entities/dev'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const useConnectionToBackendCheck = (): void => {
  const { data, isError, isSuccess, error } = useHealthCheck()

  useEffect(() => {
    if (isSuccess) {
      if (data.message === 'disconnected') {
        toast.warning('Ups, looks like we have problems with database')
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      console.error(error)
      toast.warning('Ups, looks like we have problems')
    }
  }, [isSuccess])
}
