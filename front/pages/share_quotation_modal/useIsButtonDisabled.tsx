import type { AccessFormValuesSignal } from '@entities/quotation'
import { getState } from '@shared/lib/redux'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useIsButtonDisabled = ({
  accessFormValuesSignal,
}: Props): boolean => {
  const { access } = getState().quotation
  const currentAccess = accessFormValuesSignal.value

  const sameNobodyAccessLevel =
    access.level === 'nobody' && currentAccess.level === 'nobody'

  if (sameNobodyAccessLevel === true) {
    return true
  }

  const sameEveryoneAccessLevel =
    access.level === 'everyone' && currentAccess.level === 'everyone'

  if (sameEveryoneAccessLevel === true) {
    return true
  }

  if (accessFormValuesSignal.value.level === 'custom') {
    const forgotToAddPerson = accessFormValuesSignal.value.userList.length === 0

    if (forgotToAddPerson === true) {
      return true
    }
  }

  if (accessFormValuesSignal.value.level === 'custom') {
    const sharedUserList = getState()
      .quotation.access.userList.toSorted()
      .toString()

    const currentSharedUserList = accessFormValuesSignal.value.userList
      .toSorted()
      .toString()

    const sharedUserListChanged = sharedUserList === currentSharedUserList

    if (sharedUserListChanged === true) {
      return true
    }
  }

  return false
}
