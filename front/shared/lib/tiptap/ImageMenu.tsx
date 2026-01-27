import { BubbleMenu } from '@tiptap/react/menus'
import type { Editor } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import type { JSX } from 'react'

type Props = {
  editor: Editor
}

export const ImageMenu = (props: Props): JSX.Element => {
  return (
    <BubbleMenu
      editor={props.editor}
      shouldShow={({ editor }) => editor.isActive('image')}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          backgroundColor: '#1f2937',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('left').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'left' })}
          title='Align left'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='17' y1='10' x2='3' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='17' y1='18' x2='3' y2='18' />
          </svg>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('center').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'center' })}
          title='Align center'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='18' y1='10' x2='6' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='18' y1='18' x2='6' y2='18' />
          </svg>
        </MenuButton>
        <MenuButton
          onClick={() => {
            props.editor.chain().focus().setTextAlign('right').run()
          }}
          isActive={props.editor.isActive({ textAlign: 'right' })}
          title='Align right'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <line x1='21' y1='10' x2='7' y2='10' />
            <line x1='21' y1='6' x2='3' y2='6' />
            <line x1='21' y1='14' x2='3' y2='14' />
            <line x1='21' y1='18' x2='7' y2='18' />
          </svg>
        </MenuButton>
      </div>
    </BubbleMenu>
  )
}
