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
