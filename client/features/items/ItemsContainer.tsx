import { store, useDispatchTyped } from 'client/store'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence, motion } from 'framer-motion'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { saveItemsOrder, tellItemSavedLocally } from './itemsSlice'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'
import { TChildren } from 'client/types'
import { enterIntoCopyMode, exitFromCopyMode } from '../copy/copySlice'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635

type TProps = {
  children: TChildren
}

interface ISortableContainer extends SortableContainerProps {
  children: TChildren
}

const DraggableItems: React.ComponentClass<ISortableContainer, any> =
  SortableContainer(({ children }: TProps) => (
    <motion.div
      id='items'
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 5px',
      }}
    >
      {children}
    </motion.div>
  ))

export const ItemsContainer = ({ children }: TProps) => {
  const dispatch = useDispatchTyped()

  return (
    <DraggableItems
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={() => {
        document.body.style.cursor = 'move'
        dispatch(enterIntoCopyMode())
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        const { items } = store.getState()
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(saveItemsOrder({ sortedItems }))
        saveItemsIntoLocalStorage()
        dispatch(tellItemSavedLocally({ index: newIndex }))
        dispatch(exitFromCopyMode())
        document.body.style.removeProperty('cursor')
      }}
    >
      <AnimatePresence initial={false}>
        {children}
      </AnimatePresence>
    </DraggableItems>
  )
}
