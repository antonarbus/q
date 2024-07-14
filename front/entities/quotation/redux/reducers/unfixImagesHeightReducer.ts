import { itemType } from '../../consts/itemType'
import { type Quotation } from '../../types'

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

export const unfixImagesHeightReducer = (state: Quotation): void => {
  state.blocks.forEach((block) => {
    if (block.type === itemType.text) {
      const isImg = block.text.html.includes('img')

      if (!isImg) return

      block.text.html = makeHeightAutoInHtmlString({
        htmlString: block.text.html,
      })
    }

    if (block.type === itemType.boq) {
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
