import { BubbleMenu } from '@tiptap/react/menus'
import { useRef } from 'react'
import { Divider } from './button/shared/Divider'
import { AlignLeftButton } from './button/AlignLeftButton'
import { AlignCenterButton } from './button/AlignCenterButton'
import { AlignRightButton } from './button/AlignRightButton'
import { useTiptap, useTiptapState } from '@tiptap/react'
import { BoldButton } from './button/BoldButton'
import { ItalicButton } from './button/ItalicButton'
import { UnderlineButton } from './button/UnderlineButton'
import { StrikethroughButton } from './button/StrikethroughButton'
import { CodeButton } from './button/CodeButton'
import { Heading1Button } from './button/Heading1Button'
import { Heading2Button } from './button/Heading2Button'
import { Heading3Button } from './button/Heading3Button'
import { Heading4Button } from './button/Heading4Button'
import { Heading5Button } from './button/Heading5Button'
import { BulletListButton } from './button/BulletListButton'
import { OrderedListButton } from './button/OrderedListButton'
import { TaskListButton } from './button/TaskListButton'
import { QuoteButton } from './button/QuoteButton'
import { CodeBlockButton } from './button/CodeBlockButton'
import { HorizontalRuleButton } from './button/HorizontalRuleButton'
import { InsertTableButton } from './button/InsertTableButton'
import { LinkButtons } from './button/LinkButtons'
import { YouTubeButton } from './button/YouTubeButton'
import { UploadFileButton } from './button/UploadFileButton'
import { RedColorButton } from './button/RedColorButton'
import { HighlightButton } from './button/HighlightButton'
import { ButtonsGroupLayout } from '../style/ButtonsGroupLayout'
import { ButtonsRowLayout } from '../style/ButtonsRowLayout'
import { TiptapMenuLayout } from '../style/TiptapMenuLayout'

export const TiptapMenu = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { editor } = useTiptap()

  const isImageActive = useTiptapState((ctx) => ctx.editor.isActive('image'))

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={editor}
      updateDelay={isImageActive === true ? 0 : 200}
      shouldShow={(ctx) => {
        if (ctx.editor.isDestroyed === true) {
          return false
        }

        if (ctx.editor.state.selection.empty === true) {
          return false
        }

        return true
      }}
      getReferencedVirtualElement={() => {
        //* Issue: menu is not centered in the middle of the image
        if (editor.isDestroyed === true) {
          return null
        }

        const node = editor.view.nodeDOM(editor.state.selection.from)

        if (node instanceof HTMLElement) {
          const img = node.querySelector('img')

          if (img !== null) {
            return img
          }
        }

        return null
      }}
      options={{
        onShow: (): void => {
          //* Issue: for row cells menu is randomly positioned
          requestAnimationFrame(() => {
            editor.view.dispatch(
              editor.state.tr.setMeta('bubbleMenu', 'updatePosition'),
            )
          })
        },
      }}
    >
      <TiptapMenuLayout>
        {isImageActive === true ? (
          <ButtonsRowLayout>
            <ButtonsGroupLayout>
              <AlignLeftButton />
              <AlignCenterButton />
              <AlignRightButton />
            </ButtonsGroupLayout>
          </ButtonsRowLayout>
        ) : (
          <>
            <ButtonsRowLayout>
              <ButtonsGroupLayout>
                <BoldButton />
                <ItalicButton />
                <UnderlineButton />
                <StrikethroughButton />
                <CodeButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <RedColorButton />
                <HighlightButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <Heading1Button />
                <Heading2Button />
                <Heading3Button />
                <Heading4Button />
                <Heading5Button />
              </ButtonsGroupLayout>
            </ButtonsRowLayout>

            <ButtonsRowLayout>
              <ButtonsGroupLayout>
                <BulletListButton />
                <OrderedListButton />
                <TaskListButton />
                <QuoteButton />
                <CodeBlockButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <AlignLeftButton />
                <AlignCenterButton />
                <AlignRightButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <HorizontalRuleButton />
                <LinkButtons />
                <InsertTableButton />
                <YouTubeButton />
                <UploadFileButton />
              </ButtonsGroupLayout>
            </ButtonsRowLayout>
          </>
        )}
      </TiptapMenuLayout>
    </BubbleMenu>
  )
}
