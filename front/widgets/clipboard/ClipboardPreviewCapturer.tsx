import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import type { BlockItem } from '@back/entity/quotation/schema'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useRef } from 'react'
import { useClipboardPreviewCapturer } from './useClipboardPreviewCapturer'

type Props = {
  // injected by the app layer to avoid this widget depending on the block widget directly
  renderBlock: (props: { block: BlockItem; blockIndex: number }) => React.ReactNode
}

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
export const ClipboardPreviewCapturer = (props: Props): React.ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Hack! Set bookmark item at pos 1000 not to interfere with main block items
  // Otherwise we would have to re-create all app contexts for bookmark as many elements use redux and providers
  const bookmarkBlock = reduxHolder.useSelector((state) =>
    state.quotation.blocks.at(BOOKMARK_POS_AT_BLOCKS),
  )

  const isPreviewPreparing = reduxHolder.useSelector((state) => state.clipboard.isPreviewPreparing)

  useClipboardPreviewCapturer(containerRef)

  if (bookmarkBlock === undefined || isPreviewPreparing === false) {
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
              {props.renderBlock({ block: bookmarkBlock, blockIndex: BOOKMARK_POS_AT_BLOCKS })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
