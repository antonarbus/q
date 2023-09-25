import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { SortableContainer } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635
type Props = {
  children: ReactNode
}
type SortableContainerExtended = SortableContainerProps & Props

export const DraggableItemsContainer: React.ComponentClass<SortableContainerExtended> =
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
        delay: 0.7, // to show "Q" logo on init load to avoid some jumps
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
