import { useRef } from 'react'
import { useCloseOnEsc } from './useCloseOnEsc'
import { useCursorCords } from './useCursorCords'

export const PasteContainer = () => {
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
        top: y + 10,
        left: x + 10
      }}
    >
      I am copy container
    </div>
  )
}
