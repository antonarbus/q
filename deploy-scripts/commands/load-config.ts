import { exit } from 'process'
import { type Env, infraConfigVariables } from '../../config/infrastructure'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
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
