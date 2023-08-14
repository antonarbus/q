import type { RefDiv, TOnFroalaContentChange } from 'client/shared/types'
import type { AnyAction } from '@reduxjs/toolkit'
import type { SxProps } from '@mui/material'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
import type { MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'

interface IProps {
  index: number
  padding?: number | string
  getHtml: () => string
  froalaElementRef: RefDiv
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: TOnFroalaContentChange
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  getHtml,
  padding,
  placeholder,
  rowIndex,
  onContentChange,
}: IProps): JSX.Element => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver({ index })

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
          padding={padding}
          placeholder={placeholder}
          rowIndex={rowIndex}
          onContentChange={onContentChange}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
    </div>
  )
}
