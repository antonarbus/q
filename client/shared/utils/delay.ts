export const syncDelay = (ms = 1000): void => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}

export const asyncDelay = async (ms = 1000): Promise<string> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`delayed with ${ms} ms`)
    }, ms)
  })
}
