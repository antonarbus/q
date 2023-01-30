import { useCloseOnEsc } from './useCloseOnEsc'
import { useFollowCursor } from './useFollowCursor'

export const PasteContainer = () => {
  useCloseOnEsc()
  useFollowCursor()

  return (
    <div
      css={{
        width: '300px',
        height: '600px',
        border: '1px solid grey',
        borderRadius: '6px',
        position: 'fixed',
        zIndex: 2,
        top: 5,
        left: 35
      }}
    >
      I am copy container
    </div>
  )
}
