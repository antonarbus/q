import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import { dispatch, getState } from '@shared/lib/redux'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { roundTo } from 'round-to'
import { BOOKMARK_POS_AT_BLOCKS } from '../const/bookmarkPosAtBlocks'
import type { CellKey } from '../const/cellKey'
import { itemType } from '../const/itemType'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  cellKey: CellKey
  editorRef: FroalaEditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBookmarkedRowCellNumber = ({
  cellKey,
  editorRef,
  roundToTwoDecimals,
}: Props): Res => {
  if (editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const block = getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS]

  if (block?.type !== itemType.row) {
    return {
      didUpdate: false,
    }
  }

  const row = block

  const cell = row[cellKey]

  const roundedValue = roundTo(cell.value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: cell.html,
    newNumber: roundToTwoDecimals === true ? roundedValue : cell.value,
  })

  if (cell.html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateBookmarkedRowCellReducer({
      html: newHtml,
      value: roundToTwoDecimals === true ? roundedValue : cell.value,
      cellKey,
    }),
  )

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
