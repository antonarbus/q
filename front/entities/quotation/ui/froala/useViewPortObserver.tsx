import { type MutableRefObject, useEffect, useRef, useState } from 'react'

type Res = {
  observerRef: MutableRefObject<HTMLDivElement | null>
  isInsideViewPort: boolean
}

export const useViewPortObserver = (): Res => {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [isInsideViewPort, setIsInsideViewPort] = useState(false)

  useEffect(() => {
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
