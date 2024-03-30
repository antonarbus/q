import { motion } from 'framer-motion'
import type { ComponentClass, ReactNode } from 'react'
import type { SortableContainerProps } from 'react-sortable-hoc'
import { SortableContainer } from 'react-sortable-hoc'
import { className } from '@shared/consts/className'

// example with TypeScript
// https://codesandbox.io/s/odfrontendeveloper-react-sortable-hoc-example-t96d8x?file=/src/examples/Items.tsx:518-635
type Props = {
  children: ReactNode
}

type SortableBox = ComponentClass<SortableContainerProps & Props>

export const DraggableItemsContainer: SortableBox =
  SortableContainer(({ children }: Props) => (
    <motion.div
      className={className.items}
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
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '20px 10px',
      }}
    >
      {children}
    </motion.div>
  ))
