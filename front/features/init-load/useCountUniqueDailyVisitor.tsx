import { useCountUniqueDailyVisitorsMutation } from '@entities/visitor/api/useCountUniqueDailyVisitorsMutation'
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

      const res = await countUniqueDailyVisitorsMutation.mutateAsync({
        date: today,
        isNew: lastVisitDate === null,
      })

      if (res.message === 'visitor counted') {
        localStorage.setItem(NAME_AT_LOCAL_STORAGE, today)
      }
    }

    void countVisitor()
  })
}
