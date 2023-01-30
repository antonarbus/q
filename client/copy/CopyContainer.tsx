import { useRef } from 'react'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'

export const CopyContainer = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  useCloseOnEsc()
  const { x, y } = useCursorCords()

  return (
    <div
      ref={ref}
      css={{
        width: '300px',
        height: '600px',
        border: '1px solid grey',
        borderRadius: '6px',
        position: 'fixed',
        zIndex: 2,
        top: y + 15,
        left: x + 15
      }}
    >
      I am copy container
    </div>
  )
}
