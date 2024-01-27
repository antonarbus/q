import { dispatch } from '@lib_instances/store'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { roundTo } from 'round-to'
import { getStringWithNewFormattedNumber } from '@shared/lib'
import { getBoqRowFromStore } from '../redux/getters/getBoqRowFromStore'
import { itemsSlice } from '../redux/itemsSlice'
import { type BoqColumnKey } from '../types'

type Props = {
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
  editorRef: MutableRefObject<FroalaEditor | null>
  roundToTwoDecimals: boolean
}

type Res = {
  didUpdate: boolean
}

export const formatBoqRowCellNumber = ({
  itemIndex,
  rowIndex,
  boqColumnKey,
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

  const value = boqRow[boqColumnKey].value
  if (value === null) {
    return {
      didUpdate: false,
    }
  }

  const roundedValue = roundTo(value, 2)

  const html = boqRow[boqColumnKey].html

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

  dispatch(itemsSlice.actions.updateBoqCellReducer({
    itemIndex,
    rowIndex,
    html: newHtml,
    value: roundToTwoDecimals ? roundedValue : value,
    boqColumnKey,
  }))

  editorRef.current.html.set(newHtml)

  return {
    didUpdate: true,
  }
}
