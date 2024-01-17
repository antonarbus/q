import { KbdKey } from '@shared/components'
import { useExitCopyOnEsc } from './useCloseOnEsc'

export const PressEsc = (): JSX.Element => {
  useExitCopyOnEsc()

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
