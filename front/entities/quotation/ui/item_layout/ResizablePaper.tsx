import { useSelectorTyped } from '@lib_instances/store'
import { Resizable, type ResizableProps } from 're-resizable'
import type { ReactNode } from 'react'
import { cls } from '@shared/consts/cls'
import type {
  OnItemResize,
  OnItemResizeStart,
  OnItemResizeStop,
} from '@shared/types/resizablePaper'
import { useBlock } from '../../providers/BlockProvider'

type Props = {
  children: ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnItemResizeStart
  onItemResize?: OnItemResize
  onItemResizeStop?: OnItemResizeStop
}

export const ResizablePaper = ({
  children,
  disableResize = false,
  autoWidth = false,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  minWidth,
}: Props): JSX.Element => {
  const { blockIndex } = useBlock()
  const width = useSelectorTyped(
    (state) => state.quotation.blocks[blockIndex]?.width,
  )
  const isWidthSetManually = width !== undefined
  const isAutoWidth = !isWidthSetManually || disableResize || autoWidth

  return (
    <Resizable
      className={cls.paper}
      size={{
        width: isAutoWidth ? 'auto' : width,
        height: 'auto',
      }}
      style={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        position: 'relative',
      }}
      defaultSize={{
        width: isAutoWidth ? 'auto' : width,
        height: 'auto',
      }}
      // grid={[20, 0]}
      minWidth={minWidth ?? '150px'}
      maxWidth='100%'
      bounds={'window'}
      enable={{
        right: !disableResize,
        left: !disableResize,
      }}
      onResizeStart={(e, dir, elementRef): void => {
        onItemResizeStart?.bind(null, { e, dir, elementRef, blockIndex })()
      }}
      onResize={(e, direction, elementRef, delta): void => {
        onItemResize?.bind(null, {
          e,
          direction,
          elementRef,
          delta,
          blockIndex,
        })()
      }}
      onResizeStop={(e, direction, elementRef, delta): void => {
        onItemResizeStop?.bind(null, {
          e,
          direction,
          elementRef,
          delta,
          blockIndex,
        })()
      }}
    >
      {children}
    </Resizable>
  )
}
