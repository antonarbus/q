import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { getState, useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useSaveItemMutation } from '@entities/item'
import { itemKey, selectIsLastItem, useItem, useRow } from '@entities/quotation'

export const SaveItemIcon = (): EmotionJSX.Element => {
  const { mutate: saveItem, data, isPending, isSuccess, isError, error } = useSaveItemMutation()
  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable
  const { itemIndex } = useItem()

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

        const item = getState().items.at(itemIndex)
        if (!item) return
        if (item.type === itemKey.paste) return

        saveItem({
          email,
          id: item.id,
          type: item.type,
          category: 'category',
          name: 'name',
          tag: 'tag',
          item,
        })
      }}
    />
  )
}
