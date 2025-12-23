import { chartConfigurationForVisitorList } from './chartConfigurationForVisitorList'
import { type RefObject, useEffect, useRef } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'

// may import all components without manual registration
// import 'chart.js/auto'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
)

type Res = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  chartInstanceRef: RefObject<Chart | null>
}

export const useInstantiateChart = (): Res => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext('2d')

      if (ctx !== null) {
        chartInstanceRef.current = new Chart(
          ctx,
          chartConfigurationForVisitorList,
        )
      }
    }

    return (): void => {
      chartInstanceRef.current?.destroy()
    }
  }, [])

  return { canvasRef, chartInstanceRef }
}
