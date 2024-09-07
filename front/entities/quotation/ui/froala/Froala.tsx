import { useSelectorTyped } from '@lib_instances/store'
import { Box } from '@mui/material'
import { useRef } from 'react'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useBlock } from '../../providers/BlockProvider'
import { isFroalaSignal } from '../../signals/isFroalaSignal'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
// import { selectTextOrCloseToolbar } from './selectTextOrCloseToolbar'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import {
  showDropFilesTextOnMouseEnter,
  showDropFilesTextOnMouseLeave,
} from '@features/upload/showDropFilesTextOnHover'
import type { FroalaProps } from './types'
import { DropFilesText } from './DropFilesText'

export const Froala = (props: FroalaProps): JSX.Element => {
  const dropFilesTextRef = useRef<React.ElementRef<'div'>>(null)
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
        style={props.wrapperStyles}
        onMouseDown={(e: React.MouseEvent) => {
          // selectTextOrCloseToolbar({ e, editorRef: props.editorRef })
        }}
        onClick={(e: React.MouseEvent) => {
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
            <DropFilesText dropFilesTextRef={dropFilesTextRef} />
          )}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
