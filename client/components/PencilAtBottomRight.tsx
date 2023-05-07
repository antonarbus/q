import { TRefAny } from 'client/types'
import { BiEditAlt as PencilIcon } from 'react-icons/bi'

type TProps = {
  editorRef: TRefAny
}

export const PencilAtBottomRight = ({ editorRef }: TProps) => {
  return (

    <PencilIcon
      css={{
        position: 'absolute',
        top: 5,
        right: 5,
        color: '#b3b3b3',
        height: 14,
        cursor: 'pointer'
      }}
      onClick={(e) => {
        editorRef.current.commands.selectAll()
      }}
    />
  )
}
