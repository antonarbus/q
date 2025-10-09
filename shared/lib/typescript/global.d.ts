/** May use "TODO" type instead of "any" */
declare global {
  // biome-ignore lint/suspicious/noExplicitAny: <it is on purpose>
  type TODO = any
}

// This line ensures the file is treated as a module
export {}
