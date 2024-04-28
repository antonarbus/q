/** Unwraps object types to be visible in intellisense */

export type Pretty<T> = {
  [K in keyof T]: T[K]
// eslint-disable-next-line @typescript-eslint/ban-types
} & {}
