import { theme } from '@shared/theme'
import { TooltipWithNoMaxWidth } from '@shared/components/TooltipWithNoMaxWidth'
import { MdAlternateEmail } from 'react-icons/md'

export const EmailIcon = (): React.JSX.Element => {
  return (
    <TooltipWithNoMaxWidth
      title='Ask a question, send feedback, report a bug, or a feature request'
      placement='top'
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
  )
}
