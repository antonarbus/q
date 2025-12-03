/**
 * - GitHub Actions output to stdout(key = value pairs)
 * - Required for passing data between steps in Github Actions workflow
 * - When we console.log() it goes to stdout output, same as echo in bash
 * @example githubOutput({ environment: 'dev' })
 */
export const githubOutput = (outputs: Record<string, string | number | boolean>): void => {
  Object.entries(outputs).forEach(([key, value]) => {
    console.log(`${key}=${value}`)
  })
}
