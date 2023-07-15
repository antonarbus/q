import { TRefAny, TRefDiv } from 'client/types'
import { useStartFroala } from './useStartFroala'
import { AnyAction } from '@reduxjs/toolkit'
import { Box, SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { FroalaForCopyMode } from './FroalaForCopyMode'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import parseHtml from 'html-react-parser'

type TReducerProps = {
  index: number
  html: string
  rowIndex?: number
}

export type TSaveFroalaReducer = ({ index, html, rowIndex }: TReducerProps) => AnyAction

type TProps = {
  index: number
  padding?: number | string
  initHtml: string
  froalaElementRef: TRefDiv
  editorRef: TRefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: TSaveFroalaReducer
}

export const Froala = ({ additionalStyle, editorRef, froalaElementRef, index, initHtml, onClickAwayIfHtmChanged, padding, placeholder, rowIndex, saveFroalaReducer }: TProps) => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  useStartFroala({ editorRef, froalaElementRef, index, initHtml, onClickAwayIfHtmChanged, placeholder, rowIndex, saveFroalaReducer, isCopyMode })
  usePutCaretAtTheEndOfText({ index, isCopyMode, editorRef, froalaElementRef })
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef, isCopyMode })

  // todo: make cellRenderer for headers, items, cost, price cols
  // todo: they will be rendered only on click, which is more performant

  if (isCopyMode) {
    return (
      <FroalaForCopyMode
        html={initHtml}
        padding={padding}
        additionalStyle={additionalStyle}
        editorRef={editorRef}
        heightDuringAnimationRef={heightDuringAnimationRef}
      />
    )
  }

  return (
    <Box
      ref={froalaElementRef}
      className='q-froala-element'
      style={{
        padding: padding || 0,
        height: heightDuringAnimationRef.current || 'auto', // for animation, will be removed after froala is initialized
      }}
      sx={{
        wordBreak: 'break-word',
        '& .fr-element:hover:not(:focus)': {
          textShadow: '0px 0px 0.8px',
        },
        ...additionalStyle,
      }}
    >
      {parseHtml(initHtml)}
    </Box>
  )
}
