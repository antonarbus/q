import {
  showDropFilesTextOnMouseEnter,
  showDropFilesTextOnMouseLeave,
} from '@feature/file/upload-file/showDropFilesTextOnHover'
import { Box } from '@mui/material'
import { cls } from '@shared/cls'
import { useSelector } from '@shared/lib/redux'
import { type ComponentRef, type JSX, type MouseEvent, useRef } from 'react'
import { useBlock } from '../../provider/BlockProvider'
import { FroalaProvider } from '../../provider/FroalaProvider'
import { DropFilesOrImagesText } from './DropFilesOrImagesText'
import { DropHereText } from './DropHereText'
import { EditableHtml } from './EditableHtml'
import { placeCaretAtTheEndIfToolbarIsNotShown } from './placeCaretAtTheEndIfToolbarIsNotShown'
import { StaticHtml } from './StaticHtml'
import { StaticHtmlBackgroundToFixBlinkIssue } from './StaticHtmlBackgroundToFixBlinkIssue'
import type { FroalaProps } from './types'
import { useFixedHeightRefForAnimation } from './useFixedHeightRefForAnimation'

export const Froala = (props: FroalaProps): JSX.Element => {
  const dropFilesTextRef = useRef<ComponentRef<'div'> | null>(null)
  const froalaElementRef = useRef<ComponentRef<'div'> | null>(null)
  const block = useBlock()
  const fixedHeightRef = useFixedHeightRefForAnimation({ froalaElementRef })

  // const isBlockFroala = useSelector(
  //   (state) => state.quotation.blocks[block.index]?.isFroala ?? true,
  // )

  const isEditable = useSelector((state) => state.text.isEditable)

  const showEditableHtml = isEditable && isBlockFroala

  return (
    <FroalaProvider
      beforeUpload={props.beforeUpload}
      // editorRef={props.editorRef}
      froalaElementRef={froalaElementRef}
      fixedHeightRef={fixedHeightRef}
      // htmlGetter={props.htmlGetter}
      onBlur={props.onBlur}
      onClick={props.onClick}
      // onContentChange={props.onContentChange}
      onFocus={props.onFocus}
      onInitialized={props.onInitialized}
      onKeydown={props.onKeydown}
      placeholder={props.placeholder}
      style={props.style}
      sx={props.sx}
    >
      <Box
        // className={`froala-wrapper ${props.className ?? ''}`}
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
            position: 'relative',
            borderRadius: '4px',
          }}
        >
          {props.droppable === true && (
            <DropFilesOrImagesText dropFilesTextRef={dropFilesTextRef} />
          )}
          {props.droppable === true && <DropHereText />}
          {showEditableHtml === true ? (
            <>
              <StaticHtmlBackgroundToFixBlinkIssue />
              <EditableHtml />
            </>
          ) : (
            <StaticHtml />
          )}
        </Box>
      </Box>
    </FroalaProvider>
  )
}
