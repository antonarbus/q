import { dispatch } from '@lib_instances/store'
import type FroalaEditor from 'froala-editor'
import { updateNumberAtHtml } from '@shared/lib/froala/updateNumberAtHtml'
import { updateNumberAtHtmlIncrementally } from '@shared/lib/froala/updateNumberAtHtmlIncrementally'
import {
  getNumberFromString,
  getTextContentFromHtml,
  getStringWithNewFormattedNumber,
} from '@shared/utils'
import { getBoqBlockFromStore } from '../redux/getters/getBoqBlockFromStore'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  itemIndex: number
  subTotalPriceEditor: FroalaEditor | null
  value: number
  incrementally: boolean
}

type Res = {
  didChange: boolean
}

export const updateSubTotalPriceWithValue = ({
  itemIndex,
  subTotalPriceEditor,
  value,
  incrementally,
}: Props): Res => {
  if (subTotalPriceEditor === null) {
    return {
      didChange: false,
    }
  }

  const boqBlock = getBoqBlockFromStore({ itemIndex })
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
      itemIndex,
      html: updatedHtml,
      value,
    }),
  )

  if (incrementally) {
    void updateNumberAtHtmlIncrementally({
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
