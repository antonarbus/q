import { store } from 'client/store'
import { arrayMoveImmutable } from 'array-move'
import { AnimatePresence } from 'framer-motion'
import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { saveItemsOrder } from './offerSlice'
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

export const ItemsContainer = ({ children }: Props) => (
  <DraggableItems
    useDragHandle
    onSortStart={() => {
      document.body.style.cursor = 'move'
    }}
    onSortEnd={({ oldIndex, newIndex }) => {
      const { items } = store.getState().offer
      const sortedItems = arrayMoveImmutable(items, oldIndex, newIndex)
      store.dispatch(saveItemsOrder({ sortedItems }))
      saveOfferIntoLocalStorage()
      document.body.style.cursor = 'default'
    }}
  >
    <AnimatePresence initial={false}>
      {children}
    </AnimatePresence>
  </DraggableItems>
)
