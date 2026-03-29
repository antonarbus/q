// oxlint-disable no-console
import chalk from 'chalk'

export const log = {
  info: (...message: unknown[]): void => {
    console.info(chalk.blue(`ℹ ${message.join(' | ')}`))
  },

  success: (...message: unknown[]): void => {
    console.log(chalk.green(`✓ ${message.join(' | ')}`))
  },

  error: (...message: unknown[]): void => {
    console.error(chalk.red(`✗ ${message.join(' | ')}`))
  },

  warn: (...message: unknown[]): void => {
    console.warn(chalk.yellow(`⚠ ${message.join(' | ')}`))
  },

  section: (...message: unknown[]): void => {
    console.log(`\n${chalk.bold(message.join(' | '))}`)
  },

  plain: (...message: unknown[]): void => {
    console.log(message.join(' | '))
  },

  emptyLine: (): void => {
    console.log('')
  },
}
