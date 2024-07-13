import { itemKey } from '../../consts/itemKey'
import { type Quotation } from '../../types'

export const unfixImagesHeightReducer = (state: Quotation): void => {
  state.blocks.forEach((block) => {
    if (block.type === itemKey.text) {
      const isImg = block.text.html.includes('img')

      if (!isImg) return

      block.text.html = makeHeightAutoInHtmlString({
        htmlString: block.text.html,
      })
    }

    if (block.type === itemKey.boq) {
      const boqRows = block.boq.rows

      boqRows.forEach((boqRow) => {
        const isImg = boqRow.description.html.includes('img')

        if (!isImg) return

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
  const styleTagAtImgRegExp =
    /<img[^>]*style\s*=\s*['"](?<innerStyleTag>[^'"]*)['"][^>]*>/giu

  function replaceHeight(match: string, styleAttribute: string): string {
    const heightRegExp = /height\s*:\s*[^;]*;/giu
    const newStyle = styleAttribute.replace(heightRegExp, 'height: auto;')
    return match.replace(styleAttribute, newStyle)
  }

  const modifiedHtml = htmlString.replace(styleTagAtImgRegExp, replaceHeight)
  return modifiedHtml
}
