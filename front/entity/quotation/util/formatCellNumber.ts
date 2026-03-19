import { dispatch } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import type { CellKey } from '@back/entity/quotation/schema'
import { getRowFromStoreByIndex } from '../redux/getter/getRowFromStoreByIndex'
import { quotationSlice } from '../redux/quotationSlice'
import type { Editor } from '@tiptap/react'

type Props = {
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
  editor: Editor | null
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatCellNumber = (props: Props): Res => {
  if (props.editor === null) {
    return {
      didUpdate: false,
    }
  }

  const row = getRowFromStoreByIndex({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
  })

  if (row === undefined) {
    return {
      didUpdate: false,
    }
  }

  const cell = row[props.cellKey]

  const roundedValue = roundTo(cell.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: cell.html,
    newNumber: props.roundToTwoDecimals === true ? roundedValue : cell.value,
  })

  if (cell.html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateCell({
      blockIndex: props.blockIndex,
      rowIndex: props.rowIndex,
      html: newHtml,
      value: props.roundToTwoDecimals === true ? roundedValue : cell.value,
      cellKey: props.cellKey,
    }),
  )

  props.editor.commands.setContent(newHtml, { emitUpdate: false })

  return {
    didUpdate: true,
  }
}
