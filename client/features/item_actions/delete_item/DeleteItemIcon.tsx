import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { itemsSlice, selectIsLastItem, useItem, saveItemsLocally } from '@entities/items'
import { dispatch, getState, theme } from '@shared/clients'
import { generalSlice } from '@shared/general'
import { useSelectorTyped } from '@shared/hooks'

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

        dispatch(copySlice.actions.forbidToPaste())
        dispatch(copySlice.actions.forbidToCopy())
        dispatch(copySlice.actions.forbidToCut())
        dispatch(copySlice.actions.forbidToDelete())

        setTimeout(() => {
          dispatch(copySlice.actions.allowToPaste())
          dispatch(copySlice.actions.allowToCopy())
          dispatch(copySlice.actions.allowToCut())
          dispatch(copySlice.actions.allowToDelete())
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            dispatch(generalSlice.actions.enableFroala())
          }, 1000 * theme.item.animationDuration)
        }

        saveItemsLocally()
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
