import { dispatch, getState } from '@lib_instances/store'
import { roundTo } from 'round-to'
import type { FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils/getStringWithNewFormattedNumber'
import { quotationSlice } from '../redux/quotationSlice'
import { itemType } from '../consts/itemType'
import { bookmarkPosAtBlocks } from '../consts/bookmarkPosAtBlocks'
import type { BoqRowCellKey } from '../consts/boqRowCellKey'

type Props = {
  boqRowCellKey: BoqRowCellKey
  editorRef: FroalaEditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatRowBlockCellNumber = ({
  boqRowCellKey,
  editorRef,
  roundToTwoDecimals,
}: Props): Res => {
  if (editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const block = getState().quotation.blocks[bookmarkPosAtBlocks]
  if (block?.type !== itemType.row) {
    return {
      didUpdate: false,
    }
  }

  const row = block

  const value = row[boqRowCellKey].value

  const roundedValue = roundTo(value, 2)

  const html = row[boqRowCellKey].html

  const newHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber: value,
    newNumber: roundToTwoDecimals ? roundedValue : value,
  })

  if (html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateRowBlockCellReducer({
      html: newHtml,
      value: roundToTwoDecimals ? roundedValue : value,
      boqRowCellKey,
    }),
  )

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
