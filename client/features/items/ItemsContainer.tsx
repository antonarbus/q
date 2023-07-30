import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence, motion } from 'framer-motion'
import { saveItemsOrder, tellItemSavedLocally } from './itemsSlice'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'
import { Children } from 'client/types'
import { saveItemsIntoLocalStorage } from 'client/features/items'
import { enterIntoCopyMode, exitFromCopyMode } from 'client/entities/copy'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635

type Props = {
  children: Children
}

interface ISortableContainer extends SortableContainerProps {
  children: Children
}

const DraggableItems: React.ComponentClass<ISortableContainer, any> =
  SortableContainer(({ children }: Props) => (
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

export const ItemsContainer = ({ children }: Props) => {
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
        setTimeout(() => {
          dispatch(exitFromCopyMode())
        }, 500)
        document.body.style.removeProperty('cursor')
      }}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </DraggableItems>
  )
}
