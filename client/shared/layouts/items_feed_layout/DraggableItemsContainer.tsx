import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { SortableContainer } from 'react-sortable-hoc'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635
interface IProps { children: ReactNode }
interface ISortableContainer extends SortableContainerProps, IProps { }

export const DraggableItemsContainer: React.ComponentClass<ISortableContainer> =
  SortableContainer(({ children }: IProps) => (
    <motion.div
      id='items'
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        // show "Q" logo for short time to avoid some jumps on init load
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
