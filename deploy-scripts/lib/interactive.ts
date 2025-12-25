import { input, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { generateTfvars } from '../commands/generate-tfvars'
import { listGcloudServices } from '../commands/list-gcloud-services'
import { showDeploymentInfo } from '../commands/show-deployment-info'
import { terraformApply } from '../commands/terraform-apply'
import { terraformFormat } from '../commands/terraform-format'
import { terraformPlan } from '../commands/terraform-plan'
import { terraformUnlock } from '../commands/terraform-unlock'
import type { DeployedEnvironment } from '@root/config/environment'

type Command = {
  name: string
  description: string
  requiresEnv: boolean
  action: (env?: DeployedEnvironment) => Promise<void>
}

export const runInteractiveMode = async (): Promise<void> => {
  const commands: Command[] = [
    {
      name: 'generate-tfvars',
      description: 'Generate .tfvars files from TypeScript config',
      requiresEnv: false,
      action: async () => generateTfvars(),
    },
    {
      name: 'list-gcloud-services',
      description: 'List enabled Google Cloud services',
      requiresEnv: false,
      action: async () => listGcloudServices(),
    },
    {
      name: 'show-deployment-info',
      description: 'Show what is currently deployed',
      requiresEnv: true,
      action: async (environment?: DeployedEnvironment): Promise<void> => {
        if (environment === undefined) {
          throw new Error('Environment required')
        }

        await showDeploymentInfo({ environment })
      },
    },
    {
      name: 'terraform-plan',
      description: 'Plan infrastructure changes',
      requiresEnv: true,
      action: async (environment?: DeployedEnvironment): Promise<void> => {
        if (environment === undefined) {
          throw new Error('Environment required')
        }

        await terraformPlan({ environment })
      },
    },
    {
      name: 'terraform-apply',
      description: 'Apply infrastructure changes',
      requiresEnv: true,
      action: async (environment?: DeployedEnvironment): Promise<void> => {
        if (environment === undefined) {
          throw new Error('Environment required')
        }

        await terraformApply({ environment })
      },
    },
    {
      name: 'terraform-format',
      description: 'Format Terraform files',
      requiresEnv: false,
      action: async () => terraformFormat(),
    },
    {
      name: 'terraform-unlock',
      description: 'Remove Terraform state lock',
      requiresEnv: true,
      action: async (environment?: DeployedEnvironment): Promise<void> => {
        if (environment === undefined) {
          throw new Error('Environment required')
        }

        const lockId = await input({
          message: 'Enter the lock ID to remove (leave empty to auto-detect):',
          default: '',
        })

        const forceConfirm = await select({
          message: 'Force unlock without confirmation?',
          choices: [
            { name: 'No', value: false },
            { name: 'Yes', value: true },
          ],
        })

        await terraformUnlock({
          environment,
          lockId: lockId === '' ? undefined : lockId,
          force: forceConfirm,
        })
      },
    },
    {
      name: 'exit',
      description: chalk.gray('Exit'),
      requiresEnv: false,
      action: (): never => {
        console.info('Goodbye!')
        process.exit(0)
      },
    },
  ]

  const selectedCommand = await select({
    message: 'Select a command:\n',
    choices: commands.map((cmd) => ({
      name: cmd.description,
      value: cmd.name,
      description: cmd.description,
    })),
  })

  const command = commands.find((cmd) => cmd.name === selectedCommand)

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let environment: DeployedEnvironment | undefined

  if (command?.requiresEnv === true) {
    environment = await select({
      message: 'Select environment:',
      choices: [
        { name: 'dev', value: 'dev' },
        { name: 'test', value: 'test' },
        { name: 'pilot', value: 'pilot' },
        { name: 'prod', value: 'prod' },
      ],
    })
  }

  await command?.action(environment)
}
