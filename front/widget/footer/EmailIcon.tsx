import { Tooltip } from '@mui/material'
import { theme } from '@shared/theme'
import type { JSX } from 'react'
import { MdAlternateEmail } from 'react-icons/md'

export const EmailIcon = (): JSX.Element => {
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
