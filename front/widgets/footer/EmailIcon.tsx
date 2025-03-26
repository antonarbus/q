import { theme } from '@shared/theme'
import { MdAlternateEmail } from 'react-icons/md'
import { Tooltip } from '@mui/material'

export const EmailIcon = (): React.JSX.Element => {
  return (
    <Tooltip
      title='Ask a question, send feedback, report a bug, or a feature request'
      placement='top'
    >
      <a
        href='mailto:anton.arbus@gmail.com'
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
    </Tooltip>
  )
}
