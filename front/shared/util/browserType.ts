type BrowserType = 'chromium' | 'firefox' | 'safari' | 'unknown'

const getBrowserType = (): BrowserType => {
  const userAgent = navigator.userAgent.toLowerCase()

  // Check Firefox first - has unique identifier
  if (userAgent.includes('firefox')) {
    return 'firefox'
  }

  // Check Safari before Chrome - Chrome's UA includes "Safari" string
  // so we must exclude Chrome to correctly identify Safari
  if (
    userAgent.includes('safari') === true &&
    userAgent.includes('chrome') === false
  ) {
    return 'safari'
  }

  // Check for Chromium-based browsers (Chrome, Edge, Opera)
  // Must be checked after Safari to avoid misidentification
  if (
    userAgent.includes('chrome') ||
    userAgent.includes('edg') ||
    userAgent.includes('opr')
  ) {
    return 'chromium'
  }

  return 'unknown'
}

export const browserType = getBrowserType()
