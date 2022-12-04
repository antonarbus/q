import { globalObject } from '@src/globalObject'
import { Resizable } from 're-resizable'
import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { currentOffer } from './currentOffer'

type Props = {
  children: React.ReactNode
  id: string
  key: string
  savedWidth: string
}

export const ResizablePaper = ({ children, id, savedWidth }: Props) => {
  const [width, setWidth] = useState('250px')
  const [currentOfferAtLs, setCurrentOfferAtLs, removeCurrentOfferAtLs] = useLocalStorage('currentOffer')

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
        // todo: no need to save width at this point, because it re-renders the ui, save locally probably
        console.log(globalObject.currentOffer)
        const temp = { ...globalObject.currentOffer }
        // console.log('temp')
        // console.log(temp.items[id].width)
        temp.items[id].width = width
        globalObject.currentOffer = { ...temp }
        setCurrentOfferAtLs(globalObject.currentOffer)
        console.log(globalObject.currentOffer.items[id].width)
      }}
    >
      {children}
    </Resizable>
  )
}
