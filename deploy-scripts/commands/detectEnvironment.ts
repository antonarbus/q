import { exit } from 'node:process'
import { MASTER_DEPLOYS_TO_ENVIRONMENT } from '@back/config/infrastructure'
import { getCurrentGitBranchName } from '@root/deploy-scripts/lib/git/getCurrentGitBranchName'
import { logToGithubOutput } from '@root/deploy-scripts/lib/output/logToGithubOutput'
import { logger } from '@root/deploy-scripts/lib/output/logger'
import type { DeployedEnvironment } from '@root/config/environment'

export const detectEnvironment = async (): Promise<DeployedEnvironment> => {
  const branchName = await getCurrentGitBranchName()

  // Master/Main branch deploys to the environment specified in config
  // Other environments are reached via promotion workflow at GitHub, not direct push
  const isMaster = ['master', 'main'].includes(branchName) === true

  if (isMaster === true) {
    logger.info(`Environment: ${MASTER_DEPLOYS_TO_ENVIRONMENT} (from branch: ${branchName})`)

    logger.success('Environment detection complete')
    logToGithubOutput({ environment: MASTER_DEPLOYS_TO_ENVIRONMENT })

    return MASTER_DEPLOYS_TO_ENVIRONMENT
  }

  logger.error(
    `Only master/main branch triggers deployment to ${MASTER_DEPLOYS_TO_ENVIRONMENT} environment`,
  )

  logger.error(`Current branch: ${branchName}`)

  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')

  exit(1)
}
