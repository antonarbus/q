// oxlint-disable react/only-export-components
import { localStorageKeys } from '@front/shared/lib/local-storage/localStorageKeys'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SLIDES } from './SLIDES'

export type Props = {
  currentSlide: number
  direction: 'next' | 'prev'
  totalSlides: number
  goNext: () => void
  goPrev: () => void
  goToSlide: (index: number) => void
  close: () => void
}

export const WelcomeGuideContext = createContext<Props | null>(null)

export const WelcomeGuideProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState<Props['currentSlide']>(0)
  const [direction, setDirection] = useState<Props['direction']>('next')

  useEffect(() => {
    localStorage.setItem(localStorageKeys.guideVisited, 'true')
    reduxHolder.dispatch(navSlice.actions.hideBadge({ navItemId: navItemId.welcomeGuide }))
  }, [])

  const close = (): void => {
    navigate('..')
  }

  const value: Props = {
    currentSlide,
    direction,
    totalSlides: SLIDES.length,
    close,
    goNext: () => {
      if (currentSlide < SLIDES.length - 1) {
        setDirection('next')
        setCurrentSlide(currentSlide + 1)
      } else {
        close()
      }
    },
    goPrev: () => {
      if (currentSlide > 0) {
        setDirection('prev')
        setCurrentSlide(currentSlide - 1)
      }
    },
    goToSlide: (index: number) => {
      setDirection(index > currentSlide ? 'next' : 'prev')
      setCurrentSlide(index)
    },
  }

  return <WelcomeGuideContext.Provider value={value}>{children}</WelcomeGuideContext.Provider>
}

export const useWelcomeGuide = (): Props => {
  const ctx = useContext(WelcomeGuideContext)

  if (ctx === null) {
    throw new Error('useWelcomeGuide used outside WelcomeGuideProvider')
  }

  return ctx
}
