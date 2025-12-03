# ==============================================================================
# TERRAFORM VARIABLES
# ==============================================================================
#
# Actual values are taken config/*.tfvars files (single source of truth) and added with 'var-file' with command
# `terraform apply -auto-approve -var-file="$CONFIG_PATH"` at `terraform.sh` script

# ==============================================================================
# PROJECT & REGION
# ==============================================================================

variable "project_id" {
  description = "The GCP project ID where all resources will be created"
  type        = string
  # This is your Google Cloud project name
  # Find it in: https://console.cloud.google.com/ (top dropdown)
  # Value provided by config/*.tfvars file
}

variable "region" {
  description = "The GCP region where resources will be deployed"
  type        = string
  # Regions are physical locations of data centers
  # us-central1 = Iowa, USA (good for North America)
  # Other options: europe-west1 (Belgium), asia-northeast1 (Tokyo)
  # List: https://cloud.google.com/about/locations
  # Value provided by config/*.tfvars file
}

variable "bucket_for_terraform_state_name" {
  description = "Name of the GCS bucket for Terraform state (created by bootstrap)"
  type        = string
  # This variable is not used by infrastructure module, only by bootstrap
  # It's declared here to avoid warnings when using shared tfvars files
  # Value provided by config/*.tfvars file
}

variable "project_number" {
  description = "The GCP project number (numeric ID)"
  type        = string
  # This variable is not used by infrastructure module, only by GitHub Actions
  # It's declared here to avoid warnings when using shared tfvars files
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# ARTIFACT REGISTRY
# ==============================================================================

variable "artifact_registry_name" {
  description = "Name of the Artifact Registry repository for Docker images"
  type        = string
  # This is where your Docker images are stored
  # Must be lowercase, hyphens allowed, no underscores
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# CLOUD RUN
# ==============================================================================

variable "cloud_run_service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  # This is the name of your running application
  # Will appear in Google Cloud Console and URLs
  # Value provided by config/*.tfvars file
}

variable "docker_image_name" {
  description = "Name of the Docker image in Artifact Registry"
  type        = string
  # The name for your Docker image
  # Full path will be: REGION-docker.pkg.dev/PROJECT/REGISTRY/IMAGE:TAG
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# SERVICE ACCOUNTS
# ==============================================================================
# Service accounts are like "robot users" that services use to authenticate

variable "github_actions_sa_name" {
  description = "Name of the service account used by GitHub Actions for deployments"
  type        = string
  # This service account is used by your CI/CD pipeline (GitHub Actions)
  # It needs permissions to push Docker images and deploy to Cloud Run
  # Value provided by config/*.tfvars file
}

variable "cloud_run_sa_name" {
  description = "Name of the service account used by the Cloud Run service"
  type        = string
  # This service account is used BY your running app
  # It determines what Google Cloud APIs your app can access
  # Best practice: give it only the permissions your app needs
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# SCALING & PERFORMANCE
# ==============================================================================

variable "min_instances" {
  description = "Minimum number of Cloud Run instances to keep running"
  type        = number
  # 0 = Scale to zero when idle (saves money, but first request is slower)
  # 1+ = Keep instances warm (faster response, but costs money even when idle)
  # For production with traffic: consider 1-2 min instances
  # Value provided by config/*.tfvars file
}

variable "max_instances" {
  description = "Maximum number of Cloud Run instances allowed"
  type        = number
  # Prevents runaway costs if you get sudden traffic spike
  # Each instance handles ~80 concurrent requests by default
  # Adjust based on expected traffic
  # Value provided by config/*.tfvars file
}

variable "cpu_limit" {
  description = "CPU limit for each Cloud Run container"
  type        = string
  # Options: "1" (1 CPU), "2" (2 CPUs), "4" (4 CPUs), "8" (8 CPUs)
  # More CPU = faster processing but higher cost
  # 1 CPU is good for most web apps
  # Pricing: https://cloud.google.com/run/pricing
  # Value provided by config/*.tfvars file
}

variable "memory_limit" {
  description = "Memory limit for each Cloud Run container"
  type        = string
  # Options: 128Mi, 256Mi, 512Mi, 1Gi, 2Gi, 4Gi, 8Gi, 16Gi, 32Gi
  # Mi = Mebibytes, Gi = Gibibytes
  # More memory = can handle larger requests but higher cost
  # 512Mi is good for small/medium apps
  # Monitor actual usage in Cloud Console to optimize
  # Value provided by config/*.tfvars file
}

variable "container_port" {
  description = "Port that the container listens on for HTTP requests"
  type        = number
  # Your application must listen on this port
  # Cloud Run forwards HTTP/HTTPS traffic to this port
  # Common values: 8080, 3000, 8000
  # Must match the port your app uses (check your Dockerfile)
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# CUSTOM DOMAIN
# ==============================================================================

variable "custom_domain" {
  description = "Custom domain name to map to the Cloud Run service"
  type        = string
  # Your domain name (without www or https://)
  # After Terraform creates the mapping, you need to:
  # 1. Go to Cloud Run > Manage custom domains in Google Cloud Console
  # 2. Copy the DNS records shown
  # 3. Add them to your domain registrar (GoDaddy, Namecheap, etc.)
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# ENVIRONMENT
# ==============================================================================

variable "environment" {
  description = "Environment name (dev, test, pilot, prod)"
  type        = string
  # Used for labels and tracking which environment resources belong to
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# CLOUD SQL DATABASE
# ==============================================================================

variable "sql_instance_name" {
  description = "Name of the Cloud SQL instance"
  type        = string
  # Shared instance name across all environments
  # Value provided by config/*.tfvars file
}

variable "sql_database_version" {
  description = "MySQL database version"
  type        = string
  # Example: MYSQL_8_4, MYSQL_8_0
  # Value provided by config/*.tfvars file
}

variable "sql_tier" {
  description = "Machine tier for Cloud SQL instance"
  type        = string
  # Example: db-f1-micro, db-n1-standard-1
  # Value provided by config/*.tfvars file
}

variable "sql_disk_size" {
  description = "Disk size in GB for Cloud SQL instance"
  type        = number
  # Minimum: 10 GB
  # Value provided by config/*.tfvars file
}

variable "github_repository" {
  description = "GitHub repository in format 'owner/repo' - not used in infrastructure but prevents warnings"
  type        = string
  default     = null
}
