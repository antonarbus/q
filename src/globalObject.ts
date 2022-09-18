type globalObjectType = {
  goUpInMenu: { () : void } | null
  goDownInMenu: { (id: string) : void } | null
}
export const globalObject: globalObjectType = {
  goUpInMenu: () => console.log('put function here for going up the menu, otherwise need to pass it in many props'),
  goDownInMenu: (id) => console.log('same, but for going down the menu')
}
