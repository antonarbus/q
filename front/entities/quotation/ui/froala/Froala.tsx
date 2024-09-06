import { useSelectorTyped } from '@lib_instances/store'
import {
  Box,
  // type SxProps
} from '@mui/material'
import { useRef, type MouseEvent, type ElementRef } from 'react'
// import type { FroalaEditor, FroalaEditorRef } from '@shared/types/froala'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useBlock } from '../../providers/BlockProvider'
import { isFroalaSignal } from '../../signals/isFroalaSignal'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { selectTextOrCloseToolbar } from './selectTextOrCloseToolbar'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { cls } from '@shared/consts/cls'
import {
  showDropFilesTextOnMouseEnter,
  showDropFilesTextOnMouseLeave,
} from '@features/upload/showDropFilesTextOnHover'
import type { FroalaProps } from './types'

// export type FroalaProps = {
//   htmlGetter: () => string
//   editorRef: FroalaEditorRef
//   placeholder?: string
//   style?: React.CSSProperties
//   sx?: SxProps
//   onContentChange: () => void
//   onFocus?: () => void
//   onClick?: (e: MouseEvent) => void
//   onBlur?: (e: MouseEvent) => void
//   onKeydown?: (e: KeyboardEvent) => void
//   onInitialized?: () => void
//   className?: string
//   droppable?: boolean
//   wrapperStyles?: React.CSSProperties
//   beforeUpload?: ({
//     editor,
//     files,
//   }: {
//     editor: FroalaEditor
//     files: File[]
//   }) => boolean
// }

export const Froala = (props: FroalaProps): JSX.Element => {
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
      editorRef={props.editorRef}
      htmlGetter={props.htmlGetter}
      style={props.style}
      sx={props.sx}
      placeholder={props.placeholder}
      onContentChange={props.onContentChange}
      onFocus={props.onFocus}
      onClick={props.onClick}
      onBlur={props.onBlur}
      onKeydown={props.onKeydown}
      onInitialized={props.onInitialized}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
      beforeUpload={props.beforeUpload}
    >
      <Box
        className={`froala-wrapper ${props.className ?? ''}`}
        style={{
          ...props.wrapperStyles,
          cursor: 'pointer',
        }}
        onMouseDown={(e: MouseEvent) => {
          selectTextOrCloseToolbar({ e, editorRef: props.editorRef })
        }}
        onClick={(e: MouseEvent) => {
          placeCaretAtTheEndIfToolbarIsNotShown({
            e,
            editorRef: props.editorRef,
            froalaElementRef,
          })
        }}
        onMouseEnter={() => {
          showDropFilesTextOnMouseEnter({ dropFilesTextRef })
        }}
        onMouseLeave={() => {
          showDropFilesTextOnMouseLeave({ dropFilesTextRef })
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
            <>
              <StaticHtmlBackgroundToFixBlinkIssue />
              <EditableHtml />
            </>
          )}
          {props.droppable && (
            <Box
              ref={dropFilesTextRef}
              className={cls.dropFilesText}
              style={{
                position: 'absolute',
                top: '2px',
                right: '3px',
                fontSize: '8px',
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity 0.3s ease-in-out 0.8s',
                userSelect: 'none',
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
