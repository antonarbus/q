import type { SxProps } from '@mui/material'
import type { CSSProperties, MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { StaticHtml } from './StaticHtml'

type Props = {
  padding?: number | string
  initHtml: string
  additionalStyle?: SxProps
  editorRef: MutableRefObject<FroalaEditor | null>
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

// * needed to smoothen the froala blink effect on initiation
// * it stays behind the real EditableHtml and
// * when EditableHtml blinks we do not see the real blink as we look at this static replica
// * after froala initiated make "visibility: hidden", otherwise you will see static text when delete dynamic text in Froala

export const StaticHtmlBackgroundToFixBlinkIssue = ({
  initHtml,
  padding,
  additionalStyle,
  editorRef,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  const [visibility, setVisibility] = useState<CSSProperties['visibility']>('visible')

  useEffectOnce(() => {
    const timeoutId = setTimeout(() => {
      setVisibility('hidden')
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <StaticHtml
      initHtml={initHtml}
      padding={padding}
      additionalStyle={{
        ...additionalStyle,
        position: 'absolute',
        visibility,
      }}
      editorRef={editorRef}
      heightDuringAnimationRef={heightDuringAnimationRef}
    />
  )
}
