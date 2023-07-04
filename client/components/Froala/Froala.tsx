import { TRefAny, TRefDiv } from 'client/types'
import { useFroala } from './useFroala'
import { AnyAction } from '@reduxjs/toolkit'
import { Box, SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { FroalaForCopyMode } from './FroalaForCopyMode'

type TReducerProps = {
  index: number
  html: string
  height: number
  rowIndex?: number
}

export type TSaveFroalaReducer = ({ index, html, height, rowIndex }: TReducerProps) => AnyAction

type TProps = {
  index: number
  padding?: number | string
  initHtml: string
  height: number
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: TSaveFroalaReducer
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  height,
  index,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
}: TProps) => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)

  useFroala({
    editorRef,
    froalaElementRef,
    index,
    initHtml,
    onClickAwayIfHtmChanged,
    placeholder,
    rowIndex,
    saveFroalaReducer,
  })

  if (isCopyMode) {
    return (
      <FroalaForCopyMode
        html={initHtml}
        padding={padding}
        additionalStyle={additionalStyle}
      />
    )
  }

  return (
    <Box
      ref={froalaElementRef}
      className='q-froala-element'
      style={{
        padding: padding || 0,
        height: height || 'auto', // for animation, will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
      onFocus={() => {
        froalaElementRef.current.style.removeProperty('height')
      }}
    />
  )
}
