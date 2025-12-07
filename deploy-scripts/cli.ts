#!/usr/bin/env bun
import { Command } from 'commander'
import { envSchema } from '../config/infrastructure'
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

const noArgumentsProvided = process.argv.length === 2

if (noArgumentsProvided) {
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
    const validatedEnv = envSchema.parse(options.env)
    await showDeploymentInfo({ env: validatedEnv })
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
    const validatedEnv = envSchema.parse(options.env)
    loadConfig({ env: validatedEnv })
  })

program
  .command('terraform-apply')
  .description('Apply Terraform configuration for environment')
  .requiredOption(
    '--env <environment>',
    'Environment name (dev, test, pilot, prod)',
  )
  .action(async (options: { env: string }) => {
    const validatedEnv = envSchema.parse(options.env)
    await terraformApply({ env: validatedEnv })
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
  .option(
    '--service <service>',
    'Service to deploy (frontend, backend, or both)',
    'both',
  )
  .action(
    async (options: {
      env: string
      service: 'frontend' | 'backend' | 'both'
    }) => {
      const validatedEnv = envSchema.parse(options.env)
      await deployCloudRun({ env: validatedEnv, service: options.service })
    },
  )

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
      const validatedEnv = envSchema.parse(options.env)

      await verifyDeployment({
        env: validatedEnv,
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
    const validatedSourceEnv = envSchema.parse(options.sourceEnv)
    const validatedTargetEnv = envSchema.parse(options.targetEnv)

    validatePromotion({
      sourceEnv: validatedSourceEnv,
      targetEnv: validatedTargetEnv,
    })
  })

program
  .command('promote-image')
  .description('Promote Docker image from source to target environment')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .option(
    '--service <service>',
    'Service to promote (frontend, backend, or both)',
    'both',
  )
  .action(
    async (options: {
      sourceEnv: string
      targetEnv: string
      service: 'frontend' | 'backend' | 'both'
    }) => {
      const validatedSourceEnv = envSchema.parse(options.sourceEnv)
      const validatedTargetEnv = envSchema.parse(options.targetEnv)

      await promoteImage({
        sourceEnv: validatedSourceEnv,
        targetEnv: validatedTargetEnv,
        service: options.service,
      })
    },
  )

program.parse()
