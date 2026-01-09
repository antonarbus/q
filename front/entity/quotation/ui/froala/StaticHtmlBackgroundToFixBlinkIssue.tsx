import { type CSSProperties, type JSX, useState } from 'react'
import { useEffectOnce } from 'react-use'
import { StaticHtml } from './StaticHtml'

// * needed to smoothen the froala blink effect on initiation
// * it stays behind the real EditableHtml and
// * when EditableHtml blinks we do not see the real blink as we look at this static replica
// * after froala initiated make "visibility: hidden", otherwise you will see static text when delete dynamic text in Froala

export const StaticHtmlBackgroundToFixBlinkIssue = (): JSX.Element => {
  const [visibility, setVisibility] =
    useState<CSSProperties['visibility']>('visible')

  useEffectOnce(() => {
    const timeoutId = setTimeout(() => {
      setVisibility('hidden')
    }, 500)

    return (): void => {
      clearTimeout(timeoutId)
    }
  })

  return (
    <StaticHtml
      styleAgainstFroalaBlinks={{
        position: 'absolute',
        width: '100%',
        visibility,
      }}
    />
  )
}
