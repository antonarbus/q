import { useSelectorTyped } from '@lib_instances/store'
import { Box, type SxProps } from '@mui/material'
import type { ElementRef } from 'react'
import { RefObject, useRef, type MouseEvent } from 'react'
import type { FroalaEditor, FroalaEditorRef } from '@shared/types/froala'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useBlock } from '../../providers/BlockProvider'
import { isFroalaSignal } from '../../signals/isFroalaSignal'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { selectTextOrCloseToolbar } from './selectTextOrCloseToolbar'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'

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
  droppable?: boolean
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
  droppable,
}: FroalaProps): JSX.Element => {
  const dragAndDropRef = useRef<ElementRef<'div'>>(null)
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { blockIndex } = useBlock()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isBlockFroala = useSelectorTyped(
    (state) => state.quotation.blocks[blockIndex]?.isFroala ?? true,
  )

  const showEditableHtml = isFroalaSignal.value && isBlockFroala

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
        onMouseEnter={() => {
          const dragAndDropElement = dragAndDropRef.current
          if (!dragAndDropElement) return
          dragAndDropElement.style.visibility = 'visible'
        }}
        onMouseLeave={() => {
          const dragAndDropElement = dragAndDropRef.current
          if (!dragAndDropElement) return
          dragAndDropElement.style.visibility = 'hidden'
        }}
      >
        <Box
          style={{
            width: '100%',
            position: 'relative',
          }}
        >
          {!showEditableHtml && <StaticHtml />}
          {showEditableHtml && (
            <Box>
              <StaticHtmlBackgroundToFixBlinkIssue />
              <EditableHtml />
            </Box>
          )}
          {droppable && (
            <Box
              ref={dragAndDropRef}
              className='drag-and-drop'
              style={{
                position: 'absolute',
                inset: '2px',
                border: '1px dashed #d7d7d7',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // zIndex: 1, // when hover
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  right: '3px',
                  fontSize: '8px',
                }}
              >
                Drop here
              </Box>
              <Box
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'grey',
                  display: 'none',
                }}
              >
                Drop here
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
