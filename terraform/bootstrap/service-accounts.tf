# ==============================================================================
# SHARED SERVICE ACCOUNTS
# ==============================================================================
# These service accounts are shared across ALL environments (dev, test, pilot, prod)
# They are created once in bootstrap and referenced by all environments
#
# WHY IN BOOTSTRAP?
# - Service accounts are singleton resources (one per project)
# - Multiple environments would conflict if trying to create the same SA
# - Bootstrap runs once, infrastructure runs per environment (separate state files)
# ==============================================================================

# ==============================================================================
# SERVICE ACCOUNT FOR GITHUB ACTIONS
# ==============================================================================
# Shared across all environments (dev, test, pilot, prod)
# One service account can deploy to any environment
# Simplifies credential management - one GitHub Secret for all

# Service account resource
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "github_actions" {
  account_id   = var.github_actions_sa_name
  display_name = "GitHub Actions Service Account (All Environments)"
  description  = "Service account for GitHub Actions to deploy to all environments"
}

# ==============================================================================
# IAM PERMISSIONS (Principle of Least Privilege)
# ==============================================================================
# Following security best practices, we grant only the minimum permissions needed
# for GitHub Actions to deploy the application

# Cloud Run: Full management including domain mappings
# "roles/run.admin" allows: deploy services, manage domain mappings, update traffic
# Required for automated domain mapping creation via Terraform
# Note: This role includes domain mapping permissions which run.developer lacks
resource "google_project_iam_member" "github_actions_cloud_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Artifact Registry: Create repositories and push/pull images
# "roles/artifactregistry.admin" allows: create repositories, push/pull images, manage settings
# Required because Terraform needs to create artifact registries for new environments
resource "google_project_iam_member" "github_actions_artifact_registry_admin" {
  project = var.project_id
  role    = "roles/artifactregistry.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Service Account: Act as Cloud Run service account
# "roles/iam.serviceAccountUser" allows: deploy Cloud Run with specific service account
# Required for setting the service account that the deployed container runs as
resource "google_project_iam_member" "github_actions_service_account_user" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Storage: Read/write Terraform state files
# "roles/storage.objectUser" allows: read, write, delete objects in buckets
# Does NOT allow: deleting buckets, changing bucket settings
resource "google_project_iam_member" "github_actions_storage_object_user" {
  project = var.project_id
  role    = "roles/storage.objectUser"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# IAM: Read IAM policies (for Terraform state)
# "roles/iam.securityReviewer" allows: reading IAM policies
# Read-only, needed for Terraform to detect changes
resource "google_project_iam_member" "github_actions_iam_security_reviewer" {
  project = var.project_id
  role    = "roles/iam.securityReviewer"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# APIs: Enable required Google Cloud APIs
# "roles/serviceusage.serviceUsageAdmin" allows: enable/disable APIs
# Needed for Terraform to enable required APIs (run.googleapis.com, etc.)
# Note: This is a powerful permission but required for Terraform automation
resource "google_project_iam_member" "github_actions_service_usage_admin" {
  project = var.project_id
  role    = "roles/serviceusage.serviceUsageAdmin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# Cloud SQL: Manage Cloud SQL instances
# "roles/cloudsql.admin" allows: create, update, delete SQL instances
# Required for Terraform to manage the shared MySQL database
resource "google_project_iam_member" "github_actions_cloudsql_admin" {
  project = var.project_id
  role    = "roles/cloudsql.admin"
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

# ==============================================================================
# SERVICE ACCOUNT FOR CLOUD RUN
# ==============================================================================
# Shared across all environments (dev, test, pilot, prod)
# All Cloud Run services run as this service account
# If you need different permissions per environment, create environment-specific SAs

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/google_service_account
resource "google_service_account" "cloud_run_service" {
  account_id   = var.cloud_run_sa_name
  display_name = "Cloud Run Service Account (All Environments)"
  description  = "Service account used by Cloud Run services in all environments"
}
