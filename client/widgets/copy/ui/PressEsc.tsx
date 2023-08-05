import { KbdKey } from 'client/shared/components'
import { useCloseOnEsc } from './useCloseOnEsc'

export const PressEsc = (): JSX.Element => {
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
      <KbdKey>Esc</KbdKey> to exit
    </div>
  )
}
