import {
  type BookmarkFormValues,
  useGetBookmarkMutation,
} from '@entities/bookmark'
import { BOOKMARK_POS_AT_BLOCKS, quotationSlice } from '@entities/quotation'
import { dispatch, getState } from '@shared/lib/redux'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  bookmarkFromValues: BookmarkFormValues
}

export const useLoadBookmarkModalOpenedWithDirectLink = ({
  bookmarkFromValues,
}: Props): void => {
  const { bookmarkId } = useParams()
  const navigate = useNavigate()

  const {
    mutate: loadBookmark,
    isSuccess,
    isError,
    error,
    data,
  } = useGetBookmarkMutation()

  useEffectOnce(() => {
    const firstBlock = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)
    const isOpenedFromButton = Boolean(firstBlock)

    if (isOpenedFromButton) {
      return
    }

    if (!bookmarkId) {
      return
    }

    loadBookmark({ id: bookmarkId })
  })

  useUpdateEffect(() => {
    if (isSuccess && data.item) {
      dispatch(
        quotationSlice.actions.loadBlockAtPosThousandReducer({
          block: data.item,
        }),
      )

      const block = getState().quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS)

      if (block) {
        bookmarkFromValues.nameSignal.value = block.name ?? ''
        bookmarkFromValues.categorySignal.value = block.category ?? ''
        bookmarkFromValues.descSignal.value = block.desc ?? ''
        bookmarkFromValues.infoSignal.value = block.info ?? ''
      }
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'not found') {
        toast.warning('Bookmark not found')
        void navigate('..')
      }
    }
  }, [isError])
}
