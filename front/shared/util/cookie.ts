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

export const removeCookie = async (props: Props): Promise<void> => {
  await cookieStore.delete({
    name: props.name,
    ...(props.domain !== undefined && { domain: props.domain }),
    path: props.path ?? '/',
  })
}
