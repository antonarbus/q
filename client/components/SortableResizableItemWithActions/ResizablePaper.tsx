import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { saveItemWidth, tellItemSavedLocally } from '../../features/items/itemsSlice'
import { TChildren } from 'client/types'

interface TProps {
  children: TChildren
  index: number
}

export const ResizablePaper = ({ children, index }: TProps) => {
  const dispatch = useDispatchTyped()
  const width = store.getState().items[index]?.width

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
      defaultSize={{ width, height: 'auto' }}
      grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      bounds={'window' || 'parent'}
      enable={{ right: true, left: true }}
      onResize={(e, direction, refToElement, delta) => { }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        const width = parseInt(refToElement.style.width)
        dispatch(saveItemWidth({ index, width }))
        saveItemsIntoLocalStorage()
        dispatch(tellItemSavedLocally({ index }))
      }}
    >
      {children}
    </Resizable>
  )
}
