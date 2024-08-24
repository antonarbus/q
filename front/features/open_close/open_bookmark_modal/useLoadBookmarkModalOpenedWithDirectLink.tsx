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
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'

type Props = {
  bookmarkFromValues: BookmarkFromValues
}

export const useLoadBookmarkModalOpenedWithDirectLink = ({
  bookmarkFromValues,
}: Props): void => {
  const { id } = useParams()

  const {
    mutate: loadBookmark,
    isSuccess: isBookmarkSuccess,
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
    if (isBookmarkSuccess && data.item) {
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
  }, [isBookmarkSuccess])
}
