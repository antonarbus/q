import type { SxProps } from '@mui/material'
import type { CSSProperties, MutableRefObject } from 'react'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { StaticHtml } from './StaticHtml'

type Props = {
  htmlGetter: () => string
  additionalStyle?: SxProps
  froalaHeightRef: MutableRefObject<number | undefined>
}

// * needed to smoothen the froala blink effect on initiation
// * it stays behind the real EditableHtml and
// * when EditableHtml blinks we do not see the real blink as we look at this static replica
// * after froala initiated make "visibility: hidden", otherwise you will see static text when delete dynamic text in Froala

export const StaticHtmlBackgroundToFixBlinkIssue = ({
  htmlGetter,
  additionalStyle,
  froalaHeightRef,
}: Props): JSX.Element => {
  const [visibility, setVisibility] = useState<CSSProperties['visibility']>('visible')

  useEffectOnce(() => {
    const timeoutId = setTimeout(() => {
      setVisibility('hidden')
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <StaticHtml
      htmlGetter={htmlGetter}
      froalaHeightRef={froalaHeightRef}
      additionalStyle={{
        position: 'absolute',
        width: '100%',
        visibility,
        ...additionalStyle,
      }}
    />
  )
}
