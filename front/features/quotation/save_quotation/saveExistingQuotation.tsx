import { dispatch, getState } from '@shared/lib/redux'
import {
  type Quotation,
  quotationSlice,
  saveQuotationMutationFn,
} from '@entities/quotation'
import { navItemKey } from '@shared/consts/navItemKey'
import { createLoadingMenuIconMachine, navSlice } from '@shared/nav'
import { toast } from 'sonner'
import { createActor } from 'xstate'
import type { AxiosError } from 'axios'
import type { ResBody } from '@back/api/quotation/saveQuotationRouter'

const loadingMenuIconMachine = createLoadingMenuIconMachine({
  navItemKey: navItemKey.save,
})

const loadingIconActor = createActor(loadingMenuIconMachine).start()

export const saveExistingQuotation = async (): Promise<void> => {
  const { email } = getState().user

  if (!email) {
    toast.warning('Not logged in')
  }

  const quotation: Quotation = {
    ...getState().quotation,
    id: getState().quotation.id,
  }

  loadingIconActor.send({ type: 'show loading icon' })

  try {
    const data = await saveQuotationMutationFn({ quotation })

    if (data.quotation !== undefined) {
      if (data.message === 'updated') {
        toast.info('Updated', { position: 'bottom-center' })
      }

      if (data.message === 'copied and saved') {
        toast.success(
          `Shared quotation was copied and saved under id ${data.quotation.id}`,
          {
            position: 'bottom-center',
          },
        )
      }

      dispatch(
        quotationSlice.actions.loadQuotationReducer({
          quotation: data.quotation,
        }),
      )

      loadingIconActor.send({ type: 'show success icon' })
      dispatch(navSlice.actions.removeUnderlineFromTopNav())
    }
  } catch (error) {
    toast.error((error as AxiosError<ResBody>).response?.data.message)
    loadingIconActor.send({ type: 'show error icon' })
  }
}
