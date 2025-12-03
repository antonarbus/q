import { $ } from 'bun'

export const getCurrentGitBranchName = async (): Promise<string> => {
  // In GitHub Actions, use GITHUB_REF_NAME
  if (process.env.GITHUB_REF_NAME) {
    return process.env.GITHUB_REF_NAME
  }

  // Otherwise use git command
  const result = await $`git rev-parse --abbrev-ref HEAD`.text()
  return result.trim()
}
