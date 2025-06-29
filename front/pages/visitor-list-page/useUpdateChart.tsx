import { useEffect } from 'react'
import type { Chart } from 'chart.js'
import type { ResBody } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import { format, parseISO } from 'date-fns'

type Props = {
  visitors: ResBody['visitorsCount']
  chartInstanceRef: React.RefObject<Chart | null>
}

export const useUpdateChart = ({ visitors, chartInstanceRef }: Props): void => {
  useEffect(() => {
    const updateChart = (): void => {
      if (chartInstanceRef.current === null) {
        return
      }

      const countData = visitors.map((item) => item.count)
      const newData = visitors.map((item) => item.new)

      const labels = visitors.map((item) =>
        format(parseISO(item.date), 'MMM dd'),
      )

      chartInstanceRef.current.data.labels = labels

      if (chartInstanceRef.current.data.datasets[0] !== undefined) {
        chartInstanceRef.current.data.datasets[0].data = countData
      }

      if (chartInstanceRef.current.data.datasets[1] !== undefined) {
        chartInstanceRef.current.data.datasets[1].data = newData
      }

      chartInstanceRef.current.update()
    }

    updateChart()
  }, [visitors])
}
