import { $ } from 'bun'
import { resolve } from 'path'
import { chdir } from 'process'
import { infraConfig } from '@root/config/infrastructure'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type Props = {
  environment: DeployedEnvironment
  lockId?: string
  force?: boolean
}

const detectLockId = async (tfvarsFilePath: string): Promise<string | null> => {
  try {
    // Try to run terraform plan which will fail if locked
    // Use -input=false to prevent any prompts and -lock-timeout to fail fast
    const result =
      await $`terraform plan -var-file=${tfvarsFilePath} -input=false -lock-timeout=1s`.nothrow()

    // If exit code is 0, there's no lock
    if (result.exitCode === 0) {
      return null
    }

    // Command failed, check if it's a lock error
    const errorMessage = [result.stderr, result.stdout].join('\n')

    // Look for ID: followed by numbers (with or without hyphens)
    const lockIdMatch = errorMessage.match(/ID:\s+([0-9a-f-]+)/i)

    if (lockIdMatch !== null && lockIdMatch[1] !== undefined) {
      return lockIdMatch[1]
    }

    // Try alternative pattern "Lock ID:"
    const altMatch = errorMessage.match(/Lock ID:\s+([0-9a-f-]+)/i)

    if (altMatch !== null && altMatch[1] !== undefined) {
      return altMatch[1]
    }

    // If we got an error but couldn't find a lock ID, it might be a different error
    if (errorMessage.includes('Error acquiring the state lock')) {
      logger.warning('Lock error detected but could not parse lock ID')
      logger.info('Full error message:')
      console.error(errorMessage)
    }

    return null
  } catch (error: unknown) {
    // Unexpected error
    logger.warning('Unexpected error during lock detection')
    console.error(error)
    return null
  }
}

export const terraformUnlock = async (props: Props): Promise<void> => {
  logger.info(`Environment: ${props.environment}`)
  logger.emptyLine()

  const TERRAFORM_DIR = resolve(__dirname, '../../terraform/infrastructure')

  const TFVARS_FILE_PATH = resolve(
    __dirname,
    `../../config/${props.environment}.tfvars`,
  )

  logger.warning(
    `Removing Terraform state lock for environment: ${props.environment}`,
  )

  logger.emptyLine()

  logger.info('Initializing Terraform with remote backend...')

  // Change to terraform directory
  chdir(TERRAFORM_DIR)

  await $`terraform init -reconfigure -backend-config=bucket=${infraConfig[props.environment].bucketForTerraformStateName} -backend-config=prefix=terraform/state/${props.environment}`

  logger.emptyLine()

  let lockIdToUse = props.lockId

  // If no lock ID provided, try to detect it
  if (lockIdToUse === undefined || lockIdToUse === '') {
    logger.info('Detecting lock ID...')
    lockIdToUse = await detectLockId(TFVARS_FILE_PATH)

    if (lockIdToUse === null) {
      logger.warning('No lock detected on the state.')
      logger.emptyLine()
      return
    }

    logger.info(`Detected lock ID: ${lockIdToUse}`)
    logger.emptyLine()
  } else {
    logger.info(`Lock ID: ${lockIdToUse}`)
    logger.emptyLine()
  }

  logger.info('Unlocking Terraform state...')
  logger.emptyLine()

  const forceFlag = props.force === true ? '-force' : ''

  await $`terraform force-unlock ${forceFlag} ${lockIdToUse}`

  logger.emptyLine()
  logger.success('Terraform state unlocked successfully')
  logger.emptyLine()
}
