import type { ResBody } from '@back/api/visitors/getUniqueDailyVisitorsHandler'
import type { Chart } from 'chart.js'
import { format } from 'date-fns'
import { type RefObject, useEffect } from 'react'

type Props = {
  visitorList: ResBody['visitorList']
  chartInstanceRef: RefObject<Chart | null>
}

export const useUpdateChart = (props: Props): void => {
  useEffect(() => {
    const updateChart = (): void => {
      if (props.chartInstanceRef.current === null) {
        return
      }

      const totalCount = props.visitorList.map((item) => item.totalCount)
      const newCount = props.visitorList.map((item) => item.newCount)
      const labels = props.visitorList.map((item) => format(item.visitedAt, 'MMM dd'))

      props.chartInstanceRef.current.data.labels = labels

      if (props.chartInstanceRef.current.data.datasets[0] !== undefined) {
        props.chartInstanceRef.current.data.datasets[0].data = totalCount
      }

      if (props.chartInstanceRef.current.data.datasets[1] !== undefined) {
        props.chartInstanceRef.current.data.datasets[1].data = newCount
      }

      props.chartInstanceRef.current.update()
    }

    updateChart()
  }, [props.visitorList])
}
