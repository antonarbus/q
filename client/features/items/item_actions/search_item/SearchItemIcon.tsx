import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { selectIsLastItem } from '@entities/quotation'

export const SearchItemIcon = (): EmotionJSX.Element => {
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
