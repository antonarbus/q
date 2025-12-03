# ==============================================================================
# ENABLE PROJECT-SPECIFIC GOOGLE CLOUD APIS
# ==============================================================================
# These are application-specific APIs for your project features
# Infrastructure-level APIs (IAM, Storage, Cloud Run) are in bootstrap/

resource "google_project_service" "project_services" {
  for_each = toset([
    "sqladmin.googleapis.com",     # Required for Cloud SQL database management
    "translate.googleapis.com",    # Required for Google Translation API
    "texttospeech.googleapis.com", # Required for Google Text-to-Speech API
  ])

  project            = var.project_id
  service            = each.key
  disable_on_destroy = false # Keep APIs enabled even if this resource is destroyed
}
