import { exit } from 'process'
import { infraConfigVariables } from '../../config/infrastructure'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'
import type { DeployedEnv } from 'config/environment'

type Props = {
  env: DeployedEnv
}

export const loadConfig = (props: Props): void => {
  try {
    logger.info(`Loading config for environment: ${props.env}`)
    logToGithubOutput(infraConfigVariables[props.env])
    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${String(error)}`)
    exit(1)
  }
}
