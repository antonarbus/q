import { RefAny, RefDiv } from 'client/types'
import { AnyAction } from '@reduxjs/toolkit'
import { SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/store'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
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
  getHtml: () => string
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
  getHtml,
  onClickAwayIfHtmChanged,
  padding,
  placeholder,
  rowIndex,
  saveFroalaReducer,
}: Props) => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver()

  // todo: add an option and state which will show RenderedHtml and init froala on mousedown, for froalas at header, item, cost, price

  const showStaticHtml = isCopyMode || !isInsideViewPort
  const showEditableHtml = !isCopyMode && isInsideViewPort

  return (
    <div ref={observerRef}>
      {showStaticHtml && (
        <StaticHtml
          getHtml={getHtml}
          padding={padding}
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {showEditableHtml && (
        <EditableHtml
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          froalaElementRef={froalaElementRef}
          index={index}
          getHtml={getHtml}
          onClickAwayIfHtmChanged={onClickAwayIfHtmChanged}
          padding={padding}
          placeholder={placeholder}
          rowIndex={rowIndex}
          saveFroalaReducer={saveFroalaReducer}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
    </div>
  )
}
