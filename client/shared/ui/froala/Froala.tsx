import type { SxProps } from '@mui/material'
import { type MutableRefObject, type RefObject } from 'react'
import type FroalaEditor from 'froala-editor'
import { useSelectorTyped } from 'client/shared/hooks'
import { StaticHtml } from './StaticHtml'
import { useFixedHeightForAnimation } from './useFixedHeightForAnimation'
import { EditableHtml } from './EditableHtml'
import { useViewPortObserver } from './useViewPortObserver'

type Props = {
  itemIndex: number
  padding?: number | string
  initHtml: string
  froalaElementRef: RefObject<HTMLDivElement>
  editorRef: MutableRefObject<FroalaEditor | null>
  placeholder?: string
  additionalStyle?: SxProps
  rowIndex?: number
  onContentChange: () => void
}

export const Froala = ({
  additionalStyle,
  editorRef,
  froalaElementRef,
  itemIndex,
  rowIndex,
  initHtml,
  padding,
  placeholder,
  onContentChange,
}: Props): JSX.Element => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const { heightDuringAnimationRef } = useFixedHeightForAnimation({ froalaElementRef })
  const { observerRef, isInsideViewPort } = useViewPortObserver({ itemIndex, rowIndex })

  const showStaticHtml = isCopyMode || !isInsideViewPort
  const showEditableHtml = !isCopyMode && isInsideViewPort

  // todo: what if we always show static html and onClickStart (if it is available) change it to the Froala

  return (
    <div
      ref={observerRef}
      css={{
        width: '100%',
        position: 'relative',
      }}
    >
      {showStaticHtml && (
        <StaticHtml
          initHtml={initHtml}
          padding={padding}
          additionalStyle={additionalStyle}
          editorRef={editorRef}
          heightDuringAnimationRef={heightDuringAnimationRef}
        />
      )}
      {showEditableHtml && (
        <>
          <StaticHtml
            initHtml={initHtml}
            padding={padding}
            // * needed to smoothen the froala blink
            // todo: move it into separate component and after froala initiated make visibility: none
            additionalStyle={{ ...additionalStyle, position: 'absolute' }}
            editorRef={editorRef}
            heightDuringAnimationRef={heightDuringAnimationRef}
          />
          <EditableHtml
            additionalStyle={additionalStyle}
            editorRef={editorRef}
            froalaElementRef={froalaElementRef}
            itemIndex={itemIndex}
            initHtml={initHtml}
            padding={padding}
            placeholder={placeholder}
            rowIndex={rowIndex}
            onContentChange={onContentChange}
            heightDuringAnimationRef={heightDuringAnimationRef}
          />
        </>

      )}
    </div>
  )
}
