import type { ResBody } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import type { Chart } from 'chart.js'
import { format } from 'date-fns'
import { type RefObject, useEffect } from 'react'

type Props = {
  visitors: ResBody['visitorsCount']
  chartInstanceRef: RefObject<Chart | null>
}

export const useUpdateChart = ({ visitors, chartInstanceRef }: Props): void => {
  useEffect(() => {
    const updateChart = (): void => {
      if (chartInstanceRef.current === null) {
        return
      }

      const totalCount = visitors.map((item) => item.totalCount)
      const newCount = visitors.map((item) => item.newCount)
      const labels = visitors.map((item) => format(item.visitedAt, 'MMM dd'))

      chartInstanceRef.current.data.labels = labels

      if (chartInstanceRef.current.data.datasets[0] !== undefined) {
        chartInstanceRef.current.data.datasets[0].data = totalCount
      }

      if (chartInstanceRef.current.data.datasets[1] !== undefined) {
        chartInstanceRef.current.data.datasets[1].data = newCount
      }

      chartInstanceRef.current.update()
    }

    updateChart()
  }, [visitors])
}
