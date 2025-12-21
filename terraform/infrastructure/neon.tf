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
# NEON PROJECT (DATA SOURCE)
# ==============================================================================
# Reference the existing shared Neon project across all environments
# The project itself is NOT managed by this Terraform state
# Each environment state only manages its own database within this project

data "neon_project" "main" {
  id = var.neon_project_id
}

# ==============================================================================
# NEON DATABASE
# ==============================================================================
# Each environment manages its own database within the shared project
# - dev environment: creates "dev" database
# - test environment: creates "test" database
# - prod environment: creates "prod" database
# - pilot environment: shares "prod" database (no separate database created)

resource "neon_database" "main" {
  project_id = data.neon_project.main.id
  branch_id  = data.neon_project.main.default_branch_id # Use the main branch
  name       = var.neon_database_name
  owner_name = data.neon_project.main.database_user # Use default user created with project
}

# ==============================================================================
# OUTPUTS
# ==============================================================================
# These outputs provide connection information for your application

output "neon_connection_string" {
  description = "PostgreSQL connection string for Neon database"
  value = format(
    "postgresql://%s:%s@%s/%s?sslmode=require",
    data.neon_project.main.database_user,
    data.neon_project.main.database_password,
    data.neon_project.main.database_host,
    var.neon_database_name
  )
  sensitive = true # Mark as sensitive to hide in logs
}

output "neon_database_host" {
  description = "Neon database host"
  value       = data.neon_project.main.database_host
}

output "neon_database_name" {
  description = "Neon database name"
  value       = var.neon_database_name
}

output "neon_database_user" {
  description = "Neon database user"
  value       = data.neon_project.main.database_user
}

output "neon_database_password" {
  description = "Neon database password"
  value       = data.neon_project.main.database_password
  sensitive   = true
}

output "neon_project_id" {
  description = "Neon project ID"
  value       = data.neon_project.main.id
}
