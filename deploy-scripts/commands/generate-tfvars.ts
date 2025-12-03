import { resolve } from 'path'
import { configVariables } from '../../config/configVariables'
import { logger } from '../lib/output/logger'

type Props = {
  env: string
  config: Record<string, string>
}

/**
 * Generate .tfvars files from TypeScript config
 *
 * This ensures that .tfvars files stay in sync with the TypeScript config.
 * Run this after modifying config/configVariables.ts
 */
export const generateTfvars = async (): Promise<void> => {
  logger.warning('Generating .tfvars files from TypeScript config...')
  logger.emptyLine()

  const generateTfvarsContent = (props: Props): string => {
    const header = `# Generated from config/configVariables.ts\n\n`

    /**
     *  Convert camelCase to snake_case
     *  TypeScript config uses camelCase: projectId, artifactRegistryName, etc.
     *  Terraform variables use snake_case: project_id, artifact_registry_name, etc.
     */
    const toSnakeCase = (str: string): string => {
      return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    }

    const lines = Object.entries(props.config).map(([key, value]) => {
      const lineWithKeyValuePair = `${toSnakeCase(key)} = "${value}"`
      return lineWithKeyValuePair
    })

    return header + lines.join('\n') + '\n'
  }

  for (const [env, config] of Object.entries(configVariables)) {
    const CONFIG_DIR = resolve(__dirname, '../../config')
    const TFVARS_FILE_PATH = resolve(CONFIG_DIR, `${env}.tfvars`)

    const content = generateTfvarsContent({ env, config })

    await Bun.write(TFVARS_FILE_PATH, content)
    logger.success(`Generated ${env}.tfvars`)
  }

  logger.emptyLine()
  logger.success('All .tfvars files generated successfully!')
  logger.info('Files are ready to commit to git')
}
