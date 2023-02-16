import { Key } from 'client/components/Key'
import { useCloseOnEsc } from './useCloseOnEsc'

export const PressEsc = () => {
  useCloseOnEsc()

  return (
    <div
      css={{
        textAlign: 'center',
        color: 'grey',
        fontSize: '12px',
        marginBottom: '10px',
        whiteSpace: 'nowrap'
      }}
    >
      <Key>Esc</Key> to exit
    </div>
  )
}
