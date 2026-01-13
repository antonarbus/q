import { useGetBookmarkMutation } from '@entity/bookmark/api/useGetBookmarkMutation'
import type { BookmarkFormValues } from '@entity/bookmark/form/types'
import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'

import { dispatch, getState } from '@shared/lib/redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Props = {
  bookmarkFormValues: BookmarkFormValues
}

export const useLoadBookmarkModalOpenedWithDirectLink = (
  props: Props,
): void => {
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

    getBookmarkMutation.mutate({ id: urlParams.bookmarkId })
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
        props.bookmarkFormValues.nameSignal.value = block.name
        props.bookmarkFormValues.categorySignal.value = block.category
        props.bookmarkFormValues.descSignal.value = block.desc
        props.bookmarkFormValues.infoSignal.value = block.info
      }
    }
  }, [getBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      if (
        getBookmarkMutation.error.response?.data.errorCode ===
        'BOOKMARK_NOT_FOUND'
      ) {
        toast.warning('Bookmark not found')
      }

      if (
        getBookmarkMutation.error.response?.data.errorCode ===
        'BOOKMARK_STORAGE_NOT_FOUND'
      ) {
        toast.warning('Bookmark not found, probably deleted')
      }

      if (
        getBookmarkMutation.error.response?.data.errorCode === 'INTERNAL_ERROR'
      ) {
        toast.warning('Internal error')
      }

      void navigate('..')
    }
  }, [getBookmarkMutation.isError])
}
