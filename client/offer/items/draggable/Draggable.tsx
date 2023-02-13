import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635

type Props = {
  children: React.ReactNode
}

interface ISortableContainer extends SortableContainerProps {
  children: React.ReactNode
}

export const Draggable: React.ComponentClass<ISortableContainer, any> =
  SortableContainer(({ children }: Props) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: '20px'
      }}
    >
      {children}
    </div>
  ))
