import { dispatch, getState } from '@lib_instances/store'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { quotationSignal, updateOrAppendIntoQuotationsCache, useSaveQuotationMutation } from '@entities/quotation'
import { nanoid } from '@shared/lib/nanoid'
import { navSlice, showErrorNavIcon, showLoadingNavIcon, showSuccessNavIcon } from '@shared/nav'
import { notify } from '@shared/ui/top_msg'

export const SaveQuotation = (): JSX.Element => {
  const navigate = useNavigate()

  const { mutate: saveQuotation, isPending, data, isSuccess, isError, error } = useSaveQuotationMutation()

  useEffectOnce(() => {
    const email = getState().user.email

    if (!email) {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      return
    }

    if (quotationSignal.peek().id === 'new') {
      quotationSignal.value = { ...quotationSignal.value, id: nanoid(5), email }
    }

    saveQuotation({
      items: getState().items,
      quotation: quotationSignal.peek(),
    })
  })

  useUpdateEffect(() => {
    if (!isPending) return

    showLoadingNavIcon({ navMenuItemIdKey: 'save' })
  }, [isPending])

  useUpdateEffect(() => {
    if (!isSuccess) return

    if (data.message === 'inserted') {
      navigate(`/${quotationSignal.peek().id}`)
    }

    if (data.message === 'saved') {
      navigate('..')
    }

    notify({ msg: 'Saved', type: 'info', position: 'bottom-center' })
    showSuccessNavIcon({ navMenuItemIdKey: 'save' })
    dispatch(navSlice.actions.disableTopNavItem({ navMenuItemIdKey: 'save' }))
    quotationSignal.value = { ...quotationSignal.value, ...data.document }
    updateOrAppendIntoQuotationsCache({ quotation: quotationSignal.value })
  }, [isSuccess])

  useUpdateEffect(() => {
    if (!isError) return

    if (error.response?.data.message === 'not logged in') {
      notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
    } else if (error.response?.data.message === 'not owner') {
      notify({ msg: 'You are not the quotation owner', type: 'warn', theme: 'light' })
    } else if (error.response?.data.message === 'not saved') {
      notify({ msg: 'Not saved', type: 'warn', theme: 'light' })
    } else {
      notify({ msg: 'Internal error', type: 'error', theme: 'light' })
    }

    navigate('..')
    showErrorNavIcon({ navMenuItemIdKey: 'save' })
  }, [isError])

  return <></>
}
