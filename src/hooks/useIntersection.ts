import { useState, useEffect, RefObject } from 'react'

export function useIntersection(ref: RefObject<Element>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, options])

  return isIntersecting
}
