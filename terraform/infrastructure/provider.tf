# ==============================================================================
# TERRAFORM CONFIGURATION
# ==============================================================================
# This file defines infrastructure for the web application:
#
# ARCHITECTURE: Hybrid - Shared + Isolated Resources
#
# SHARED ACROSS ALL ENVIRONMENTS (created in bootstrap/):
#   - GCP Project
#   - GCS Bucket for Terraform state
#   - Region
#   - GitHub Actions Service Account (github-actions-sa) - shared CI/CD
#   - Cloud Run Service Account (cloud-run-sa) - shared runtime identity
#   - 6 IAM permissions for GitHub Actions SA
#   - Artifact Registry (docker-images) - single registry with per-env tags
#   - Cloud SQL Database - shared MySQL instance
#   - Google Cloud APIs
#
# PER ENVIRONMENT (dev/test/pilot/prod):
#   - Cloud Run Service (web-app-{env}) - isolated app instances
#   - Public Access IAM binding
#   - Custom Domain Mapping
#   - Separate state files (via prefix: terraform/state/{env})
#
# For first-time setup, see README.md

# https://developer.hashicorp.com/terraform/language/terraform
terraform {
  required_version = ">= 1.0"

  # https://developer.hashicorp.com/terraform/language/providers/requirements
  required_providers {
    google = {
      source  = "hashicorp/google" # Official Google Cloud provider
      version = "~> 5.0"           # Use version 5.x (any minor/patch version)
    }
  }
}

# ==============================================================================
# CHOOSE GOOGLE PROVIDER
# ==============================================================================

# Configure the Google Cloud provider with our project and region
# https://registry.terraform.io/providers/hashicorp/google/latest/docs
provider "google" {
  project = var.project_id # Which GCP project to use (from variables.tf)
  region  = var.region     # Default region for resources (from variables.tf)
}

# ==============================================================================
# NOTE: GCS BUCKET FOR TERRAFORM STATE
# ==============================================================================
# The Terraform state bucket is created separately in the bootstrap/ directory
# This infrastructure assumes the bucket already exists
