import { copySlice } from '@front/entities/copy/copySlice'
import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux'
import { useEffect } from 'react'
import { getCleanPaperHtml } from '@front/shared/util/html-getter/getCleanPaperHtml'
import { cls } from '@front/shared/cls'

let previewPreparingDeferred = Promise.withResolvers()

export const getPreviewPreparingPromise = async (): Promise<unknown> => {
  previewPreparingDeferred = Promise.withResolvers()

  return await previewPreparingDeferred.promise
}

export const useBookmarkCopyPreviewCapturer = (
  containerRef: React.RefObject<HTMLDivElement | null>,
): void => {
  const bookmarkBlock = reduxHolder.useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  useEffect(() => {
    const waitImagesToLoadAndShowItemInCopyContainer = async (): Promise<void> => {
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
      const div = document.createElement('div')
      div.innerHTML = paperHtml
      const imageSrcList = [...div.querySelectorAll('img')].map((img) => img.src).filter(Boolean)

      const imageLoadedPromiseList = imageSrcList.map(async (src) => {
        const imageLoadedDeferred = Promise.withResolvers()

        const image = new Image()

        image.addEventListener('load', () => {
          imageLoadedDeferred.resolve()
        })

        image.addEventListener('error', () => {
          imageLoadedDeferred.resolve()
        })

        image.src = src

        return await imageLoadedDeferred.promise
      })

      await Promise.all(imageLoadedPromiseList)

      reduxHolder.dispatch(copySlice.actions.addItem({ item: bookmarkBlock, preview: paperHtml }))
      reduxHolder.dispatch(copySlice.actions.allowToPaste())
      reduxHolder.dispatch(copySlice.actions.stopPreviewPreparing())

      if (reduxHolder.getState().copy.isVisible === false) {
        reduxHolder.dispatch(copySlice.actions.showCopyModal())
      }

      reduxHolder.dispatch(quotationSlice.actions.removeBlockFromPosThousand())
      previewPreparingDeferred.resolve()
    }

    waitImagesToLoadAndShowItemInCopyContainer()
  }, [bookmarkBlock])
}
