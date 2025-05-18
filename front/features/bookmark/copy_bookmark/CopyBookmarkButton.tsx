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
    if (isSuccess === true) {
      const { item } = data

      if (item === undefined) {
        return
      }

      dispatch(textSlice.actions.setNotEditable())

      dispatch(copySlice.actions.addItem({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyModal())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError === true) {
      toast.error(error.response?.data.message)
    }
  }, [isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Copy'
    >
      <IconButton
        onClick={() => {
          loadItem({ id })
        }}
        size='small'
        sx={{
          translate: '0px 1px',
        }}
      >
        {isPending === false && <MdCopyAll />}
        {isPending && <RotatingLoaderIcon />}
      </IconButton>
    </Tooltip>
  )
}
