import type {
  ErrorResBody,
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkHandler'
import { useGetBookmarkMutation } from '@entities/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entities/copy/copySlice'
import { textSlice } from '@shared/lib/froala/textSlice'
import { dispatch } from '@shared/lib/redux'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

export type LoadBookmark = UseMutateAsyncFunction<
  ResBody,
  AxiosError<ErrorResBody>,
  Payload
>

type Res = {
  loadBookmark: LoadBookmark
  isPendingBookmark: boolean
  pendingBookmarkId: string
}

export const useCopyBookmarkAtSearch = (): Res => {
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isSuccess === true) {
      const { item } = getBookmarkMutation.data

      if (item !== undefined) {
        dispatch(textSlice.actions.setNotEditable())
        dispatch(copySlice.actions.addItem({ item }))
        dispatch(copySlice.actions.allowToPaste())
        dispatch(copySlice.actions.showCopyModal())
      }
    }
  }, [getBookmarkMutation.isSuccess])

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  return {
    loadBookmark: getBookmarkMutation.mutateAsync,
    isPendingBookmark: getBookmarkMutation.isPending,
    pendingBookmarkId: getBookmarkMutation.variables?.id ?? 'missing id',
  }
}
