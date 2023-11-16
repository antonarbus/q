import type { SxProps } from '@mui/material'
import { type MutableRefObject, type RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'

type Props = {
  itemIndex: number
  padding?: number | string
  initHtml: string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: () => void
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  itemIndex,
  rowIndex,
  initHtml,
  padding,
  placeholder,
  onContentChange,
}: Props): JSX.Element => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver({ itemIndex, rowIndex })

  const showStaticHtml = isCopyMode || !isInsideViewPort
  const showEditableHtml = !isCopyMode && isInsideViewPort

  return (
    <div
      ref={observerRef}
      css={{
        width: '100%',
        position: 'relative',
      }}
    >
      {showStaticHtml && (
        // * needed to disable Froala to avoid expensive frequent Froala initializing
        // * for ex. when we move copied items around
        <StaticHtml
          initHtml={initHtml}
          padding={padding}
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {showEditableHtml && (
        <>
          <StaticHtmlBackgroundToFixBlinkIssue
            initHtml={initHtml}
            padding={padding}
            additionalStyle={additionalStyle}
            editorRef={editorRef}
            heightDuringAnimationRef={heightDuringAnimationRef}
          />
          <EditableHtml
            additionalStyle={additionalStyle}
            editorRef={editorRef}
            froalaElementRef={froalaElementRef}
            itemIndex={itemIndex}
            initHtml={initHtml}
            padding={padding}
            placeholder={placeholder}
            rowIndex={rowIndex}
            onContentChange={onContentChange}
            heightDuringAnimationRef={heightDuringAnimationRef}
          />
        </>
      )}
    </div>
  )
}
