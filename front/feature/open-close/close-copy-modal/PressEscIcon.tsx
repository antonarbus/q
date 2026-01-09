import { KbdKey } from '@shared/component/KbdKey'
import type { JSX } from 'react'
import { useExitCopyOnEsc } from './useCloseOnEsc'

export const PressEscIcon = (): JSX.Element => {
  useExitCopyOnEsc()

  return (
    <div
      style={{
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
