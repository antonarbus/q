import process, { $ } from 'bun'

export const getCurrentGitBranchName = async (): Promise<string> => {
  // In GitHub Actions, use GITHUB_REF_NAME
  if (process.env.GITHUB_REF_NAME !== undefined) {
    return process.env.GITHUB_REF_NAME
  }

  // Otherwise use git command
  const result = await $`git rev-parse --abbrev-ref HEAD`.text()
  const branchName = result.trim()

  return branchName
}
