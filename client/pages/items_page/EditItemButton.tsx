import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useUpdateEffect } from 'react-use'
import { useGetItemMutation } from '@entities/item'
import { RotatingLoaderIcon } from '@shared/components'
import { route } from '@shared/consts/route'
import { notify } from '@shared/ui/top_msg'

export const EditItemButton = ({ id }: ReqBody): JSX.Element => {
  const navigate = useNavigate()
  const { mutate: loadItem, isPending, isSuccess, isError, error, data } = useGetItemMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = data
      if (!item) return
      navigate(`./${route.editItem}`, { state: { item } })
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'light' })
    }
  }, [isError])

  return (
    <IconButton
      size='small'
      onClick={() => {
        loadItem({ id })
      }}
      sx={{
        translate: '0px 1px',
      }}
    >
      {!isPending && <AiTwotoneEdit />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
