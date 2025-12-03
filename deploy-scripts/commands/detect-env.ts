import { getCurrentGitBranchName } from '../lib/git/getCurrentGitBranchName'
import { Env, MASTER_DEPLOYS_TO_ENV } from '../../config/configVariables'
import { exit } from 'process'
import { githubOutput } from '../lib/output/githubOutput'
import { logger } from '../lib/output/logger'

export const detectEnvironment = async (): Promise<Env> => {
  const branchName = await getCurrentGitBranchName()

  // Master/Main branch deploys to the environment specified in config
  // Other environments are reached via promotion workflow at GitHub, not direct push
  const isMaster = ['master', 'main'].includes(branchName) === true

  if (isMaster) {
    logger.info(`Environment: ${MASTER_DEPLOYS_TO_ENV} (from branch: ${branchName})`)
    logger.success('Environment detection complete')
    githubOutput({ env: MASTER_DEPLOYS_TO_ENV })

    return MASTER_DEPLOYS_TO_ENV
  }

  logger.error(
    `Only master/main branch triggers deployment to ${MASTER_DEPLOYS_TO_ENV} environment`
  )

  logger.error(`Current branch: ${branchName}`)
  logger.error('Use the Promote Release workflow at GitHub to deploy to other environments')

  exit(1)
}
