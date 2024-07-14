import { useSelectorTyped } from '@lib_instances/store'
import { Box, type SxProps } from '@mui/material'
import { useRef, type MouseEvent } from 'react'
import { type FroalaEditor, type FroalaEditorRef } from '@shared/types/froala'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useBlock } from '../../providers/BlockProvider'
import { isFroalaSignal } from '../../signals/isFroalaSignal'
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
  style?: React.CSSProperties
  sx?: SxProps
  onContentChange: () => void
  onFocus?: () => void
  onClick?: (e: MouseEvent) => void
  onBlur?: (e: MouseEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  onInitialized?: () => void
  className?: string
  wrapperStyles?: React.CSSProperties
  beforeUpload?: ({
    editor,
    files,
  }: {
    editor: FroalaEditor
    files: File[]
  }) => boolean
}

export const Froala = ({
  editorRef,
  htmlGetter,
  style,
  sx,
  placeholder,
  onContentChange,
  onFocus,
  onClick,
  onBlur,
  onKeydown,
  onInitialized,
  className,
  wrapperStyles,
  beforeUpload,
}: FroalaProps): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { blockIndex } = useBlock()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isBlockFroala = useSelectorTyped(
    (state) => state.quotation.blocks[blockIndex]?.isFroala ?? true,
  )
  // todo: disabled viewport observer for time being otherwise total price being out of view is not calculated and pdf produces incorrect file, maybe we do not even need it
  // const { observerRef, isInsideViewPort } = useViewPortObserver()
  const showEditableHtml = isFroalaSignal.value && isBlockFroala // && isInsideViewPort

  return (
    <FroalaProvider
      editorRef={editorRef}
      htmlGetter={htmlGetter}
      style={style}
      sx={sx}
      placeholder={placeholder}
      onContentChange={onContentChange}
      onFocus={onFocus}
      onClick={onClick}
      onBlur={onBlur}
      onKeydown={onKeydown}
      onInitialized={onInitialized}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
      beforeUpload={beforeUpload}
    >
      <Box
        className={`froala-wrapper ${className ?? ''}`}
        style={{
          ...wrapperStyles,
          cursor: 'pointer',
        }}
        onMouseDown={(e: MouseEvent) => {
          selectTextOrCloseToolbar({ e, editorRef })
        }}
        onClick={(e: MouseEvent) => {
          placeCaretAtTheEndIfToolbarIsNotShown({
            e,
            editorRef,
            froalaElementRef,
          })
        }}
        onDoubleClickCapture={(e: MouseEvent) => {
          selectTextOrCloseToolbar({ e, editorRef })
        }}
      >
        <div
          // ref={observerRef}
          className='view-port-observer'
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          {!showEditableHtml && <StaticHtml />}
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
