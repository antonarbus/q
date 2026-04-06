import { cls } from '@front/shared/cls'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@front/shared/lib/re-resizable/resizablePaper'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { Resizable } from 're-resizable'
import type { ResizableProps } from 're-resizable'

import { useBlock } from '../../provider/block/useBlock'
import { useIsEditorView } from '../../util/useIsEditorView'

type Props = {
  children: React.ReactNode
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  onItemResizeStart?: OnBlockResizeStart
  onItemResize?: OnBlockResize
  onItemResizeStop?: OnBlockResizeStop
  disableResize?: boolean
}

export const ResizableBlockPaper = (props: Props): React.JSX.Element => {
  const isEditorView = useIsEditorView()
  const block = useBlock()
  const width = reduxHolder.useSelector((state) => state.quotation.blocks[block.index]?.width)
  const isWidthSetManually = width !== undefined
  const isAutoWidth = isWidthSetManually === false || (props.autoWidth ?? false)
  const resizeEnabled = isEditorView && props.disableResize !== true

  return (
    <Resizable
      bounds='window'
      className={cls.paper}
      defaultSize={{
        width: isAutoWidth === true ? 'auto' : width,
        height: 'auto',
      }}
      enable={{
        right: resizeEnabled,
        left: resizeEnabled,
      }}
      handleClasses={{
        left: 'left-resize-handle',
        right: 'right-resize-handle',
      }}
      handleStyles={{
        left: resizeEnabled === false ? { display: 'none' } : {},
        right: resizeEnabled === false ? { display: 'none' } : {},
      }}
      maxWidth='100%'
      minWidth={props.minWidth ?? '150px'}
      onResize={(event, direction, elementRef, delta): void => {
        props.onItemResize?.bind(null, {
          event,
          direction,
          elementRef,
          delta,
          blockIndex: block.index,
        })()
      }}
      onResizeStart={(event, dir, elementRef): void => {
        props.onItemResizeStart?.bind(null, {
          event,
          dir,
          elementRef,
          blockIndex: block.index,
        })()
      }}
      onResizeStop={(event, direction, elementRef, delta): void => {
        props.onItemResizeStop?.bind(null, {
          event,
          direction,
          elementRef,
          delta,
          blockIndex: block.index,
        })()
      }}
      size={{
        width: isAutoWidth === true ? 'auto' : width,
        height: 'auto',
      }}
      css={{
        borderRadius: 6,
        position: 'relative',
        background: 'white',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }}
      // grid={[20, 0]}
    >
      {props.children}
    </Resizable>
  )
}
