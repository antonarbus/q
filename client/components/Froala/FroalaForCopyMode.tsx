import { Box, SxProps } from '@mui/material'
import { TRefAny } from 'client/types'
import { MutableRefObject, useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  padding?: number | string
  html: string
  additionalStyle?: SxProps
  editorRef: TRefAny
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const FroalaForCopyMode = ({ html: initHtml, padding, additionalStyle, editorRef, heightDuringAnimationRef }: TProps) => {
  const ref = useRef<HTMLDivElement>()

  const html = useRef(initHtml)

  if (editorRef.current?.html) {
    html.current = editorRef.current?.html.get()
  }

  useEffectOnce(function insertHtmlIntoElement() {
    if (!ref.current) return
    ref.current.innerHTML = html.current || initHtml
  })

  useEffectOnce(function saveHeightAfterLoadingContent() {
    if (!ref?.current?.clientHeight) return
    heightDuringAnimationRef.current = ref.current.clientHeight
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
