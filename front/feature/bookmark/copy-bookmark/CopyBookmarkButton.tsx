import type { UrlParam } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@entity/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entity/copy/copySlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { textSlice } from '@shared/lib/tiptap/textSlice'
import { dispatch } from '@shared/lib/redux'
import type { JSX } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const CopyBookmarkButton = (props: UrlParam): JSX.Element => {
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
          const data = await getBookmarkMutation.mutateAsync({ id: props.id })

          if (data !== undefined) {
            const persistedScrollX = window.scrollX
            const persistedScrollY = window.scrollY

            dispatch(textSlice.actions.setNotEditable())

            // Restore scroll position after React renders
            requestAnimationFrame(() => {
              window.scrollTo(persistedScrollX, persistedScrollY)
            })

            if (data.bookmark !== undefined) {
              dispatch(
                copySlice.actions.addItem({
                  item: data.bookmark,
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
