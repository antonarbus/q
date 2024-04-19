import { dispatch } from '@lib_instances/store'
import { roundTo } from 'round-to'
import { type FroalaEditorRef } from '@shared/types/froala'
import { getStringWithNewFormattedNumber } from '@shared/utils'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'
import { quotationSlice } from '../redux/quotationSlice'
import { type BoqRowCellKey } from '../types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
  editorRef: FroalaEditorRef
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBoqRowCellNumber = ({
  itemIndex,
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

  const boqRow = getBoqRowFromStore({ itemIndex, rowIndex })
  if (boqRow === undefined) {
    return {
      didUpdate: false,
    }
  }

  const value = boqRow[boqRowCellKey].value
  if (value === null) {
    return {
      didUpdate: false,
    }
  }

  const roundedValue = roundTo(value, 2)

  const html = boqRow[boqRowCellKey].html

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

  dispatch(quotationSlice.actions.updateBoqCellReducer({
    itemIndex,
    rowIndex,
    html: newHtml,
    value: roundToTwoDecimals ? roundedValue : value,
    boqRowCellKey,
  }))

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
