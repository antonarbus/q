import type { SxProps } from '@mui/material'
import type { MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { Box } from '@mui/material'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  padding?: number | string
  initHtml: string
  additionalStyle?: SxProps
  editorRef: MutableRefObject<FroalaEditor | null>
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const StaticHtml = ({
  initHtml,
  padding,
  additionalStyle,
  editorRef,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>()

  useEffectOnce(() => {
    // insert Html Into Element
    if (!ref.current) return
    ref.current.innerHTML = editorRef.current?.html.get() || initHtml
  })

  useEffectOnce(() => {
    // save Height After Loading Content
    if (!ref.current?.clientHeight) return
    heightDuringAnimationRef.current = ref.current.clientHeight
  })

  return (
    <Box
      ref={ref}
      className='static-html'
      style={{
        padding: padding ?? 0,
      }}
      sx={{
        opacity: 0.5,
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          // textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    ></Box>
  )
}
