import type { ReqBody } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch } from '@shared/lib/redux'
import type { JSX } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const CopyBookmarkButton = ({ id }: ReqBody): JSX.Element => {
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isSuccess === true) {
      const { item } = getBookmarkMutation.data

      if (item !== undefined) {
        dispatch(textSlice.actions.setNotEditable())
        dispatch(copySlice.actions.addItem({ item }))
        dispatch(copySlice.actions.allowToPaste())
        dispatch(copySlice.actions.showCopyModal())
      }
    }
  }, [getBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Copy'
    >
      <IconButton
        onClick={() => {
          getBookmarkMutation.mutate({ id })
        }}
        size='small'
        sx={{
          translate: '0px 1px',
        }}
      >
        {getBookmarkMutation.isPending === true ? (
          <RotatingLoaderIcon />
        ) : (
          <MdCopyAll />
        )}
      </IconButton>
    </Tooltip>
  )
}
