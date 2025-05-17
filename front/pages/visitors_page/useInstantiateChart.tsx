import { Chart } from 'chart.js'
import { useEffect, useRef } from 'react'
import { chartConfiguration } from './chartConfiguration'

type Res = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  chartInstanceRef: React.RefObject<Chart | null>
}

export const useInstantiateChart = (): Res => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext('2d')

      if (ctx !== null) {
        chartInstanceRef.current = new Chart(ctx, chartConfiguration)
      }
    }

    return (): void => {
      chartInstanceRef.current?.destroy()
    }
  }, [])

  return { canvasRef, chartInstanceRef }
}
