import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
import parseHtml from 'html-react-parser'

type TProps = {
  index: number
  padding?: number | string
  initHeight?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  sx?: React.CSSProperties
  onClickAwayIfHtmChanged?: Function
  saveHeightReducer: ({ index, height }: {index: number, height: number}) => AnyAction
  saveHtmlReducer: ({ index, html }: {index: number, html: string}) => AnyAction
}

export const Froala = ({
  index,
  editorRef,
  froalaElementRef,
  initHeight,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  saveHeightReducer,
  saveHtmlReducer,
  sx
}: TProps) => {
  useFroala({
    index,
    initHtml,
    onClickAwayIfHtmChanged,
    froalaElementRef,
    editorRef,
    placeholder,
    saveHeightReducer,
    saveHtmlReducer
  })

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
    >
      {parseHtml(initHtml || '')}
    </div>
  )
}
