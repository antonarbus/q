import { useDispatchTyped } from 'client/shared/hooks'
import { Resizable } from 're-resizable'
import type { ReactNode } from 'react'
import { onItemResizeStop } from 'client/features/resize_item'
import { className } from 'client/shared/className'

interface Props {
  children: ReactNode
  index: number
  itemWidth: number
}

export const ResizablePaper = ({ children, index, itemWidth }: Props): JSX.Element | null => {
  const dispatch = useDispatchTyped()

  return (
    <Resizable
      className={className.paper}
      // size={{ width, height: 'auto' }}
      css={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        position: 'relative',
      }}
      defaultSize={{ width: itemWidth, height: 'auto' }}
      grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      bounds={'window'}
      enable={{ right: true, left: true }}
      // onResize={(e, direction, refToElement, delta) => { }}
      // onResizeStart={() => { }}
      onResizeStop={onItemResizeStop({ index })}
    >
      {children}
    </Resizable>
  )
}
