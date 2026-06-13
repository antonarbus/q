import { useCountUniqueDailyVisitorsMutation } from '@front/entities/visitor/api/useCountUniqueDailyVisitorsMutation'
import { localStorageKeys } from '@front/shared/lib/local-storage/localStorageKeys'
import { format } from 'date-fns'
import { useEffectOnce } from 'react-use'

export const useCountUniqueDailyVisitor = (): void => {
  const countUniqueDailyVisitorsMutation = useCountUniqueDailyVisitorsMutation()

  useEffectOnce(() => {
    const countVisitor = async (): Promise<void> => {
      const lastVisitDate = localStorage.getItem(localStorageKeys.lastVisitDate)
      const today = format(new Date(), 'yyyy-MM-dd')

      if (lastVisitDate === today) {
        return
      }

      await countUniqueDailyVisitorsMutation.mutateAsync({
        isNew: lastVisitDate === null,
      })

      localStorage.setItem(localStorageKeys.lastVisitDate, today)
    }

    void countVisitor()
  })
}
