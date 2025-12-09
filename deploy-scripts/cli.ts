#!/usr/bin/env bun
import { Command } from 'commander'
import { deployCloudRun } from './commands/deploy-cloudrun'
import { detectEnvironment } from './commands/detect-env'
import { generateTfvars } from './commands/generate-tfvars'
import { listGcloudServices } from './commands/list-gcloud-services'
import { loadConfig } from './commands/load-config'
import { promoteImage } from './commands/promote-image'
import { showDeploymentInfo } from './commands/show-deployment-info'
import { terraformApply } from './commands/terraform-apply'
import { terraformFormat } from './commands/terraform-format'
import { validatePromotion } from './commands/validate-promotion'
import { verifyDeployment } from './commands/verify-deployment'
import { runInteractiveMode } from './lib/interactive'
import { deployedEnvironmentSchema } from 'config/environment'
// eslint-disable-next-line id-length
import z from 'zod'

const noArgumentsProvided = process.argv.length === 2

if (noArgumentsProvided === true) {
  await runInteractiveMode()
  process.exit(0)
}

// Otherwise, use Commander for CLI arguments
const program = new Command()

program.name('deploy-cli').description('Deployment automation').version('1.0.0')

program
  .command('show-deployment-info')
  .description('Show deployment info for a specific environment')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .action(async (options: { env: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)
    await showDeploymentInfo({ environment: validatedEnvironment })
  })

program
  .command('list-gcloud-services')
  .description('List all enabled Google Cloud services for the project')
  .action(async () => {
    await listGcloudServices()
  })

program
  .command('generate-tfvars')
  .description('Generate .tfvars files from TypeScript config')
  .action(async () => {
    await generateTfvars()
  })

program
  .command('detect-env')
  .description('Detect deployment environment from git branch')
  .action(async () => {
    await detectEnvironment()
  })

program
  .command('load-config')
  .description('Load config for specified environment and output as env vars')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .action((options: { env: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)
    loadConfig({ environment: validatedEnvironment })
  })

program
  .command('terraform-apply')
  .description('Apply Terraform configuration for environment')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .action(async (options: { env: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)
    await terraformApply({ environment: validatedEnvironment })
  })

program
  .command('terraform-format')
  .description('Format Terraform files')
  .action(async () => {
    await terraformFormat()
  })

program
  .command('deploy-cloudrun')
  .description('Deploy Docker image to Cloud Run')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .requiredOption(
    '--service <service>',
    'Service to deploy (frontend, backend, or both)',
  )
  .action(async (options: { env: string; service: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)

    const serviceSchema = z.enum(['frontend', 'backend', 'both'])
    const validatedService = serviceSchema.parse(options.service)

    await deployCloudRun({
      environment: validatedEnvironment,
      service: validatedService,
    })
  })

program
  .command('verify-deployment')
  .description('Verify Cloud Run deployment')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .requiredOption(
    '--previous-image-frontend <image>',
    'Previous frontend image URL for rollback',
  )
  .requiredOption(
    '--previous-image-backend <image>',
    'Previous backend image URL for rollback',
  )
  .action(
    async (options: {
      env: string
      previousImageFrontend: string
      previousImageBackend: string
    }) => {
      const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)

      await verifyDeployment({
        environment: validatedEnvironment,
        previousImageFrontend: options.previousImageFrontend,
        previousImageBackend: options.previousImageBackend,
      })
    },
  )

program
  .command('validate-promotion')
  .description('Validate promotion path between environments')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .action((options: { sourceEnv: string; targetEnv: string }) => {
    const validatedSourceEnvironment = deployedEnvironmentSchema.parse(
      options.sourceEnv,
    )

    const validatedTargetEnv = deployedEnvironmentSchema.parse(
      options.targetEnv,
    )

    validatePromotion({
      sourceEnvironment: validatedSourceEnvironment,
      targetEnvironment: validatedTargetEnv,
    })
  })

program
  .command('promote-image')
  .description('Promote Docker image from source to target environment')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .requiredOption(
    '--service <service>',
    'Service to promote (frontend, backend, or both)',
  )
  .action(
    async (options: {
      sourceEnv: string
      targetEnv: string
      service: string
    }) => {
      const validatedSourceEnvironment = deployedEnvironmentSchema.parse(
        options.sourceEnv,
      )

      const validatedTargetEnvironment = deployedEnvironmentSchema.parse(
        options.targetEnv,
      )

      const serviceSchema = z.enum(['frontend', 'backend', 'both'])
      const validatedService = serviceSchema.parse(options.service)

      await promoteImage({
        sourceEnvironment: validatedSourceEnvironment,
        targetEnvironment: validatedTargetEnvironment,
        service: validatedService,
      })
    },
  )

program.parse()
