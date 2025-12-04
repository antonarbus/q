import { $ } from 'bun'
import { resolve } from 'path'
import { chdir } from 'process'
import { configVariables, type Env } from '../../config/configVariables'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

export async function terraformApply(props: Props): Promise<void> {
  logger.info(`Environment: ${props.env}`)

  const { bucketForTerraformStateName } = configVariables[props.env]

  const TERRAFORM_DIR = resolve(__dirname, '../../terraform/infrastructure')
  const TFVARS_FILE_PATH = resolve(
    __dirname,
    `../../config/${props.env}.tfvars`,
  )

  logger.info(`Config: ${TFVARS_FILE_PATH}`)
  logger.emptyLine()

  logger.warning(`Deploying main infrastructure for environment: ${props.env}`)
  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  chdir(TERRAFORM_DIR)

  await $`terraform init -reconfigure -backend-config=bucket=${bucketForTerraformStateName} -backend-config=prefix=terraform/state/${props.env}`

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
