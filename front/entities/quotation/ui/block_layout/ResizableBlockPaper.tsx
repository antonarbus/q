import { useSelector } from '@shared/lib/redux'
import { Resizable, type ResizableProps } from 're-resizable'
import { cls } from '@shared/const/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/type/resizablePaper'
import { useBlock } from '../../providers/BlockProvider'

type Props = {
  children: React.ReactNode
  disableResize?: boolean
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
}

export const ResizableBlockPaper = ({
  children,
  disableResize = false,
  autoWidth = false,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  minWidth,
}: Props): React.JSX.Element => {
  const { blockIndex } = useBlock()

  const width = useSelector(
    (state) => state.quotation.blocks[blockIndex]?.width,
  )

  const isWidthSetManually = width !== undefined
  const isAutoWidth = isWidthSetManually === false || disableResize || autoWidth

  return (
    <Resizable
      bounds='window'
      className={cls.paper}
      defaultSize={{
        width: isAutoWidth === true ? 'auto' : width,
        height: 'auto',
      }}
      enable={{
        right: disableResize === false,
        left: disableResize === false,
      }}
      handleClasses={{
        left: 'left-resize-handle',
        right: 'right-resize-handle',
      }}
      maxWidth='100%'
      minWidth={minWidth ?? '150px'}
      onResize={(event, direction, elementRef, delta): void => {
        onItemResize?.bind(null, {
          event,
          direction,
          elementRef,
          delta,
          blockIndex,
        })()
      }}
      onResizeStart={(event, dir, elementRef): void => {
        onItemResizeStart?.bind(null, {
          event,
          dir,
          elementRef,
          blockIndex,
        })()
      }}
      onResizeStop={(event, direction, elementRef, delta): void => {
        onItemResizeStop?.bind(null, {
          event,
          direction,
          elementRef,
          delta,
          blockIndex,
        })()
      }}
      size={{
        width: isAutoWidth === true ? 'auto' : width,
        height: 'auto',
      }}
      style={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        position: 'relative',
      }}
      // grid={[20, 0]}
    >
      {children}
    </Resizable>
  )
}
