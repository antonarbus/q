import { select } from '@inquirer/prompts'
import chalk from 'chalk'
import type { Env } from '../../config/infrastructure'
import { generateTfvars } from '../commands/generate-tfvars'
import { listGcloudServices } from '../commands/list-gcloud-services'
import { showDeploymentInfo } from '../commands/show-deployment-info'
import { terraformApply } from '../commands/terraform-apply'
import { terraformFormat } from '../commands/terraform-format'
import { terraformPlan } from '../commands/terraform-plan'

type Command = {
  name: string
  description: string
  requiresEnv: boolean
  action: (env?: Env) => Promise<void>
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
      action: async (env?: Env): Promise<void> => {
        if (env === undefined) {
          throw new Error('Environment required')
        }

        await showDeploymentInfo({ env })
      },
    },
    {
      name: 'terraform-plan',
      description: 'Plan infrastructure changes',
      requiresEnv: true,
      action: async (env?: Env): Promise<void> => {
        if (env === undefined) {
          throw new Error('Environment required')
        }

        await terraformPlan({ env })
      },
    },
    {
      name: 'terraform-apply',
      description: 'Apply infrastructure changes',
      requiresEnv: true,
      action: async (env?: Env): Promise<void> => {
        if (env === undefined) {
          throw new Error('Environment required')
        }

        await terraformApply({ env })
      },
    },
    {
      name: 'terraform-format',
      description: 'Format Terraform files',
      requiresEnv: false,
      action: async () => terraformFormat(),
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
  let env: Env | undefined

  if (command?.requiresEnv === true) {
    env = await select({
      message: 'Select environment:',
      choices: [
        { name: 'dev', value: 'dev' },
        { name: 'test', value: 'test' },
        { name: 'pilot', value: 'pilot' },
        { name: 'prod', value: 'prod' },
      ],
    })
  }

  await command?.action(env)
}
