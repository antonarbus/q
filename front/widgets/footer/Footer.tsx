import { EmailIcon } from './EmailIcon'

export const Footer = (): JSX.Element => {
  return (
    <footer
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '24px',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '2px',
        backgroundColor: 'rgba(250, 250, 250, 0.9)',
        borderTop: '1px solid #e0e0e0',
        zIndex: '666',
      }}
    >
      <EmailIcon />
    </footer>
  )
}
