# ==============================================================================
# ARTIFACT REGISTRY (SHARED)
# ==============================================================================
# Single Docker registry shared by all environments
# Images are tagged per environment: web-app:dev, web-app:test, web-app:pilot, web-app:prod
# This enables image promotion without cross-registry copying
#
# Each environment manages this resource, but only the first apply actually creates it
# Subsequent environments will reference the existing registry (Terraform handles this)

resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region
  repository_id = var.artifact_registry_name
  description   = "Shared Docker repository for all environments (dev, test, pilot, prod)"
  format        = "DOCKER"

  # Cleanup policy: automatically delete old, unused images to save storage costs
  cleanup_policies {
    id     = "delete-old-untagged-images"
    action = "DELETE"
    condition {
      tag_state  = "UNTAGGED"
      older_than = "2592000s" # 30 days
    }
  }

  # Keep tagged images longer (they're promoted releases)
  cleanup_policies {
    id     = "keep-tagged-images"
    action = "KEEP"
    condition {
      tag_state = "TAGGED"
    }
  }

  # Prevent recreation if resource already exists
  # This allows multiple environments to "manage" the same registry
  lifecycle {
    prevent_destroy = true
  }
}
