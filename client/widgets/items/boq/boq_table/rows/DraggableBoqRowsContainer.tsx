import type { ReactNode } from 'react'
import { SortableContainer, type SortableContainerProps } from 'react-sortable-hoc'
import { cls } from '@shared/consts/cls'

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
      className={cls.boqRows}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  ))
