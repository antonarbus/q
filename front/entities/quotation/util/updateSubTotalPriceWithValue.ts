import type { Editor } from '@tiptap/react'
import { updateNumberAtHtml } from '@front/shared/lib/tiptap/util/updateNumberAtHtml'
import { updateNumberAtHtmlIncrementally } from '@front/shared/lib/tiptap/util/updateNumberAtHtmlIncrementally'
import { dispatch } from '@front/shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'
import { getBoqBlockFromStoreByIndex } from '../redux/getter/getBoqBlockFromStoreByIndex'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
  subTotalPriceEditor: Editor | null
  value: number
  incrementally: boolean
}

type Res = {
  didChange: boolean
}

export const updateSubTotalPriceWithValue = (props: Props): Res => {
  if (props.subTotalPriceEditor === null) {
    return {
      didChange: false,
    }
  }

  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return {
      didChange: false,
    }
  }

  const subTotalPriceValueCurrent = boqBlock.boq.header.subTotalPrice.value

  const didValueChange = props.value !== subTotalPriceValueCurrent

  if (didValueChange === false) {
    return {
      didChange: false,
    }
  }

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqBlock.boq.header.subTotalPrice.html,
    newNumber: props.value,
  })

  dispatch(
    quotationSlice.actions.updateSubTotalPrice({
      blockIndex: props.blockIndex,
      html: updatedHtml,
      value: props.value,
    }),
  )

  if (props.incrementally === true) {
    updateNumberAtHtmlIncrementally({
      oldNumber: subTotalPriceValueCurrent,
      newNumber: props.value,
      totalPriceValueEditor: props.subTotalPriceEditor,
      html: boqBlock.boq.header.subTotalPrice.html,
    })
  } else {
    updateNumberAtHtml({
      newNumber: props.value,
      editor: props.subTotalPriceEditor,
      html: boqBlock.boq.header.subTotalPrice.html,
    })
  }

  return {
    didChange: true,
  }
}
