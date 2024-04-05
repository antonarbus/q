import type { ReactNode } from 'react'
import { SortableContainer, type SortableContainerProps } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635
type Props = {
  children: ReactNode
}
type SortableContainerExtended = SortableContainerProps & Props

export const DraggableBoqRowsContainer: React.ComponentClass<SortableContainerExtended> =
  SortableContainer(({ children }: Props) => (
    <div
      id='boq-rows'
      className='boq-rows'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  ))
