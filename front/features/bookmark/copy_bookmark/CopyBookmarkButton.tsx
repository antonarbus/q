import type { ReqBody } from '@back/api/bookmark/getBookmarkHandler'
import { dispatch } from '@shared/lib/redux'
import { IconButton, Tooltip } from '@mui/material'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { toast } from 'sonner'
import { textSlice } from '@shared/lib/froala/textSlice'

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

      if (!item) {
        return
      }

      dispatch(textSlice.actions.setNotEditable())

      dispatch(copySlice.actions.addItem({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyModal())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)
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
