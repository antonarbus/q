import { dispatch } from '@lib_instances/store'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { navSlice } from '@entities/nav'
import { className } from '@shared/consts/className'

// todo: before pdf we need to enable all froalas
// todo: images height to be set not on image load in froala, but somewhere else, now can not change its width, it squeezes

export const downloadPdf = async (): Promise<void> => {
  const itemsElement = document.querySelector(`.${className.items}`)
  if (!(itemsElement instanceof HTMLElement)) return

  dispatch(navSlice.actions.showLoadingIcon({ id: 'pdf' }))

  // show spinner icon, then process canvas & pdf
  setTimeout(async() => {
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
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height],
    })
    pdf.addImage(base64image, 'PNG', 0, 0, width, height, undefined, 'FAST')
    // todo: add quotation number
    await pdf.save('quotation.pdf', { returnPromise: true })
    dispatch(navSlice.actions.hideLoadingIcon({ id: 'pdf' }))
  })
}
