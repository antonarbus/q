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
import { Visibility } from '@mui/icons-material'
import zIndex from '@mui/material/styles/zIndex'
import { cls } from '@shared/consts/cls'

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
  const dropFilesTextRef = useRef<ElementRef<'div'>>(null)
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
          const dragAndDropElement = dropFilesTextRef.current
          if (!dragAndDropElement) return
          dragAndDropElement.style.opacity = '1'
        }}
        onMouseLeave={() => {
          const dragAndDropElement = dropFilesTextRef.current
          if (!dragAndDropElement) return
          dragAndDropElement.style.opacity = '0'
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
              ref={dropFilesTextRef}
              className={cls.dropFilesText}
              style={{
                position: 'absolute',
                top: '2px',
                right: '3px',
                fontSize: '8px',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out 0.8s',
              }}
            >
              Drop files
            </Box>
          )}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
