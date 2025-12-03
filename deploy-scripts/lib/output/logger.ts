import chalk from 'chalk'

/**
 * - Real-time logs to stderr (for human-readable messages)
 * - Won't interfere with stdout which is required for github to pass data between steps
 */
export const logger = {
  info: (message: string): void => {
    console.error(chalk.blue(`ℹ ${message}`))
  },

  success: (message: string): void => {
    console.error(chalk.green(`✓ ${message}`))
  },

  error: (message: string): void => {
    console.error(chalk.red(`✗ ${message}`))
  },

  warning: (message: string): void => {
    console.error(chalk.yellow(`⚠ ${message}`))
  },

  section: (message: string): void => {
    console.error('\n' + chalk.bold(message))
  },

  plain: (message: string): void => {
    console.error(message)
  },

  emptyLine: (): void => {
    console.error('')
  }
}
