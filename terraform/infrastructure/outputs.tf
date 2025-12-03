# ==============================================================================
# TERRAFORM OUTPUTS
# ==============================================================================
#
# Outputs display important information after Terraform creates resources
# Not consumed by other code now, but good to keep for documentation & discoverability
#
# See all outputs
#
# ```
#   cd terraform/infrastructure
#   terraform output
# ```

output "cloud_run_url_output" {
  description = "The public URL where your Cloud Run service is accessible"
  value       = google_cloud_run_v2_service.main.uri
  # Example: https://cloud-run-abc123-uc.a.run.app
  # This is the auto-generated URL for your app
  # You can visit this URL immediately after deployment
}

output "artifact_registry_repository_output" {
  description = "Full resource name of the Artifact Registry repository"
  value       = google_artifact_registry_repository.docker_repo.name
  # Example: projects/antonarbus/locations/us-central1/repositories/artifact-registry
  # This is the unique identifier for your Docker image storage
  # Shared resource managed by all environments
}

output "github_actions_service_account_email_output" {
  description = "Email address of the GitHub Actions service account (shared, created in bootstrap)"
  value       = data.google_service_account.github_actions.email
  # Example: github-actions-sa@antonarbus.iam.gserviceaccount.com
  # This service account is shared across all environments
  # Created in bootstrap/, referenced here via data source
}

output "cloud_run_service_account_email_output" {
  description = "Email address of the Cloud Run service account (shared, created in bootstrap)"
  value       = data.google_service_account.cloud_run_service.email
  # Example: cloud-run-sa@antonarbus.iam.gserviceaccount.com
  # This service account is shared across all environments
  # Created in bootstrap/, referenced here via data source
}

output "docker_image_path_output" {
  description = "Full path for pushing/pulling Docker images"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_name}/${var.docker_image_name}"
  # Example: us-central1-docker.pkg.dev/antonarbus/artifact-registry/docker-image
  # Use this path in:
  # 1. Docker build commands: docker tag myapp:latest THIS_PATH:latest
  # 2. Docker push commands: docker push THIS_PATH:latest
  # 3. GitHub Actions workflows (already configured in your workflow file)
}

output "custom_domain_output" {
  description = "Custom domain mapped to your Cloud Run service"
  value       = google_cloud_run_domain_mapping.main.name
  # Example: antonarbus.com
  # The DNS records should already be configured from the previous setup
}

output "database_instance_name" {
  description = "Cloud SQL instance name"
  value       = google_sql_database_instance.mysql.name
}

output "database_connection_name" {
  description = "Cloud SQL instance connection name"
  value       = google_sql_database_instance.mysql.connection_name
}

output "database_public_ip" {
  description = "Public IP address of the Cloud SQL instance"
  value       = google_sql_database_instance.mysql.public_ip_address
}

