import type { TItem } from '../types'

export const cleanItem = (item: TItem): TItem => {
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
