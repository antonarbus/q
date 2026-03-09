import { copySlice } from '@entity/copy/copySlice'
import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { lockScrollOnce } from '@shared/lib/lockScrollOnce'
import { useEffect } from 'react'
import { getCleanPaperHtml } from '@shared/util/html-getter/getCleanPaperHtml'
import { cls } from '@shared/cls'

let previewPreparingDeferred = Promise.withResolvers()

export const getPreviewPreparingPromise = async (): Promise<unknown> => {
  previewPreparingDeferred = Promise.withResolvers()

  return previewPreparingDeferred.promise
}

export const useBookmarkCopyPreviewCapturer = (
  containerRef: React.RefObject<HTMLDivElement | null>,
): void => {
  const bookmarkBlock = useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  useEffect(() => {
    if (bookmarkBlock === undefined) {
      return
    }

    if (containerRef.current === null) {
      return
    }

    const paperElement = containerRef.current.querySelector(`.${cls.paper}`)

    if (paperElement instanceof HTMLElement === false) {
      return
    }

    const paperHtml = getCleanPaperHtml({ paperElement })

    lockScrollOnce()
    dispatch(textSlice.actions.setNotEditable())

    const div = document.createElement('div')
    div.innerHTML = paperHtml

    const imageSrcList = Array.from(div.querySelectorAll('img'))
      .map((img) => img.src)
      .filter(Boolean)

    const imageLoadedPromiseList = imageSrcList.map(async (src) => {
      const imageLoadedDeferred = Promise.withResolvers()

      const image = new Image()

      image.onload = (): void => {
        imageLoadedDeferred.resolve()
      }

      image.onerror = (): void => {
        imageLoadedDeferred.resolve()
      }

      image.src = src

      return imageLoadedDeferred.promise
    })

    void Promise.all(imageLoadedPromiseList).then(() => {
      dispatch(
        copySlice.actions.addItem({
          item: bookmarkBlock,
          preview: paperHtml,
        }),
      )

      dispatch(copySlice.actions.allowToPaste())

      dispatch(copySlice.actions.stopPreviewPreparing())

      if (getState().copy.isVisible === false) {
        dispatch(copySlice.actions.showCopyModal())
      }

      dispatch(quotationSlice.actions.removeBlockFromPosThousand())

      previewPreparingDeferred.resolve()
    })
  }, [bookmarkBlock])
}
