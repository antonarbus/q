import { store, useDispatchTyped } from '@client/store'
import { Resizable } from 're-resizable'
import { useLocalStorage } from 'react-use'
import { updateWidth } from './offerSlice'

type Props = {
  children: React.ReactNode
  id: string
  key: string
  savedWidth: string
}

export const ResizablePaper = ({ children, id, savedWidth }: Props) => {
  const [, setCurrentOfferAtLocalStorage] = useLocalStorage('currentOffer')
  const dispatch = useDispatchTyped()

  return (
    <Resizable
      css={{
        background: 'white',
        borderRadius: '6px',
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: '20px'
      }}
      defaultSize={{
        width: savedWidth,
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
        // setWidth(refToElement.style.width)
      }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        const width = refToElement.style.width
        dispatch(updateWidth({ id, width }))
        setCurrentOfferAtLocalStorage(store.getState().offer)
      }}
    >
      {children}
    </Resizable>
  )
}
