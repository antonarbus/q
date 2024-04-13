import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { useEffect, type ReactNode } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeleteItemMutation, deleteFromItemsCache } from '@entities/item'
import { RotatingLoaderIcon } from '@shared/components'

export const DeleteItemButton = ({ id }: ReqBody): ReactNode => {
  const { mutate, isPending, isSuccess } = useDeleteItemMutation()

  useEffect(() => {
    if (!isSuccess) return
    deleteFromItemsCache({ id })
  }, [isSuccess])

  return (
    <IconButton
      size='small'
      onClick={() => {
        mutate({ id })
      }}
    >
      {!isPending && <MdDeleteOutline />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
