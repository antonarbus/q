import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped } from 'client/store'
import { theme } from 'client/theme'
import { Resizable } from 're-resizable'
import { updateItem } from '../../features/items/itemsSlice'

interface Props {
  children: React.ReactNode
  key: string
  width: number
  index: number
  itemRef: React.MutableRefObject<Resizable>
  onClick?: (e: MouseEvent) => void
}

export const ResizablePaper = ({ children, width, index, itemRef, onClick }: Props) => {
  const dispatch = useDispatchTyped()

  return (
    <Resizable
      ref={itemRef}
      // size={{ width, height: 'auto' }}
      // @ts-ignore:next-line
      onClick={onClick}
      css={{
        background: 'white',
        borderRadius: 6,
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: theme.item.padding,
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
        dispatch(updateItem({ index, props: { width } }))
        saveItemsIntoLocalStorage()
        dispatch(updateItem({ index, props: { msg: 'saved locally' } }))
        setTimeout(() => {
          dispatch(updateItem({ index, props: { msg: '' } }))
        }, 1500)
      }}
    >
      {children}
    </Resizable>
  )
}
