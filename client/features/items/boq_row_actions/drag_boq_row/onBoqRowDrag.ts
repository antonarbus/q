import { dispatch } from '@lib_instances/store'
import { arrayMoveImmutable } from 'array-move'
import { getBoqRowsFromStore, quotationSlice } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  oldIndex: number
  newIndex: number
  itemIndex: number
}

const onBoqRowDragStart = ({ itemIndex }: Pick<Props, 'itemIndex'>): void => {
  document.body.style.cursor = 'move'
  dispatch(quotationSlice.actions.disableFroalaReducer({ itemIndex }))
}

const onBoqRowDragEnd = ({ oldIndex, newIndex, itemIndex }: Props): void => {
  dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))

  document.body.style.removeProperty('cursor')

  if (oldIndex !== newIndex) {
    const boqRows = getBoqRowsFromStore({ itemIndex })
    if (boqRows === undefined) return
    const reOrderedBoqRows = arrayMoveImmutable(boqRows, oldIndex, newIndex)
    dispatch(quotationSlice.actions.reOrderBoqRowsReducer({ reOrderedBoqRows, itemIndex }))
    dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
  }
}

export const onBoqRowDrag = {
  start: onBoqRowDragStart,
  end: onBoqRowDragEnd,
}
