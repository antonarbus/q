import { dispatch } from '@shared/lib/redux'
import { cls } from '@shared/consts/cls'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
}

export const saveBlockHeightByIndex = ({ blockIndex }: Props): void => {
  const paperElements = document.querySelectorAll(`.${cls.paper}`)
  const paperElement = paperElements[blockIndex]

  if (!paperElement) return

  dispatch(
    quotationSlice.actions.updateBlockHeightReducer({
      blockIndex,
      height: paperElement.clientHeight,
    }),
  )
}
