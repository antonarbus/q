import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'

type Props = {
  padding?: number | string
  initHeight?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  sx?: React.CSSProperties
  onClickAwayIfHtmChanged?: () => void
}

/**
 * @param padding 0 if not provided
 * @param initHeight may need to preserve height until froala is not instantiated
 * @param initHtml initHtml for initial Froala render
 * @param onClickAwayIfHtmChanged can be used to save current html in redux or sent it somewhere
 * @param froalaElementRef can be used to get an access to the Froala element
 * @param editorRef can be used to get an access to the Froala methods
 * @param sx just styles
 */

export const Froala = ({
  padding,
  initHeight,
  initHtml,
  onClickAwayIfHtmChanged,
  froalaElementRef,
  editorRef,
  placeholder,
  sx
}: Props) => {
  useFroala({ initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder })

  return (
    <div
      ref={froalaElementRef}
      css={{
        height: initHeight || 'auto',
        padding: padding || 0,
        wordBreak: 'break-word',
        ...sx
      }}
    />
  )
}
