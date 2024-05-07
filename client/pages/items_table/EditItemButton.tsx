import { dispatch } from '@lib_instances/store'
import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useUpdateEffect } from 'react-use'
import { copySlice } from '@entities/copy'
import { useGetItemMutation } from '@entities/item'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const EditItemButton = ({ id }: ReqBody): JSX.Element => {
  const { mutate: loadItem, isPending, isSuccess, isError, error, data } = useGetItemMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = data

      if (!item) return

      isFroalaSignal.value = false

      dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyContainer())
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
