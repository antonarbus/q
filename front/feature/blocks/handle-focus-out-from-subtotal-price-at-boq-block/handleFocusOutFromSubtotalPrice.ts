import { getBoqBlockFromStore } from '@entity/quotation/redux/getter/getBoqBlockFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'
import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { blockEditorKey } from '@shared/lib/tiptap/editorKey'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'

type Props = {
  blockIndex: number
}

export const handleFocusOutFromSubtotalPrice = (props: Props): void => {
  const subTotalPriceEditor =
    editorRegistry.get(
      blockEditorKey({
        blockIndex: props.blockIndex,
        editorName: 'subTotalPrice',
      }),
    ) ?? null

  if (subTotalPriceEditor === null) {
    return
  }

  const boqBlock = getBoqBlockFromStore({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return
  }

  const roundedValue = roundTo(boqBlock.boq.header.subTotalPrice.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: boqBlock.boq.header.subTotalPrice.html,
    newNumber: roundedValue,
  })

  if (boqBlock.boq.header.subTotalPrice.html === newHtml) {
    return
  }

  dispatch(
    quotationSlice.actions.updateSubTotalPrice({
      blockIndex: props.blockIndex,
      html: newHtml,
      value: roundedValue,
    }),
  )

  subTotalPriceEditor.commands.setContent(newHtml, {
    emitUpdate: false,
  })
}
