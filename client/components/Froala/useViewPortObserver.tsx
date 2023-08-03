import type { MutableRefObject } from 'react';
import { useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'

interface TReturn {
  observerRef: MutableRefObject<HTMLDivElement | null>
  isInsideViewPort: boolean
}

export const useViewPortObserver = (): TReturn => {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [isInsideViewPort, setIsInsideViewPort] = useState(false)

  useEffectOnce(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0 }

    const callback: IntersectionObserverCallback = ([entry], observer) => {
      if (!entry) return
      setIsInsideViewPort(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      observer.disconnect()
    }
  })

  return { observerRef, isInsideViewPort }
}
