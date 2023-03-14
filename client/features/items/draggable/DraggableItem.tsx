import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode,
  id: string
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode,
  id: string
}

export const DraggableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children, id }: Props) => {
  return (
    <motion.div
      id={id}
      className='item'
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh'
      }}
      animate={{
        height: 'auto',
        marginBottom: 20,
        opacity: 1,
        y: 0
      }}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '200vw'
      }}
      transition={{
        duration: 0.3
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
        // outline: '1px solid green'
      }}
    >
      {children}
    </motion.div>
  )
})
