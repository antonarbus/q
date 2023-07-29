import { useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'

export const useViewPortObserver = () => {
  const observerRef = useRef(null)
  const [isInsideViewPort, setIsInsideViewPort] = useState(false)

  useEffectOnce(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0 }

    const callback: IntersectionObserverCallback = ([entry], observer) => {
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
