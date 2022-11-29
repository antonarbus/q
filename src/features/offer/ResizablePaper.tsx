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
          width: 'inherit',
          height: 'inherit'
        }}
        minWidth={200}
        minHeight={100}
        maxWidth={600}
        maxHeight={800}
        bounds={'window' || 'parent'}
        enable={{
          // top: true,
          right: true,
          // bottom: true,
          left: true
          // topRight: false,
          // bottomRight: false,
          // bottomLeft: false,
          // topLeft: false
        }}
        onResize={(event, direction, refToElement, delta) => {
          setDirection(direction)
          setResizedBy(delta)
          setMouseCords({ x: event.x, y: event.y })
          setWidth(refToElement.style.width)
          setHeight(refToElement.style.height)
        }}
        onResizeStart={() => { console.log('resize started') }}
        onResizeStop={() => { console.log('resize stopped') }}
      >
        {children}
      </Resizable>
  )
}
