import { dispatch } from '@shared/lib/redux'
import { roundTo } from 'round-to'
import type { FroalaEditorRef } from '@shared/type/froala'
import { getStringWithNewFormattedNumber } from '@shared/util/getStringWithNewFormattedNumber'
import { getBoqRowFromStore } from '../redux/getter/getBoqRowFromStore'
import { quotationSlice } from '../redux/quotationSlice'
import type { BoqRowCellKey } from '../const/boqRowCellKey'

type Props = {
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
  editorRef: FroalaEditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBoqRowCellNumber = ({
  blockIndex,
  rowIndex,
  boqRowCellKey,
  editorRef,
  roundToTwoDecimals,
}: Props): Res => {
  if (editorRef.current === null) {
    return {
      didUpdate: false,
    }
  }

  const boqRow = getBoqRowFromStore({ blockIndex, rowIndex })

  if (boqRow === undefined) {
    return {
      didUpdate: false,
    }
  }

  const { value, html } = boqRow[boqRowCellKey]

  const roundedValue = roundTo(value, 2)

  const newHtml = getStringWithNewFormattedNumber({
    string: html,
    oldNumber: value,
    newNumber: roundToTwoDecimals === true ? roundedValue : value,
  })

  if (html === newHtml) {
    return {
      didUpdate: false,
    }
  }

  dispatch(
    quotationSlice.actions.updateBoqCellReducer({
      blockIndex,
      rowIndex,
      html: newHtml,
      value: roundToTwoDecimals === true ? roundedValue : value,
      boqRowCellKey,
    }),
  )

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
