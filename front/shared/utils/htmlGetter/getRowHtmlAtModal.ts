import { cls } from '@shared/consts/cls'

export const getRowHtmlAtModal = (): string => {
  const rowElement = document.querySelector(`.${cls.formModal} .${cls.boqRow}`)

  if (!rowElement) {
    return 'element not found'
  }

  const rowElementClone = rowElement.cloneNode(true)

  if (!(rowElementClone instanceof Element)) {
    return 'element not found'
  }

  const elementsToRemove = rowElementClone.querySelectorAll(cls.cleanFromPaper)

  elementsToRemove.forEach((element) => {
    element.parentNode?.removeChild(element)
  })

  const html = rowElementClone.outerHTML

  const htmlWithoutContentEditableTag = html.replaceAll(
    'contenteditable="true"',
    '',
  )

  return htmlWithoutContentEditableTag
}
