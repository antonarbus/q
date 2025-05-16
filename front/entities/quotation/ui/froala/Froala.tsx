import { useSelector } from '@shared/lib/redux'
import { Box } from '@mui/material'
import { useRef } from 'react'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useBlock } from '../../providers/BlockProvider'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import {
  showDropFilesTextOnMouseEnter,
  showDropFilesTextOnMouseLeave,
} from '@features/file/upload_file/showDropFilesTextOnHover'
import type { FroalaProps } from './types'
import { DropFilesOrImagesText } from './DropFilesOrImagesText'
import { cls } from '@shared/consts/cls'
import { DropHereText } from './DropHereText'

export const Froala = (props: FroalaProps): React.JSX.Element => {
  const dropFilesTextRef = useRef<React.ComponentRef<'div'> | null>(null)
  const froalaElementRef = useRef<React.ComponentRef<'div'> | null>(null)
  const { blockIndex } = useBlock()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[blockIndex]?.isFroala ?? true,
  )

  const isEditable = useSelector((state) => state.text.isEditable)

  const showEditableHtml = isEditable && isBlockFroala

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
          className={props.droppable ? cls.droppable : ''}
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: '4px',
          }}
        >
          {showEditableHtml === false && <StaticHtml />}
          {showEditableHtml && (
            <>
              <StaticHtmlBackgroundToFixBlinkIssue />
              <EditableHtml />
            </>
          )}
          {props.droppable && (
            <DropFilesOrImagesText dropFilesTextRef={dropFilesTextRef} />
          )}
          {props.droppable && <DropHereText />}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
