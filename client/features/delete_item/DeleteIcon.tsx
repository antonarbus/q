import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsItemAlone } from 'client/entities/items'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { saveItemsLocally } from 'client/shared/lib'
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'

interface IProps {
  index: number
}

export const DeleteIcon = ({ index }: IProps): EmotionJSX.Element => {
  const dispatch = useDispatchTyped()
  const ref = useRef<HTMLSpanElement>(null)
  const isItemAlone = useSelectorTyped(selectIsItemAlone)

  return (
    <span
      ref={ref}
      style={{
        color: isItemAlone ? '#acacac' : '#000',
        cursor: isItemAlone ? 'default' : 'pointer',
      }}
      onClick={(): void => {
        gsap.to(ref.current, { duration: 0.2, scale: 0.9 })
        if (isItemAlone) return
        const item = store.getState().items[index]
        if (!item) return
        dispatch(deleteItem({ itemId: item.id }))
        saveItemsLocally()
      }}
      onMouseOver={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: isItemAlone ? 1 : 1.3,
          color: isItemAlone ? '#acacac' : '#d25959',
        })
      }}
      onMouseOut={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: 1,
          color: isItemAlone ? '#acacac' : '#000',
        })
      }}
      onMouseDown={(): void => {
        gsap.to(ref.current, {
          duration: 0.2,
          scale: isItemAlone ? 1 : 0.9,
        })
      }}
    >
      <RxCross2 />
    </span>
  )
}
