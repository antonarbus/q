import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { flushSync } from 'react-dom'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { itemsSlice, selectIsLastBoqRow, useItem, useRow } from '@entities/quotation'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'

export const DeleteBoqRowIcon = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable

  return (
      <RxCross2
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      css={{
        '&:hover': {
          color: disabled ? '#acacac' : 'red !important',
        },
      }}
      onClick={(): void => {
        if (disabled) return

        flushSync(() => {
          dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
        })

        dispatch(itemsSlice.actions.deleteBoqRowReducer({ itemIndex, rowIndex }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
          dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))
          }, 1000 * theme.item.animationDuration + 500)
        }
      }}
    />
  )
}
