import type { ReactNode } from 'react'
import { Resizable } from 're-resizable'
import { className } from 'client/shared/className'
import { useSelectorTyped } from 'client/shared/hooks'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'


interface Props {
  children: ReactNode
  index: number
  disableResize?: boolean
  autoWidth?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
}

export const ResizablePaper = ({
  children,
  index,
  disableResize = false,
  autoWidth = false,
  onItemResizeStop,
  onItemResizeStart,
  onItemResize,
}: Props): JSX.Element => {
  const width = useSelectorTyped(state => state.items[index]?.width)
  const isWidthSetManually = width !== undefined
  const isAutoWidth = !isWidthSetManually || disableResize || autoWidth

  return (
    <Resizable
      className={className.paper}
      size={{
        width: isAutoWidth ? 'auto' : width,
        height: 'auto',
      }}
      css={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        position: 'relative',
      }}
      defaultSize={{
        width: isAutoWidth ? 'auto' : width,
        height: 'auto',
      }}
      grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      bounds={'window'}
      enable={{
        right: disableResize ? false : true,
        left: disableResize ? false : true,
      }}
      onResize={(e, direction, elementRef, delta): void => {
        onItemResize?.bind(null, { e, direction, elementRef, delta, index })()
      }}
      onResizeStart={(e, dir, elementRef): void => {
        onItemResizeStart?.bind(null, { e, dir, elementRef, index })()
      }}
      onResizeStop={(e, direction, elementRef, delta): void => {
        onItemResizeStop?.bind(null, { e, direction, elementRef, delta, index })()
      }}
    >
      {children}
    </Resizable>
  )
}
