import { useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useItem, useRow } from '@entities/items'

export const SaveBoqRowIcon = (): JSX.Element => {
  const { rowIndex } = useRow()
  const { itemIndex } = useItem()
  const isCopyable = useSelectorTyped(state => state.copy.isCopyable)
  const disabled = !isCopyable

  return (
    <MdSaveAlt
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        alert('save')
      }}
    />
  )
}
