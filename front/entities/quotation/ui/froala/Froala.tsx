import { useSelector } from '@shared/lib/redux'
import { Box } from '@mui/material'
import { useRef } from 'react'
import type { JSX, ComponentRef, MouseEvent } from 'react'
import { FroalaProvider } from '../../provider/FroalaProvider'
import { useBlock } from '../../provider/BlockProvider'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import {
  showDropFilesTextOnMouseEnter,
  showDropFilesTextOnMouseLeave,
} from '@features/file/upload-file/showDropFilesTextOnHover'
import type { FroalaProps } from './types'
import { DropFilesOrImagesText } from './DropFilesOrImagesText'
import { cls } from '@shared/const/cls'
import { DropHereText } from './DropHereText'

export const Froala = (props: FroalaProps): JSX.Element => {
  const dropFilesTextRef = useRef<ComponentRef<'div'> | null>(null)
  const froalaElementRef = useRef<ComponentRef<'div'> | null>(null)
  const { blockIndex } = useBlock()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isBlockFroala = useSelector(
    (state) => state.quotation.blocks[blockIndex]?.isFroala ?? true,
  )

  const isEditable = useSelector((state) => state.text.isEditable)

  const showEditableHtml = isEditable && isBlockFroala

  return (
    <FroalaProvider
      beforeUpload={props.beforeUpload}
      editorRef={props.editorRef}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
      htmlGetter={props.htmlGetter}
      onBlur={props.onBlur}
      onClick={props.onClick}
      onContentChange={props.onContentChange}
      onFocus={props.onFocus}
      onInitialized={props.onInitialized}
      onKeydown={props.onKeydown}
      placeholder={props.placeholder}
      style={props.style}
      sx={props.sx}
    >
      <Box
        className={`froala-wrapper ${props.className ?? ''}`}
        onClick={(event: MouseEvent) => {
          placeCaretAtTheEndIfToolbarIsNotShown({
            event,
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
        style={props.wrapperStyles}
      >
        <Box
          className={props.droppable === true ? cls.droppable : ''}
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: '4px',
          }}
        >
          {showEditableHtml === true ? (
            <>
              <StaticHtmlBackgroundToFixBlinkIssue />
              <EditableHtml />
            </>
          ) : (
            <StaticHtml />
          )}
          {props.droppable === true && (
            <DropFilesOrImagesText dropFilesTextRef={dropFilesTextRef} />
          )}
          {props.droppable === true && <DropHereText />}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
