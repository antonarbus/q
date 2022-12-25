import { SortableContainer } from 'react-sortable-hoc'

type Props = {
  children: React.ReactNode
}

export const Draggable = SortableContainer(({ children }: Props) => <div>{children}</div>)
