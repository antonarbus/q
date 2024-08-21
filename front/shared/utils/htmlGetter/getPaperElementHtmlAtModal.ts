import { cls } from '@shared/consts/cls'

export const getPaperElementHtmlAtModal = (): string => {
  const paperElement = document.querySelector(`.${cls.formModal} .${cls.paper}`)
  if (!(paperElement instanceof Element)) return 'element not found'
  const paperElementClone = paperElement.cloneNode(true)
  if (!(paperElementClone instanceof Element)) return 'element not found'

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
