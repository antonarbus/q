import type { SxProps } from '@mui/material'
import { useRef, type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useItem } from '../../providers/ItemProvider'
import { FroalaProvider } from '../../providers/FroalaProvider'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export const Froala = (props: FroalaProps): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { itemIndex } = useItem()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)
  const { observerRef, isInsideViewPort } = useViewPortObserver()
  const isAppFroala = useSelectorTyped(state => state.app.isFroala)
  const showEditableHtml = isAppFroala && isInsideViewPort && isItemFroala

  return (
    <FroalaProvider
      editorRef={props.editorRef}
      htmlGetter={props.htmlGetter}
      additionalStyle={props.additionalStyle}
      placeholder={props.placeholder}
      onContentChange={props.onContentChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
    >
      <div
        ref={observerRef}
        css={{
          width: '100%',
          position: 'relative',
        }}
      >
        {!showEditableHtml && (
          <StaticHtml />
        )}
        {showEditableHtml && (
          <>
            <StaticHtmlBackgroundToFixBlinkIssue />
            <EditableHtml />
          </>
        )}
      </div>
    </FroalaProvider>
  )
}
