import {
  AllowedPromotionPath,
  Env,
  allowedPromotionPath,
  allowedPromotionPathSchema
} from '../../config/configVariables'
import { exit } from 'process'

type Props = {
  sourceEnv: Env
  targetEnv: Env
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
    `${props.sourceEnv}-${props.targetEnv}`
  )

  if (!validationResult.success) {
    console.error(`❌ Invalid promotion path: ${props.sourceEnv} → ${props.targetEnv}`)

    console.error(
      `Allowed promotion paths: ${allowedPromotionPath.map((p) => p.replace('-', '→')).join(', ')}`
    )

    exit(1)
  }

  const validatedPromotionPath: AllowedPromotionPath = validationResult.data

  console.log(`✅ Valid promotion path: ${validatedPromotionPath.replace('-', '→')}`)
}
