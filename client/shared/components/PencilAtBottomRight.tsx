import type FroalaEditor from 'froala-editor'
import type { MutableRefObject } from 'react'
import { BiEditAlt as PencilIcon } from 'react-icons/bi'

interface Props {
  editorRef: MutableRefObject<FroalaEditor | null>
}

export const PencilAtBottomRight = ({ editorRef }: Props) => {
  return (
    <PencilIcon
      css={{
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: '#b3b3b3',
        height: 14,
        cursor: 'pointer',
      }}
      onClick={(): void => {
        editorRef.current.commands.selectAll()
      }}
    />
  )
}
