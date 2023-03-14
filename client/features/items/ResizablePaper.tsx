import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped } from 'client/store'
import { Resizable } from 're-resizable'
import { saveItemWidth } from './itemsSlice'

interface Props extends Resizable {
  children: React.ReactNode
  key: string
  width: number
  index: number
  itemRef: React.MutableRefObject<Resizable>
}

export const ResizablePaper = ({ children, width, index, itemRef }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <Resizable
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
      }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        const width = parseInt(refToElement.style.width)
        dispatch(saveItemWidth({ width, index }))
        saveOfferIntoLocalStorage()
      }}
    >
      {children}
    </Resizable>
  )
}
