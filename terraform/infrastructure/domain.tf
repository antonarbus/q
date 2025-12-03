# ==============================================================================
# DOMAIN VERIFICATION FOR SERVICE ACCOUNT
# ==============================================================================
# IMPORTANT: One-time manual setup required!
#
# Before domain mappings can be created automatically, the GitHub Actions
# service account must be added as a verified owner of your domain.
#
# This is a ONE-TIME setup that enables all environments (dev, test, pilot, prod).
#
# Setup instructions: See README.md - Domain Verification section
#
# Quick steps:
#   1. Go to https://search.google.com/search-console
#   2. Select your domain property
#   3. Settings → Users and permissions → Add user
#   4. Add: github-actions-sa@{PROJECT_ID}.iam.gserviceaccount.com
#   5. Grant Owner permission
#
# After this setup, all automated domain mappings will work.
# ==============================================================================

# ==============================================================================
# CUSTOM DOMAIN MAPPING
# ==============================================================================
# Maps your custom domain to the Cloud Run service
# Automatically provisions SSL certificate

# Cloud Run domain mapping (v1 API)
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_domain_mapping
resource "google_cloud_run_domain_mapping" "main" {
  name     = var.custom_domain # Custom domain from config (e.g., "antonarbus.com", "dev.antonarbus.com")
  location = var.region        # Same region as Cloud Run service

  # Project namespace
  metadata {
    namespace = var.project_id
  }

  # Which Cloud Run service this domain points to
  spec {
    route_name = google_cloud_run_v2_service.main.name
  }
}
