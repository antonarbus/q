import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsLastItem } from 'client/entities/items'
import { gsap } from 'gsap'
import { useRef } from 'react'
import type { RefSpan } from 'client/types'
import { saveItemsLocally } from 'client/features/save_items_locally'

interface Props {
  index: number
}

export const DeleteIcon = ({ index }: Props) => {
  const dispatch = useDispatchTyped()
  const ref = useRef() as RefSpan
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
        saveItemsLocally()
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
