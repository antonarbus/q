import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
import { Box, SxProps } from '@mui/material'
// import parseHtml from 'html-react-parser'

type TProps = {
  index: number
  padding?: number | string
  initHtml?: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveHtmlReducer: (
    { index, html, rowIndex }: { index: number, html: string, rowIndex?: number }
  ) => AnyAction
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
  rowIndex,
  additionalStyle
}: TProps) => {
  useFroala({
    index,
    initHtml,
    onClickAwayIfHtmChanged,
    froalaElementRef,
    editorRef,
    placeholder,
    saveHtmlReducer,
    rowIndex
  })

  return (
    <Box
      className='q-froala-element'
      ref={froalaElementRef}
      style={{
        padding: padding || 0,
        wordBreak: 'break-word',
      }}
      sx={{
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px'
        },
        ...additionalStyle
      }}
    />
  )
}
