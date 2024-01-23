import { useSelectorTyped } from '@lib_instances/store'
import { Box, type SxProps } from '@mui/material'
import type FroalaEditor from 'froala-editor'
import { useRef, type MutableRefObject, type MouseEvent } from 'react'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEnd } from './placeCaretAtTheEnd'
import { selectText } from './selectText'
// import { selectText2 } from './selectText2'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { useViewPortObserver } from './useViewPortObserver'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: MouseEvent) => void
  onBlur?: (e: MouseEvent) => void
  className?: string
  wrapperStyles?: SxProps
}

export const Froala = ({
  editorRef,
  htmlGetter,
  additionalStyle,
  placeholder,
  onContentChange,
  onFocus,
  onClick,
  onBlur,
  className,
  wrapperStyles,
}: FroalaProps): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { itemIndex } = useItem()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)
  const { observerRef, isInsideViewPort } = useViewPortObserver()
  const isAppFroala = useSelectorTyped(state => state.app.isFroala)
  const showEditableHtml = isAppFroala && isInsideViewPort && isItemFroala

  return (
    <FroalaProvider
      editorRef={editorRef}
      htmlGetter={htmlGetter}
      additionalStyle={additionalStyle}
      placeholder={placeholder}
      onContentChange={onContentChange}
      onFocus={onFocus}
      onClick={onClick}
      onBlur={onBlur}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
    >
      <Box
        className={'froala-wrapper ' + (className ?? '')}
        sx={{ ...wrapperStyles, cursor: 'pointer' }}
        onClick={(e: MouseEvent) => {
          placeCaretAtTheEnd({ e, editorRef, froalaElementRef })
          // todo: let's make a pointer for cell and select text on click
          // todo: as it happens in selectText2(), but need to orchestrate it with non table cells
          // selectText2({ e, editorRef })
        }}
        onDoubleClickCapture={(e: MouseEvent) => {
          selectText({ e, editorRef })
        }}
      >
        <div
          className='view-port-observer'
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
      </Box>
    </FroalaProvider>
  )
}
