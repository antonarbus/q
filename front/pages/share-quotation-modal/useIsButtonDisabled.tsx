import type { AccessFormValuesSignal } from '@front/entities/quotation/form/types'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useIsButtonDisabled = (props: Props): boolean => {
  const state = reduxHolder.getState()

  const sameNobodyAccessLevel =
    state.quotation.access.level === 'nobody' &&
    props.accessFormValuesSignal.value.level === 'nobody'

  if (sameNobodyAccessLevel === true) {
    return true
  }

  const sameEveryoneAccessLevel =
    state.quotation.access.level === 'everyone' &&
    props.accessFormValuesSignal.value.level === 'everyone'

  if (sameEveryoneAccessLevel === true) {
    return true
  }

  if (props.accessFormValuesSignal.value.level === 'custom') {
    const forgotToAddPerson = props.accessFormValuesSignal.value.userList.length === 0

    if (forgotToAddPerson === true) {
      return true
    }
  }

  if (props.accessFormValuesSignal.value.level === 'custom') {
    const sharedUserList = state.quotation.access.userList.toSorted().toString()

    const currentSharedUserList = props.accessFormValuesSignal.value.userList.toSorted().toString()

    const sharedUserListChanged = sharedUserList === currentSharedUserList

    if (sharedUserListChanged === true) {
      return true
    }
  }

  return false
}
