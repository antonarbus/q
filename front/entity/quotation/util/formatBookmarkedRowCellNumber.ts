import { dispatch, getState } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import { BOOKMARK_POS_AT_BLOCKS } from '../const/bookmarkPosAtBlocks'
import type { CellKey } from '@back/entity/quotation/schema'
import { quotationSlice } from '../redux/quotationSlice'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  cellKey: CellKey
  editorRef: EditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBookmarkedRowCellNumber = (props: Props): Res => {
  if (props.editorRef.current === null) {
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
    quotationSlice.actions.updateBookmarkedRowCellReducer({
      html: newHtml,
      value: props.roundToTwoDecimals === true ? roundedValue : cell.value,
      cellKey: props.cellKey,
    }),
  )

  props.editorRef.current.commands.setContent(newHtml, { emitUpdate: false })

  return {
    didUpdate: true,
  }
}
