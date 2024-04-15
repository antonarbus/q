import { dispatch, getState } from '@lib_instances/store'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import { quotationSlice, updateOrAppendIntoQuotationsCache, useSaveQuotationMutation } from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
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

    if (getState().quotation.id === 'new') {
      dispatch(quotationSlice.actions.loadQuotationReducer({
        quotation: {
          id: nanoid(5),
          email,
          items: getState().quotation.items,
        },
      }))
    }

    saveQuotation({
      quotation: {
        id: 'xxx',
        email,
        items: getState().quotation.items,
      },
    })
  })

  useUpdateEffect(() => {
    if (isPending) {
      showLoadingNavIcon({ navMenuItemIdKey: navItemId.save })
    }
  }, [isPending])

  useUpdateEffect(() => {
    if (isSuccess) {
      if (data.message === 'inserted') {
        navigate(`/${getState().quotation.id}`)
      }

      if (data.message === 'saved') {
        navigate('..')
      }

      notify({ msg: 'Saved', type: 'success', position: 'bottom-center' })
      showSuccessNavIcon({ navMenuItemIdKey: navItemId.save })
      // quotationSignal.value = { ...quotationSignal.value, ...data.document }
      // updateOrAppendIntoQuotationsCache({ quotation: quotationSignal.value })
      dispatch(navSlice.actions.disableNavItems({ navItemIdKeys: [navItemId.save] }))
      dispatch(navSlice.actions.removeUnderlineFromTopNav())
    }
  }, [isSuccess])

  useUpdateEffect(() => {
    if (isError) {
      if (error.response?.data.message === 'not logged in') {
        notify({ msg: 'Not logged in', type: 'warn', theme: 'light' })
      } else if (error.response?.data.message === 'not owner') {
        notify({ msg: 'Not owner', type: 'warn', theme: 'light' })
      } else if (error.response?.data.message === 'not saved') {
        notify({ msg: 'Not saved', type: 'warn', theme: 'light' })
      } else {
        notify({ msg: 'Internal error', type: 'error', theme: 'light' })
      }

      navigate('..')
      showErrorNavIcon({ navMenuItemIdKey: navItemId.save })
    }
  }, [isError])

  return <></>
}
