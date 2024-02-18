import { useSelectorTyped } from '@lib_instances/store'
import { Box, type SxProps } from '@mui/material'
import { useRef, type MouseEvent } from 'react'
import { type FroalaEditorRef } from '@shared/types'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { selectTextOrCloseToolbar } from './selectTextOrCloseToolbar'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
// import { useViewPortObserver } from './useViewPortObserver'

export type FroalaProps = {
  htmlGetter: () => string
  editorRef: FroalaEditorRef
  placeholder?: string
  additionalStyle?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: MouseEvent) => void
  onBlur?: (e: MouseEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  onInitialized?: () => void
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
  onKeydown,
  onInitialized,
  className,
  wrapperStyles,
}: FroalaProps): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { itemIndex } = useItem()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)
  // todo: disabled viewport observer for time being otherwise total price being out of view is not calculated and pdf produces incorrect file, maybe we do not even need it
  // const { observerRef, isInsideViewPort } = useViewPortObserver()
  const isAppFroala = useSelectorTyped(state => state.general.isFroala)
  const showEditableHtml = isAppFroala && isItemFroala // && isInsideViewPort

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
      onKeydown={onKeydown}
      onInitialized={onInitialized}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
    >
      <Box
        className={'froala-wrapper ' + (className ?? '')}
        sx={{
          ...wrapperStyles,
          cursor: 'pointer',
        }}
        onMouseDown={(e: MouseEvent) => {
          selectTextOrCloseToolbar({ e, editorRef })
        }}
        onClick={(e: MouseEvent) => {
          placeCaretAtTheEndIfToolbarIsNotShown({ e, editorRef, froalaElementRef })
        }}
        onDoubleClickCapture={(e: MouseEvent) => {
          selectTextOrCloseToolbar({ e, editorRef })
        }}
      >
        <div
          className='view-port-observer'
          // ref={observerRef}
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
