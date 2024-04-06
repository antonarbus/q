import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { gsap } from 'gsap'
import { type MouseEvent, useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, itemsSlice, selectIsLastItem, useItem } from '@entities/items'
import { className } from '@shared/consts/className'
import { navSlice } from '@shared/nav'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'

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
      tabIndex={-1}
      onClick={(e: MouseEvent): void => {
        gsap.to(ref.current, { duration: 0.2, scale: 0.9 })

        if (disabled) return

        const itemToDelete = getState().items[itemIndex]

        if (!itemToDelete) return

        const clickedIconElement = e.target
        if (!(clickedIconElement instanceof Element)) return
        const itemElement = clickedIconElement.closest(`.${className.item}`)
        if (!(itemElement instanceof Element)) return
        const paperElement = itemElement.querySelector(`.${className.paper}`)
        if (!(paperElement instanceof HTMLElement)) return

        // width of animated element is changed for unknown reason, can't explain the issue, so let's fix it for animation purpose
        fixElementDimensionStyle({ element: paperElement })

        isItemsFroalaSignal.value = false
        dispatch(itemsSlice.actions.deleteItemReducer({ itemId: itemToDelete.id }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            isItemsFroalaSignal.value = true
            dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
          }, 1000 * theme.item.animationDuration + 500)
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
