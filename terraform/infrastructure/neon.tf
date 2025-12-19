# ==============================================================================
# NEON POSTGRESQL DATABASE
# ==============================================================================
# This file defines the Neon PostgreSQL database resources
#
# ARCHITECTURE:
#   - One Neon project per environment (dev/test/pilot/prod)
#   - Each project contains one PostgreSQL database
#   - Connection strings are outputted for application use
#
# For more info: https://registry.terraform.io/providers/kislerdm/neon/latest/docs

# ==============================================================================
# NEON PROJECT
# ==============================================================================
# A Neon project is a container for databases, branches, and compute resources

resource "neon_project" "main" {
  org_id = var.neon_org_id
  name   = var.neon_project_name # Shared project for all environments (free tier)

  # Region where the database will be hosted
  # Neon regions: aws-us-east-1, aws-us-east-2, aws-us-west-2,
  #               aws-eu-central-1, aws-ap-southeast-1, etc.
  region_id = var.neon_region

  # PostgreSQL version
  # Options: "14", "15", "16", "17"
  pg_version = var.neon_pg_version

  # History retention (free tier max: 21600 seconds = 6 hours)
  history_retention_seconds = 21600

  # Compute settings
  compute_provisioner = "k8s-pod"

  # Default compute size for the project
  # https://neon.tech/docs/manage/endpoints#compute-size-and-autoscaling-configuration
  default_endpoint_settings {
    autoscaling_limit_min_cu = var.neon_min_cu # Minimum compute units (0.25 = 0.25 vCPU)
    autoscaling_limit_max_cu = var.neon_max_cu # Maximum compute units (1 = 1 vCPU)
  }
}

# ==============================================================================
# NEON DATABASE
# ==============================================================================
# The actual PostgreSQL database within the project

resource "neon_database" "main" {
  project_id = neon_project.main.id
  branch_id  = neon_project.main.default_branch_id # Use the main branch
  name       = var.neon_database_name
  owner_name = neon_project.main.database_user # Use default user created with project
}

# ==============================================================================
# OUTPUTS
# ==============================================================================
# These outputs provide connection information for your application

output "neon_connection_string" {
  description = "PostgreSQL connection string for Neon database"
  value = format(
    "postgresql://%s:%s@%s/%s?sslmode=require",
    neon_project.main.database_user,
    neon_project.main.database_password,
    neon_project.main.database_host,
    var.neon_database_name
  )
  sensitive = true # Mark as sensitive to hide in logs
}

output "neon_database_host" {
  description = "Neon database host"
  value       = neon_project.main.database_host
}

output "neon_database_name" {
  description = "Neon database name"
  value       = var.neon_database_name
}

output "neon_database_user" {
  description = "Neon database user"
  value       = neon_project.main.database_user
}

output "neon_database_password" {
  description = "Neon database password"
  value       = neon_project.main.database_password
  sensitive   = true
}

output "neon_project_id" {
  description = "Neon project ID"
  value       = neon_project.main.id
}
