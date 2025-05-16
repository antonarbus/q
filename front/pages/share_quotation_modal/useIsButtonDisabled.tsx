import type { AccessFormValuesSignal } from '@entities/quotation'
import { getState } from '@shared/lib/redux'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const useIsButtonDisabled = ({
  accessFormValuesSignal,
}: Props): boolean => {
  const forgotToAddPerson =
    accessFormValuesSignal.value.level === 'custom' &&
    accessFormValuesSignal.value.userList.length === 0

  const currentAccessLevel = getState().quotation.access.level

  const accessLevelChanged =
    currentAccessLevel !== accessFormValuesSignal.value.level

  const disabled = forgotToAddPerson || accessLevelChanged === false

  return disabled
}
