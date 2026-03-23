import { dispatch, getState } from '@front/shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@front/shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import { BOOKMARK_POS_AT_BLOCKS } from '../redux/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entity/quotation/schema'
import { quotationSlice } from '../redux/quotationSlice'
import type { Editor } from '@tiptap/react'

type Props = {
  cellKey: CellKey
  editor: Editor | null
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBookmarkedRowCellNumber = (props: Props): Res => {
  if (props.editor === null) {
    return {
      didUpdate: false,
    }
  }

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== 'row') {
    return {
      didUpdate: false,
    }
  }

  const row = block

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
    quotationSlice.actions.updateBookmarkedRowCell({
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
