import { $ } from 'bun'
import path from 'node:path'
import { logger } from '@root/deploy-scripts/lib/output/logger'

export const terraformFormat = async (): Promise<void> => {
  const TERRAFORM_DIR = path.resolve(import.meta.dirname, '../../terraform')

  logger.info('Formatting Terraform files...')
  logger.emptyLine()

  await $`terraform fmt -recursive ${TERRAFORM_DIR}`

  logger.emptyLine()
  logger.success('Terraform files formatted successfully')
  logger.emptyLine()
}
