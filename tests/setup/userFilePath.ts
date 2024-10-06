import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const thisFilePath = fileURLToPath(import.meta.url)
const thisDirName = dirname(thisFilePath)
const authUserFilePath = join(thisDirName, 'authenticated_user.json')
const guestUserFilePath = join(thisDirName, 'guest_user.json')

export const userFilePath = {
  authenticated: authUserFilePath,
  guest: guestUserFilePath,
}
