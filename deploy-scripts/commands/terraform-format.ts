import { $ } from 'bun'
import { resolve } from 'node:path'
import { logger } from '../lib/output/logger'
import url from 'node:url'
import path from 'node:path'

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
