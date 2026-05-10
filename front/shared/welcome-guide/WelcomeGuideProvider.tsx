// oxlint-disable react/only-export-components
import { createContext, useContext } from 'react'

export type WelcomeGuideContextValue = {
  currentSlide: number
  direction: number
  totalSlides: number
  goNext: () => void
  goPrev: () => void
  goToSlide: (index: number) => void
  close: () => void
}

export const WelcomeGuideContext = createContext<WelcomeGuideContextValue | null>(null)

type Props = {
  children: React.ReactNode
  value: WelcomeGuideContextValue
}

export const WelcomeGuideProvider = (props: Props): React.JSX.Element => (
  <WelcomeGuideContext.Provider value={props.value}>{props.children}</WelcomeGuideContext.Provider>
)

export const useWelcomeGuide = (): WelcomeGuideContextValue => {
  const ctx = useContext(WelcomeGuideContext)

  if (ctx === null) {
    throw new Error('useWelcomeGuide used outside WelcomeGuideProvider')
  }

  return ctx
}
