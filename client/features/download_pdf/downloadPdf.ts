import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const downloadPdf = async (): Promise<void> => {
  const mainElement = document.querySelector('main')
  if (mainElement === null) return
  const width = mainElement.clientWidth
  const height = mainElement.clientHeight
  const canvas = await html2canvas(mainElement)
  // document.body.appendChild(canvas)
  const base64image = canvas.toDataURL('image/png')
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [width, height],
  })
  // const pdf = new jsPDF('p', 'px', [1600, 1131])
  pdf.addImage(base64image, 'PNG', 0, 0, width, height, undefined, 'FAST')
  // pdf.addImage(base64image)
  pdf.save('quotation.pdf')
}
