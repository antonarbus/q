import { dispatch } from '@lib_instances/store'
import { IconButton } from '@mui/material'
import type { ReqBody } from '@server/api/deleteItemRouter'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { copySlice } from '@entities/copy'
import { useGetItemMutation } from '@entities/item'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const CopyItemButton = ({ id }: ReqBody): JSX.Element => {
  const { mutate: loadItem, isPending, isSuccess, isError, error, data } = useGetItemMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      if (!data.item) return
      dispatch(copySlice.actions.addItemIntoCopyContainer({ copyItem: data.item, preview: 'preview' }))
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
      {!isPending && <MdCopyAll />}
      {isPending && <RotatingLoaderIcon />}
    </IconButton>
  )
}
