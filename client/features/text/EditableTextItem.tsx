// // @ts-nocheck
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { ItemType } from '../items/types'
import { useFroala } from './useFroala'
import { theme } from 'client/theme'
import { useSelectorTyped } from 'client/store'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BiEditAlt as PencilIcon } from 'react-icons/bi'

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
  const { froalaElementRef, focusOnTextIfClickedOnPadding } = useFroala({ index, itemRef })
  console.log('🚀 ~  EditableTextItem: ' + index)

  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
      itemRef={itemRef}
      onClick={focusOnTextIfClickedOnPadding}
    >
      <PencilIcon
        css={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          color: '#b3b3b3',
          height: 14
        }}
      />
      <div
        ref={froalaElementRef}
        style={{
          // at first we have fixed height to avoid height change when froala converts html into text on initialization
          // when froala is initialized we make height: 'auto' to let it adjust when new text is added from the keyboard
          height: item.height - 2 * theme.item.childMargin,
        }}
        css={{
          //! separate container from froala logic
          margin: theme.item.childMargin,
        }}
      >
        {/* text is managed by froala */}
      </div>
    </DraggableResizableItemWithActions>
  )
}
