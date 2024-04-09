import { type PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Item } from '../../types'

export const fixImagesHeightReducer = (state: Item[], action: PayloadAction<{
  imageId: string
  imageHeight: number
}>): void => {
  const { imageId, imageHeight } = action.payload

  state.forEach(item => {
    if (item.type === itemKey.text) {
      if (!item.text.html.includes('img')) return
      if (!item.text.html.includes(imageId)) return
      item.text.html = makeHeightFixedInHtmlString({
        htmlString: item.text.html,
        newHeight: imageHeight,
      })
    }

    if (item.type === itemKey.boq) {
      const boqRows = item.boq.rows
      boqRows.forEach(boqRow => {
        if (!boqRow.description.html.includes('img')) return
        if (!boqRow.description.html.includes(imageId)) return
        boqRow.description.html = makeHeightFixedInHtmlString({
          htmlString: boqRow.description.html,
          newHeight: imageHeight,
        })
      })
    }
  })
}

type Props = {
  htmlString: string
  newHeight: number
}

function makeHeightFixedInHtmlString({ htmlString, newHeight }: Props): string {
  const pattern = /<img[^>]*style\s*=\s*['"]([^'"]*)['"][^>]*>/gi

  function replaceAutoHeight(match: string, styleAttribute: string): string {
    const newStyle = styleAttribute.replace(/height\s*:\s*auto;/gi, `height: ${newHeight}px;`)
    return match.replace(styleAttribute, newStyle)
  }

  const modifiedHtml = htmlString.replace(pattern, replaceAutoHeight)
  return modifiedHtml
}
