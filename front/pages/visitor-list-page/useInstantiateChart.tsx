import { chartConfigurationForVisitorList } from '@shared/lib/chart-js'
import { Chart } from 'chart.js'
import { type RefObject, useEffect, useRef } from 'react'

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
