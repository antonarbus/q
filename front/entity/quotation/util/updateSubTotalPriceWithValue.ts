import type { FroalaEditor } from '@shared/lib/froala/froala'
import { updateNumberAtHtml } from '@shared/lib/froala/updateNumberAtHtml'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getBoqBlockFromStore } from '../redux/getter/getBoqBlockFromStore'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
  subTotalPriceEditor: FroalaEditor | null
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

  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

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
    quotationSlice.actions.updateSubTotalPriceReducer({
      blockIndex: props.blockIndex,
      html: updatedHtml,
      value: props.value,
    }),
  )

  if (props.incrementally === true) {
    updateNumberAtHtmlIncrementally({
      oldNumber: subTotalPriceValueCurrent,
      newNumber: props.value,
      editor: props.subTotalPriceEditor,
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
