# ==============================================================================
# DATA SOURCES - REFERENCE SHARED RESOURCES FROM BOOTSTRAP
# ==============================================================================
# These resources are created in bootstrap/ and shared across all environments
# We reference them here using data sources instead of creating them

# ==============================================================================
# SERVICE ACCOUNTS (SHARED - CREATED IN BOOTSTRAP)
# ==============================================================================
# Service accounts are created in bootstrap/ and shared across all environments
#
# WHY DATA SOURCES?
# - Service accounts are singleton resources (one per project)
# - Created once in bootstrap/, referenced by all environments
# - Prevents conflicts when multiple environments try to create the same SA

# Reference the GitHub Actions service account created in bootstrap
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/service_account
data "google_service_account" "github_actions" {
  account_id = var.github_actions_sa_name
}

# Reference the Cloud Run service account created in bootstrap
data "google_service_account" "cloud_run_service" {
  account_id = var.cloud_run_sa_name
}
