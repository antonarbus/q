import path from 'node:path'

const authUserFilePath = path.join(import.meta.dirname, 'authenticated_user.json')
const guestUserFilePath = path.join(import.meta.dirname, 'guest_user.json')

export const userFilePath = {
  authenticated: authUserFilePath,
  guest: guestUserFilePath,
}
