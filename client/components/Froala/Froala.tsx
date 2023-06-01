import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { FixHeightDuringAnimation } from 'client/components/FixHeightDuringAnimation'

type TProps = {
  padding?: number | string
  initHeight?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  sx?: React.CSSProperties
  onClickAwayIfHtmChanged?: Function
}

export const Froala = ({
  padding,
  initHeight,
  initHtml,
  onClickAwayIfHtmChanged,
  froalaElementRef,
  editorRef,
  placeholder,
  sx
}: TProps) => {
  useFroala({ initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder })

  return (
    <div
      ref={froalaElementRef}
      style={{
        height: initHeight // for animation, will be removed after froala is initialized
      }}
      css={{
        padding: padding || 0,
        wordBreak: 'break-word',
        ...sx
      }}
    />
  )
}
