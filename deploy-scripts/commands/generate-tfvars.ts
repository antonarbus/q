import { resolve } from 'node:path'
import { infraConfigVariables } from '../../config/infrastructure'
import { logger } from '../lib/output/logger'

type Props = {
  env: string
  config: Record<string, string | readonly string[]>
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
    const header = `# Generated from "../config/infrastructure.ts\n\n`

    /**
     *  Convert camelCase to snake_case
     *  TypeScript config uses camelCase: projectId, artifactRegistryName, etc.
     *  Terraform variables use snake_case: project_id, artifact_registry_name, etc.
     */
    const toSnakeCase = (str: string): string => {
      const strSnakedCased = str.replace(
        /[A-Z]/gu,
        (letter) => `_${letter.toLowerCase()}`,
      )

      return strSnakedCased
    }

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

  for (const [env, config] of Object.entries(infraConfigVariables)) {
    const CONFIG_DIR = resolve(__dirname, '../../config')
    const TFVARS_FILE_PATH = resolve(CONFIG_DIR, `${env}.tfvars`)

    const content = generateTfvarsContent({ env, config })

    // eslint-disable-next-line no-await-in-loop
    await Bun.write(TFVARS_FILE_PATH, content)
    logger.success(`Generated ${env}.tfvars`)
  }

  logger.emptyLine()
  logger.success('All .tfvars files generated successfully!')
  logger.info('Files are ready to commit to git')
}
