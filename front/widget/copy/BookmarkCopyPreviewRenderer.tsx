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
 *
 * Signal: initCursorPos being non-null uniquely identifies this flow.
 * BookmarkBlockIcon (which also sets blocks[1000]) never sets initCursorPos,
 * so the two cannot overlap.
 */
export const BookmarkCopyPreviewRenderer = (): React.ReactNode => {
  // Rendered at pos 1000, it is a hack, otherwise we have to re-create all app contexts for bookmark
  const bookmarkBlock = useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  const initCursorPos = useSelector((state) => state.copy.initCursorPos)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bookmarkBlock === undefined) {
      return
    }

    if (initCursorPos === null) {
      return
    }

    let cancelled = false

    const persistedScrollX = window.scrollX
    const persistedScrollY = window.scrollY

    requestAnimationFrame(() => {
      if (cancelled === true) {
        return
      }

      const container = containerRef.current

      if (container === null) {
        return
      }

      const paperElement = container.querySelector(`.${cls.paper}`)

      if (paperElement instanceof HTMLElement === false) {
        return
      }

      const html = getCleanPaperHtml({ paperElement })

      dispatch(textSlice.actions.setNotEditable())

      // Restore scroll position that setNotEditable's re-render may have moved.
      requestAnimationFrame(() => {
        window.scrollTo(persistedScrollX, persistedScrollY)
      })

      // Preload all images by browser over network before opening the copy modal
      // Otherwise copy modal opens and item without images is pasted or it stays still until images are loaded
      const div = document.createElement('div')
      div.innerHTML = html

      const imageAtHtmlSrcList = Array.from(div.querySelectorAll('img'))
        .map((img) => img.src)
        .filter(Boolean)

      const openModal = (): void => {
        // Use requestAnimationFrame to ensure dispatches happen outside any
        // current React render cycle, preventing "setState during render"
        // warnings that occur when Promise microtasks fire mid-render.
        requestAnimationFrame(() => {
          if (cancelled === true) {
            return
          }

          dispatch(
            copySlice.actions.addItem({ item: bookmarkBlock, preview: html }),
          )

          dispatch(copySlice.actions.allowToPaste())

          const isCopyModalVisible = getState().copy.isVisible

          if (isCopyModalVisible === false) {
            dispatch(copySlice.actions.showCopyModal())
          }

          dispatch(quotationSlice.actions.removeBlockFromPosThousandReducer())
        })
      }

      if (imageAtHtmlSrcList.length === 0) {
        openModal()
      } else {
        let remaining = imageAtHtmlSrcList.length

        imageAtHtmlSrcList.forEach((src) => {
          const image = new Image()

          image.onload = image.onerror = (): void => {
            remaining -= 1

            if (remaining === 0) {
              openModal()
            }
          }

          image.src = src
        })
      }
    })

    return (): void => {
      cancelled = true
    }
  }, [bookmarkBlock, initCursorPos])

  const shouldNotRender = bookmarkBlock === undefined || initCursorPos === null

  if (shouldNotRender === true) {
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
