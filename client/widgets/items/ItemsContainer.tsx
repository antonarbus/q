import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence, motion } from 'framer-motion'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { SortableContainer } from 'react-sortable-hoc'
import type { Children } from 'client/types'
import { saveItemsLocally } from 'client/features/save_items_locally'
import { enterIntoCopyMode, exitFromCopyMode } from 'client/entities/copy'
import { reOrderItems } from 'client/entities/items'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635

interface Props {
  children: Children
}

interface ISortableContainer extends SortableContainerProps {
  children: Children
}

const DraggableItems: React.ComponentClass<ISortableContainer> = SortableContainer(({ children }: Props) => (
  <motion.div
    id='items'
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      // show Q logo for short time to avoid some jumps on init load
      delay: 0.7,
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

// todo: break it into itemsFeedLayout and itemsReOrder feature

export const ItemsContainer = ({ children }: Props): EmotionJSX.Element => {
  const dispatch = useDispatchTyped()

  return (
    <DraggableItems
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={(): void => {
        document.body.style.cursor = 'move'
        dispatch(enterIntoCopyMode())
      }}
      onSortEnd={({ oldIndex, newIndex }): void => {
        const { items } = store.getState()
        const reOrderedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(reOrderItems({ reOrderedItems }))
        saveItemsLocally({ msgAboveItemWithIndex: newIndex })
        setTimeout(() => {
          dispatch(exitFromCopyMode())
        }, 500)
        document.body.style.removeProperty('cursor')
      }}
    >
      <AnimatePresence initial={false}>
        {children}
      </AnimatePresence>
    </DraggableItems>
  )
}
