import { BubbleMenu } from '@tiptap/react/menus'
import { useRef } from 'react'
import { Divider } from './button/shared/Divider'
import { liquidGlassStyle } from '../style/liquidGlassStyle'
import { AlignButtons } from './button/AlignButtons'
import { useTiptap } from '@tiptap/react'
import { BoldButton } from './button/BoldButton'
import { ItalicButton } from './button/ItalicButton'
import { UnderlineButton } from './button/UnderlineButton'
import { StrikethroughButton } from './button/StrikethroughButton'
import { SuperscriptButton } from './button/SuperscriptButton'
import { SubscriptButton } from './button/SubscriptButton'
import { Heading1Button } from './button/Heading1Button'
import { Heading2Button } from './button/Heading2Button'
import { Heading3Button } from './button/Heading3Button'
import { Heading4Button } from './button/Heading4Button'
import { Heading5Button } from './button/Heading5Button'
import { Heading6Button } from './button/Heading6Button'
import { BulletListButton } from './button/BulletListButton'
import { OrderedListButton } from './button/OrderedListButton'
import { TaskListButton } from './button/TaskListButton'
import { BlockquoteButton } from './button/BlockquoteButton'
import { CodeBlockButton } from './button/CodeBlockButton'
import { HorizontalRuleButton } from './button/HorizontalRuleButton'
import { UndoButton } from './button/UndoButton'
import { RedoButton } from './button/RedoButton'
import { LinkButtons } from './button/LinkButtons'
import { RedColorButton } from './button/RedColorButton'
import { HighlightButton } from './button/HighlightButton'

export const FloatingMenu = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { editor } = useTiptap()

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={editor}
      updateDelay={100}
      shouldShow={(ctx) => {
        if (ctx.editor.isDestroyed === true) {
          return false
        }

        // ImageMenu is shown for image actions
        if (ctx.editor.isActive('image') === true) {
          return false
        }

        return ctx.editor.state.selection.empty === false
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          flexWrap: 'wrap',
          maxWidth: 520,
          ...liquidGlassStyle,
        }}
      >
        <UndoButton />
        <RedoButton />
        <Divider />
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <StrikethroughButton />
        <SuperscriptButton />
        <SubscriptButton />
        <Divider />
        <Heading1Button />
        <Heading2Button />
        <Heading3Button />
        <Heading4Button />
        <Heading5Button />
        <Heading6Button />
        <Divider />
        <BulletListButton />
        <OrderedListButton />
        <TaskListButton />
        <Divider />
        <BlockquoteButton />
        <CodeBlockButton />
        <HorizontalRuleButton />
        <Divider />
        <AlignButtons />
        <Divider />
        <LinkButtons />
        <Divider />
        <RedColorButton />
        <HighlightButton />
      </div>
    </BubbleMenu>
  )
}
