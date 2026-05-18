# ==============================================================================
# BOOTSTRAP OUTPUTS
# ==============================================================================
#
# Outputs display important information after Terraform creates resources
# Not consumed by other code now, but good to keep for documentation & discoverability
#
# See all outputs
#
# ```
#   cd terraform/bootstrap
#   terraform output
# ```

output "bucket_for_terraform_state_name_output" {
  description = "Name of the created Terraform state bucket"
  value       = google_storage_bucket.terraform_state.name
}

output "bucket_for_terraform_state_url_output" {
  description = "URL of the Terraform state bucket"
  value       = google_storage_bucket.terraform_state.url
}

# ==============================================================================
# WORKLOAD IDENTITY FEDERATION (PROJECT-WIDE)
# ==============================================================================

output "workload_identity_provider" {
  description = "Workload Identity Provider for GitHub Actions (ALL environments)"
  value       = google_iam_workload_identity_pool_provider.github_provider.name
  # This is used by ALL environments in deploy.yml
  # Only needs to be created once for the whole project
}

# ==============================================================================
# SHARED SERVICE ACCOUNTS
# ==============================================================================

output "github_actions_service_account_email" {
  description = "Email of the GitHub Actions service account (shared across all environments)"
  value       = google_service_account.github_actions.email
}

output "cloud_run_service_account_email" {
  description = "Email of the Cloud Run service account (shared across all environments)"
  value       = google_service_account.cloud_run_service.email
}

# ==============================================================================
# SECRET MANAGER
# ==============================================================================

output "secret_names" {
  description = "Names of all secrets in Secret Manager (for reference)"
  value = {
    jwt_access                               = google_secret_manager_secret.jwt_access.secret_id
    jwt_refresh                              = google_secret_manager_secret.jwt_refresh.secret_id
    mailersend_api_key                       = google_secret_manager_secret.mailersend_api_key.secret_id
    neon_api_key                             = google_secret_manager_secret.neon_api_key.secret_id
    neon_database_url_dev                    = google_secret_manager_secret.neon_database_url_dev.secret_id
    neon_database_url_test                   = google_secret_manager_secret.neon_database_url_test.secret_id
    neon_database_url_prod                   = google_secret_manager_secret.neon_database_url_prod.secret_id
    gcp_private_key_id                       = google_secret_manager_secret.gcp_private_key_id.secret_id
    gcp_private_key                          = google_secret_manager_secret.gcp_private_key.secret_id
    stripe_secret_key_test                   = google_secret_manager_secret.stripe_secret_key_test.secret_id
    stripe_secret_key_live                   = google_secret_manager_secret.stripe_secret_key_live.secret_id
    stripe_client_id_test                    = google_secret_manager_secret.stripe_client_id_test.secret_id
    stripe_client_id_live                    = google_secret_manager_secret.stripe_client_id_live.secret_id
    stripe_webhook_connected_accounts_secret_dev                = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_dev.secret_id
    stripe_webhook_your_account_secret_dev        = google_secret_manager_secret.stripe_webhook_your_account_secret_dev.secret_id
    stripe_webhook_connected_accounts_secret_test               = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_test.secret_id
    stripe_webhook_your_account_secret_test       = google_secret_manager_secret.stripe_webhook_your_account_secret_test.secret_id
    stripe_webhook_connected_accounts_secret_pilot              = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_pilot.secret_id
    stripe_webhook_your_account_secret_pilot      = google_secret_manager_secret.stripe_webhook_your_account_secret_pilot.secret_id
    stripe_webhook_connected_accounts_secret_live               = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_live.secret_id
    stripe_webhook_your_account_secret_live       = google_secret_manager_secret.stripe_webhook_your_account_secret_live.secret_id
    stripe_subscription_price_id_annual_test = google_secret_manager_secret.stripe_subscription_price_id_annual_test.secret_id
    stripe_subscription_price_id_annual_live = google_secret_manager_secret.stripe_subscription_price_id_annual_live.secret_id
    gemini_api_key                           = google_secret_manager_secret.gemini_api_key.secret_id
  }
}
