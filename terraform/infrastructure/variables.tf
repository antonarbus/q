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
# CLOUD RUN - FRONTEND
# ==============================================================================

variable "cloud_run_service_name_frontend" {
  description = "Name of the Cloud Run service for frontend"
  type        = string
  # This is the name of your frontend running application
  # Will appear in Google Cloud Console and URLs
  # Value provided by config/*.tfvars file
}

variable "docker_image_name_frontend" {
  description = "Name of the Docker image in Artifact Registry for frontend"
  type        = string
  # The name for your frontend Docker image
  # Full path will be: REGION-docker.pkg.dev/PROJECT/REGISTRY/IMAGE:TAG
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# CLOUD RUN - BACKEND
# ==============================================================================

variable "cloud_run_service_name_backend" {
  description = "Name of the Cloud Run service for backend"
  type        = string
  # This is the name of your backend running application
  # Will appear in Google Cloud Console and URLs
  # Value provided by config/*.tfvars file
}

variable "docker_image_name_backend" {
  description = "Name of the Docker image in Artifact Registry for backend"
  type        = string
  # The name for your backend Docker image
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
# SCALING & PERFORMANCE - FRONTEND
# ==============================================================================

variable "min_instances_frontend" {
  description = "Minimum number of Cloud Run instances to keep running for frontend"
  type        = number
  # 0 = Scale to zero when idle (saves money, but first request is slower)
  # 1+ = Keep instances warm (faster response, but costs money even when idle)
  # For production with traffic: consider 1-2 min instances
  # Value provided by config/*.tfvars file
}

variable "max_instances_frontend" {
  description = "Maximum number of Cloud Run instances allowed for frontend"
  type        = number
  # Prevents runaway costs if you get sudden traffic spike
  # Each instance handles ~80 concurrent requests by default
  # Adjust based on expected traffic
  # Value provided by config/*.tfvars file
}

variable "cpu_limit_frontend" {
  description = "CPU limit for each Cloud Run container for frontend"
  type        = string
  # Options: "1" (1 CPU), "2" (2 CPUs), "4" (4 CPUs), "8" (8 CPUs)
  # More CPU = faster processing but higher cost
  # 1 CPU is good for most web apps
  # Pricing: https://cloud.google.com/run/pricing
  # Value provided by config/*.tfvars file
}

variable "memory_limit_frontend" {
  description = "Memory limit for each Cloud Run container for frontend"
  type        = string
  # Options: 128Mi, 256Mi, 512Mi, 1Gi, 2Gi, 4Gi, 8Gi, 16Gi, 32Gi
  # Mi = Mebibytes, Gi = Gibibytes
  # More memory = can handle larger requests but higher cost
  # 512Mi is good for small/medium apps
  # Monitor actual usage in Cloud Console to optimize
  # Value provided by config/*.tfvars file
}

variable "container_port_frontend" {
  description = "Port that the frontend container listens on for HTTP requests"
  type        = number
  # Your application must listen on this port
  # Cloud Run forwards HTTP/HTTPS traffic to this port
  # Common values: 8080, 3000, 8000
  # Must match the port your app uses (check your Dockerfile)
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# SCALING & PERFORMANCE - BACKEND
# ==============================================================================

variable "min_instances_backend" {
  description = "Minimum number of Cloud Run instances to keep running for backend"
  type        = number
  # Value provided by config/*.tfvars file
}

variable "max_instances_backend" {
  description = "Maximum number of Cloud Run instances allowed for backend"
  type        = number
  # Value provided by config/*.tfvars file
}

variable "cpu_limit_backend" {
  description = "CPU limit for each Cloud Run container for backend"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "memory_limit_backend" {
  description = "Memory limit for each Cloud Run container for backend"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "container_port_backend" {
  description = "Port that the backend container listens on for HTTP requests"
  type        = number
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# CUSTOM DOMAIN
# ==============================================================================

variable "custom_domain_frontend" {
  description = "Custom domain name to map to the frontend Cloud Run service"
  type        = string
  # Your domain name (without www or https://)
  # After Terraform creates the mapping, you need to:
  # 1. Go to Cloud Run > Manage custom domains in Google Cloud Console
  # 2. Copy the DNS records shown
  # 3. Add them to your domain registrar (GoDaddy, Namecheap, etc.)
  # Value provided by config/*.tfvars file
}

variable "custom_domain_backend" {
  description = "Custom domain name to map to the backend Cloud Run service"
  type        = string
  # Your API domain name (without www or https://)
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
# CLOUD SQL DATABASE (OPTIONAL - currently using MongoDB)
# ==============================================================================
# Uncomment these when migrating from MongoDB to Cloud SQL

# variable "sql_instance_name" {
#   description = "Name of the Cloud SQL instance"
#   type        = string
#   # Shared instance name across all environments
#   # Value provided by config/*.tfvars file
# }

# variable "sql_database_version" {
#   description = "MySQL database version"
#   type        = string
#   # Example: MYSQL_8_4, MYSQL_8_0
#   # Value provided by config/*.tfvars file
# }

# variable "sql_tier" {
#   description = "Machine tier for Cloud SQL instance"
#   type        = string
#   # Example: db-f1-micro, db-n1-standard-1
#   # Value provided by config/*.tfvars file
# }

# variable "sql_disk_size" {
#   description = "Disk size in GB for Cloud SQL instance"
#   type        = number
#   # Minimum: 10 GB
#   # Value provided by config/*.tfvars file
# }

variable "github_repository" {
  description = "GitHub repository in format 'owner/repo' - not used in infrastructure but prevents warnings"
  type        = string
  default     = null
}

# ==============================================================================
# STORAGE BUCKET
# ==============================================================================

variable "storage_bucket_name" {
  description = "Name of the GCS bucket for application file storage"
  type        = string
  # This is a SHARED bucket across all environments
  # The bucket stores user-uploaded files (quotations, bookmarks, etc.)
  # Value provided by config/*.tfvars file
}

variable "storage_bucket_location" {
  description = "Location for the storage bucket (e.g., US, EU, us-central1)"
  type        = string
  # Multi-region locations (US, EU, ASIA) offer highest availability
  # Single-region locations offer lowest latency and cost
  # Value provided by config/*.tfvars file
}

variable "storage_bucket_cors_origins" {
  description = "List of allowed CORS origins for the storage bucket"
  type        = list(string)
  # Origins that are allowed to upload/download files from the bucket
  # Should include all your frontend domains
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# NEON POSTGRESQL DATABASE
# ==============================================================================

variable "neon_api_key" {
  description = "Neon API key for authentication"
  type        = string
  sensitive   = true
  # Value provided by config/*.tfvars file (from secrets.ts)
}

variable "neon_project_id" {
  description = "Neon project ID (existing shared project across all environments)"
  type        = string
  # This is the ID of the existing Neon project that all environments share
  # The project itself is managed outside of per-environment Terraform states
  # Value provided by config/*.tfvars file
}

variable "neon_org_id" {
  description = "Neon organization ID"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "neon_project_name" {
  description = "Name of the shared Neon project (for reference only, not used to create project)"
  type        = string
  # This variable is kept for documentation purposes
  # The actual project is referenced by neon_project_id
  # Value provided by config/*.tfvars file
}

variable "neon_region" {
  description = "Neon region for the PostgreSQL database"
  type        = string
  # Neon regions: aws-us-east-1, aws-us-east-2, aws-us-west-2,
  #               aws-eu-central-1, aws-ap-southeast-1, etc.
  # Choose a region close to your Cloud Run services for low latency
  # Full list: https://neon.tech/docs/introduction/regions
  # Value provided by config/*.tfvars file
}

variable "neon_pg_version" {
  description = "PostgreSQL version for Neon database"
  type        = string
  # Options: "14", "15", "16", "17"
  # Recommended: "16" (latest stable)
  # Value provided by config/*.tfvars file
  default = "16"
}

variable "neon_database_name" {
  description = "Name of the PostgreSQL database within the Neon project (environment-specific)"
  type        = string
  # Each environment creates its own database:
  # - dev: "dev"
  # - test: "test"
  # - prod: "prod" (shared with pilot)
  # Value provided by config/*.tfvars file
}

variable "neon_min_cu" {
  description = "Minimum compute units for Neon autoscaling"
  type        = number
  # Compute Units (CU): 1 CU = 1 vCPU + 4GB RAM
  # Minimum: 0.25 (good for dev/test)
  # For production: consider 0.5 or higher
  # Value provided by config/*.tfvars file
  default = 0.25
}

variable "neon_max_cu" {
  description = "Maximum compute units for Neon autoscaling"
  type        = number
  # Maximum CU determines the upper scaling limit
  # Dev/Test: 1-2 CU
  # Production: 2-4 CU or higher based on load
  # Value provided by config/*.tfvars file
  default = 1
}
