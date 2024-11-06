import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const thisFilePath = fileURLToPath(import.meta.url)
const thisDirPath = dirname(thisFilePath)

const authUserFilePath = join(thisDirPath, 'authenticated_user.json')
const guestUserFilePath = join(thisDirPath, 'guest_user.json')

export const userFilePath = {
  authenticated: authUserFilePath,
  guest: guestUserFilePath,
}
