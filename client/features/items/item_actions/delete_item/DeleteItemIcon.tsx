import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { type MouseEvent } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, quotationSlice, selectIsLastItem, useItem } from '@entities/quotation'
import { className } from '@shared/consts/className'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'

export const DeleteItemIcon = (): EmotionJSX.Element => {
  const { itemIndex } = useItem()

  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable

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
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        const itemToDelete = getState().quotation.items[itemIndex]

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
        dispatch(quotationSlice.actions.deleteItemReducer({ itemId: itemToDelete.id }))
        dispatch(copySlice.actions.forbidAllActions())

        setTimeout(() => {
          dispatch(copySlice.actions.allowAllActions())
        }, 1000 * theme.item.animationDuration)

        const isCopyContainer = getState().copy.isCopyContainer

        if (!isCopyContainer) {
          setTimeout(() => {
            isItemsFroalaSignal.value = true
            dispatch(navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }))
          }, 1000 * theme.item.animationDuration + 500)
        }
      }}
    />
  )
}
