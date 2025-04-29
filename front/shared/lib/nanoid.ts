import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  '123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ',
)

/**
 * Returns 6 chars ID with easy numbers and letters
  ~42.2 billion possible combinations(59^6)
 */
export const generateId = ({ size = 6 } = {}): string => {
  const id = nanoid(size)

  return id
}
