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

variable "custom_domain" {
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