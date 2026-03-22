import { getBoqBlockFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBoqBlockFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { dispatch } from '@front/shared/lib/redux'
import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'

type Props = {
  blockIndex: number
}

export const formatSubtotalPriceAtBoqBlock = (props: Props): boolean => {
  const subTotalPriceEditor =
    editorRegistry.get(
      getRegistryKey({
        editorName: 'boqBlockSubTotalPrice',
        blockIndex: props.blockIndex,
        rowIndex: null,
      }),
    ) ?? null

  if (subTotalPriceEditor === null) {
    return false
  }

  const boqBlock = getBoqBlockFromStoreByIndex({ blockIndex: props.blockIndex })

  if (boqBlock === undefined) {
    return false
  }

  const roundedValue = roundTo(boqBlock.boq.header.subTotalPrice.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: boqBlock.boq.header.subTotalPrice.html,
    newNumber: roundedValue,
  })

  if (boqBlock.boq.header.subTotalPrice.html === newHtml) {
    return false
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

  return true
}
