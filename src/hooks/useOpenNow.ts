import { useState, useEffect } from 'react'

export function useOpenNow(hours: { days: string; time: string }[]) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const check = () => {
      // Peepai: 12:00 PM (noon) to 12:30 AM
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes()
      const totalMins = h * 60 + m
      // 12:00 = 720, midnight = 1440, 0:30 = 30
      const openMins = 12 * 60        // 720
      const closeMins = 0 * 60 + 30  // 30 (next day)

      if (totalMins >= openMins || totalMins < closeMins) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    check()
    const timer = setInterval(check, 60_000)
    return () => clearInterval(timer)
  }, [hours])

  return isOpen
}
