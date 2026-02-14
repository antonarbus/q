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

  elementsToRemove.forEach((element) => {
    element.parentNode?.removeChild(element)
  })

  const html = paperElementClone.innerHTML

  const htmlWithoutContentEditableTag = html.replaceAll(
    'contenteditable="true"',
    '',
  )

  return htmlWithoutContentEditableTag
}
