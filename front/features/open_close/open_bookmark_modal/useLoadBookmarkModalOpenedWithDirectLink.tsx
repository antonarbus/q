import {
  type BookmarkFormValues,
  useGetBookmarkMutation,
} from '@entities/bookmark'
import { bookmarkPosAtBlocks, quotationSlice } from '@entities/quotation'
import { dispatch, getState } from '@shared/lib/redux'
import { notify } from '@shared/toast'
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
    const firstBlock = getState().quotation.blocks.at(bookmarkPosAtBlocks)
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

      const block = getState().quotation.blocks.at(bookmarkPosAtBlocks)

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
        notify({
          msg: 'Bookmark not found',
          type: 'warn',
          theme: 'light',
        })

        void navigate('..')
      }
    }
  }, [isError])
}
