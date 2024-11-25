import { useCountUniqueDailyVisitorsMutation } from '@entities/user'
import { format } from 'date-fns'
import { useEffectOnce } from 'react-use'

export const useCountUniqueDailyVisitor = (): void => {
  const { mutateAsync: countUniqueDailyVisitor } =
    useCountUniqueDailyVisitorsMutation()

  useEffectOnce(() => {
    const countVisitor = async (): Promise<void> => {
      const LAST_VISIT_DATE = 'lastVisitDate'

      const today = format(new Date(), 'yyyy-MM-dd')
      const lastVisitDate = localStorage.getItem(LAST_VISIT_DATE)

      if (lastVisitDate === today) {
        return
      }

      const res = await countUniqueDailyVisitor({ data: {} })

      if (res.message === 'visitor counted') {
        localStorage.setItem(LAST_VISIT_DATE, today)
      }
    }

    void countVisitor()
  })
}
