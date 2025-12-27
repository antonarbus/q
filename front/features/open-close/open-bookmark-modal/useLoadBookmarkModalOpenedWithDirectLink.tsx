import { useGetBookmarkMutation } from '@entities/bookmark/api/useGetBookmarkMutation'
import type { BookmarkFormValues } from '@entities/bookmark/form/types'
import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { quotationSlice } from '@entities/quotation/redux/quotationSlice'

import { dispatch, getState } from '@shared/lib/redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  bookmarkFromValues: BookmarkFormValues
}

export const useLoadBookmarkModalOpenedWithDirectLink = ({
  bookmarkFromValues,
}: Props): void => {
  const urlParams = useParams()
  const navigate = useNavigate()

  const getBookmarkMutation = useGetBookmarkMutation()

  useEffectOnce(() => {
    const firstBlock = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)
    const isOpenedFromButton = Boolean(firstBlock)

    if (isOpenedFromButton === true) {
      return
    }

    if (urlParams.bookmarkId === undefined) {
      return
    }

    getBookmarkMutation.mutate({ bookmarkId: urlParams.bookmarkId })
  })

  useUpdateEffect(() => {
    if (getBookmarkMutation.data?.bookmark === undefined) {
      return
    }

    if (getBookmarkMutation.isSuccess === true) {
      dispatch(
        quotationSlice.actions.loadBlockAtPosThousandReducer({
          block: getBookmarkMutation.data.bookmark,
        }),
      )

      const block = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

      if (block !== undefined) {
        bookmarkFromValues.nameSignal.value = block.name
        bookmarkFromValues.categorySignal.value = block.category
        bookmarkFromValues.descSignal.value = block.desc
        bookmarkFromValues.infoSignal.value = block.info
      }
    }
  }, [getBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      if (getBookmarkMutation.error.response?.data.errorCode === 'NOT_FOUND') {
        toast.warning('Bookmark not found')
        void navigate('..')
      }
    }
  }, [getBookmarkMutation.isError])
}
