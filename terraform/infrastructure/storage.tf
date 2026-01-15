# ==============================================================================
# GOOGLE CLOUD STORAGE - APPLICATION BUCKETS
# ==============================================================================
# Storage buckets for user-uploaded files (quotations, bookmarks, files)
# Separate bucket per environment: dev, test, prod (pilot shares prod's bucket)
# Pilot skips bucket creation - prod manages the shared bucket

# Skip bucket creation for pilot (it uses prod's bucket which prod manages)
resource "google_storage_bucket" "app_bucket" {
  count    = var.environment == "pilot" ? 0 : 1
  name     = var.storage_bucket_name
  location = var.storage_bucket_location
  project  = var.project_id

  # Standard storage class for frequently accessed files
  storage_class = "STANDARD"

  # Prevent accidental deletion in production
  force_destroy = false

  # CORS configuration for browser uploads
  cors {
    origin          = var.storage_bucket_cors_origins
    method          = ["GET", "POST", "PUT"]
    response_header = ["Content-Type", "x-goog-content-length-range"]
    max_age_seconds = 3600
  }

  # Fine-grained ACL control (uniform_bucket_level_access = false)
  # This allows per-object ACLs for flexible file permissions
  uniform_bucket_level_access = false

  # Public access prevention inherited from project settings
  public_access_prevention = "inherited"

  # Lifecycle rules to manage storage costs
  # Uncomment when you want to add lifecycle rules for old files
  # lifecycle_rule {
  #   condition {
  #     age = 365  # Delete files older than 1 year
  #   }
  #   action {
  #     type = "Delete"
  #   }
  # }

  # Versioning disabled to save storage costs
  # Enable if you need version history for uploaded files
  versioning {
    enabled = false
  }

  labels = {
    managed-by  = "terraform"
    purpose     = "application-storage"
    environment = var.environment
  }
}

# ==============================================================================
# IAM PERMISSIONS - CLOUD RUN SERVICE ACCOUNT
# ==============================================================================
# Grant the Cloud Run service account permissions to manage files in this bucket

# Allow Cloud Run to read files
resource "google_storage_bucket_iam_member" "app_bucket_object_viewer" {
  count  = var.environment == "pilot" ? 0 : 1
  bucket = google_storage_bucket.app_bucket[0].name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${data.google_service_account.cloud_run_service.email}"
}

# Allow Cloud Run to create and update files
resource "google_storage_bucket_iam_member" "app_bucket_object_creator" {
  count  = var.environment == "pilot" ? 0 : 1
  bucket = google_storage_bucket.app_bucket[0].name
  role   = "roles/storage.objectCreator"
  member = "serviceAccount:${data.google_service_account.cloud_run_service.email}"
}

# Allow Cloud Run to delete files
resource "google_storage_bucket_iam_member" "app_bucket_object_admin" {
  count  = var.environment == "pilot" ? 0 : 1
  bucket = google_storage_bucket.app_bucket[0].name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${data.google_service_account.cloud_run_service.email}"
}

# ==============================================================================
# IAM PERMISSIONS - GITHUB ACTIONS SERVICE ACCOUNT
# ==============================================================================
# Grant GitHub Actions permission to view bucket configuration
# This allows Terraform to read and manage the bucket during CI/CD

resource "google_storage_bucket_iam_member" "github_actions_bucket_viewer" {
  count  = var.environment == "pilot" ? 0 : 1
  bucket = google_storage_bucket.app_bucket[0].name
  role   = "roles/storage.legacyBucketReader"
  member = "serviceAccount:${data.google_service_account.github_actions.email}"
}
