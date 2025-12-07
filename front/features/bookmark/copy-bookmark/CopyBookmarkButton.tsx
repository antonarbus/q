import type { ReqBody } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@entities/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entities/copy/copySlice'
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
        onClick={async (event: React.MouseEvent) => {
          const data = await getBookmarkMutation.mutateAsync({ id })

          if (data !== undefined) {
            // Save scroll position before setNotEditable
            const { scrollX, scrollY } = window

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(scrollX, scrollY)
            })

            if (data.item !== undefined) {
              dispatch(
                copySlice.actions.addItem({
                  item: data.item,
                }),
              )
            }

            dispatch(copySlice.actions.allowToPaste())

            dispatch(
              copySlice.actions.showCopyModal({
                initCursorPos: { x: event.clientX, y: event.clientY },
              }),
            )
          }
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
