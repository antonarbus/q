import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { type MouseEvent } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { copySlice } from '@entities/copy'
import { isItemsFroalaSignal, itemsSlice, selectIsLastItem, useItem } from '@entities/items'
import { className } from '@shared/consts/className'
import { navSlice } from '@shared/nav'
import { fixElementDimensionStyle } from '@shared/utils/fixElementDimensionStyle'

export const SearchItemIcon = (): EmotionJSX.Element => {
  const { itemIndex } = useItem()

  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable

  return (
    <IoIosSearch
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        alert('search')
      }}
    />
  )
}
