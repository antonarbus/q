import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsLastItem } from '../../features/items/itemsSlice'
import { tellItemsSavedLocally } from 'client/features/bottom msg/bottomMsgSlice'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { TRefSpan } from 'client/types'

type TProps = {
  index: number
}

export const DeleteIcon = ({ index }: TProps) => {
  const dispatch = useDispatchTyped()
  const ref = useRef() as TRefSpan
  const isLastItem = useSelectorTyped(selectIsLastItem)

  return (
    <span
      ref={ref}
      style={{
        color: isLastItem ? '#acacac' : '#000',
        cursor: isLastItem ? 'default' : 'pointer',
      }}
      onClick={() => {
        gsap.to(ref.current, { duration: 0.2, scale: 0.9 })
        if (isLastItem) return
        const itemToDelete = store.getState().items[index]
        dispatch(deleteItem(itemToDelete))
        saveItemsIntoLocalStorage()
        dispatch(tellItemsSavedLocally())
      }}
      onMouseOver={() => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: isLastItem ? 1 : 1.3,
          color: isLastItem ? '#acacac' : '#d25959',
        })
      }}
      onMouseOut={() => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: 1,
          color: isLastItem ? '#acacac' : '#000',
        })
      }}
      onMouseDown={() => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: isLastItem ? 1 : 0.9,
        })
      }}
    >
      <RxCross2 />
    </span>
  )
}
