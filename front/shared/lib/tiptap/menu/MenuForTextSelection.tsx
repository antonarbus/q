import { BubbleMenu } from '@tiptap/react/menus'
import { useCallback, useRef } from 'react'
import { Divider } from './button/shared/Divider'
import { liquidGlassStyle } from '../style/liquidGlassStyle'
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
import { BlockquoteButton } from './button/BlockquoteButton'
import { CodeBlockButton } from './button/CodeBlockButton'
import { HorizontalRuleButton } from './button/HorizontalRuleButton'
import { LinkButtons } from './button/LinkButtons'
import { RedColorButton } from './button/RedColorButton'
import { HighlightButton } from './button/HighlightButton'
import { Box } from '@mui/material'

export const MenuForTextSelection = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { editor } = useTiptap()

  const isImageActive = useTiptapState((ctx) => ctx.editor.isActive('image'))

  const shouldShow = useCallback((ctx: { editor: typeof editor }) => {
    if (ctx.editor.isDestroyed === true) {
      return false
    }

    return (
      ctx.editor.isActive('image') || ctx.editor.state.selection.empty === false
    )
  }, [])

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
      shouldShow={shouldShow}
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
      {isImageActive === true ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: '6px 8px',
            ...liquidGlassStyle,
          }}
        >
          <AlignLeftButton />
          <AlignCenterButton />
          <AlignRightButton />
        </div>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '6px 8px',
            ...liquidGlassStyle,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <StrikethroughButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <RedColorButton />
              <HighlightButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <Heading1Button />
              <Heading2Button />
              <Heading3Button />
              <Heading4Button />
              <Heading5Button />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <BulletListButton />
              <OrderedListButton />
              <TaskListButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <BlockquoteButton />
              <HorizontalRuleButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <CodeBlockButton />
              <CodeButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <AlignLeftButton />
              <AlignCenterButton />
              <AlignRightButton />
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
              }}
            >
              <LinkButtons />
            </Box>
          </Box>
        </Box>
      )}
    </BubbleMenu>
  )
}
