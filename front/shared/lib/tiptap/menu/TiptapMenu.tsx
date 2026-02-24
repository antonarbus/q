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
import { HeadingButton } from './button/HeadingButton'
import { BulletListButton } from './button/BulletListButton'
import { OrderedListButton } from './button/OrderedListButton'
import { TaskListButton } from './button/TaskListButton'
import { QuoteButton } from './button/QuoteButton'
import { CodeBlockButton } from './button/CodeBlockButton'
import { HorizontalRuleButton } from './button/HorizontalRuleButton'
import { InsertTableButton } from './button/InsertTableButton'
import { LinkButton } from './button/LinkButton'
import { YouTubeButton } from './button/YouTubeButton'
import { UploadFileButton } from './button/UploadFileButton'
import { ColorButton } from './button/ColorButton'
import { HighlightButton } from './button/HighlightButton'
import { AlignButton } from './button/AlignButton'
import { FontSizeButton } from './button/FontSizeButton'
import { LineHeightButton } from './button/LineHeightButton'
import { FontFamilyButton } from './button/FontFamilyButton'
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
      updateDelay={isImageActive === true ? 0 : 250} // 250 is the default
      shouldShow={(ctx) => {
        if (ctx.editor.isDestroyed === true) {
          return false
        }

        if (ctx.editor.state.selection.empty === true) {
          return false
        }

        return true
      }}
      // A callback to provide the anchor coordinates used to position the menu
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
              // Force update the position of the bubble menu
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
                <ColorButton />
                <HighlightButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <FontSizeButton />
                <HeadingButton />
                <AlignButton />
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
                <FontFamilyButton />
                <LineHeightButton />
              </ButtonsGroupLayout>

              <Divider />

              <ButtonsGroupLayout>
                <InsertTableButton />
                <YouTubeButton />
                <HorizontalRuleButton />
                <LinkButton />
                <UploadFileButton />
              </ButtonsGroupLayout>
            </ButtonsRowLayout>
          </>
        )}
      </TiptapMenuLayout>
    </BubbleMenu>
  )
}
