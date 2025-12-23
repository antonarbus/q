import { exit } from 'process'
import { infraConfig } from '@root/config/infrastructure'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

type Props = {
  environment: DeployedEnvironment
}

export const loadConfig = (props: Props): void => {
  try {
    logger.info(`Loading config for environment: ${props.environment}`)
    logToGithubOutput(infraConfig[props.environment])
    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${String(error)}`)
    exit(1)
  }
}
