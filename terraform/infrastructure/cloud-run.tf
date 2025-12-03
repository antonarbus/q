# ==============================================================================
# CLOUD RUN SERVICES - FRONTEND & BACKEND
# ==============================================================================
# Two separate Cloud Run services for the quotation app
# Frontend: Serves the React UI (Nginx)
# Backend: API server (Express/Bun)
# Cloud Run automatically scales up/down based on traffic (even to zero!)

# ==============================================================================
# FRONTEND SERVICE
# ==============================================================================

resource "google_cloud_run_v2_service" "frontend" {
  name     = var.cloud_run_service_name_frontend
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # Accept traffic from internet

  template {
    labels = {
      managed-by  = "terraform"
      environment = var.environment
      service     = "frontend"
    }

    scaling {
      min_instance_count = var.min_instances_frontend
      max_instance_count = var.max_instances_frontend
    }

    containers {
      # Placeholder image - actual image deployed by GitHub Actions
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      resources {
        limits = {
          cpu    = var.cpu_limit_frontend
          memory = var.memory_limit_frontend
        }
      }

      ports {
        container_port = var.container_port_frontend
      }

      startup_probe {
        http_get {
          path = "/"
          port = var.container_port_frontend
        }
        initial_delay_seconds = 10
        timeout_seconds       = 3
        period_seconds        = 5
        failure_threshold     = 3
      }

      liveness_probe {
        http_get {
          path = "/"
          port = var.container_port_frontend
        }
        initial_delay_seconds = 30
        timeout_seconds       = 1
        period_seconds        = 10
        failure_threshold     = 3
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
# BACKEND SERVICE
# ==============================================================================

resource "google_cloud_run_v2_service" "backend" {
  name     = var.cloud_run_service_name_backend
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # Accept traffic from internet

  template {
    labels = {
      managed-by  = "terraform"
      environment = var.environment
      service     = "backend"
    }

    scaling {
      min_instance_count = var.min_instances_backend
      max_instance_count = var.max_instances_backend
    }

    containers {
      # Placeholder image - actual image deployed by GitHub Actions
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      resources {
        limits = {
          cpu    = var.cpu_limit_backend
          memory = var.memory_limit_backend
        }
      }

      ports {
        container_port = var.container_port_backend
      }

      startup_probe {
        http_get {
          path = "/api/health" # Backend health check endpoint
          port = var.container_port_backend
        }
        initial_delay_seconds = 10
        timeout_seconds       = 3
        period_seconds        = 5
        failure_threshold     = 3
      }

      liveness_probe {
        http_get {
          path = "/api/health"
          port = var.container_port_backend
        }
        initial_delay_seconds = 30
        timeout_seconds       = 1
        period_seconds        = 10
        failure_threshold     = 3
      }

      # Environment variables for backend
      # Add MongoDB connection string, API keys, etc. via secrets
      # Note: PORT is automatically set by Cloud Run based on container_port
      env {
        name  = "NODE_ENV"
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
# PUBLIC ACCESS CONFIGURATION - FRONTEND
# ==============================================================================

resource "google_cloud_run_v2_service_iam_member" "frontend_public_access" {
  name     = google_cloud_run_v2_service.frontend.name
  location = google_cloud_run_v2_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ==============================================================================
# PUBLIC ACCESS CONFIGURATION - BACKEND
# ==============================================================================

resource "google_cloud_run_v2_service_iam_member" "backend_public_access" {
  name     = google_cloud_run_v2_service.backend.name
  location = google_cloud_run_v2_service.backend.location
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
