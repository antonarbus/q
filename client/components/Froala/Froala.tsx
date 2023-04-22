import { RefAnyType, RefDivType } from 'client/types'
import { useFroala } from './useFroala'

type Props = {
  padding?: number | string
  initHeight?: number | string
  initHtml?: string
  onClickAwayIfHtmChanged?: () => void
  froalaElementRef: RefDivType
  editorRef: RefAnyType
}

/**
* @param padding 0 if not provided
* @param initHeight may need to preserve height until froala is not instantiated
* @param initHtml initHtml for initial Froala render
* @param onClickAwayIfHtmChanged can be used to save current html in redux or sent it somewhere
* @param froalaElementRef can be used to get an access to the Froala element
* @param editorRef can be used to get an access to the Froala methods
*/

export const Froala = ({ padding, initHeight, initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef }: Props) => {
  useFroala({ initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef })

  return (
    <div
      ref={froalaElementRef}
      css={{
        height: initHeight || 'auto',
        padding: padding || 0,
      }}
    />
  )
}
