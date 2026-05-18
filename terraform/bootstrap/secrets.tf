# ==============================================================================
# SECRET MANAGER - SHARED SECRETS
# ==============================================================================
# All secrets are stored in Google Cloud Secret Manager
# Shared across ALL environments (dev, test, pilot, prod)
#
# WHY IN BOOTSTRAP?
# - Secrets are singleton resources (one per project)
# - Multiple environments would conflict if trying to create the same secret
# - Bootstrap runs once, infrastructure runs per environment
# ==============================================================================

# ==============================================================================
# JWT SECRETS
# ==============================================================================

resource "google_secret_manager_secret" "jwt_access" {
  secret_id = "JWT_ACCESS_SECRET"

  labels = {
    managed-by = "terraform"
    purpose    = "authentication"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "jwt_refresh" {
  secret_id = "JWT_REFRESH_SECRET"

  labels = {
    managed-by = "terraform"
    purpose    = "authentication"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

# ==============================================================================
# EMAIL SERVICE
# ==============================================================================

resource "google_secret_manager_secret" "mailersend_api_key" {
  secret_id = "MAILERSEND_API_KEY"

  labels = {
    managed-by = "terraform"
    purpose    = "email"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

# ==============================================================================
# NEON POSTGRESQL
# ==============================================================================

resource "google_secret_manager_secret" "neon_api_key" {
  secret_id = "NEON_API_KEY"

  labels = {
    managed-by = "terraform"
    purpose    = "database"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

# Database URLs per environment
resource "google_secret_manager_secret" "neon_database_url_dev" {
  secret_id = "NEON_DATABASE_URL_DEV"

  labels = {
    managed-by  = "terraform"
    purpose     = "database"
    environment = "dev"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "neon_database_url_test" {
  secret_id = "NEON_DATABASE_URL_TEST"

  labels = {
    managed-by  = "terraform"
    purpose     = "database"
    environment = "test"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "neon_database_url_prod" {
  secret_id = "NEON_DATABASE_URL_PROD"

  labels = {
    managed-by  = "terraform"
    purpose     = "database"
    environment = "prod"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

# ==============================================================================
# GOOGLE CLOUD SERVICE ACCOUNT
# ==============================================================================

resource "google_secret_manager_secret" "gcp_private_key_id" {
  secret_id = "GOOGLE_CLOUD_PROJECT_PRIVATE_KEY_ID"

  labels = {
    managed-by = "terraform"
    purpose    = "cloud-storage"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "gcp_private_key" {
  secret_id = "GOOGLE_CLOUD_PROJECT_PRIVATE_KEY"

  labels = {
    managed-by = "terraform"
    purpose    = "cloud-storage"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

# ==============================================================================
# IAM - GRANT CLOUD RUN ACCESS TO SECRETS
# ==============================================================================
# Cloud Run service account needs permission to read secrets at runtime

resource "google_secret_manager_secret_iam_member" "jwt_access" {
  secret_id = google_secret_manager_secret.jwt_access.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "jwt_refresh" {
  secret_id = google_secret_manager_secret.jwt_refresh.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "mailersend_api_key" {
  secret_id = google_secret_manager_secret.mailersend_api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "neon_api_key" {
  secret_id = google_secret_manager_secret.neon_api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

# GitHub Actions SA needs access to NEON_API_KEY for Terraform to configure Neon provider
resource "google_secret_manager_secret_iam_member" "neon_api_key_github_actions" {
  secret_id = google_secret_manager_secret.neon_api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_secret_manager_secret_iam_member" "neon_api_key_github_actions_viewer" {
  secret_id = google_secret_manager_secret.neon_api_key.id
  role      = "roles/secretmanager.viewer"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}

# ==============================================================================
# IAM - GRANT GITHUB ACTIONS ACCESS TO SECRETS (FOR CI/CD)
# ==============================================================================
# GitHub Actions needs access to secrets for e2e tests and code quality checks
# that load config files which trigger Secret Manager access

resource "google_secret_manager_secret_iam_member" "neon_database_url_dev_github_actions" {
  secret_id = google_secret_manager_secret.neon_database_url_dev.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_secret_manager_secret_iam_member" "jwt_access_github_actions" {
  secret_id = google_secret_manager_secret.jwt_access.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_secret_manager_secret_iam_member" "jwt_refresh_github_actions" {
  secret_id = google_secret_manager_secret.jwt_refresh.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_secret_manager_secret_iam_member" "neon_database_url_dev" {
  secret_id = google_secret_manager_secret.neon_database_url_dev.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "neon_database_url_test" {
  secret_id = google_secret_manager_secret.neon_database_url_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "neon_database_url_prod" {
  secret_id = google_secret_manager_secret.neon_database_url_prod.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "gcp_private_key_id" {
  secret_id = google_secret_manager_secret.gcp_private_key_id.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "gcp_private_key" {
  secret_id = google_secret_manager_secret.gcp_private_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

# ==============================================================================
# AI / GEMINI
# ==============================================================================

resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = "GEMINI_API_KEY"

  labels = {
    managed-by = "terraform"
    purpose    = "ai"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret_iam_member" "gemini_api_key" {
  secret_id = google_secret_manager_secret.gemini_api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

# ==============================================================================
# STRIPE
# ==============================================================================

resource "google_secret_manager_secret" "stripe_secret_key_test" {
  secret_id = "STRIPE_SECRET_KEY_TEST"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_secret_key_live" {
  secret_id = "STRIPE_SECRET_KEY_LIVE"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_client_id_test" {
  secret_id = "STRIPE_CLIENT_ID_TEST"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_client_id_live" {
  secret_id = "STRIPE_CLIENT_ID_LIVE"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_connected_accounts_secret_dev" {
  secret_id = "STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_DEV"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "dev"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_connected_accounts_secret_test" {
  secret_id = "STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_TEST"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "test"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_connected_accounts_secret_pilot" {
  secret_id = "STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_PILOT"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "pilot"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_connected_accounts_secret_live" {
  secret_id = "STRIPE_WEBHOOK_CONNECTED_ACCOUNTS_SECRET_LIVE"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "prod"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret_iam_member" "stripe_secret_key_test" {
  secret_id = google_secret_manager_secret.stripe_secret_key_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_secret_key_live" {
  secret_id = google_secret_manager_secret.stripe_secret_key_live.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_client_id_test" {
  secret_id = google_secret_manager_secret.stripe_client_id_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_client_id_live" {
  secret_id = google_secret_manager_secret.stripe_client_id_live.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_connected_accounts_secret_dev" {
  secret_id = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_dev.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_connected_accounts_secret_test" {
  secret_id = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_connected_accounts_secret_pilot" {
  secret_id = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_pilot.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_connected_accounts_secret_live" {
  secret_id = google_secret_manager_secret.stripe_webhook_connected_accounts_secret_live.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

# "Your account" scope webhook secrets — one per environment (separate Stripe destination)
# Stripe does not allow a single endpoint to cover both scopes, so each URL has two destinations.
# dev uses the same secret as the connected-account destination (stripe listen covers all events locally).

resource "google_secret_manager_secret" "stripe_webhook_your_account_secret_dev" {
  secret_id = "STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_DEV"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "dev"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_your_account_secret_test" {
  secret_id = "STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_TEST"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "test"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_your_account_secret_pilot" {
  secret_id = "STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_PILOT"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "pilot"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_webhook_your_account_secret_live" {
  secret_id = "STRIPE_WEBHOOK_YOUR_ACCOUNT_SECRET_LIVE"

  labels = {
    managed-by  = "terraform"
    purpose     = "stripe"
    environment = "prod"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_your_account_secret_dev" {
  secret_id = google_secret_manager_secret.stripe_webhook_your_account_secret_dev.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_your_account_secret_test" {
  secret_id = google_secret_manager_secret.stripe_webhook_your_account_secret_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_your_account_secret_pilot" {
  secret_id = google_secret_manager_secret.stripe_webhook_your_account_secret_pilot.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_webhook_your_account_secret_live" {
  secret_id = google_secret_manager_secret.stripe_webhook_your_account_secret_live.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret" "stripe_subscription_price_id_annual_test" {
  secret_id = "STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_TEST"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret" "stripe_subscription_price_id_annual_live" {
  secret_id = "STRIPE_SUBSCRIPTION_PRICE_ID_ANNUAL_LIVE"

  labels = {
    managed-by = "terraform"
    purpose    = "stripe"
  }

  replication {
    auto {}
  }

  depends_on = [google_project_service.required_services]
}

resource "google_secret_manager_secret_iam_member" "stripe_subscription_price_id_annual_test" {
  secret_id = google_secret_manager_secret.stripe_subscription_price_id_annual_test.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}

resource "google_secret_manager_secret_iam_member" "stripe_subscription_price_id_annual_live" {
  secret_id = google_secret_manager_secret.stripe_subscription_price_id_annual_live.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run_service.email}"
}
