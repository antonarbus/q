import type { ResBody } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import type { Chart } from 'chart.js'
import { format } from 'date-fns'
import { type RefObject, useEffect } from 'react'

type Props = {
  visitorList: ResBody['visitorList']
  chartInstanceRef: RefObject<Chart | null>
}

export const useUpdateChart = ({
  visitorList,
  chartInstanceRef,
}: Props): void => {
  useEffect(() => {
    const updateChart = (): void => {
      if (chartInstanceRef.current === null) {
        return
      }

      const totalCount = visitorList.map((item) => item.totalCount)
      const newCount = visitorList.map((item) => item.newCount)
      const labels = visitorList.map((item) => format(item.visitedAt, 'MMM dd'))

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
  }, [visitorList])
}
