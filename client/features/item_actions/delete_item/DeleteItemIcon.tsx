import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { itemsSlice, selectIsLastItem, useItem, saveItemsLocally } from '@entities/items'
import { generalSlice } from '@shared/general'

export const DeleteItemIcon = (): EmotionJSX.Element => {
  const ref = useRef<HTMLSpanElement>(null)
  const { itemIndex } = useItem()

  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable

  return (
    <span
      ref={ref}
      style={{
        color: disabled ? '#acacac' : '#000',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onClick={(): void => {
        gsap.to(ref.current, { duration: 0.2, scale: 0.9 })

        if (disabled) return

        const itemToDelete = getState().items[itemIndex]
        if (!itemToDelete) return

        dispatch(generalSlice.actions.disableFroala())
        dispatch(itemsSlice.actions.deleteItemReducer({ itemId: itemToDelete.id }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            dispatch(generalSlice.actions.enableFroala())

            let msgAboveItemWithIndex = -1

            const itemsLength = getState().items.length

            const isLastItemLeft = itemsLength === 1
            if (isLastItemLeft) {
              msgAboveItemWithIndex = 0
            }

            const doesItemBelowExist = itemsLength >= itemIndex + 1
            if (doesItemBelowExist) {
              msgAboveItemWithIndex = itemIndex
            }

            const isLastItemDeleted = itemsLength + 1 === itemIndex + 1
            if (isLastItemDeleted) {
              msgAboveItemWithIndex = itemIndex - 1
            }

            saveItemsLocally({ msgAboveItemWithIndex })
          }, 1000 * theme.item.animationDuration)
        }
      }}
      onMouseOver={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: disabled ? 1 : 1.3,
          color: disabled ? '#acacac' : '#d25959',
        })
      }}
      onMouseOut={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: 1,
          color: disabled ? '#acacac' : '#000',
        })
      }}
      onMouseDown={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: disabled ? 1 : 0.9,
        })
      }}
    >
      <RxCross2 />
    </span>
  )
}
