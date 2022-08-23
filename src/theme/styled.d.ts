// import original module declarations
import '@emotion/react'

// and extend them!
declare module '@emotion/react' {
  export interface Theme {
    borderRadius?: string
    colors: {
      grey: string
      red: string,
      closeAndBackMenuItems: string,
      blackBackground: string
    }
    menu: {
      width: number
      paddingTop: number
      paddingBottom: number
      menuItem: {
        height: number
      },
      navItem: {
        marginLeft: number
        marginRight: number
      }
    }
  }
}
