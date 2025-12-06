import type { AccessFormValuesSignal } from '@entities/quotation/type'
import { useSignal } from '@preact/signals-react'
import { type JSX, useEffect } from 'react'
import { z } from 'zod'
import { Layout } from './Layout'
import { SharedWithEmailInputField } from './SharedWithEmailInputField'
import { SharedWithEmailList } from './SharedWithEmailList'
import { SharedWithRadioButtons } from './SharedWithRadioButtons'

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
    const isEmailOk = z.email().safeParse(emailSignal.value).success
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
