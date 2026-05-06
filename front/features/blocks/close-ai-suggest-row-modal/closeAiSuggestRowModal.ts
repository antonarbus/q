import { aiSuggestRowSlice } from '@front/entities/ai/aiSuggestRowSlice'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

export const closeAiSuggestRowModal = (): void => {
  reduxHolder.dispatch(aiSuggestRowSlice.actions.close())
}
