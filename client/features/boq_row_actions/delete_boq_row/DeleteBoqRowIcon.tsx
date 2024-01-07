import { useSelectorTyped } from 'client/shared/hooks'
import { copySlice } from 'client/entities/copy'
import { dispatch, getState, theme } from 'client/shared/clients'
import { RxCross2 } from 'react-icons/rx'
import { itemsSlice, selectIsLastBoqRow, useItem, useRow } from 'client/entities/items'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { saveItemsLocally } from 'client/shared/lib'

export const DeleteBoqRowIcon = (): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null)
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

  const isLastBoqRow = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isLastBoqRow || !isDeletable

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

        dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
        dispatch(itemsSlice.actions.deleteBoqRowReducer({ itemIndex, rowIndex }))

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
            dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))
          }, 1000 * theme.item.animationDuration)
        }

        saveItemsLocally()
      }}
      onMouseOver={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: disabled ? 1 : 2.3,
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
