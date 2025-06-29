/** Unwraps object types to be visible in intellisense */

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}
