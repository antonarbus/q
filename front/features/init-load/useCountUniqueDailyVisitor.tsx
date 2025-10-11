import { useCountUniqueDailyVisitorsMutation } from '@entities/visitor/api/useCountUniqueDailyVisitorsMutation'
import { format } from 'date-fns'
import { useEffectOnce } from 'react-use'

export const useCountUniqueDailyVisitor = (): void => {
  const countUniqueDailyVisitorsMutation = useCountUniqueDailyVisitorsMutation()

  useEffectOnce(() => {
    const countVisitor = async (): Promise<void> => {
      const LAST_VISIT_DATE = 'lastVisitDate'

      const lastVisitDate = localStorage.getItem(LAST_VISIT_DATE)
      const today = format(new Date(), 'yyyy-MM-dd')

      if (lastVisitDate === today) {
        return
      }

      const res = await countUniqueDailyVisitorsMutation.mutateAsync({
        date: today,
        isNew: lastVisitDate === null,
      })

      if (res.message === 'visitor counted') {
        localStorage.setItem(LAST_VISIT_DATE, today)
      }
    }

    void countVisitor()
  })
}
