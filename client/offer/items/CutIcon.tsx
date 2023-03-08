import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { ItemType } from 'client/types'
import { TbCut } from 'react-icons/tb'
import { Resizable } from 're-resizable'
import { addItemIntoCopyContainer, saveInitCords, showCopyContainer } from 'client/copy/copySlice'
import { deleteItem } from '../offerSlice'
import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'

type Props = {
  itemToCut: ItemType,
  itemRef: React.MutableRefObject<Resizable>
}

export const CutIcon = ({ itemToCut, itemRef }: Props) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(state => state.offer.items.filter((item) => item.type !== 'paste').length === 1)

  return (
    <TbCut
      css={{
        color: isLastItem ? '#acacac' : 'inherit',
        cursor: isLastItem ? 'default' : 'pointer',
        ...(!isLastItem && {
          ':hover': {
            scale: '1.3',
            color: 'black',
            transition: 'scale 200ms'
          }
        })
      }}
      onClick={(e: React.MouseEvent) => {
        if (isLastItem) return
        dispatch(saveInitCords({ x: e.clientX, y: e.clientY }))
        dispatch(showCopyContainer())
        const item = { ...itemToCut, height: itemRef?.current?.resizable?.clientHeight || 0 }
        dispatch(addItemIntoCopyContainer(item))
        dispatch(deleteItem(itemToCut))
        saveOfferIntoLocalStorage()
      }}
    />
  )
}
