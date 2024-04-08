import { useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { IoIosSearch } from 'react-icons/io'

export const SearchBoqRowIcon = (): JSX.Element => {
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <IoIosSearch
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
