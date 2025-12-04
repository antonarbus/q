/**
 * - GitHub Actions output to stdout(key = value pairs)
 * - Required for passing data between steps in Github Actions workflow
 * - When we console.log() it goes to stdout output, same as echo in bash
 * @example githubOutput({ environment: 'dev' })
 */
export const githubOutput = (
  outputs: Record<string, string | number | boolean | readonly string[]>,
): void => {
  Object.entries(outputs).forEach(([key, value]) => {
    // Handle arrays by converting them to JSON string
    if (Array.isArray(value)) {
      console.log(`${key}=${JSON.stringify(value)}`)
    } else {
      console.log(`${key}=${value}`)
    }
  })
}
