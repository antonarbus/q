import type { SxProps } from '@mui/material'
import type { MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { Box } from '@mui/material'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type Props = {
  padding?: number | string
  initHtmlGetter: () => string
  additionalStyle?: SxProps
  editorRef: MutableRefObject<FroalaEditor | null>
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

export const StaticHtml = ({
  initHtmlGetter,
  padding,
  additionalStyle,
  editorRef,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>()
  const html = useRef(initHtmlGetter())

  if (editorRef.current?.html) {
    html.current = editorRef.current.html.get()
  }

  useEffectOnce(() => {
    // insert Html Into Element
    if (!ref.current) return
    ref.current.innerHTML = html.current || initHtmlGetter()
  })

  useEffectOnce(() => {
    // save Height After Loading Content
    if (!ref.current?.clientHeight) return
    heightDuringAnimationRef.current = ref.current.clientHeight
  })

  return (
    <Box
      ref={ref}
      style={{
        padding: padding ?? 0,
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          // textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    ></Box>
  )
}
