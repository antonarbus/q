import { store, useDispatchTyped } from 'client/store'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence } from 'framer-motion'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { saveItemsOrder, tellItemSavedLocally } from './itemsSlice'
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635

type Props = {
  children: React.ReactNode
}

interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode
}

const DraggableItems: React.ComponentClass<ISortableContainer, any> =
  SortableContainer(({ children }: Props) => (
    <div
      id='items'
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 5px',
      }}
    >
      {children}
    </div>
  ))

export const ItemsContainer = ({ children }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <DraggableItems
      useDragHandle
      useWindowAsScrollContainer
      onSortStart={() => {
        document.body.style.cursor = 'move'
      }}
      onSortEnd={({ oldIndex, newIndex }) => {
        const { items } = store.getState()
        const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
        dispatch(saveItemsOrder({ sortedItems }))
        saveItemsIntoLocalStorage()
        dispatch(tellItemSavedLocally(newIndex))
        document.body.style.removeProperty('cursor')
      }}
    >
      <AnimatePresence initial={false}>
        {children}
      </AnimatePresence>
    </DraggableItems>
  )
}
