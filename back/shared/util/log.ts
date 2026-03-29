// oxlint-disable no-console
export const log = {
  info: (...message: unknown[]): void => {
    console.info(`ℹ ${message.join(' | ')}`)
  },

  success: (...message: unknown[]): void => {
    console.log(`✓ ${message.join(' | ')}`)
  },

  error: (...message: unknown[]): void => {
    console.error(`✗ ${message.join(' | ')}`)
  },

  warning: (...message: unknown[]): void => {
    console.warn(`⚠ ${message.join(' | ')}`)
  },

  section: (...message: unknown[]): void => {
    console.log(`\n${message.join(' | ')}`)
  },

  plain: (...message: unknown[]): void => {
    console.log(message.join(' | '))
  },

  emptyLine: (): void => {
    console.log('')
  },
}
