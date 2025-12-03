# ==============================================================================
# CLOUD RUN SERVICE
# ==============================================================================
# This is the main application - a containerized web app that runs your site
# Cloud Run automatically scales up/down based on traffic (even to zero!)

# Cloud Run service (v2 API)
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service
resource "google_cloud_run_v2_service" "main" {
  name     = var.cloud_run_service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL" # Accept traffic from internet

  # Configuration for how the container runs
  template {
    # Labels for the template (managed by Terraform)
    labels = {
      managed-by  = "terraform"
      environment = var.environment
    }

    # Scaling settings: how many instances (copies) of your app can run
    scaling {
      min_instance_count = var.min_instances # Minimum: 0 (scales to zero when idle = no cost!)
      max_instance_count = var.max_instances # Maximum: 100 (prevents runaway costs)
    }

    # Container configuration: what Docker image to run and how
    containers {
      # The Docker image to run
      # Note: We use a public hello-world image for initial creation
      # The real app image is deployed by GitHub Actions after Terraform creates the service
      # lifecycle.ignore_changes prevents Terraform from reverting to this placeholder
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      # Resource limits: how much CPU and memory the container can use
      resources {
        limits = {
          cpu    = var.cpu_limit    # CPU: "1" = 1 full CPU core
          memory = var.memory_limit # Memory: "512Mi" = 512 megabytes of RAM
        }
      }

      # Network port configuration
      ports {
        container_port = var.container_port # Port 8080: where your app listens for HTTP requests
      }

      # Startup probe: Checks if the container is ready to receive traffic
      # This runs when the container first starts up
      # Cloud Run waits for this to succeed before routing traffic
      startup_probe {
        http_get {
          path = "/"                # HTTP GET request to root path
          port = var.container_port # Port 8080
        }
        initial_delay_seconds = 10 # Wait 10 seconds before first check (Next.js startup time)
        timeout_seconds       = 3  # Each check times out after 3 seconds
        period_seconds        = 5  # Check every 5 seconds
        failure_threshold     = 3  # Fail after 3 consecutive failures
      }

      # Liveness probe: Checks if the container is still healthy
      # If this fails, Cloud Run restarts the container
      # This helps recover from deadlocks or hung processes
      liveness_probe {
        http_get {
          path = "/"                # HTTP GET request to root path
          port = var.container_port # Port 8080
        }
        initial_delay_seconds = 30 # Wait 30 seconds after startup before checking
        timeout_seconds       = 1  # Each check times out after 1 second
        period_seconds        = 10 # Check every 10 seconds
        failure_threshold     = 3  # Restart after 3 consecutive failures
      }
    }

    # Which service account the running container uses
    # This determines what Google Cloud APIs your app can access
    service_account = data.google_service_account.cloud_run_service.email
  }

  # Traffic routing: send 100% of traffic to the latest deployed version
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST" # Always use latest revision
    percent = 100                                     # Send all traffic to it
  }

  # Ignore fields set by gcloud CLI during deployments
  # This prevents Terraform from trying to remove metadata added by GitHub Actions
  lifecycle {
    ignore_changes = [
      client,                          # Set by gcloud CLI
      client_version,                  # Set by gcloud CLI
      template[0].containers[0].image, # Image is managed by GitHub Actions workflow
    ]
  }

}

# ==============================================================================
# PUBLIC ACCESS CONFIGURATION
# ==============================================================================
# By default, Cloud Run requires authentication
# This grants public access so anyone can visit your website

# Cloud Run IAM member binding for public access
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service_iam
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.main.name
  location = google_cloud_run_v2_service.main.location
  role     = "roles/run.invoker" # Permission to invoke (call/access) the service
  member   = "allUsers"          # Give this permission to everyone on the internet
}

# ==============================================================================
# CLOUD RUN SERVICE ACCOUNT PERMISSIONS
# ==============================================================================
# Project-specific permissions for the Cloud Run service account

# Cloud SQL: Allow Cloud Run to connect to the database
# "roles/cloudsql.client" allows: connecting to Cloud SQL instances
# Required for the app to connect to the MySQL database
resource "google_project_iam_member" "cloud_run_sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${data.google_service_account.cloud_run_service.email}"
}
