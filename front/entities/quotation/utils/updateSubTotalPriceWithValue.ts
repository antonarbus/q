import { dispatch } from '@shared/lib/redux'
import type FroalaEditor from 'froala-editor'
import { updateNumberAtHtml } from '@shared/lib/froala/updateNumberAtHtml'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import { getNumberFromString } from '@shared/utils/getNumberFromString'
import { getTextContentFromHtml } from '@shared/utils/getTextContentFromHtml'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'
import { getBoqBlockFromStore } from '../redux/getters/getBoqBlockFromStore'
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

  if (!didValueChange) {
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

  if (incrementally) {
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
