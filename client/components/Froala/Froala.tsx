import { RefAny, RefDiv } from 'client/types'
import { AnyAction } from '@reduxjs/toolkit'
import { SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import './froala_editor.pkgd.min.css'
// import './plugins.pkgd.min.css'

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
  froalaElementRef: RefDiv
  editorRef: RefAny
  placeholder?: string
  additionalStyle?: SxProps
  onClickAwayIfHtmChanged?: Function
  rowIndex?: number
  saveFroalaReducer: SaveFroalaReducer
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  initHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
}: Props) => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef, isCopyMode })

  // todo: add an option and state which will show RenderedHtml and init froala on click, for froalas at header, item, cost, price
  // todo: it will be more performant

  // todo: think about adding an option to render Froala when it is at the viewport, otherwise render RenderedHtml
  // todo: for that Intersection Observer is needed

  if (isCopyMode) {
    return (
      <StaticHtml
        html={initHtml}
        padding={padding}
        additionalStyle={additionalStyle}
        editorRef={editorRef}
        heightDuringAnimationRef={heightDuringAnimationRef}
      />
    )
  }

  return (
    <EditableHtml
      additionalStyle={additionalStyle}
      editorRef={editorRef}
      froalaElementRef={froalaElementRef}
      index={index}
      initHtml={initHtml}
      onClickAwayIfHtmChanged={onClickAwayIfHtmChanged}
      padding={padding}
      placeholder={placeholder}
      rowIndex={rowIndex}
      saveFroalaReducer={saveFroalaReducer}
      heightDuringAnimationRef={heightDuringAnimationRef}
    />
  )
}
