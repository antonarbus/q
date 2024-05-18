import { dispatch } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { isFroalaSignal } from '@entities/quotation'
import { notify } from '@shared/ui/top_msg'

type Res = {
  loadBookmark: ({ id }: { id: string }) => void
  isPendingBookmark: boolean
  pendingBookmarkId: string
}

export const useCopyBookmarkAtSearch = (): Res => {
  const { mutate: loadBookmark, isPending: isPendingBookmark, isSuccess, isError, error, data: bookmarkData, variables } = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = bookmarkData

      if (!item) return

      isFroalaSignal.value = false

      dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyContainer())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({ msg: error.response?.data.message, type: 'error', theme: 'light' })
    }
  }, [isError])

  return { loadBookmark, isPendingBookmark, pendingBookmarkId: variables?.id ?? 'missing id' }
}
