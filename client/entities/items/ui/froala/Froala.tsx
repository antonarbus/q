import { useSelectorTyped } from '@lib_instances/store'
import { Box, type SxProps } from '@mui/material'
import type FroalaEditor from 'froala-editor'
import { useRef, type MutableRefObject, type MouseEvent } from 'react'
import { FroalaProvider } from '../../providers/FroalaProvider'
import { useItem } from '../../providers/ItemProvider'
import { EditableHtml } from './EditableHtml'
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

export const Froala = (props: FroalaProps): JSX.Element => {
  const froalaElementRef = useRef<HTMLDivElement>(null)
  const { itemIndex } = useItem()
  const { froalaHeightRef } = useFixedHeightForAnimation({ froalaElementRef })

  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)
  const { observerRef, isInsideViewPort } = useViewPortObserver()
  const isAppFroala = useSelectorTyped(state => state.app.isFroala)
  const showEditableHtml = isAppFroala && isInsideViewPort && isItemFroala

  return (
    <FroalaProvider
      editorRef={props.editorRef}
      htmlGetter={props.htmlGetter}
      additionalStyle={props.additionalStyle}
      placeholder={props.placeholder}
      onContentChange={props.onContentChange}
      onFocus={props.onFocus}
      onClick={props.onClick}
      onBlur={props.onBlur}
      froalaElementRef={froalaElementRef}
      froalaHeightRef={froalaHeightRef}
    >
      <Box
        className={'froala-wrapper ' + (props.className ?? '')}
        sx={props.wrapperStyles}
        onClick={(e: MouseEvent) => {
          const focusOnTextIfCellOrPaddingAreClicked = (e: MouseEvent): void => {
            console.log('wrapper clicked')
            if (froalaElementRef.current === null) return
            if (!props.editorRef.current) return

            const clickedElement = e.target
            if (!(clickedElement instanceof HTMLElement)) return

            const isFrBox = clickedElement.matches('.fr-box')
            const isFroalaWrapper = clickedElement.matches('.froala-wrapper')

            if (isFrBox || isFroalaWrapper) {
              const contentEditableElement = props.editorRef.current.$el.get(0)
              if (!(contentEditableElement instanceof HTMLElement)) return
              props.editorRef.current.selection.setAtEnd(contentEditableElement)
            }

            props.editorRef.current.selection.restore()
          }

          focusOnTextIfCellOrPaddingAreClicked(e)
        }}
        onDoubleClickCapture={(e: MouseEvent) => {
          const selectOnDoubleClick = (e: MouseEvent): void => {
            console.log('wrapper double clicked')
            if (props.editorRef.current === null) return

            const clickedElement = e.target
            if (!(clickedElement instanceof HTMLElement)) return

            setTimeout((): void => {
              if (props.editorRef.current === null) return

              // const toolbar = props.editorRef.current?.$tb?.['0']
              // if (!(toolbar instanceof HTMLElement)) return
              // const isToolbarVisible = toolbar.style.display === 'block'

              const selectedText = props.editorRef.current.selection.text()

              if (selectedText.trim() === '') {
                props.editorRef.current.commands.selectAll()
              }
            })
          }

          selectOnDoubleClick(e)
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
