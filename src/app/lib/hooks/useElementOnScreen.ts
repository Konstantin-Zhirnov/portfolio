import React from 'react'

const useElementOnScreen = (options: any, targetRef: any) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const callbackFunction = (entries: any) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const optionsMemo = React.useMemo(() => {
    return options
  }, [options])

  React.useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo)
    const currentTarget = targetRef.current

    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [targetRef, optionsMemo])

  return isVisible
}

export default useElementOnScreen
