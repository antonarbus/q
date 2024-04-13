import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import { getState, useSelectorTyped } from '@lib_instances/store'
import { type MouseEvent } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useSaveItemMutation } from '@entities/item'
import { itemKey, selectIsLastItem, useItem } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'

export const SaveItemIcon = (): EmotionJSX.Element => {
  const navigate = useNavigate()
  const { mutate: saveItem, data, isPending, isSuccess, isError, error } = useSaveItemMutation()
  const isItemAlone = useSelectorTyped(selectIsLastItem)
  const isDeletable = useSelectorTyped(state => state.copy.isDeletable)
  const disabled = isItemAlone || !isDeletable
  const { itemIndex } = useItem()

  // todo: add spinner

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'inserted') {
        notify({ msg: 'Saved', type: 'success', position: 'bottom-center' })
      }

      if (data.message === 'updated') {
        notify({ msg: 'Updated', type: 'success', position: 'bottom-center' })
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'not logged in') {
        notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      }

      if (error.response?.data.message === 'not owner') {
        notify({ msg: 'Now owner', type: 'warn', theme: 'light' })
      }

      if (error.response?.data.message === 'not saved') {
        notify({ msg: 'Now saved', type: 'error', theme: 'light' })
      }
    }
  }, [isError])

  return (
    <MdSaveAlt
      tabIndex={-1}
      style={{
        color: disabled ? '#acacac' : '#000',
      }}
      onClick={(e: MouseEvent): void => {
        if (disabled) return

        const email = getState().user.email
        if (!email) {
          notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
          navigate('./login')
          return
        }

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
