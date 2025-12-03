# ==============================================================================
# ENABLE PROJECT-SPECIFIC GOOGLE CLOUD APIS
# ==============================================================================
# These are application-specific APIs for your project features
# Infrastructure-level APIs (IAM, Storage, Cloud Run) are in bootstrap/
#
# Note: This app uses MongoDB Atlas (external) - no Cloud SQL needed
# Note: This app doesn't use Google Translation or Text-to-Speech APIs

# No additional APIs needed beyond what's in bootstrap/
# If you add features requiring Google APIs in the future, add them here
# Examples:
# - "sqladmin.googleapis.com"     # For Cloud SQL
# - "translate.googleapis.com"    # For Translation API
# - "texttospeech.googleapis.com" # For Text-to-Speech API
# - "cloudtasks.googleapis.com"   # For Cloud Tasks (job queues)
# - "secretmanager.googleapis.com" # For Secret Manager

resource "google_project_service" "project_services" {
  for_each = toset([
    # Add any project-specific APIs here
    # Currently none needed - using MongoDB Atlas and no Google AI services
  ])

  project            = var.project_id
  service            = each.key
  disable_on_destroy = false
}
