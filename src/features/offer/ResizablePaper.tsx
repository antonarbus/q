import { Resizable } from 're-resizable'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
}

export const ResizablePaper = ({ children }: Props) => {
  const [resizedBy, setResizedBy] = useState({ width: 0, height: 0 })
  const [direction, setDirection] = useState('unknown')
  const [mouseCords, setMouseCords] = useState({ x: 0, y: 0 })
  const [width, setWidth] = useState('250px')
  const [height, setHeight] = useState('150px')

  return (
    <Resizable
      css={{
        background: 'white',
        borderRadius: '6px',
        boxShadow: '#00000033 0px 0px 10px 0px',
        padding: '20px'
      }}
      defaultSize={{
        width: '800px',
        height: 'auto'
      }}
      grid={[20, 0]}
      minWidth='200px'
      maxWidth='100%'
      // minHeight={100}
      // maxHeight={800}
      bounds={'window' || 'parent'}
      enable={{
        right: true,
        left: true
        // top: true,
        // bottom: true,
        // topRight: false,
        // bottomRight: false,
        // bottomLeft: false,
        // topLeft: false
      }}
      onResize={(e, direction, refToElement, delta) => {
        setDirection(direction)
        setResizedBy(delta)
        setMouseCords({ x: e.x, y: e.y })
        setWidth(refToElement.style.width)
        setHeight(refToElement.style.height)
      }}
      onResizeStart={() => {}}
      onResizeStop={(e, direction, refToElement) => {
        console.log('e', e)
        console.log('direction', direction)
        console.log('refToElement', refToElement)
        console.log('refToElement.style.width', refToElement.style.width)
      }}
    >
      {children}
    </Resizable>
  )
}
