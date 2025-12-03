# ==============================================================================
# BOOTSTRAP: TERRAFORM CONFIGURATION
# ==============================================================================
# This is a one-time setup to create shared infrastructure resources
#
# USAGE:
#   cd bootstrap/
#   terraform init
#   terraform apply -var-file="../../config/prod.tfvars"
#
# After bootstrap is complete, you rarely need to run this again unless
# you want to modify shared infrastructure (state bucket, service accounts, etc.)

terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # No backend configuration - uses local state
  # This is intentional for bootstrap
}

provider "google" {
  project = var.project_id
  region  = var.region
}
