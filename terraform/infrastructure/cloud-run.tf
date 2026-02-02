# ==============================================================================
# CLOUD RUN SERVICE - UNIFIED APPLICATION
# ==============================================================================
# Single Cloud Run service serving both frontend (static files) and backend (API)
# Express server serves React static files AND API endpoints
# Cloud Run automatically scales up/down based on traffic (even to zero!)

# ==============================================================================
# APPLICATION SERVICE
# ==============================================================================

resource "google_cloud_run_v2_service" "app" {
  name     = var.cloud_run_service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # Accept traffic from internet

  template {
    labels = {
      managed-by  = "terraform"
      environment = var.environment
      service     = "app"
    }

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    containers {
      # Placeholder image - actual image deployed by GitHub Actions
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
        cpu_idle = true # Request-based billing: only pay CPU during requests  
      }

      ports {
        container_port = var.container_port
      }

      # Environment variables
      # Note: PORT is automatically set by Cloud Run based on container_port
      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "ENVIRONMENT"
        value = var.environment
      }
    }

    service_account = data.google_service_account.cloud_run_service.email
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  lifecycle {
    ignore_changes = [
      client,
      client_version,
      template[0].containers[0].image,
    ]
  }
}

# ==============================================================================
# PUBLIC ACCESS CONFIGURATION
# ==============================================================================

resource "google_cloud_run_v2_service_iam_member" "app_public_access" {
  name     = google_cloud_run_v2_service.app.name
  location = google_cloud_run_v2_service.app.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ==============================================================================
# CLOUD RUN SERVICE ACCOUNT PERMISSIONS
# ==============================================================================
# Project-specific permissions for the Cloud Run service account

# Note: Cloud SQL permissions commented out as currently using MongoDB
# Uncomment when migrating to Cloud SQL
# resource "google_project_iam_member" "cloud_run_sql_client" {
#   project = var.project_id
#   role    = "roles/cloudsql.client"
#   member  = "serviceAccount:${data.google_service_account.cloud_run_service.email}"
# }
