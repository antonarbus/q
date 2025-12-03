import { $ } from 'bun'
import { resolve } from 'path'
import { logger } from '../lib/output/logger'

export async function terraformFormat(): Promise<void> {
  const TERRAFORM_DIR = resolve(__dirname, '../../terraform')

  logger.info('Formatting Terraform files...')
  logger.emptyLine()

  await $`terraform fmt -recursive ${TERRAFORM_DIR}`

  logger.emptyLine()
  logger.success('Terraform files formatted successfully')
  logger.emptyLine()
}
