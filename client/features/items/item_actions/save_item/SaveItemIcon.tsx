import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { getState, useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useSaveItemMutation } from '@entities/item'
import { selectIsLastItem } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'

export const SaveItemIcon = (): EmotionJSX.Element => {
  const { mutate: saveItem, data, isPending, isSuccess, isError, error } = useSaveItemMutation()
  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable

  return (
    <MdSaveAlt
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        const email = getState().user.email

        if (!email) return

        alert('save')
        saveItem({
          id: nanoid(5),
          email,
          category: 'category',
          name: 'name',
          tag: 'tag',
          item: { key: 'value' },
        })
      }}
    />
  )
}
