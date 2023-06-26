import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
import { Box, SxProps } from '@mui/material'
// import parseHtml from 'html-react-parser'

type TReducerProps = {
  index: number
  html: string
  froalaHeight: number
  rowIndex?: number
}

export type TSaveFroalaReducer = ({ index, html, froalaHeight, rowIndex }: TReducerProps) => AnyAction

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
  saveFroalaReducer: TSaveFroalaReducer
}

export const Froala = ({
  index,
  editorRef,
  froalaElementRef,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  saveFroalaReducer,
  rowIndex,
  additionalStyle,
}: TProps) => {
  useFroala({
    index,
    initHtml,
    onClickAwayIfHtmChanged,
    froalaElementRef,
    editorRef,
    placeholder,
    saveFroalaReducer,
    rowIndex,
  })

  return (
    <Box
      className='q-froala-element'
      ref={froalaElementRef}
      style={{
        padding: padding || 0,
        wordBreak: 'break-word',
        height: initHeight // for animation, will be removed after froala is initialized
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
