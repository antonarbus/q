# ==============================================================================
# ENABLE ESSENTIAL GOOGLE CLOUD APIS
# ==============================================================================
# These are infrastructure-level APIs needed for Terraform and CI/CD
# Project-specific APIs (SQL, Translation, Text-to-Speech) are in infrastructure/
# Note: serviceusage.googleapis.com and cloudresourcemanager.googleapis.com
# must be enabled manually first due to circular dependency (see README.md)

resource "google_project_service" "required_services" {
  for_each = toset([
    "iam.googleapis.com",              # Required for service account management
    "iamcredentials.googleapis.com",   # Required for Workload Identity (GitHub Actions)
    "storage.googleapis.com",          # Required for GCS buckets (Terraform state)
    "artifactregistry.googleapis.com", # Required for Docker image storage
    "run.googleapis.com",              # Required for Cloud Run services
    "logging.googleapis.com",          # Required for Cloud Run logs
    "monitoring.googleapis.com",       # Required for Cloud Run metrics
    "secretmanager.googleapis.com",    # Required for Secret Manager
  ])

  project            = var.project_id
  service            = each.key
  disable_on_destroy = false # Keep APIs enabled even if this resource is destroyed
}
