/* eslint-disable @typescript-eslint/strict-void-return */
import type { UrlParam } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@entity/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entity/copy/copySlice'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { dispatch, useSelector } from '@shared/lib/redux'
import { useEffect, useState } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const CopyBookmarkButton = (props: UrlParam): React.JSX.Element => {
  const getBookmarkMutation = useGetBookmarkMutation()

  const [isSpinner, setIsSpinner] = useState(false)

  const isPreviewPreparing = useSelector(
    (state) => state.copy.isPreviewPreparing,
  )

  useEffect(() => {
    if (isPreviewPreparing === false) {
      requestAnimationFrame(() => {
        setIsSpinner(false)
      })
    }
  }, [isPreviewPreparing])

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
        onClick={async (event: React.MouseEvent): Promise<void> => {
          setIsSpinner(true)

          const data = await getBookmarkMutation.mutateAsync({ id: props.id })

          // Load block into redux at pos 1000 synchronously so it is available
          // when CopyBookmarkCapture renders and its sub-components read from
          // getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS].
          dispatch(
            quotationSlice.actions.loadBlockAtPosThousandReducer({
              block: data.bookmark,
            }),
          )

          dispatch(copySlice.actions.startPreviewPreparing())

          dispatch(
            copySlice.actions.setInitCursorPos({
              x: event.clientX,
              y: event.clientY,
            }),
          )
        }}
        size='small'
        sx={{
          translate: '0px 1px',
        }}
      >
        {isSpinner === true ? <RotatingLoaderIcon /> : <MdCopyAll />}
      </IconButton>
    </Tooltip>
  )
}
