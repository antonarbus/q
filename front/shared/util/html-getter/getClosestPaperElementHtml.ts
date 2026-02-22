import { cls } from '@shared/cls'

export const getClosestPaperElementHtml = (event: React.MouseEvent): string => {
  const clickedIconElement = event.target

  if (clickedIconElement instanceof Element === false) {
    return 'element not found'
  }

  const blockElement = clickedIconElement.closest(`.${cls.block}`)

  if (blockElement instanceof Element === false) {
    return 'element not found'
  }

  const paperElement = blockElement.querySelector(`.${cls.paper}`)

  if (paperElement instanceof Element === false) {
    return 'element not found'
  }

  const paperElementClone = paperElement.cloneNode(true)

  if (paperElementClone instanceof Element === false) {
    return 'element not found'
  }

  const elementsToRemove = paperElementClone.querySelectorAll(
    cls.cleanFromPaper,
  )

  elementsToRemove.forEach((elementToRemove) => {
    elementToRemove.parentNode?.removeChild(elementToRemove)
  })

  // The ResizableNodeView container is a <div> (block-level element). When the
  // snapshot HTML is re-parsed via innerHTML in <ScaledCopyItem />, browsers close
  // the parent <p> before opening a <div>, so the container ends up as a sibling
  // of <p> rather than a child. Setting text-align on the <p> therefore has no
  // effect. Instead we turn the container itself into a full-width flex row so
  // it self-aligns correctly regardless of where it lands in the re-parsed tree.
  const imageWrappers = paperElementClone.querySelectorAll('[data-image-align]')

  imageWrappers.forEach((imageWrapper) => {
    if (imageWrapper instanceof HTMLElement === true) {
      const { imageAlign } = imageWrapper.dataset

      imageWrapper.style.display = 'flex'
      imageWrapper.style.width = '100%'

      if (imageAlign === 'center') {
        imageWrapper.style.justifyContent = 'center'
      } else if (imageAlign === 'right') {
        imageWrapper.style.justifyContent = 'flex-end'
      } else {
        imageWrapper.style.justifyContent = 'flex-start'
      }
    }
  })

  const html = paperElementClone.innerHTML

  const htmlWithoutContentEditableTag = html.replaceAll(
    'contenteditable="true"',
    '',
  )

  return htmlWithoutContentEditableTag
}
