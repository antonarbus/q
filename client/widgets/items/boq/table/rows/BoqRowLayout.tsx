import type { SortableElementProps } from 'react-sortable-hoc'
import type { ComponentClass, ReactNode } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { motion } from 'framer-motion'
import { theme } from 'client/shared/clients'

type Props = {
  children: ReactNode
  // itemHeight: number
  rowId: string
  // itemActionElements?: ReactNode
  i: number
}

type SortableItem = SortableElementProps & Props

export const BoqRowLayout: ComponentClass<SortableItem> = SortableElement(({
  i,
  children,
  // itemHeight,
  rowId,
  // itemActionElements,
}: Props) => {
  return (
    <motion.div
      // id={rowId}
      // className={className.item}
      initial={{
        height: 0,
        // marginBottom: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      animate={{
        // height: itemHeight, // height is being stored on copy/cut icon click
        height: 'auto', // height is being stored on copy/cut icon click
        // marginBottom: 20,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      exit={{
        height: 0,
        // marginBottom: 0,
        opacity: 0,
        x: '150vw',
        overflow: 'hidden',
      }}
      transition={{
        duration: theme.item.animationDuration,
      }}
      css={{
        // display: 'flex',
        // justifyContent: 'center',
        // position: 'relative',
        // maxWidth: '100%',
        // width: '100%',
      }}
    >
      {/* <ActionsContainer itemActionElements={itemActionElements} /> */}
      {children}
      {/* <ActionsContainer /> Right action container is used for symmetry, no icons inside */}
    </motion.div>
  )
})
