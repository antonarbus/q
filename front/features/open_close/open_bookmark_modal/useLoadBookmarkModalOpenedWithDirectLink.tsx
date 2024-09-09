import {
  type BookmarkFromValues,
  useGetBookmarkMutation,
} from '@entities/bookmark'
import {
  bookmarkPosAtBlocks,
  itemType,
  quotationSlice,
} from '@entities/quotation'
import { dispatch, getState } from '@lib_instances/store'
import { notify } from '@shared/toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  bookmarkFromValues: BookmarkFromValues
}

export const useLoadBookmarkModalOpenedWithDirectLink = ({
  bookmarkFromValues,
}: Props): void => {
  const { id } = useParams()
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

    if (isOpenedFromButton) return
    if (!id) return

    loadBookmark({ id })
  })

  useUpdateEffect(() => {
    if (isSuccess && data.item) {
      if (data.item.type !== itemType.boq) return

      dispatch(
        quotationSlice.actions.loadBlockAtPosThousandReducer({
          block: data.item,
        }),
      )

      const firstBlock = getState().quotation.blocks.at(bookmarkPosAtBlocks)

      if (firstBlock) {
        bookmarkFromValues.nameSignal.value = firstBlock.name ?? ''
        bookmarkFromValues.categorySignal.value = firstBlock.category ?? ''
        bookmarkFromValues.descSignal.value = firstBlock.desc ?? ''
        bookmarkFromValues.infoSignal.value = firstBlock.info ?? ''
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

        navigate('..')
      }
    }
  }, [isError])
}
