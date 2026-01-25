import { type CSSObject, Box } from '@mui/material'
import type { JSX } from 'react'
import { tiptapStyles } from './styles'

type Props = {
  className: string
  content: string
  sx: CSSObject
}

export const StaticHtml = (props: Props): JSX.Element => {
  return (
    <Box
      className={props.className}
      sx={{
        ...tiptapStyles,
        ...props.sx,
      }}
    >
      <Box
        className='tiptap-static-html'
        dangerouslySetInnerHTML={{ __html: props.content }}
        sx={{
          opacity: 0.5,
          wordBreak: 'break-word',
          flexGrow: 1,
        }}
      />
    </Box>
  )
}
