import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import { type JSX, useCallback, useMemo, useRef, useState } from 'react'
import { Divider } from './Divider'
import {
  RiBold,
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
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
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
import { liquidGlassStyle } from './liquidGlassStyle'
import { useAlignment } from './useAlignment'

type Props = {
  editor: Editor
}

export const FloatingMenu = (props: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const alignment = useAlignment({ editor: props.editor })
  const [linkInput, setLinkInput] = useState<string | null>(null)

  //* Issue: menu for some nodes stopped showing and after never showed again for this editor
  // Must be memoized: BubbleMenu's React wrapper uses a hardcoded "bubbleMenu"
  // meta key shared by ALL BubbleMenu instances on the same editor (including ImageMenu).
  // An inline function here would create a new reference every render, triggering a
  // meta transaction that overwrites OTHER BubbleMenu instances' shouldShow callbacks.
  const shouldShow = useCallback((ctx: { editor: Editor }): boolean => {
    if (ctx.editor.isDestroyed === true) {
      return false
    }

    // ImageMenu is shown for image actions
    if (ctx.editor.isActive('image') === true) {
      return false
    }

    return ctx.editor.state.selection.empty === false
  }, [])

  //* Issue: for row cells menu is randomly positioned
  // BubbleMenu calls updatePosition() before show(), so computePosition reads
  // the floating element's dimensions as 0 (detached from DOM). After show()
  // appends it, we force a re-position via the "updatePosition" meta.
  const options = useMemo(
    () => ({
      onShow: (): void => {
        requestAnimationFrame(() => {
          props.editor.view.dispatch(
            props.editor.state.tr.setMeta('bubbleMenu', 'updatePosition'),
          )
        })
      },
    }),
    [],
  )

  return (
    <BubbleMenu
      ref={(element) => {
        if (element !== null) {
          element.style.zIndex = '1000'
          menuRef.current = element
        }
      }}
      editor={props.editor}
      updateDelay={200}
      shouldShow={shouldShow}
      options={options}
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
            props.editor.chain().focus().undo().run()
          }}
        >
          <RiArrowGoBackLine size={16} />
        </MenuButton>

        <MenuButton
          isActive={false}
          title='Redo'
          onClick={() => {
            props.editor.chain().focus().redo().run()
          }}
        >
          <RiArrowGoForwardLine size={16} />
        </MenuButton>

        <Divider />

        {/* Text formatting */}
        <MenuButton
          isActive={props.editor.isActive('bold')}
          title='Bold'
          onClick={() => {
            props.editor.chain().focus().toggleBold().run()
          }}
        >
          <RiBold size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('italic')}
          title='Italic'
          onClick={() => {
            props.editor.chain().focus().toggleItalic().run()
          }}
        >
          <RiItalic size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('underline')}
          title='Underline'
          onClick={() => {
            props.editor.chain().focus().toggleUnderline().run()
          }}
        >
          <RiUnderline size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('strike')}
          title='Strikethrough'
          onClick={() => {
            props.editor.chain().focus().toggleStrike().run()
          }}
        >
          <RiStrikethrough size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('superscript')}
          title='Superscript'
          onClick={() => {
            props.editor.chain().focus().toggleSuperscript().run()
          }}
        >
          <RiSuperscript size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('subscript')}
          title='Subscript'
          onClick={() => {
            props.editor.chain().focus().toggleSubscript().run()
          }}
        >
          <RiSubscript size={16} />
        </MenuButton>

        <Divider />

        {/* Headings */}
        <MenuButton
          isActive={props.editor.isActive('heading', { level: 1 })}
          title='Heading 1'
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
        >
          <RiH1 size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('heading', { level: 2 })}
          title='Heading 2'
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
        >
          <RiH2 size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('heading', { level: 3 })}
          title='Heading 3'
          onClick={() => {
            props.editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
        >
          <RiH3 size={16} />
        </MenuButton>

        <Divider />

        {/* Lists */}
        <MenuButton
          isActive={props.editor.isActive('bulletList')}
          title='Bullet List'
          onClick={() => {
            props.editor.chain().focus().toggleBulletList().run()
          }}
        >
          <RiListUnordered size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('orderedList')}
          title='Ordered List'
          onClick={() => {
            props.editor.chain().focus().toggleOrderedList().run()
          }}
        >
          <RiListOrdered2 size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('taskList')}
          title='Task List'
          onClick={() => {
            props.editor.chain().focus().toggleTaskList().run()
          }}
        >
          <RiListCheck3 size={16} />
        </MenuButton>

        <Divider />

        {/* Block types */}
        <MenuButton
          isActive={props.editor.isActive('blockquote')}
          title='Blockquote'
          onClick={() => {
            props.editor.chain().focus().toggleBlockquote().run()
          }}
        >
          <RiDoubleQuotesL size={16} />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('codeBlock')}
          title='Code Block'
          onClick={() => {
            props.editor.chain().focus().toggleCodeBlock().run()
          }}
        >
          <RiCodeBoxLine size={16} />
        </MenuButton>

        <MenuButton
          isActive={false}
          title='Horizontal Rule'
          onClick={() => {
            props.editor.chain().focus().setHorizontalRule().run()
          }}
        >
          <RiSeparator size={16} />
        </MenuButton>

        <Divider />

        {/* Alignment */}
        <MenuButton
          isActive={alignment === 'left'}
          title='Align left'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('left').run()
          }}
        >
          <RiAlignLeft size={16} />
        </MenuButton>

        <MenuButton
          isActive={alignment === 'center'}
          title='Align center'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('center').run()
          }}
        >
          <RiAlignCenter size={16} />
        </MenuButton>

        <MenuButton
          isActive={alignment === 'right'}
          title='Align right'
          onClick={() => {
            props.editor.chain().focus().setTextAlign('right').run()
          }}
        >
          <RiAlignRight size={16} />
        </MenuButton>

        <Divider />

        {/* Link */}
        {linkInput === null ? (
          <>
            <MenuButton
              isActive={props.editor.isActive('link')}
              title='Link'
              onClick={() => {
                const attrs = props.editor.getAttributes('link')

                const existing =
                  typeof attrs.href === 'string' ? attrs.href : ''

                setLinkInput(existing)
              }}
            >
              <RiLink size={16} />
            </MenuButton>

            {props.editor.isActive('link') && (
              <MenuButton
                isActive={false}
                title='Unlink'
                onClick={() => {
                  props.editor.chain().focus().unsetLink().run()
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
                    props.editor
                      .chain()
                      .focus()
                      .extendMarkRange('link')
                      .unsetLink()
                      .run()
                  } else {
                    props.editor
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
                  props.editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .unsetLink()
                    .run()
                } else {
                  props.editor
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
          isActive={props.editor.isActive('textStyle', { color: '#ef4444' })}
          title='Red'
          onClick={() => {
            props.editor.chain().focus().setColor('#ef4444').run()
          }}
        >
          <RiFontColor size={16} color='#ef4444' />
        </MenuButton>

        <MenuButton
          isActive={props.editor.isActive('highlight')}
          title='Highlight'
          onClick={() => {
            props.editor
              .chain()
              .focus()
              .toggleHighlight({ color: '#fef08a' })
              .run()
          }}
        >
          <RiMarkPenLine size={16} color='#fef08a' />
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
