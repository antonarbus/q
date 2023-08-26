import type { ReactNode } from 'react'
import { Resizable } from 're-resizable'
import { onItemResizeStop } from 'client/features/resize_item'
import { className } from 'client/shared/className'
import { useSelectorTyped } from 'client/shared/hooks'

interface Props {
  children: ReactNode
  index: number
}

export const ResizablePaper = ({ children, index }: Props): JSX.Element => {
  const width = useSelectorTyped(state => state.items[index]?.width ?? 'auto')

  return (
    <Resizable
      className={className.paper}
      size={{
        width: width,
        height: 'auto',
      }}
      css={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        position: 'relative',
      }}
      defaultSize={{
        width,
        height: 'auto',
      }}
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
