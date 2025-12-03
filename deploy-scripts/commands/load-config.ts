import { configVariables, Env } from '../../config/configVariables'
import { exit } from 'process'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

type Props = {
  env: Env
}

export const loadConfig = (props: Props): void => {
  try {
    logger.info(`Loading config for environment: ${props.env}`)
    githubOutput(configVariables[props.env])
    logger.success('Config loaded successfully')
  } catch (error) {
    logger.error(`Failed to load config: ${error}`)
    exit(1)
  }
}
