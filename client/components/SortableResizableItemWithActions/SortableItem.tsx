import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/theme'
import { TChildren } from 'client/types'
import { store } from 'client/store'

type TProps = {
  children: TChildren
  i: number
}

interface ISortableItem extends SortableElementProps {
  children: TChildren
  i: number
}

export const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children, i: index }: TProps) => {
  const id = store.getState().items?.[index].id

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
        x: '150vw'
      }}
      transition={{
        duration: theme.item.animationDuration
      }}
      css={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  )
})
