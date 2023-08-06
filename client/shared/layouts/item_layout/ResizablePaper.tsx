import { useDispatchTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { Resizable } from 're-resizable'
import { saveItemWidth } from 'client/entities/items'
import { saveItemsLocally } from 'client/shared/lib'
import type { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  index: number
  itemWidth: number
}

export const ResizablePaper = ({ children, index, itemWidth }: IProps): JSX.Element | null => {
  const dispatch = useDispatchTyped()

  return (
    <Resizable
      className='item-paper'
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
      onResizeStop={(e, direction, refToElement): void => {
        const width = parseInt(refToElement.style.width)
        dispatch(saveItemWidth({ index, width }))
        saveItemsLocally({ msgAboveItemWithIndex: index })
      }}
    >
      {children}
    </Resizable>
  )
}
