import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { itemsSlice, selectIsLastBoqRow, useItem, useRow } from '@entities/items'
import { navSlice } from '@shared/nav'

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
      tabIndex={-1}
      onClick={(): void => {
        gsap.to(ref.current, { duration: 0.2, scale: 0.9 })

        if (disabled) return

        flushSync(() => {
          dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
        })

        dispatch(itemsSlice.actions.deleteBoqRowReducer({ itemIndex, rowIndex }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
          dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))
          }, 1000 * theme.item.animationDuration + 500)
        }
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
