import { cls } from '@front/shared/cls'

type Props = {
  paperElement: HTMLElement
}

export const getCleanPaperHtml = (props: Props): string => {
  const paperElementClone = props.paperElement.cloneNode(true)

  if (paperElementClone instanceof Element === false) {
    return ''
  }

  const elementsToRemove = paperElementClone.querySelectorAll(cls.cleanFromPaper)

  elementsToRemove.forEach((elementToRemove) => {
    elementToRemove.remove()
  })

  // Images should align correct in preview
  const imageContainers = paperElementClone.querySelectorAll('[data-resize-container]')

  imageContainers.forEach((imageContainer) => {
    if (imageContainer instanceof HTMLElement === false) {
      return
    }

    // We also clear visibility:hidden that ResizableNodeView sets while waiting
    // for the image to load — in the offscreen renderer the image may never fire
    // onload before we clone the DOM, leaving the image invisible in the preview.
    imageContainer.style.visibility = ''

    // TipTap's TextAlign extension applies textAlign to the paragraph block, not
    // the inline image node, so data-image-align is never stamped. Instead, read
    // the paragraph's textAlign directly from the clone (where the <div> is still
    // inside the <p>); after innerHTML injection the browser breaks it out.
    const textAlign = imageContainer.closest('p')?.style.textAlign ?? ''

    imageContainer.style.display = 'flex'
    imageContainer.style.width = '100%'

    if (textAlign === 'center') {
      imageContainer.style.justifyContent = 'center'
    } else if (textAlign === 'right') {
      imageContainer.style.justifyContent = 'flex-end'
    } else {
      imageContainer.style.justifyContent = ''
    }
  })

  const html = paperElementClone.innerHTML

  return html
}
