import type { ReactNode } from 'react'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { SortableContainer } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635
type Props = {
  children: ReactNode
}
type SortableContainerExtended = SortableContainerProps & Props

export const DraggableBoqRowsContainer: React.ComponentClass<SortableContainerExtended> =
  SortableContainer(({ children }: Props) => (
    <div
      id='boq rows'
      css={{
        display: 'flex',
        flexDirection: 'column',
        // gap: '10px',
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: '20px 5px',
      }}
    >
      {children}
    </div>
  ))
