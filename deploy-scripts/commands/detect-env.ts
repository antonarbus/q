import { exit } from 'process'
import { MASTER_DEPLOYS_TO_ENV } from '../../config/infrastructure'
import { getCurrentGitBranchName } from '../lib/git/getCurrentGitBranchName'
import { logToGithubOutput } from '../lib/output/logToGithubOutput'
import { logger } from '../lib/output/logger'
import type { DeployedEnv } from 'config/environment'

export const detectEnvironment = async (): Promise<DeployedEnv> => {
  const branchName = await getCurrentGitBranchName()

  // Master/Main branch deploys to the environment specified in config
  // Other environments are reached via promotion workflow at GitHub, not direct push
  const isMaster = ['master', 'main'].includes(branchName) === true

  if (isMaster === true) {
    logger.info(
      `Environment: ${MASTER_DEPLOYS_TO_ENV} (from branch: ${branchName})`,
    )

    logger.success('Environment detection complete')
    logToGithubOutput({ env: MASTER_DEPLOYS_TO_ENV })

    return MASTER_DEPLOYS_TO_ENV
  }

  logger.error(
    `Only master/main branch triggers deployment to ${MASTER_DEPLOYS_TO_ENV} environment`,
  )

  logger.error(`Current branch: ${branchName}`)

  logger.error(
    'Use the Promote Release workflow at GitHub to deploy to other environments',
  )

  exit(1)
}
