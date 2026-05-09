import { useGetBookmarkMutation } from '@front/entities/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@front/entities/clipboard/copySlice'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { getPreviewPreparingPromise } from '@front/entities/clipboard/bookmarkPreviewDeferred'

type Params = {
  bookmarkId: string
}

type Res = {
  mutateAsync: (params: Params) => Promise<void>
  isPending: boolean
  bookmarkId: string | undefined
}

export const useCopyBookmarkAtSearch = (): Res => {
  const getBookmarkMutation = useGetBookmarkMutation()

  useUpdateEffect(() => {
    if (getBookmarkMutation.isError === true) {
      toast.error(getBookmarkMutation.error.response?.data.message)
    }
  }, [getBookmarkMutation.isError])

  const mutateAsync = useCallback(
    async (params: Params): Promise<void> => {
      const data = await getBookmarkMutation.mutateAsync({
        id: params.bookmarkId,
      })

      reduxHolder.dispatch(
        quotationSlice.actions.loadBlockAtPosThousand({
          block: data.bookmark,
        }),
      )

      reduxHolder.dispatch(copySlice.actions.startPreviewPreparing())

      await getPreviewPreparingPromise()
    },
    [getBookmarkMutation],
  )

  return {
    mutateAsync,
    isPending: getBookmarkMutation.isPending,
    bookmarkId: getBookmarkMutation.variables?.id,
  }
}
