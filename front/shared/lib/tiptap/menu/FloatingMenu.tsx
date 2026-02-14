import { BubbleMenu } from '@tiptap/react/menus'
import { MenuButton } from './button/MenuButton'
import { useRef, useState } from 'react'
import { Divider } from './button/Divider'
import {
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered2,
  RiListCheck3,
  RiDoubleQuotesL,
  RiCodeBoxLine,
  RiFontColor,
  RiMarkPenLine,
  RiLink,
  RiLinkUnlink,
  RiSuperscript,
  RiSubscript,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiSeparator,
} from 'react-icons/ri'
import { liquidGlassStyle } from '../style/liquidGlassStyle'
import { AlignButtons } from './button/AlignButtons'
import { useTiptap } from '@tiptap/react'
import { BoldButton } from './button/BoldButton'

export const FloatingMenu = (): React.ReactNode => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [linkInput, setLinkInput] = useState<string | null>(null)
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
        {/* Undo / Redo */}
        <MenuButton
          isActive={false}
          title='Undo'
          onClick={() => {
            editor.chain().focus().undo().run()
          }}
        >
          <RiArrowGoBackLine size={16} />
        </MenuButton>
        <MenuButton
          isActive={false}
          title='Redo'
          onClick={() => {
            editor.chain().focus().redo().run()
          }}
        >
          <RiArrowGoForwardLine size={16} />
        </MenuButton>
        <Divider />
        {/* Text formatting */}
        <BoldButton />

        <MenuButton
          isActive={editor.isActive('italic')}
          title='Italic'
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
          }}
        >
          <RiItalic size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('underline')}
          title='Underline'
          onClick={() => {
            editor.chain().focus().toggleUnderline().run()
          }}
        >
          <RiUnderline size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('strike')}
          title='Strikethrough'
          onClick={() => {
            editor.chain().focus().toggleStrike().run()
          }}
        >
          <RiStrikethrough size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('superscript')}
          title='Superscript'
          onClick={() => {
            editor.chain().focus().toggleSuperscript().run()
          }}
        >
          <RiSuperscript size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('subscript')}
          title='Subscript'
          onClick={() => {
            editor.chain().focus().toggleSubscript().run()
          }}
        >
          <RiSubscript size={16} />
        </MenuButton>
        <Divider />
        {/* Headings */}
        <MenuButton
          isActive={editor.isActive('heading', { level: 1 })}
          title='Heading 1'
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
        >
          <RiH1 size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('heading', { level: 2 })}
          title='Heading 2'
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
        >
          <RiH2 size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('heading', { level: 3 })}
          title='Heading 3'
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
        >
          <RiH3 size={16} />
        </MenuButton>
        <Divider />
        {/* Lists */}
        <MenuButton
          isActive={editor.isActive('bulletList')}
          title='Bullet List'
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
          }}
        >
          <RiListUnordered size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('orderedList')}
          title='Ordered List'
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run()
          }}
        >
          <RiListOrdered2 size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('taskList')}
          title='Task List'
          onClick={() => {
            editor.chain().focus().toggleTaskList().run()
          }}
        >
          <RiListCheck3 size={16} />
        </MenuButton>
        <Divider />
        {/* Block types */}
        <MenuButton
          isActive={editor.isActive('blockquote')}
          title='Blockquote'
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run()
          }}
        >
          <RiDoubleQuotesL size={16} />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('codeBlock')}
          title='Code Block'
          onClick={() => {
            editor.chain().focus().toggleCodeBlock().run()
          }}
        >
          <RiCodeBoxLine size={16} />
        </MenuButton>
        <MenuButton
          isActive={false}
          title='Horizontal Rule'
          onClick={() => {
            editor.chain().focus().setHorizontalRule().run()
          }}
        >
          <RiSeparator size={16} />
        </MenuButton>
        <Divider />
        {/* Alignment */}
        <AlignButtons />
        <Divider />
        {/* Link */}
        {linkInput === null ? (
          <>
            <MenuButton
              isActive={editor.isActive('link')}
              title='Link'
              onClick={() => {
                const attrs = editor.getAttributes('link')

                const existing =
                  typeof attrs.href === 'string' ? attrs.href : ''

                setLinkInput(existing)
              }}
            >
              <RiLink size={16} />
            </MenuButton>

            {editor.isActive('link') && (
              <MenuButton
                isActive={false}
                title='Unlink'
                onClick={() => {
                  editor.chain().focus().unsetLink().run()
                }}
              >
                <RiLinkUnlink size={16} />
              </MenuButton>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type='text'
              placeholder='https://...'
              value={linkInput}
              onChange={(event) => {
                setLinkInput(event.target.value)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  if (linkInput === null) {
                    return
                  }

                  if (linkInput === '') {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange('link')
                      .unsetLink()
                      .run()
                  } else {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange('link')
                      .setLink({ href: linkInput })
                      .run()
                  }

                  setLinkInput(null)
                }

                if (event.key === 'Escape') {
                  setLinkInput(null)
                }
              }}
              style={{
                padding: '2px 6px',
                fontSize: 13,
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 4,
                background: 'rgba(0,0,0,0.2)',
                color: 'inherit',
                outline: 'none',
                width: 160,
              }}
              autoFocus
            />
            <MenuButton
              isActive={false}
              title='Apply'
              onClick={() => {
                if (linkInput === null) {
                  return
                }

                if (linkInput === '') {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .unsetLink()
                    .run()
                } else {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .setLink({ href: linkInput })
                    .run()
                }

                setLinkInput(null)
              }}
            >
              <RiLink size={16} />
            </MenuButton>
            <MenuButton
              isActive={false}
              title='Cancel'
              onClick={() => {
                setLinkInput(null)
              }}
            >
              <RiLinkUnlink size={16} />
            </MenuButton>
          </div>
        )}
        <Divider />
        {/* Colors */}
        <MenuButton
          isActive={editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
          onClick={() => {
            editor.chain().focus().setColor('#ef4444').run()
          }}
        >
          <RiFontColor size={16} color='#ef4444' />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('highlight')}
          title='Highlight'
          onClick={() => {
            editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()
          }}
        >
          <RiMarkPenLine size={16} color='#fef08a' />
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
