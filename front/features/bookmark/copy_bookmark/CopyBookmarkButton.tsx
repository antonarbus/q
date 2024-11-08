import type { ReqBody } from '@back/api/bookmark/getBookmarkRouter'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { isFroalaSignal } from '@entities/quotation'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { notify } from '@shared/toast'

export const CopyBookmarkButton = ({ id }: ReqBody): React.JSX.Element => {
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

      dispatch(copySlice.actions.addItem({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyModal())
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
    <Tooltip
      title='Copy'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
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
    </Tooltip>
  )
}
