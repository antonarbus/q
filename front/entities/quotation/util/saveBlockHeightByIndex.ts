import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
}

export const saveBlockHeightByIndex = ({ blockIndex }: Props): void => {
  const paperElements = document.querySelectorAll(`.${cls.paper}`)
  const paperElement = paperElements[blockIndex]

  if (paperElement === undefined) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockHeightReducer({
      blockIndex,
      height: paperElement.clientHeight,
    }),
  )
}
