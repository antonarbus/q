import { useSignal } from '@preact/signals-react'
import { useEffect } from 'react'
import type { JSX } from 'react'
import type { AccessFormValuesSignal } from '@entities/quotation'
import { isEmailPatternOk } from '@shared/util/isEmailPatternOk'
import { SharedWithRadioButtons } from './SharedWithRadioButtons'
import { SharedWithEmailInputField } from './SharedWithEmailInputField'
import { Layout } from './Layout'
import { SharedWithEmailList } from './SharedWithEmailList'

type Props = {
  accessFormValuesSignal: AccessFormValuesSignal
}

export const ShareQuotationField = ({
  accessFormValuesSignal,
}: Props): JSX.Element => {
  const emailSignal = useSignal('')
  const isButtonDisabledSignal = useSignal(true)

  // disable button
  useEffect(() => {
    const isEmailOk = isEmailPatternOk(emailSignal.value)
    isButtonDisabledSignal.value = isEmailOk === false
  }, [emailSignal.value])

  return (
    <Layout
      sharedWithEmailInputField={
        <SharedWithEmailInputField
          accessFormValuesSignal={accessFormValuesSignal}
          emailSignal={emailSignal}
          isButtonDisabledSignal={isButtonDisabledSignal}
        />
      }
      sharedWithEmailList={
        <SharedWithEmailList accessFormValuesSignal={accessFormValuesSignal} />
      }
      sharedWithRadioButtons={
        <SharedWithRadioButtons
          accessFormValuesSignal={accessFormValuesSignal}
        />
      }
    />
  )
}
