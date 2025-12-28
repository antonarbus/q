type Props = {
  file?: File
}

export const getFileSizeInMb = (props: Props): number => {
  if (props.file === undefined) {
    return 0
  }

  const sizeInMb = props.file.size / 1024 / 1024
  const firstTwoDecimalsRegExp = /^-?\d*\.?0*\d{0,2}/u

  const firstTwoDecimals = firstTwoDecimalsRegExp
    .exec(sizeInMb.toFixed(20))
    ?.at(0)

  if (firstTwoDecimals === undefined) {
    return 0
  }

  const decimals = Number(firstTwoDecimals)

  return decimals
}
