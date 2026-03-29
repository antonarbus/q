import { $ } from 'bun'
import path, { resolve } from 'node:path'
import { chdir } from 'node:process'
import { infraConfig } from '@back/config/infrastructure'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'
import url from 'node:url'

type Props = {
  environment: DeployedEnvironment
}

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const terraformPlan = async (props: Props): Promise<void> => {
  logger.info(`Environment: ${props.environment}`)

  const TERRAFORM_DIR = resolve(__dirname, '../../terraform/infrastructure')

  const TFVARS_FILE_PATH = resolve(__dirname, `../../config/${props.environment}.tfvars`)

  logger.info(`Config: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  logger.warn(`Planning infrastructure changes for environment: ${props.environment}`)

  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  chdir(TERRAFORM_DIR)

  await $`terraform init -reconfigure -backend-config=bucket=${infraConfig[props.environment].bucketForTerraformStateName} -backend-config=prefix=terraform/state/${props.environment}`

  logger.emptyLine()
  logger.info('Running Terraform plan...')
  logger.info(`Config file: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  await $`terraform plan -var-file=${TFVARS_FILE_PATH}`

  logger.emptyLine()
  logger.success('Terraform plan completed successfully')
  logger.emptyLine()
}
