import { theme } from '@lib_instances/theme'
import { TooltipWithNoMaxWidth } from '@shared/components/TooltipWithNoMaxWidth'
import { MdAlternateEmail } from 'react-icons/md'

export const EmailIcon = (): JSX.Element => {
  return (
    <TooltipWithNoMaxWidth
      title='Ask question, send feedback, bug report or feature request'
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
