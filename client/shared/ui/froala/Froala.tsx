import type { SxProps } from '@mui/material'
import { useRef, type MutableRefObject, type RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useItem } from 'client/widgets/items/ItemProvider'

type Props = {
  htmlGetter: () => string
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  onContentChange: () => void
  onFocus?: () => void
}

export const Froala = ({
  additionalStyle,
  editorRef,
  htmlGetter,
  placeholder,
  onContentChange,
  onFocus,
}: Props): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const isAppFroala = useSelectorTyped(state => state.app.isFroala)
  const { itemIndex } = useItem()
  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver()

  const showEditableHtml = isAppFroala && isInsideViewPort && isItemFroala

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
            froalaElementRef={froalaElementRef}
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
