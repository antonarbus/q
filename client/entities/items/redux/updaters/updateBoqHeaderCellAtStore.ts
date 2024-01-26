import { dispatch } from '@lib_instances/store'
import type FroalaEditor from 'froala-editor'
import { type MutableRefObject } from 'react'
import { getNumberFromString, getTextContentFromHtml } from '@shared/lib'
import { type BoqHeaderKey } from '../../types'
import { getBoqItemFromStore } from '../getters/getBoqItemFromStore'
import { itemsSlice } from '../itemsSlice'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

type Res = {
  didUpdate: boolean
}

export const updateBoqHeaderCellAtStore = ({
  editorRef,
  itemIndex,
  boqHeaderKey,
}: Props): Res => {
  if (editorRef.current === null) return { didUpdate: false }

  const boqItem = getBoqItemFromStore({ itemIndex })
  if (boqItem === undefined) return { didUpdate: false }

  const prevHtml = boqItem.boq.header[boqHeaderKey].html
  const html = editorRef.current?.html.get()
  const didTextChange = prevHtml !== html
  if (!didTextChange) return { didUpdate: false }

  const cellTextContent = getTextContentFromHtml({ html })

  const cellValueFromHtml = getNumberFromString({
    string: cellTextContent,
  })

  dispatch(itemsSlice.actions.updateBoqHeaderTextReducer({
    itemIndex,
    html,
    value: cellValueFromHtml,
    boqHeaderKey,
  }))

  return { didUpdate: true }
}
