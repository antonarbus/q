import { exit } from 'node:process'
import { infraConfig } from '@back/config/infrastructure'
import { logToGithubOutput } from '@root/deploy-scripts/lib/output/logToGithubOutput'
import { logger } from '@root/deploy-scripts/lib/output/logger'
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
