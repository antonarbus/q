import { getState } from '@lib_instances/store'
import { type MouseEvent, type ReactNode } from 'react'
import { MdSaveAlt } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useSaveItemMutation } from '@entities/item'
import { boqRowKey, getBoqRowFromStore, useItem, useRow } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const SaveBoqRowIcon = (): ReactNode => {
  const navigate = useNavigate()
  const { mutate: saveBoqRow, data, isPending, isSuccess, isError, error } = useSaveItemMutation()
  const { itemIndex } = useItem()
  const { rowIndex } = useRow()

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

  if (isPending) {
    return (
      <RotatingLoaderIcon />
    )
  }

  if (!isPending) {
    return (
      <MdSaveAlt
        tabIndex={-1}
        onClick={(e: MouseEvent): void => {
          const email = getState().user.email

          if (!email) {
            notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
            navigate('./login')
            return
          }

          const boqRow = getBoqRowFromStore({ rowIndex, itemIndex })

          if (!boqRow) return
          if (boqRow.type === boqRowKey.paste) return

          saveBoqRow({ item: boqRow })
        }}
      />
    )
  }

  return null
}
