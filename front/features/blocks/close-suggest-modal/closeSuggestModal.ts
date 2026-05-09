import { suggestionSlice } from '@front/entities/suggestion/suggestionSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const closeSuggestModal = (): void => {
  reduxHolder.dispatch(suggestionSlice.actions.close())
}
