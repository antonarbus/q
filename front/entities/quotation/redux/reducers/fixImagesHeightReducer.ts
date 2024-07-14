import { type PayloadAction } from '@reduxjs/toolkit'
import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

type Props = {
  htmlString: string
  newHeight: number
}

function makeHeightFixedInHtmlString({ htmlString, newHeight }: Props): string {
  const styleTagAtImgRegExp =
    /<img[^>]*style\s*=\s*['"](?<innerStyleTag>[^'"]*)['"][^>]*>/giu

  function replaceAutoHeight(match: string, styleAttribute: string): string {
    const heightAutoRegExp = /height\s*:\s*auto;/giu

    const newStyle = styleAttribute.replace(
      heightAutoRegExp,
      `height: ${newHeight}px;`,
    )
    return match.replace(styleAttribute, newStyle)
  }

  const modifiedHtml = htmlString.replace(
    styleTagAtImgRegExp,
    replaceAutoHeight,
  )
  return modifiedHtml
}

export const fixImagesHeightReducer = (
  state: Quotation,
  action: PayloadAction<{
    imageId: string
    imageHeight: number
  }>,
): void => {
  const { imageId, imageHeight } = action.payload

  state.blocks.forEach((item) => {
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
      boqRows.forEach((boqRow) => {
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
