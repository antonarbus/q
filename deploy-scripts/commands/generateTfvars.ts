import path from 'node:path'
import { infraConfig } from '@back/config/infrastructure'
import { logger } from '@root/deploy-scripts/lib/output/logger'
import { write } from 'bun'

type Props = {
  environment: string
  config: Record<string, number | string | readonly string[]>
}

/**
 *  Convert camelCase to snake_case
 *  TypeScript config uses camelCase: projectId, artifactRegistryName, etc.
 *  Terraform variables use snake_case: project_id, artifact_registry_name, etc.
 */
const toSnakeCase = (str: string): string => {
  const strSnakedCased = str.replaceAll(/[A-Z]/gu, (letter) => `_${letter.toLowerCase()}`)

  return strSnakedCased
}

const generateTfvarsContent = (props: Props): string => {
  const header = `# Generated from "../config/infrastructure.ts\n\n`

  const lines = Object.entries(props.config).map(([key, value]) => {
    const snakeKey = toSnakeCase(key)

    // Handle arrays - format as Terraform list
    const isArray = Array.isArray(value)

    if (isArray === true) {
      const arrayValues = value.map((item) => `"${item}"`).join(', ')

      return `${snakeKey} = [${arrayValues}]`
    }

    // Handle regular strings
    return `${snakeKey} = "${String(value)}"`
  })

  return `${header + lines.join('\n')}\n`
}

/**
 * Generate .tfvars files from TypeScript config
 *
 * This ensures that .tfvars files stay in sync with the TypeScript config.
 * Run this after modifying config/configVariables.ts
 */
export const generateTfvars = async (): Promise<void> => {
  logger.warn('Generating .tfvars files from TypeScript config...')
  logger.emptyLine()

  for (const [env, config] of Object.entries(infraConfig)) {
    const CONFIG_DIR = path.resolve(import.meta.dirname, '../../config')
    const TFVARS_FILE_PATH = path.resolve(CONFIG_DIR, `${env}.tfvars`)

    const content = generateTfvarsContent({ environment: env, config })

    // oxlint-disable-next-line no-await-in-loop
    await write(TFVARS_FILE_PATH, content)
    logger.success(`Generated ${env}.tfvars`)
  }

  logger.emptyLine()
  logger.success('All .tfvars files generated successfully!')
  logger.info('Files are ready to commit to git')
}
