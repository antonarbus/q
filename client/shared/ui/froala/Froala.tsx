import type { SxProps } from '@mui/material'
import { type MutableRefObject, type RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { type BoqEditorsRef } from 'client/entities/items'

type Props = {
  itemIndex: number
  htmlGetter: () => string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  boqEditorsRef?: BoqEditorsRef
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: () => void
  onFocus?: () => void
}

export const Froala = ({
  additionalStyle,
  editorRef,
  boqEditorsRef,
  froalaElementRef,
  itemIndex,
  rowIndex,
  htmlGetter,
  placeholder,
  onContentChange,
  onFocus,
}: Props): JSX.Element => {
  const isFroala = useSelectorTyped(state => state.app.isFroala)
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver()

  const showEditableHtml = isFroala && isInsideViewPort

  return (
    <div
      ref={observerRef}
      css={{
        width: '100%',
        position: 'relative',
      }}
    >
      {!showEditableHtml && (
        // * needed to disable Froala to avoid expensive frequent Froala initializing, for ex. when we change column width
        <StaticHtml
          htmlGetter={htmlGetter}
          additionalStyle={additionalStyle}
          froalaHeightRef={froalaHeightRef}
        />
      )}
      {showEditableHtml && (
        <>
          <StaticHtmlBackgroundToFixBlinkIssue
            htmlGetter={htmlGetter}
            additionalStyle={additionalStyle}
            froalaHeightRef={froalaHeightRef}
          />
          <EditableHtml
            additionalStyle={additionalStyle}
            editorRef={editorRef}
            boqEditorsRef={boqEditorsRef}
            froalaElementRef={froalaElementRef}
            itemIndex={itemIndex}
            rowIndex={rowIndex}
            htmlGetter={htmlGetter}
            onContentChange={onContentChange}
            onFocus={onFocus}
            placeholder={placeholder}
            froalaHeightRef={froalaHeightRef}
          />
        </>
      )}
    </div>
  )
}
