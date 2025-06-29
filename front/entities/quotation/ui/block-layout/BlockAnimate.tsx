import { theme } from '@shared/theme'
import { Box } from '@mui/material'
import { motion } from 'motion/react'
import type { ResizableProps } from 're-resizable'
import { cls } from '@shared/const/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/type/resizablePaper'
import { ResizableBlockPaper } from './ResizableBlockPaper'

type Props = {
  children: React.ReactNode
  blockHeight: number
  id: string
  leftItemActionButtons?: React.ReactNode
  rightItemActionButtons?: React.ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
  className?: string
}

export const BlockAnimate = ({
  children,
  blockHeight,
  id,
  leftItemActionButtons,
  rightItemActionButtons,
  disableResize,
  autoWidth,
  minWidth,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  className,
}: Props): React.JSX.Element => {
  return (
    <motion.div
      animate={{
        height: blockHeight, // height is being stored on copy/cut icon click
        marginBottom: 20,
        opacity: 1,
        y: 0,
        transitionEnd: {
          height: 'auto',
          overflow: 'visible',
        },
      }}
      className={cls.block + (className === undefined ? '' : ` ${className}`)}
      exit={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        x: '110vw',
        overflow: 'hidden',
      }}
      id={id}
      initial={{
        height: 0,
        marginBottom: 0,
        opacity: 0,
        y: '100vh',
        overflow: 'hidden',
      }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
      }}
      transition={{
        duration: theme.block.animationDuration,
      }}
    >
      {Boolean(leftItemActionButtons) && (
        <Box style={{ paddingTop: '5px' }}>{leftItemActionButtons}</Box>
      )}
      <ResizableBlockPaper
        autoWidth={autoWidth}
        disableResize={disableResize}
        minWidth={minWidth}
        onItemResize={onItemResize}
        onItemResizeStart={onItemResizeStart}
        onItemResizeStop={onItemResizeStop}
      >
        {children}
      </ResizableBlockPaper>
      {Boolean(rightItemActionButtons) && (
        <Box style={{ paddingTop: '5px' }}>{rightItemActionButtons}</Box>
      )}
    </motion.div>
  )
}
