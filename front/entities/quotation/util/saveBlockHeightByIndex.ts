import { cls } from '@front/shared/cls'
import { dispatch } from '@front/shared/lib/redux'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  blockIndex: number
}

export const saveBlockHeightByIndex = (props: Props): void => {
  const paperElements = document.querySelectorAll(`.${cls.paper}`)
  const paperElement = paperElements[props.blockIndex]

  if (paperElement === undefined) {
    return
  }

  dispatch(
    quotationSlice.actions.updateBlockHeight({
      blockIndex: props.blockIndex,
      height: paperElement.clientHeight,
    }),
  )
}
