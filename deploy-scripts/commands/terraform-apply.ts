import { $ } from 'bun'
import { resolve } from 'node:path'
import { chdir } from 'node:process'
import { infraConfig } from '@back/config/infrastructure'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type Props = {
  environment: DeployedEnvironment
}

export const terraformApply = async (props: Props): Promise<void> => {
  logger.info(`Environment: ${props.environment}`)

  const TERRAFORM_DIR = resolve(__dirname, '../../terraform/infrastructure')

  const TFVARS_FILE_PATH = resolve(__dirname, `../../config/${props.environment}.tfvars`)

  logger.info(`Config: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  logger.warning(`Deploying main infrastructure for environment: ${props.environment}`)

  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  chdir(TERRAFORM_DIR)

  await $`terraform init -reconfigure -backend-config=bucket=${infraConfig[props.environment].bucketForTerraformStateName} -backend-config=prefix=terraform/state/${props.environment}`

  logger.emptyLine()
  logger.info('Applying Terraform configuration...')
  logger.info(`Config file: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  await $`terraform apply -auto-approve -var-file=${TFVARS_FILE_PATH}`

  logger.emptyLine()
  logger.success('Terraform apply completed successfully')
  logger.emptyLine()

  logger.info('Terraform Outputs:')
  await $`terraform output`

  logger.emptyLine()
  logger.success('Infrastructure deployment complete!')
  logger.emptyLine()
}
