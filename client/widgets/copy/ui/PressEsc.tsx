import { Key } from 'client/components/Key'
import { useCloseOnEsc } from './useCloseOnEsc'

export const PressEsc = () => {
  useCloseOnEsc()

  return (
    <div
      css={{
        position: 'relative',
        textAlign: 'center',
        color: 'grey',
        fontSize: '12px',
        marginBottom: '10px',
        whiteSpace: 'nowrap',
        zIndex: 1,
      }}
    >
      <Key>Esc</Key> to exit
    </div>
  )
}
