import { Tooltip } from '@mui/material'
import { theme } from '@front/shared/theme'
import { MdAlternateEmail } from 'react-icons/md'

export const EmailIcon = (): React.JSX.Element => {
  return (
    <Tooltip
      placement='top'
      title='Ask a question, send feedback, report a bug, or a feature request'
    >
      <a
        href='mailto:anton.arbus@gmail.com'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.color.grey,
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
