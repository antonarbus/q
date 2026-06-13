import type { WorkerRequestMessage, WorkerResponseMessage } from './types'

self.addEventListener('message', (messageEvent: MessageEvent<WorkerRequestMessage>) => {
  void (async (): Promise<void> => {
    const jspdfModule = await import('jspdf')

    // oxlint-disable-next-line new-cap
    const pdf = new jspdfModule.jsPDF({
      orientation: messageEvent.data.width > messageEvent.data.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [messageEvent.data.width, messageEvent.data.height],
    })

    // add quotation as image
    pdf.addImage(
      messageEvent.data.imageData,
      'PNG',
      0,
      0,
      messageEvent.data.width,
      messageEvent.data.height,
      undefined,
      'FAST',
    )

    // add real links on top of image
    messageEvent.data.links.forEach((link) => {
      // // border around links for dev purpose
      // pdf.setDrawColor(255, 0, 0) // Red border
      // pdf.setLineWidth(1)
      // pdf.rect(link.x, link.y, link.width, link.height) // Draw rectangle

      // add real link on top of image
      pdf.link(link.x, link.y, link.width, link.height, { url: link.url })
    })

    const pdfBlob = pdf.output('blob')

    const workerResponseMessage: WorkerResponseMessage = { pdfBlob }

    self.postMessage(workerResponseMessage)
  })()
})
