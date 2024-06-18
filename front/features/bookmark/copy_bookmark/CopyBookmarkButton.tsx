import type { ReqBody } from '@back/api/bookmark/deleteBookmarkRouter'
import { dispatch } from '@lib_instances/store'
import { IconButton } from '@mui/material'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components'
import { notify } from '@shared/ui/top_msg'

export const CopyBookmarkButton = ({ id }: ReqBody): JSX.Element => {
  const {
    mutate: loadItem,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useGetBookmarkMutation()

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
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })
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
