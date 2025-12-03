# ==============================================================================
# CLOUD SQL DATABASE (MySQL)
# ==============================================================================
# Shared MySQL database instance across all environments
# Each environment creates this resource, but only the first apply actually creates it
# Subsequent environments will reference the existing instance (Terraform handles this)
#
# IMPORTANT: Database credentials should be stored in Google Secret Manager
# and accessed via environment variables in Cloud Run
# ==============================================================================

# Cloud SQL database instance
# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/sql_database_instance
resource "google_sql_database_instance" "mysql" {
  name             = var.sql_instance_name
  database_version = var.sql_database_version
  region           = var.region

  settings {
    tier              = var.sql_tier
    availability_type = "ZONAL"
    disk_type         = "PD_SSD"
    disk_size         = var.sql_disk_size

    backup_configuration {
      enabled            = true
      start_time         = "03:00"
      binary_log_enabled = true
    }

    ip_configuration {
      ipv4_enabled = true
      # SECURITY NOTE: authorized_networks should be restricted in production
      # Consider using Cloud SQL Proxy or Private IP for better security
      authorized_networks {
        name  = "allow-all"
        value = "0.0.0.0/0"
      }
    }
  }

  deletion_protection = true # Prevent accidental deletion

  # Prevent recreation if resource already exists
  # This allows multiple environments to "manage" the same SQL instance
  lifecycle {
    prevent_destroy = true
  }
}
