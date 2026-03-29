import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ')

type Props = {
  size?: number
}

/**
 * Returns 8 chars ID with easy numbers and letters
 * ~146 trillion possible combinations(59^8)
 */
export const generateId = (props: Props = {}): string => {
  const id = nanoid(props.size ?? 8)

  return id
}
