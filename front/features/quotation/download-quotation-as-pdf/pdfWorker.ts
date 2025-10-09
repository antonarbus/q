import type { WorkerRequestMessage } from './downloadPdf'

export type WorkerResponseMessage = {
  pdfBlob: Blob
}

self.onmessage = async (
  event: MessageEvent<WorkerRequestMessage>,
): Promise<void> => {
  const { imageData, width, height, links } = event.data

  const { jsPDF } = await import('jspdf')

  const pdf = new jsPDF({
    orientation: width > height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [width, height],
  })

  // add quotation as image
  pdf.addImage(imageData, 'PNG', 0, 0, width, height, undefined, 'FAST')

  // add real links on top of image
  links.forEach((link) => {
    // border around links for dev purpose
    // pdf.setDrawColor(255, 0, 0) // Red border
    // pdf.setLineWidth(1)
    // pdf.rect(link.x, link.y, link.width, link.height) // Draw rectangle

    // add real link on top of image
    pdf.link(link.x, link.y, link.width, link.height, { url: link.url })
  })

  const pdfBlob = pdf.output('blob')

  const workerResponseMessage: WorkerResponseMessage = { pdfBlob }

  self.postMessage(workerResponseMessage)
}
