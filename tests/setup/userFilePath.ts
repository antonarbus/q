import { join } from 'node:path'

const authUserFilePath = join(import.meta.dirname, 'authenticated_user.json')
const guestUserFilePath = join(import.meta.dirname, 'guest_user.json')

export const userFilePath = {
  authenticated: authUserFilePath,
  guest: guestUserFilePath,
}
