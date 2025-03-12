import { jsPDF } from 'jspdf'

self.onmessage = (
  event: MessageEvent<{
    imageData: string
    width: number
    height: number
    links?: {
      url: string
      x: number
      y: number
      width: number
      height: number
    }[]
  }>,
): void => {
  const { imageData, width, height, links } = event.data

  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
  })

  pdf.addImage(imageData, 'PNG', 0, 0, width, height, undefined, 'FAST')

  links?.forEach((link) => {
    // make border around link for dev purposes
    // pdf.setDrawColor(255, 0, 0) // Red border
    // pdf.setLineWidth(1)
    // pdf.rect(link.x, link.y, link.width, link.height) // Draw rectangle
    pdf.link(link.x, link.y, link.width, link.height, { url: link.url })
  })

  const blob = pdf.output('blob')
  self.postMessage(blob)
}
