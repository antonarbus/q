import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { className } from '@shared/consts/className'

// todo: add some spinner, maybe into icon
// todo: before pdf we need to enable all froalas
// todo: images height to be set not on image load in froala, but somewhere else, now can not change its width, it squeezes

export const downloadPdf = async (): Promise<void> => {
  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return

  const width = itemsElement.clientWidth
  const height = itemsElement.clientHeight
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
  // todo: add quotation number
  pdf.save('quotation.pdf')
}
