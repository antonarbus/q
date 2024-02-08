import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const downloadPdf = async (): Promise<void> => {
  const mainElement = document.querySelector('main')
  if (mainElement === null) return

  // replaceImageUrls()

  const width = mainElement.clientWidth
  const height = mainElement.clientHeight
  const canvas = await html2canvas(mainElement, {
    allowTaint: true,
    useCORS: true,
  })
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

function imageToBase64(img: HTMLImageElement): string | undefined {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  if (ctx === null) return
  ctx.drawImage(img, 0, 0, img.width, img.height)
  return canvas.toDataURL()
}

function replaceImageUrls(): void {
  const images = document.querySelectorAll('img')

  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (src === null) return
    const isExternalImage = src.startsWith('http://') || src.startsWith('https://')
    if (!isExternalImage) return
    const base64Url = imageToBase64(img)
    if (base64Url === undefined) return
    img.setAttribute('src', base64Url)
  })
}
