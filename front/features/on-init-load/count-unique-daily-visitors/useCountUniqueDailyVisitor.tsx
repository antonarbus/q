import { useCountUniqueDailyVisitorsMutation } from '@front/entities/visitor/api/useCountUniqueDailyVisitorsMutation'
import { format } from 'date-fns'
import { useEffectOnce } from 'react-use'

export const useCountUniqueDailyVisitor = (): void => {
  const countUniqueDailyVisitorsMutation = useCountUniqueDailyVisitorsMutation()

  useEffectOnce(() => {
    const countVisitor = async (): Promise<void> => {
      const NAME_AT_LOCAL_STORAGE = 'lastVisitDate'

      const lastVisitDate = localStorage.getItem(NAME_AT_LOCAL_STORAGE)
      const today = format(new Date(), 'yyyy-MM-dd')

      if (lastVisitDate === today) {
        return
      }

      await countUniqueDailyVisitorsMutation.mutateAsync({
        isNew: lastVisitDate === null,
      })

      localStorage.setItem(NAME_AT_LOCAL_STORAGE, today)
    }

    countVisitor()
  })
}
