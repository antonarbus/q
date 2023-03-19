import parseHtml from 'html-react-parser'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { ItemType } from '../items/types'
import { useEffectOnce } from 'react-use'
// import 'froala-editor/js/froala_editor.pkgd.min.js'
// import 'froala-editor/js/plugins.pkgd.min.js'
// import 'froala-editor/css/froala_style.min.css'
// import 'froala-editor/css/froala_editor.pkgd.min.css'
// import 'froala-editor/css/plugins.pkgd.min.css'
// import 'font-awesome/css/font-awesome.css'
// import FroalaEditor from 'froala-editor'

type Props = {
  item: ItemType
  index: number
}

// todo: try to use basic js Froala and initiate it in useEffect
// todo: also pass its object to DraggableItem to initiated only after animation
// todo: or even better do it on click and destroy it on click away
// todo: var editor = new FroalaEditor('#example');

export const FroalaItem = ({ item, index }: Props) => {
  useEffectOnce(() => {
    const editor = new FroalaEditor(`#froala${item.id}`, {
      toolbarInline: true,
      fontSizeSelection: true,
      charCounterCount: false,
      tabSpaces: 4,
      toolbarButtons: {
        moreText: {
          buttons: ['fontSize', 'textColor', 'backgroundColor', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'inlineClass', 'inlineStyle', 'clearFormatting'],
          buttonsVisible: 3,
        },
        moreParagraph: {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
          buttonsVisible: 3,
        },
        moreRich: {
          buttons: ['insertLink', 'insertTable', 'insertImage', 'insertVideo', 'emoticons', 'embedly', 'fontAwesome', 'specialCharacters', 'insertFile', 'insertHR', 'html'],
          buttonsVisible: 4,
        }
      },
      fontFamily: { Roboto: 'Roboto', Arial: 'Arial', Georgia: 'Georgia', Tahoma: 'Tahoma', Verdana: 'Verdana', Helvetica: 'Helvetica', 'Trebuchet MS': 'Trebuchet MS', 'Times New Roman': 'Times New Roman', Garamond: 'Garamond', 'Courier New': 'Courier New', 'Brush Script MT': 'Brush Script MT' },
      placeholderText: 'Type text, insert links, drop files or pictures...',
      tableInsertHelper: false,
      tableInsertMaxSize: 12
    })
  })

  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
    >
      <div
        id={'froala' + item.id}
      >
        {parseHtml(item.innerHtml)}
      </div>
    </DraggableResizableItemWithActions>
  )
}
