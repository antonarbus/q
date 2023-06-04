import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
import parseHtml from 'html-react-parser'

type TProps = {
  index: number
  padding?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  sx?: React.CSSProperties
  onClickAwayIfHtmChanged?: Function
  saveHtmlReducer: ({ index, html }: {index: number, html: string}) => AnyAction
}

export const Froala = ({
  index,
  editorRef,
  froalaElementRef,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
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
    saveHtmlReducer
  })

  return (
    <div
      ref={froalaElementRef}
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
