import { useGetBookmarkMutation } from '@entity/bookmark/api/useGetBookmarkMutation'
import { copySlice } from '@entity/copy/copySlice'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { dispatch } from '@shared/lib/redux'
import { useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { toast } from 'sonner'

type Params = {
  bookmarkId: string
  cursorPos: {
    x: number
    y: number
  }
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

      dispatch(
        quotationSlice.actions.loadBlockAtPosThousandReducer({
          block: data.bookmark,
        }),
      )

      dispatch(copySlice.actions.startPreviewPreparing())

      dispatch(
        copySlice.actions.setInitCursorPos({
          x: params.cursorPos.x,
          y: params.cursorPos.y,
        }),
      )
    },
    [getBookmarkMutation],
  )

  return {
    mutateAsync,
    isPending: getBookmarkMutation.isPending,
    bookmarkId: getBookmarkMutation.variables?.id,
  }
}
