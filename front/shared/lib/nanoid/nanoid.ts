import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  '123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ',
)

/**
 * Returns 8 chars ID with easy numbers and letters
 * ~146 trillion possible combinations(59^8)
 */
export const generateId = ({ size = 8 } = {}): string => {
  const id = nanoid(size)

  return id
}
