import { BiEditAlt as PencilIcon } from 'react-icons/bi'

type Props = {
  editorRef: React.MutableRefObject<any>
}

export const PencilAtBottomRight = ({ editorRef }: Props) => {
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
        console.log(editorRef.current)
        editorRef.current.commands.selectAll()
        // editorRef.current.toolbar.showInline(e, true)
      }}
    />
  )
}
