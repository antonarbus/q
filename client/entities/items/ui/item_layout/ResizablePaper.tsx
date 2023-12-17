import type { ReactNode } from 'react'
import { Resizable } from 're-resizable'
import { className } from 'client/shared/className'
import { useSelectorTyped } from 'client/shared/hooks'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'
import { useItem } from 'client/widgets/items/ItemProvider'

type Props = {
  children: ReactNode
  disableResize?: boolean
  autoWidth?: boolean
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
}: Props): JSX.Element => {
  const { itemIndex } = useItem()
  const width = useSelectorTyped(state => state.items[itemIndex]?.width)
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
      // grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      bounds={'window'}
      enable={{
        right: !disableResize,
        left: !disableResize,
      }}
      onResize={(e, direction, elementRef, delta): void => {
        onItemResize?.bind(null, { e, direction, elementRef, delta, itemIndex })()
      }}
      onResizeStart={(e, dir, elementRef): void => {
        onItemResizeStart?.bind(null, { e, dir, elementRef, itemIndex })()
      }}
      onResizeStop={(e, direction, elementRef, delta): void => {
        onItemResizeStop?.bind(null, { e, direction, elementRef, delta, itemIndex })()
      }}
    >
      {children}
    </Resizable>
  )
}
