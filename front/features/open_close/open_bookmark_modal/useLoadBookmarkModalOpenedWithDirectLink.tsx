import { useGetBookmarkMutation } from '@entities/bookmark'
import {
  bookmarkPosAtBlocks,
  itemType,
  quotationSlice,
} from '@entities/quotation'
import { dispatch, getState } from '@lib_instances/store'
import { useParams } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import type { Signal } from '@preact/signals-react'

type Props = {
  nameSignal: Signal<string>
  categorySignal: Signal<string>
  descSignal: Signal<string>
  infoSignal: Signal<string>
}

export const useLoadBookmarkModalOpenedWithDirectLink = ({
  nameSignal,
  categorySignal,
  descSignal,
  infoSignal,
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
        quotationSlice.actions.loadBookmarkAtPosThousandReducer({
          block: data.item,
        }),
      )

      const firstBlock = getState().quotation.blocks.at(bookmarkPosAtBlocks)

      if (firstBlock) {
        nameSignal.value = firstBlock.name ?? ''
        categorySignal.value = firstBlock.category ?? ''
        descSignal.value = firstBlock.desc ?? ''
        infoSignal.value = firstBlock.info ?? ''
      }
    }
  }, [isBookmarkSuccess])
}
