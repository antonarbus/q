import { copySlice } from '@entity/copy/copySlice'
import { BOOKMARK_POS_AT_BLOCKS } from '@entity/quotation/const/bookmarkPosAtBlocks'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import { dispatch, getState, useSelector } from '@shared/lib/redux'
import { Block } from '@widget/block/Block'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useRef } from 'react'
import { getCleanPaperHtml } from '@shared/util/html-getter/getCleanPaperHtml'
import { cls } from '@shared/cls'

/**
 * Always-mounted offscreen component that generates the copy preview HTML for
 * bookmarks on the fly, removing the need to store preview HTML in the bucket.
 *
 * Flow:
 *   1. CopyBookmarkButton / Search dispatch loadBlockAtPosThousandReducer and
 *      setInitCursorPos in the same event handler (React 18 batches both →
 *      blocks[1000] is already set on the first render of this component).
 *   2. Tiptap initializes via useLayoutEffect (before paint). By the time our
 *      useEffect fires (after paint), the paper element is in the DOM.
 *   3. One requestAnimationFrame gives any remaining Tiptap extensions a chance
 *      to settle, then we extract the HTML and dispatch addItem → allowToPaste
 *      → showCopyModal (matching the order used by CopyBlockIcon).
 *   4. removeBlockFromPosThousandReducer → component returns null.
 */
export const BookmarkCopyPreviewRenderer = (): React.ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Hack! Set bookmark item at pos 1000 not to interfere with main block items
  // Otherwise we would have to re-create all app contexts for bookmark as many elements use redux and providers
  const bookmarkBlock = useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  // Logic to find images in html, wait for the browser fully loads them over network
  // Then add item to the copy container and show it
  useEffect(() => {
    // This is called outside in main code body
    // dispatch(copySlice.actions.startPreviewPreparing())

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

    dispatch(textSlice.actions.setNotEditable())

    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    // Restore scroll position that setNotEditable's re-render may have moved.
    requestAnimationFrame(() => {
      window.scrollTo(persistedScrollX, persistedScrollY)
    })

    // Preload all images before opening the copy modal so they are in the
    // browser cache — the slide animation then starts immediately with no
    // visible delay waiting for images to arrive over the network.
    // Promise.all([]) resolves immediately, so no special case for no images.
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

      dispatch(quotationSlice.actions.removeBlockFromPosThousandReducer())
    })
  }, [bookmarkBlock])

  if (bookmarkBlock === undefined) {
    return null
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: -9999,
        top: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <DragDropContext
        onDragEnd={(): void => {
          // drag reordering is not applicable in the offscreen capture context
        }}
      >
        <Droppable droppableId='capture-block'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Block
                block={bookmarkBlock}
                blockIndex={BOOKMARK_POS_AT_BLOCKS}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
