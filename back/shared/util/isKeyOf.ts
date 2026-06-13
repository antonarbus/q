export const isKeyInObject = <ObjectType extends object>(
  object: ObjectType,
  key: PropertyKey,
): key is keyof ObjectType => {
  return key in object
}
