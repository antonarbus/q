import { dispatch } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
import type { HeaderKey } from '@back/entity/quotation/schema'
import { getBoqBlockFromStoreByIndex } from '../getter/getBoqBlockFromStoreByIndex'
import { quotationSlice } from '../quotationSlice'
import type { Editor } from '@tiptap/react'

type Props = {
  editor: Editor | null
  blockIndex: number
  boqHeaderKey: HeaderKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqHeaderAtStore = (props: Props): Res => {
  if (props.editor === null) {
    return { didUpdate: false }
  }

  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return { didUpdate: false }
  }

  const prevHtml = boqBlock.boq.header[props.boqHeaderKey].html
  const html = props.editor.getHTML()
  const didTextChange = prevHtml !== html

  if (didTextChange === false) {
    return { didUpdate: false }
  }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(
    quotationSlice.actions.updateBoqHeaderText({
      blockIndex: props.blockIndex,
      html,
      value: cellValueFromHtml,
      boqHeaderKey: props.boqHeaderKey,
    }),
  )

  return { didUpdate: true }
}
