import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const thisFilePath = fileURLToPath(import.meta.url)
const thisDirPath = dirname(thisFilePath)

const authUserFilePath = join(thisDirPath, 'authenticated_user.json')
const guestUserFilePath = join(thisDirPath, 'guest_user.json')

export const userFilePath = {
  authenticated: authUserFilePath,
  guest: guestUserFilePath,
}
