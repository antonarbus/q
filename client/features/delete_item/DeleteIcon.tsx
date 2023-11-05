import { useSelectorTyped } from 'client/shared/hooks'
import { dispatch, getState, theme } from 'client/shared/clients'
import { RxCross2 } from 'react-icons/rx'
import { itemsSlice, selectIsItemAlone } from 'client/entities/items'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { saveItemsLocally } from 'client/shared/lib'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { copySlice, exitCopyMode } from 'client/entities/copy'

type Props = {
  itemIndex: number
}

export const DeleteIcon = ({ itemIndex }: Props): EmotionJSX.Element => {
  const ref = useRef<HTMLSpanElement>(null)

  const isItemAlone = useSelectorTyped(selectIsItemAlone)
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

        dispatch(copySlice.actions.enterIntoCopyMode())
        dispatch(itemsSlice.actions.deleteItem({ itemId: itemToDelete.id }))

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

        exitCopyMode({ delayed: true }) // todo: check if we really need a delay when Froala is in place
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
