import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
// import parseHtml from 'html-react-parser'

type TProps = {
  index: number
  padding?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  sx?: React.CSSProperties
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveHtmlReducer: ({ index, html, rowIndex }: {index: number, html: string, rowIndex?: number}) => AnyAction
}

export const Froala = ({ index, editorRef, froalaElementRef, initHtml, onClickAwayIfHtmChanged, padding, placeholder, saveHtmlReducer, rowIndex, sx }: TProps) => {
  useFroala({ index, initHtml, onClickAwayIfHtmChanged, froalaElementRef, editorRef, placeholder, saveHtmlReducer, rowIndex })

  return (
    <div
      ref={froalaElementRef}
      css={{
        padding: padding || 0,
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...sx
      }}
    />
  )
}
