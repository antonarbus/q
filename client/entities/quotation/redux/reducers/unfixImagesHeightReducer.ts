import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const unfixImagesHeightReducer = (state: Quotation): void => {
  state.items.forEach((item) => {
    if (item.type === itemKey.text) {
      if (!item.text.html.includes('img')) return

      item.text.html = makeHeightAutoInHtmlString({
        htmlString: item.text.html,
      })
    }

    if (item.type === itemKey.boq) {
      const boqRows = item.boq.rows
      boqRows.forEach((boqRow) => {
        if (!boqRow.description.html.includes('img')) return

        boqRow.description.html = makeHeightAutoInHtmlString({
          htmlString: boqRow.description.html,
        })
      })
    }
  })
}

function makeHeightAutoInHtmlString({
  htmlString,
}: {
  htmlString: string
}): string {
  const pattern = /<img[^>]*style\s*=\s*['"]([^'"]*)['"][^>]*>/gi

  function replaceHeight(match: string, styleAttribute: string): string {
    const newStyle = styleAttribute.replace(
      /height\s*:\s*[^;]*;/gi,
      'height: auto;',
    )
    return match.replace(styleAttribute, newStyle)
  }

  const modifiedHtml = htmlString.replace(pattern, replaceHeight)
  return modifiedHtml
}
