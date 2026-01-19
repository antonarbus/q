# ==============================================================================
# BOOTSTRAP VARIABLES
# ==============================================================================
#
# Actual values are taken config/*.tfvars files (single source of truth) and added with 'var-file' with command
# `terraform apply -auto-approve -var-file="$CONFIG_PATH"` at `terraform.sh` script

# ==============================================================================
# PROJECT & REGION
# ==============================================================================

variable "project_id" {
  description = "The GCP project ID"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "region" {
  description = "The GCP region"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# BUCKET
# ==============================================================================

variable "bucket_for_terraform_state_name" {
  description = "Name of the GCS bucket for Terraform state"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# SERVICE ACCOUNTS
# ==============================================================================

variable "github_actions_sa_name" {
  description = "Name of the service account used by GitHub Actions for deployments"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "cloud_run_sa_name" {
  description = "Name of the service account used by the Cloud Run service"
  type        = string
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# ARTIFACT REGISTRY (SHARED)
# ==============================================================================

variable "artifact_registry_name" {
  description = "Name of the shared Artifact Registry repository for Docker images"
  type        = string
  # Single registry for all environments (dev, test, pilot, prod)
  # Images differentiated by tags: web-app:dev, web-app:test, etc.
  # Value provided by config/*.tfvars file
}

# ==============================================================================
# UNUSED VARIABLES (from shared tfvars)
# ==============================================================================
# These variables exist in the shared config/*.tfvars files but are not used
# in the bootstrap module. Declaring them here prevents Terraform warnings.

variable "cloud_run_service_name" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "docker_image_name" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "min_instances" {
  description = "Not used in bootstrap module"
  type        = number
  default     = null
}

variable "max_instances" {
  description = "Not used in bootstrap module"
  type        = number
  default     = null
}

variable "cpu_limit" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "memory_limit" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "container_port" {
  description = "Not used in bootstrap module"
  type        = number
  default     = null
}

variable "domain" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "project_number" {
  description = "Not used in bootstrap module"
  type        = string
  default     = null
}

variable "github_repository" {
  description = "GitHub repository in format 'owner/repo' for Workload Identity Federation"
  type        = string
  # Value provided by config/*.tfvars file
}

variable "environment" {
  description = "Environment name (dev, test, pilot, prod) - not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "gcp_service_account_type" {
  description = "GCP service account type - not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "gcp_service_account_client_email" {
  description = "GCP service account client email - not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "gcp_service_account_client_id" {
  description = "GCP service account client ID - not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "gcp_service_account_token_url" {
  description = "GCP service account token URL - not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_org_id" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_project_id" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_project_name" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_region" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_pg_version" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_min_cu" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_max_cu" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "neon_database_name" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "storage_bucket_name" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "storage_bucket_location" {
  description = "Not used in bootstrap but prevents warnings"
  type        = string
  default     = null
}

variable "storage_bucket_cors_origins" {
  description = "Not used in bootstrap but prevents warnings"
  type        = list(string)
  default     = null
}

