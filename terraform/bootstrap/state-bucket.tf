# ==============================================================================
# TERRAFORM STATE BUCKET
# ==============================================================================
# GCS bucket for storing Terraform state remotely
# This is created once in bootstrap and used by all environments

resource "google_storage_bucket" "terraform_state" {
  name          = var.bucket_for_terraform_state_name
  location      = var.region
  project       = var.project_id
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      num_newer_versions = 10
    }
  }

  labels = {
    purpose     = "terraform-state"
    managed_by  = "terraform"
    environment = "production"
  }
}
