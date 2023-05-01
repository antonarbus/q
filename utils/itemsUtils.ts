export function cleanItem(item: any) {
  const modifiableItem = structuredClone(item)
  modifiableItem.msg = ''
  delete modifiableItem.previewHtml
  return modifiableItem
}

export function cleanItems(items: any[]) {
  const modifiableItems = structuredClone(items)
  const itemsWithoutMsg = modifiableItems.map(item => {
    return cleanItem(item)
  })
  return itemsWithoutMsg
}

export function cleanHtml(html: string) {
  const htmlWithoutContentEditableTag = html.replaceAll('contenteditable="true"', '')
  const refRegExp = /ref=".*?"/g // ag-grid uses string refs and react does not like it
  const itemHtmlCleaned = htmlWithoutContentEditableTag.replace(refRegExp, '')
  return itemHtmlCleaned
}
