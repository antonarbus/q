import type { SxProps } from '@mui/material'
import type { CSSProperties, MutableRefObject } from 'react'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { StaticHtml } from './StaticHtml'

type Props = {
  padding?: number | string
  htmlGetter: () => string
  additionalStyle?: SxProps
  heightDuringAnimationRef: MutableRefObject<number | undefined>
}

// * needed to smoothen the froala blink effect on initiation
// * it stays behind the real EditableHtml and
// * when EditableHtml blinks we do not see the real blink as we look at this static replica
// * after froala initiated make "visibility: hidden", otherwise you will see static text when delete dynamic text in Froala

export const StaticHtmlBackgroundToFixBlinkIssue = ({
  htmlGetter,
  padding,
  additionalStyle,
  heightDuringAnimationRef,
}: Props): JSX.Element => {
  const [visibility, setVisibility] = useState<CSSProperties['visibility']>('visible')

  useEffectOnce(() => {
    const timeoutId = setTimeout(() => {
      // setVisibility('hidden')
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <StaticHtml
      htmlGetter={htmlGetter}
      padding={padding}
      heightDuringAnimationRef={heightDuringAnimationRef}
      additionalStyle={{
        position: 'absolute',
        width: '100%',
        visibility,
        ...additionalStyle,
      }}
    />
  )
}
