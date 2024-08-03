import { useGetBookmarkMutation } from '@entities/bookmark'
import { quotationSlice } from '@entities/quotation'
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
    const firstBlock = getState().quotation.blocks.at(0)
    const isOpenedFromButton = Boolean(firstBlock)
    if (isOpenedFromButton) return
    if (!id) return

    loadBookmark({ id })
  })

  useUpdateEffect(() => {
    if (isBookmarkSuccess && data.item) {
      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: {
            type: 'quotation',
            id: 'edit-bookmark',
            name: 'edit-bookmark',
            category: 'edit-bookmark',
            desc: 'edit-bookmark',
            info: 'edit-bookmark',
            email: 'edit-bookmark',
            sharedWith: [],
            preview: 'edit-bookmark',
            blocks: [data.item],
          },
        }),
      )

      const firstBlock = getState().quotation.blocks.at(0)

      if (firstBlock) {
        nameSignal.value = firstBlock.name ?? ''
        categorySignal.value = firstBlock.category ?? ''
        descSignal.value = firstBlock.desc ?? ''
        infoSignal.value = firstBlock.info ?? ''
      }
    }
  }, [isBookmarkSuccess])
}
