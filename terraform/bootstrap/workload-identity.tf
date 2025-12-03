# ==============================================================================
# WORKLOAD IDENTITY FEDERATION FOR GITHUB ACTIONS
# ==============================================================================
# This replaces service account JSON keys with secure, keyless authentication
# GitHub Actions authenticates using OIDC tokens instead of long-lived credentials
#
# Benefits:
# - No secrets to store in GitHub
# - No keys to rotate
# - More secure (short-lived tokens)
# - Google's recommended approach
#
# https://cloud.google.com/iam/docs/workload-identity-federation
# ==============================================================================

# ==============================================================================
# WORKLOAD IDENTITY POOL
# ==============================================================================
# A pool groups identity providers (we'll have one for GitHub)

resource "google_iam_workload_identity_pool" "github_pool" {
  workload_identity_pool_id = "github-pool"
  display_name              = "GitHub Actions Pool"
  description               = "Workload Identity Pool for GitHub Actions authentication"
  disabled                  = false
}

# ==============================================================================
# WORKLOAD IDENTITY PROVIDER (GITHUB)
# ==============================================================================
# Configures GitHub as a trusted identity provider

resource "google_iam_workload_identity_pool_provider" "github_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub Provider"
  description                        = "OIDC provider for GitHub Actions"

  # GitHub's OIDC configuration
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
  }

  # Restrict to your specific GitHub repository
  attribute_condition = "assertion.repository == '${var.github_repository}'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

# ==============================================================================
# BIND WORKLOAD IDENTITY TO SERVICE ACCOUNT
# ==============================================================================
# Allows GitHub Actions from your repo to impersonate the service account
# Note: Service account is created in infrastructure/, we reference it by ID

resource "google_service_account_iam_member" "workload_identity_user" {
  service_account_id = "projects/${var.project_id}/serviceAccounts/github-actions-sa@${var.project_id}.iam.gserviceaccount.com"
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_pool.name}/attribute.repository/${var.github_repository}"
}
