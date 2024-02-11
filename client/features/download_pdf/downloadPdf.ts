import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { className } from '@shared/consts/className'

export const downloadPdf = async (): Promise<void> => {
  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return

  const width = itemsElement.clientWidth / 2
  const height = itemsElement.clientHeight / 2
  const canvas = await html2canvas(itemsElement, {
    allowTaint: true,
    useCORS: true,
    ignoreElements: (element) => {
      if (element.classList.contains(className.actionsContainer)) return true
      return false
    },
    onclone: (document: Document, element: HTMLElement) => {
      const paperElements = element.querySelectorAll(`.${className.paper}`)
      paperElements.forEach(paperElement => {
        if (!(paperElement instanceof HTMLElement)) return
        paperElement.style.border = '1px solid grey'
      })
    },
  })
  // document.body.appendChild(canvas)
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
