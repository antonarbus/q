import type { FroalaEditor } from '@shared/lib/froala/froala'
import { updateNumberAtHtml } from '@shared/lib/froala/updateNumberAtHtml'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { dispatch } from '@shared/lib/redux'
import { getNumberFromString } from '@shared/util/getNumberFromString'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getTextContentFromHtml } from '@shared/util/getTextContentFromHtml'
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

export const updateSubTotalPriceWithValue = ({
  blockIndex,
  subTotalPriceEditor,
  value,
  incrementally,
}: Props): Res => {
  if (subTotalPriceEditor === null) {
    return {
      didChange: false,
    }
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex })

  if (boqBlock === undefined) {
    return {
      didChange: false,
    }
  }

  const subTotalPriceValueCurrent = boqBlock.boq.header.subTotalPrice.value

  const didValueChange = value !== subTotalPriceValueCurrent

  if (didValueChange === false) {
    return {
      didChange: false,
    }
  }

  const subTotalPriceTextContent = getTextContentFromHtml({
    html: boqBlock.boq.header.subTotalPrice.html,
  })

  const subTotalPriceValueFromHtml = getNumberFromString({
    string: subTotalPriceTextContent,
  })

  const updatedHtml = getStringWithNewFormattedNumber({
    string: boqBlock.boq.header.subTotalPrice.html,
    oldNumber: subTotalPriceValueFromHtml,
    newNumber: value,
  })

  dispatch(
    quotationSlice.actions.updateSubTotalPriceReducer({
      blockIndex,
      html: updatedHtml,
      value,
    }),
  )

  if (incrementally === true) {
    updateNumberAtHtmlIncrementally({
      oldNumber: subTotalPriceValueCurrent,
      newNumber: value,
      editor: subTotalPriceEditor,
      html: boqBlock.boq.header.subTotalPrice.html,
    })
  } else {
    updateNumberAtHtml({
      oldNumber: subTotalPriceValueCurrent,
      newNumber: value,
      editor: subTotalPriceEditor,
      html: boqBlock.boq.header.subTotalPrice.html,
    })
  }

  return {
    didChange: true,
  }
}
