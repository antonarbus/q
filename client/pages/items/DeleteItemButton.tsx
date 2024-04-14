import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { MdDeleteOutline } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useDeleteItemMutation, deleteFromItemsCache } from '@entities/item'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const DeleteItemButton = ({ id }: ReqBody): JSX.Element => {
  const { mutate: deleteItem, isPending, isSuccess, isError, error } = useDeleteItemMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      deleteFromItemsCache({ id })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'did not find') {
        notify({ msg: 'Not found', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'no item in bucket') {
        notify({ msg: 'Not item in storage', type: 'warn', theme: 'light' })
        return
      }

      if (error.response?.data.message === 'not logged in') {
        notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
        return
      }

      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }
  }, [isError])

  return (
    <IconButton
      size='small'
      onClick={() => {
        deleteItem({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
