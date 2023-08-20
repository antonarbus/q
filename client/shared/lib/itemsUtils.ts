import type { Item } from '../types'

export const cleanItem = (item: Item): Item => {
  const modifiableItem = structuredClone(item)
  modifiableItem.msg = ''
  return modifiableItem
}

export const cleanHtml = (html: string): string => {
  const htmlWithoutContentEditableTag = html.replaceAll('contenteditable="true"', '')
  const refRegExp = /ref=".*?"/g // ag-grid uses string refs and react does not like it
  const itemHtmlCleaned = htmlWithoutContentEditableTag.replace(refRegExp, '')
  return itemHtmlCleaned
}
