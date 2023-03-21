// // @ts-nocheck
import parseHtml from 'html-react-parser'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { ItemType } from '../items/types'
import { Fragment } from 'react'
import { useFroala } from './useFroala'
import { useEffectOnce } from 'react-use'
import { useDispatchTyped } from 'client/store'
import { updateItemText } from '../items/itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'

type Props = {
  item: ItemType
  index: number
}

export const FroalaItem = ({ item, index }: Props) => {
  const dispatch = useDispatchTyped()
  const { froalaRef, editorRef } = useFroala({ initHtml: item.innerHtml })

  useEffectOnce(() => {
    froalaRef.current.addEventListener('focusout', function saveText() {
      const innerHTML = editorRef.current.html.get()
      dispatch(updateItemText({ index, innerHTML }))
      saveItemsIntoLocalStorage()
    })
  })

  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
    >
      <div
        ref={froalaRef}
        css={{
          cursor: 'text',
          // html code
          '& .CodeMirror': {
            fontSize: '12px !important'
          },
          // icon to close html code
          '& .html-switch': {
            color: '#ff4848 !important',
            '&:hover': {
              background: 'transparent !important',
            },
            '& .fa-code': {
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '16px !important',
              '&:hover': {
                scale: '1.2',
              },
              ':before': {
                content: '"\\f00d"'
              }
            }
          },
        }}
        style={{ height: (item.height && item.height - 40) || 'auto' }}
      >
        {/* {parseHtml(item.innerHtml)} */}
      </div>
    </DraggableResizableItemWithActions>
  )
}
