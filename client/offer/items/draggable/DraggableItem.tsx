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
      initial={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0, y: '100vh' }}
      animate={{ height: 'auto', marginTop: 10, marginBottom: 10, opacity: 1, y: 0 }}
      exit={{ height: 0, marginTop: 0, marginBottom: 0, opacity: 0, x: 'calc(100vw + 1000px)' }} // off the screen + a bit more, coz do not want to show height animation, but without height jump occurs
      transition={{ duration: 0.5 }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
      }}
    >
      {children}
    </motion.div>
  )
})
