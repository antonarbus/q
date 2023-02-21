import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode
}

export const DraggableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children }: Props) => {
  return (
    <motion.div
      initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0, y: 1000 }}
      animate={{ height: 'auto', marginTop: 10, marginBottom: 10, opacity: 1, y: 0 }}
      exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0, x: 1000 }}
      transition={{
        height: { duration: 0.5 },
        opacity: { duration: 0.5 },
        y: { duration: 0.5 },
        x: { duration: 0.5 },
        marginTop: { duration: 0.5 },
        marginBottom: { duration: 0.5 },
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2px',
        position: 'relative',
        maxWidth: '100%',
        // marginTop: 10,
        // marginBottom: 10,
      }}
    >
      {children}
    </motion.div>
  )
})
