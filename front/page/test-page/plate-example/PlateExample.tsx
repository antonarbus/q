import type { JSX } from 'react'
import { Plate, usePlateEditor, PlateContent, ParagraphPlugin } from '@udecode/plate/react'
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
} from '@udecode/plate-basic-marks/react'
import { HeadingPlugin } from '@udecode/plate-heading/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { PlateBubbleMenu } from './PlateBubbleMenu'

const editorWrapperStyle: React.CSSProperties = {
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: 16,
  minHeight: 200,
  position: 'relative',
}

const initialValue = [
  {
    type: 'h2',
    children: [{ text: 'Plate Editor' }],
  },
  {
    type: 'p',
    children: [
      { text: 'This is ' },
      { text: 'Plate', bold: true },
      { text: ' - built on ' },
      { text: 'Slate', italic: true },
      { text: '.' },
    ],
  },
  {
    type: 'p',
    children: [{ text: 'Select text to see the bubble menu.' }],
  },
]

export const PlateExample = (): JSX.Element => {
  const editor = usePlateEditor({
    plugins: [
      ParagraphPlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      HighlightPlugin,
    ],
    value: initialValue,
  })

  return (
    <div>
      <div style={editorWrapperStyle}>
        <Plate editor={editor}>
          <PlateBubbleMenu />
          <PlateContent data-plate-editor style={{ outline: 'none' }} />
        </Plate>
      </div>

      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer', color: '#666', fontSize: 12 }}>View JSON</summary>
        <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, fontSize: 11, overflow: 'auto' }}>
          {JSON.stringify(editor.children, null, 2)}
        </pre>
      </details>
    </div>
  )
}
