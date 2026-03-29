#!/usr/bin/env bun
import { Command } from 'commander'
import { deployCloudRun } from './commands/deployCloudRun'
import { detectEnvironment } from './commands/detectEnvironment'
import { generateTfvars } from './commands/generateTfvars'
import { listGcloudServices } from './commands/listGcloudServices'
import { loadConfig } from './commands/loadConfig'
import { promoteImage } from './commands/promoteServiceImage'
import { showDeploymentInfo } from './commands/showDeploymentInfo'
import { terraformApply } from './commands/terraformApply'
import { terraformFormat } from './commands/terraformFormat'
import { terraformUnlock } from './commands/terraformUnlock'
import { validatePromotion } from './commands/validatePromotion'
import { verifyDeployment } from './commands/verifyDeployment'
import { runInteractiveMode } from './lib/interactive'
import { deployedEnvironmentSchema } from '@root/config/environment'

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
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
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
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .action((options: { env: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)
    loadConfig({ environment: validatedEnvironment })
  })

program
  .command('terraform-apply')
  .description('Apply Terraform configuration for environment')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
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
  .command('terraform-unlock')
  .description('Remove Terraform state lock')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .option('--lock-id <lockId>', 'Lock ID to remove (auto-detects if not provided)')
  .option('--force', 'Force unlock without prompting for confirmation')
  .action(async (options: { env: string; lockId?: string; force?: boolean }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)

    await terraformUnlock({
      environment: validatedEnvironment,
      lockId: options.lockId,
      force: options.force,
    })
  })

program
  .command('deploy-cloudrun')
  .description('Deploy unified application to Cloud Run')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .action(async (options: { env: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)

    await deployCloudRun({
      environment: validatedEnvironment,
    })
  })

program
  .command('verify-deployment')
  .description('Verify Cloud Run deployment')
  .requiredOption('--env <environment>', 'Environment name (dev, test, pilot, prod)')
  .requiredOption('--previous-image-backend <image>', 'Previous backend image URL for rollback')
  .action(async (options: { env: string; previousImageBackend: string }) => {
    const validatedEnvironment = deployedEnvironmentSchema.parse(options.env)

    await verifyDeployment({
      environment: validatedEnvironment,
      previousImageBackend: options.previousImageBackend,
    })
  })

program
  .command('validate-promotion')
  .description('Validate promotion path between environments')
  .requiredOption('--source-env <environment>', 'Source environment name')
  .requiredOption('--target-env <environment>', 'Target environment name')
  .action((options: { sourceEnv: string; targetEnv: string }) => {
    const validatedSourceEnvironment = deployedEnvironmentSchema.parse(options.sourceEnv)

    const validatedTargetEnv = deployedEnvironmentSchema.parse(options.targetEnv)

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
  .action(async (options: { sourceEnv: string; targetEnv: string }) => {
    const validatedSourceEnvironment = deployedEnvironmentSchema.parse(options.sourceEnv)

    const validatedTargetEnvironment = deployedEnvironmentSchema.parse(options.targetEnv)

    await promoteImage({
      sourceEnvironment: validatedSourceEnvironment,
      targetEnvironment: validatedTargetEnvironment,
    })
  })

program.parse()
