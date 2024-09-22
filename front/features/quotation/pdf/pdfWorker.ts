import { jsPDF } from 'jspdf'

self.onmessage = (
  event: MessageEvent<{
    imageData: string
    width: number
    height: number
  }>,
): void => {
  const { imageData, width, height } = event.data

  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
  })
  pdf.addImage(imageData, 'PNG', 0, 0, width, height, undefined, 'FAST')
  const blob = pdf.output('blob')
  self.postMessage(blob)
}
