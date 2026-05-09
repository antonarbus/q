import type { UrlParam } from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@front/entities/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@front/entities/copy/copySlice'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { IconButton, Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { getPreviewPreparingPromise } from '@front/entities/copy/bookmarkPreviewDeferred'
import { useState } from 'react'
import { MdCopyAll } from 'react-icons/md'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export const CopyBookmarkButtonAtTable = (props: UrlParam): React.JSX.Element => {
  const getBookmarkMutation = useGetBookmarkMutation()

  const [isSpinner, setIsSpinner] = useState(false)

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  return (
    <Tooltip enterDelay={500} enterNextDelay={500} placement='bottom' title='Copy'>
      <IconButton
        onClick={async (event: React.MouseEvent): Promise<void> => {
          setIsSpinner(true)

          const data = await getBookmarkMutation.mutateAsync({ id: props.id })

          // Load block into redux at pos 1000 synchronously so it is available
          // when CopyBookmarkCapture renders and its sub-components read from
          // getState().quotation.blocks[BOOKMARK_POS_AT_BLOCKS].
          reduxHolder.dispatch(
            quotationSlice.actions.loadBlockAtPosThousand({
              block: data.bookmark,
            }),
          )

          reduxHolder.dispatch(copySlice.actions.startPreviewPreparing())

          reduxHolder.dispatch(
            copySlice.actions.setInitCursorPos({
              x: event.clientX,
              y: event.clientY,
            }),
          )

          await getPreviewPreparingPromise()

          setIsSpinner(false)
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
