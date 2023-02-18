import { store, useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { updateItemOrder } from '../offerSlice'

interface Props extends Resizable {
  children: React.ReactNode
  key: string
  width: number
  index: number
  itemRef: React.MutableRefObject<Resizable>
  id: string
}

export const ResizablePaper = ({ children, width, index, itemRef, id }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <Resizable
      // @ts-ignore
      id={id}
      className='item'
      ref={itemRef}
      css={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: 20,
        position: 'relative',
      }}
      defaultSize={{
        width,
        height: 'auto'
      }}
      grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      bounds={'window' || 'parent'}
      enable={{
        right: true,
        left: true
      }}
      onResize={(e, direction, refToElement, delta) => {
        // const width = refToElement.style.width
        // dispatch(updateItemOrder({ id, width }))
        // console.log(width)
        // setWidth(refToElement.style.width)
      }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        const width = parseInt(refToElement.style.width)
        dispatch(updateItemOrder({ width, index }))
        localStorage.setItem('currentOffer', JSON.stringify(store.getState().offer))
      }}
    >
      {children}
    </Resizable>
  )
}
