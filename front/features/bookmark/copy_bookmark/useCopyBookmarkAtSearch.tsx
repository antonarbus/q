import { dispatch } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { useGetBookmarkMutation } from '@entities/bookmark'
import { copySlice } from '@entities/copy'
import { isFroalaSignal } from '@entities/quotation'
import { notify } from '@shared/toast'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import type {
  ReqBody as Payload,
  ResBody,
} from '@back/api/bookmark/getBookmarkRouter'
import type { AxiosError } from 'axios'

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

      if (!item) return

      isFroalaSignal.value = false

      dispatch(copySlice.actions.addItemIntoCopyContainer({ item }))
      dispatch(copySlice.actions.allowToPaste())
      dispatch(copySlice.actions.showCopyContainer())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      notify({
        msg: error.response?.data.message,
        type: 'error',
        theme: 'light',
      })
    }
  }, [isError])

  return {
    loadBookmark,
    isPendingBookmark,
    pendingBookmarkId: variables?.id ?? 'missing id',
  }
}
