# ==============================================================================
# TERRAFORM OUTPUTS
# ==============================================================================
#
# Outputs display important information after Terraform creates resources
# Not consumed by other code now, but good to keep for documentation & discoverability
#
# See all outputs:
#   cd terraform/infrastructure
#   terraform output

# ==============================================================================
# CLOUD RUN SERVICE URL
# ==============================================================================

output "cloud_run_app_url_output" {
  description = "The public URL where your Cloud Run service is accessible"
  value       = google_cloud_run_v2_service.app.uri
  # Example: https://web-app-dev-abc123-uc.a.run.app
}

# ==============================================================================
# ARTIFACT REGISTRY
# ==============================================================================

output "artifact_registry_repository_output" {
  description = "Full resource name of the Artifact Registry repository"
  value       = google_artifact_registry_repository.docker_repo.name
  # Example: projects/PROJECT_ID/locations/us-central1/repositories/docker-images
  # This is the unique identifier for your Docker image storage
  # Shared resource managed by all environments
}

# ==============================================================================
# SERVICE ACCOUNTS
# ==============================================================================

output "github_actions_service_account_email_output" {
  description = "Email address of the GitHub Actions service account (shared, created in bootstrap)"
  value       = data.google_service_account.github_actions.email
  # Example: github-actions-sa@PROJECT_ID.iam.gserviceaccount.com
  # This service account is shared across all environments
  # Created in bootstrap/, referenced here via data source
}

output "cloud_run_service_account_email_output" {
  description = "Email address of the Cloud Run service account (shared, created in bootstrap)"
  value       = data.google_service_account.cloud_run_service.email
  # Example: cloud-run-sa@PROJECT_ID.iam.gserviceaccount.com
  # This service account is shared across all environments
  # Created in bootstrap/, referenced here via data source
}

# ==============================================================================
# DOCKER IMAGE PATH
# ==============================================================================

output "docker_image_path_output" {
  description = "Full path for pushing/pulling Docker images"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_name}/${var.docker_image_name}"
  # Example: us-central1-docker.pkg.dev/PROJECT_ID/docker-images/web-app
}

# ==============================================================================
# CUSTOM DOMAIN
# ==============================================================================

output "domain_app_output" {
  description = "Custom domain mapped to your Cloud Run service"
  value       = google_cloud_run_domain_mapping.app.name
  # Example: sendmequotation.today or dev.sendmequotation.today
  # The DNS records should be configured at your domain registrar
}

# ==============================================================================
# STORAGE BUCKET
# ==============================================================================

output "storage_bucket_name_output" {
  description = "GCS bucket for this environment"
  value       = google_storage_bucket.app_bucket.name
}

# Note: No database outputs as currently using MongoDB (external)
# When migrating to Cloud SQL, uncomment cloud-sql.tf and add outputs here
