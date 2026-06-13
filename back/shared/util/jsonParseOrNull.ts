// generic helper: ResultType is set explicitly by callers (e.g. jsonParseOrNull<Quotation>(...)) to type the parsed result
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters
export const jsonParseOrNull = <ResultType = never>(str: unknown): ResultType | null => {
  try {
    if (typeof str !== 'string') {
      return null
    }

    // generic JSON deserialization helper — shape can't be verified generically, callers are trusted to supply ResultType
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const parsedJson: ResultType = JSON.parse(str) as ResultType

    return parsedJson
  } catch {
    return null
  }
}
