import { globalObject } from '@client/globalObject'
import { Resizable } from 're-resizable'
import { useState } from 'react'
import { useLocalStorage } from 'react-use'

type Props = {
  children: React.ReactNode
  id: string
  key: string
  savedWidth: string
}

export const ResizablePaper = ({ children, id, savedWidth }: Props) => {
  const [width, setWidth] = useState('250px')
  const [, setCurrentOfferAtLocalStorage] = useLocalStorage('currentOffer')

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
        setWidth(refToElement.style.width)
      }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        globalObject.currentOffer.items[id].width = width
        setCurrentOfferAtLocalStorage(globalObject.currentOffer)
        console.log(globalObject.currentOffer.items[id].width)
      }}
    >
      {children}
    </Resizable>
  )
}
