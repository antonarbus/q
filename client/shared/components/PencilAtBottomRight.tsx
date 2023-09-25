import type FroalaEditor from 'froala-editor'
import type { MutableRefObject } from 'react'
import { BiEditAlt } from 'react-icons/bi'

type Props = {
  editorRef: MutableRefObject<FroalaEditor | null>
}

export const PencilAtBottomRight = ({ editorRef }: Props): JSX.Element => {
  return (
    <BiEditAlt
      css={{
        position: 'absolute',
        bottom: 5,
        right: 5,
        color: '#b3b3b3',
        height: 14,
        cursor: 'pointer',
      }}
      onClick={(): void => {
        editorRef.current?.commands.selectAll()
      }}
    />
  )
}
