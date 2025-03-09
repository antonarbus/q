import { dispatch } from '@shared/lib/redux'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { toast } from 'sonner'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkRouter'
import type { AxiosError } from 'axios'
import { textSlice } from '@shared/lib/froala/textSlice'

export type LoadBookmark = UseMutateAsyncFunction<
  ResBody,
  AxiosError<ResBody>,
  Payload
>

type Res = {
  loadBookmark: LoadBookmark
  isPendingBookmark: boolean
  pendingBookmarkId: string
}

export const useCopyBookmarkAtSearch = (): Res => {
  const {
    mutateAsync: loadBookmark,
    isPending: isPendingBookmark,
    isSuccess,
    isError,
    error,
    data: bookmarkData,
    variables,
  } = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (isSuccess) {
      const { item } = bookmarkData

      if (!item) {
        return
      }

      dispatch(textSlice.actions.setNotEditable())

      dispatch(copySlice.actions.addItem({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyModal())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      toast.error(error.response?.data.message)
    }
  }, [isError])

  return {
    loadBookmark,
    isPendingBookmark,
    pendingBookmarkId: variables?.id ?? 'missing id',
  }
}
