// // @ts-nocheck
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { ItemType } from '../items/types'
import { useFroala } from './useFroala'
import { theme } from 'client/theme'
import { useSelectorTyped } from 'client/store'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BiEditAlt } from 'react-icons/bi'

type Props = {
  item: ItemType
  index: number
}

// for unknown to me reason (most likely due to delayed exit animation)
// useSelector is triggered on already deleted item, which returns in fatal error
// in case item is not found (undefined) we tell that states values are equal
// and there is no re-render
const equalityFn = (prevItem:any, currentItem:any) => {
  const isItemDeleted = currentItem === undefined
  if (isItemDeleted) return true
  return false
}

export const EditableTextItem = ({ index, item }: Props) => {
  //! looks like we can't properly exit animate if take item from the store and not via props, not sure
  // const innerHtml = useSelectorTyped(state => state.items?.[index]?.html)
  const itemRef = useRef() as React.MutableRefObject<Resizable>
  const { froalaRef } = useFroala({ initHtml: item.html, index, itemRef })
  console.log('🚀 ~  EditableTextItem: ' + index)

  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
      itemRef={itemRef}
    >
      <BiEditAlt
        css={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          color: '#b3b3b3',
          height: 14
        }}
      />
      <div
        ref={froalaRef}
        css={{
          cursor: 'text',
          fontSize: 16,
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
        // at first we have fixed height to avoid height change when froala converts html into text on initialization
        // when froala is initialized we make height: 'auto' to let it adjust when new text is added from the keyboard
        style={{ height: item.height - 2 * theme.item.padding }}
      >
        {/* text is managed by froala */}
      </div>
    </DraggableResizableItemWithActions>
  )
}
