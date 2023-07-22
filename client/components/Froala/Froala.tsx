import { RefAny, TRefDiv } from 'client/types'
import { useStartFroala } from './useStartFroala'
import { AnyAction } from '@reduxjs/toolkit'
import { Box, SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { FroalaForCopyMode } from './FroalaForCopyMode'
import { usePutCaretAtTheEndOfText } from './usePutCaretAtTheEndOfText'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import parseHtml from 'html-react-parser'

type ReducerProps = {
  index: number
  html: string
  rowIndex?: number
}

export type SaveFroalaReducer = ({ index, html, rowIndex }: ReducerProps) => AnyAction

type Props = {
  index: number
  padding?: number | string
  initHtml: string
  froalaElementRef: TRefDiv
  editorRef: RefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: SaveFroalaReducer
}

export const Froala = ({ additionalStyle, editorRef, froalaElementRef, index, initHtml, onClickAwayIfHtmChanged, padding, placeholder, rowIndex, saveFroalaReducer }: Props) => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  useStartFroala({ editorRef, froalaElementRef, index, initHtml, onClickAwayIfHtmChanged, placeholder, rowIndex, saveFroalaReducer, isCopyMode })
  usePutCaretAtTheEndOfText({ index, isCopyMode, editorRef, froalaElementRef })
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef, isCopyMode })

  // todo: init froala on click for headers
  // todo: make cellRenderer for item, cost, price cols
  // todo: it will be more performant

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
