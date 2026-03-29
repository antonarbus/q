import { BOOKMARK_POS_AT_BLOCKS } from '@front/entities/quotation/redux/bookmarkPosAtBlocks'
import { reduxHolder } from '@front/shared/lib/redux'
import { Block } from '@front/widgets/block/Block'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { AnimatePresence } from 'motion/react'
import { BookmarkFieldLayout } from './BookmarkFieldLayout'

export const BookmarkField = (): React.ReactNode => {
  const blocks = reduxHolder.useSelector((state) => state.quotation.blocks)

  const bookmarkBlock = blocks.at(BOOKMARK_POS_AT_BLOCKS)

  if (bookmarkBlock === undefined) {
    return null
  }

  return (
    <BookmarkFieldLayout>
      <DragDropContext
        onDragEnd={(): void => {
          // drag reordering is not applicable in the bookmark preview context
        }}
      >
        <Droppable droppableId='bookmark-block'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <AnimatePresence initial={false}>
                <Block block={bookmarkBlock} blockIndex={BOOKMARK_POS_AT_BLOCKS} />
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </BookmarkFieldLayout>
  )
}
