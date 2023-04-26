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
