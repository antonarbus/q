type Props = {
  file?: File
}

export const getFileSizeInMb = ({ file }: Props): number => {
  if (file === undefined) return 0
  const sizeInMb = file.size / 1024 / 1024
  const firstTwoDecimalsRegExp = /^-?\d*\.?0*\d{0,2}/u
  const firstTwoDecimals = firstTwoDecimalsRegExp
    .exec(sizeInMb.toFixed(20))
    ?.at(0)
  if (firstTwoDecimals === undefined) return 0

  return Number(firstTwoDecimals)
}
