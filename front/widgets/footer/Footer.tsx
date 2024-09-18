import { theme } from '@lib_instances/theme'
import { TooltipWithNoMaxWidth } from '@shared/components/TooltipWithNoMaxWidth'
import { MdAlternateEmail } from 'react-icons/md'

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
      <TooltipWithNoMaxWidth
        title='Ask question, send feedback, bug report or feature request'
        placement='top'
        leaveDelay={100000}
      >
        <a
          href='mailto:info@sendmequotation.today'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.colors.grey,
          }}
        >
          <MdAlternateEmail
            style={{
              cursor: 'pointer',
            }}
          />
        </a>
      </TooltipWithNoMaxWidth>
    </footer>
  )
}
