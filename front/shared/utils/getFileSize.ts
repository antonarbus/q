type Props = {
  file?: File
}

export const getFileSizeInMbAsText = ({ file }: Props): string => {
  if (file === undefined) return '0 mb'
  if (file === null) return '0 mb'
  const sizeInMb = file.size / 1024 / 1024
  const firstTwoDecimalsRegExp = /^-?\d*\.?0*\d{0,2}/
  const firstTwoDecimals = sizeInMb
    .toFixed(20)
    .match(firstTwoDecimalsRegExp)
    ?.at(0)
  if (firstTwoDecimals === undefined) return '0 mb'
  const sizeAsText = `${firstTwoDecimals} Mb`
  return sizeAsText
}
