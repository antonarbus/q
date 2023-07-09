import { Box, SxProps } from '@mui/material'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  padding?: number | string
  html: string
  additionalStyle?: SxProps
}

export const FroalaForCopyMode = ({ html: initHtml, padding, additionalStyle }: TProps) => {
  const ref = useRef<HTMLDivElement>()

  useEffectOnce(function insertHtmlIntoElement() {
    if (ref.current) {
      ref.current.innerHTML = initHtml
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
