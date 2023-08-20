import type { HtmlGetter, OnFroalaContentChange } from 'client/shared/types'
import type { SxProps } from '@mui/material'
import type { MutableRefObject, RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'

interface Props {
  index: number
  padding?: number | string
  initHtmlGetter: HtmlGetter
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: OnFroalaContentChange
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  index,
  initHtmlGetter,
  padding,
  placeholder,
  rowIndex,
  onContentChange,
}: Props): JSX.Element => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver({ index })

  const showStaticHtml = isCopyMode || !isInsideViewPort
  const showEditableHtml = !isCopyMode && isInsideViewPort

  return (
    <div
      ref={observerRef}
      css={{
        width: '100%',
      }}
    >
      {showStaticHtml && (
        <StaticHtml
          initHtmlGetter={initHtmlGetter.bind(null, { index, rowIndex })}
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
          initHtmlGetter={initHtmlGetter.bind(null, { index, rowIndex })}
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
