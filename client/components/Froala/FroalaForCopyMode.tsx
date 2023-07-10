import { Box, SxProps } from '@mui/material'
import { TRefAny } from 'client/types'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  padding?: number | string
  html: string
  additionalStyle?: SxProps
  editorRef: TRefAny
}

export const FroalaForCopyMode = ({ html: initHtml, padding, additionalStyle, editorRef }: TProps) => {
  const ref = useRef<HTMLDivElement>()

  const html = useRef(initHtml)
  if (editorRef.current?.html) {
    html.current = editorRef.current?.html.get()
  }

  useEffectOnce(function insertHtmlIntoElement() {
    if (ref.current) {
      ref.current.innerHTML = html.current || initHtml
    }
  })

  return (
    <Box
      ref={ref}
      className='q-froala-element not-editable'
      style={{
        padding: padding || 0,
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    >
    </Box>
  )
}
