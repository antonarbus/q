import { useSelectorTyped } from 'client/shared/hooks'
import { copySlice } from 'client/entities/copy'
import type { BoqRow } from 'client/shared/types'
import { dispatch, theme } from 'client/shared/clients'
import { RxCross2 } from 'react-icons/rx'
import { itemsSlice, selectIsItemAlone } from 'client/entities/items'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { saveItemsLocally } from 'client/shared/lib'

type Props = {
  itemIndex: number
  rowIndex: number
  boqRow: BoqRow
}

export const DeleteBoqRowIcon = ({ itemIndex, rowIndex, boqRow }: Props): JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null)

  // ! now it is the same as delete item, it should be different
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

        dispatch(copySlice.actions.enterIntoCopyMode())
        dispatch(itemsSlice.actions.deleteBoqRow({ boqRowId: boqRow.id }))

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
