# GCS backend for storing Terraform state remotely
# https://developer.hashicorp.com/terraform/language/backend/gcs
#
# WHY IS THIS BLOCK EMPTY?
# ------------------------
# The backend configuration is intentionally left empty and provided via CLI flags.
# This enables the smart bootstrap process in terraform.sh:
#
# 1. terraform.sh checks if the state bucket exists
# 2. If NOT exists → runs bootstrap/ to create it (uses local state)
# 3. If exists → initializes infrastructure/ with remote backend (via CLI flags)
#
# This solves the chicken-and-egg problem:
# - You can't init with a remote backend if the bucket doesn't exist yet
# - You need Terraform to create the bucket
# - Solution: Bootstrap creates bucket with local state, then infrastructure uses remote
#
# AUTOMATIC USAGE (via terraform.sh at deploy.yml):
#   ./terraform.sh   # Handles bootstrap automatically!
#
# MANUAL USAGE:
#   terraform init \
#     -backend-config=bucket=antonarbus-terraform-state \
#     -backend-config=prefix=terraform/state
#

terraform {
  backend "gcs" {}
}
