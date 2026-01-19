import { exit } from 'process'
import {
  type AllowedPromotionPath,
  allowedPromotionPath,
  allowedPromotionPathSchema,
} from '@back/config/infrastructure'
import type { DeployedEnvironment } from '@root/config/environment'

type Props = {
  sourceEnvironment: DeployedEnvironment
  targetEnvironment: DeployedEnvironment
}

/**
 * Validates that the promotion path from source to target environment is allowed.
 *
 * NOTE: This validation is only used when deploying via the promotion workflow.
 * When MASTER_DEPLOYS_TO_ENV is set to 'prod', deployment happens directly from
 * master branch to production, and this promotion path validation is not applicable.
 */
export const validatePromotion = (props: Props): void => {
  const validationResult = allowedPromotionPathSchema.safeParse(
    `${props.sourceEnvironment}-${props.targetEnvironment}`,
  )

  if (validationResult.success === false) {
    console.error(
      `❌ Invalid promotion path: ${props.sourceEnvironment} → ${props.targetEnvironment}`,
    )

    console.error(
      `Allowed promotion paths: ${allowedPromotionPath.map((path) => path.replace('-', '→')).join(', ')}`,
    )

    exit(1)
  }

  const validatedPromotionPath: AllowedPromotionPath = validationResult.data

  console.info(
    `✅ Valid promotion path: ${validatedPromotionPath.replace('-', '→')}`,
  )
}
