import { clipboardSlice } from '@front/entities/quotation/redux/clipboardSlice'
import { resolveClipboardPreviewPreparingPromise } from '@front/entities/quotation/util/clipboardPreviewDeferred'
import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useEffect } from 'react'
import { getCleanPaperHtml } from '@front/shared/util/html-getter/getCleanPaperHtml'
import { cls } from '@front/shared/cls'

export const useClipboardPreviewCapturer = (
  containerRef: React.RefObject<HTMLDivElement | null>,
): void => {
  const bookmarkBlock = reduxHolder.useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  useEffect(() => {
    const waitImagesToLoadAndShowItemInClipboardContainer = async (): Promise<void> => {
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

        // trivial passthrough wrapper: async+await / no-await / non-async each violate one of return-await, require-await, promise-function-async — no shape satisfies all three
        // oxlint-disable-next-line typescript/return-await
        return await imageLoadedDeferred.promise
      })

      await Promise.all(imageLoadedPromiseList)

      reduxHolder.dispatch(
        clipboardSlice.actions.addItem({ item: bookmarkBlock, preview: paperHtml }),
      )
      reduxHolder.dispatch(clipboardSlice.actions.allowToPaste())
      reduxHolder.dispatch(clipboardSlice.actions.stopPreviewPreparing())

      if (reduxHolder.getState().clipboard.isVisible === false) {
        reduxHolder.dispatch(clipboardSlice.actions.showClipboardModal())
      }

      reduxHolder.dispatch(quotationSlice.actions.removeBlockFromPosThousand())
      resolveClipboardPreviewPreparingPromise()
    }

    void waitImagesToLoadAndShowItemInClipboardContainer()
  }, [bookmarkBlock])
}
