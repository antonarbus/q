import { $ } from 'bun'
import { resolve } from 'node:path'
import { logger } from '@root/deploy-scripts/lib/output/logger'

export const terraformFormat = async (): Promise<void> => {
  const TERRAFORM_DIR = resolve(import.meta.dirname, '../../terraform')

  logger.info('Formatting Terraform files...')
  logger.emptyLine()

  await $`terraform fmt -recursive ${TERRAFORM_DIR}`

  logger.emptyLine()
  logger.success('Terraform files formatted successfully')
  logger.emptyLine()
}
