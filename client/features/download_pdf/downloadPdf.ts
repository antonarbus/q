import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { className } from '@shared/consts/className'

export const downloadPdf = async (): Promise<void> => {
  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return
  const width = itemsElement.clientWidth
  const height = itemsElement.clientHeight
  const canvas = await html2canvas(itemsElement, { allowTaint: true, useCORS: true })
  const base64image = canvas.toDataURL('image/png')
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [width, height],
  })
  pdf.addImage(base64image, 'PNG', 0, 0, width, height, undefined, 'FAST')
  pdf.save('quotation.pdf')
}
