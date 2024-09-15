/**
 * Removes a cookie by name, domain, and path.
 *
 * @param name - The name of the cookie.
 * @param domain - The domain where the cookie was set. Optional.
 * @param path - The path where the cookie was set. Defaults to '/'.
 */

type Props = {
  name: string
  domain?: string
  path?: string
}

export const removeCookie = ({
  name,
  domain = 'sendmequotation.today',
  path = '/',
}: Props): void => {
  // Set the cookie expiration to a date in the past
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`

  // If a domain is provided, add it to the cookie string
  if (domain) {
    cookieString += ` domain=${domain};`
  }

  // Set the cookie, which effectively removes it
  document.cookie = cookieString
}
