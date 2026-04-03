import { $ } from 'bun'
import path, { resolve } from 'node:path'
import { logger } from '@root/deploy-scripts/lib/output/logger'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const terraformFormat = async (): Promise<void> => {
  const TERRAFORM_DIR = resolve(__dirname, '../../terraform')

  logger.info('Formatting Terraform files...')
  logger.emptyLine()

  await $`terraform fmt -recursive ${TERRAFORM_DIR}`

  logger.emptyLine()
  logger.success('Terraform files formatted successfully')
  logger.emptyLine()
}
