import { theme } from '@shared/theme'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const FooterLayout = (props: Props): JSX.Element => {
  return (
    <footer
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: theme.footer.height,
        bottom: '0',
        left: '0',
        right: '0',
        padding: '2px',
        zIndex: '666',

        // liquid glass
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderTop: '1px solid #e0e0e0',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {props.children}
    </footer>
  )
}
