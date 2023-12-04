import type { ThemeOptions } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

const muiTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#757575',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
}

const customTheme = {
  colors: {
    grey: '#5a5a5a',
    red: '#ee6666',
    topMenuItem: '#858383',
    darkBackground: 'rgb(52 52 52 / 95%)',
    greyFont: '#bcbcbc',
  },
  nav: {
    height: 60,
    marginTop: 10,
    marginBottom: 0,
    get fullHeight (): number {
      return this.height + this.marginTop + this.marginBottom
    },
  },
  menu: {
    width: 300,
    paddingTop: 16,
    paddingBottom: 16,
    menuItem: {
      height: 50,
    },
    navItem: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  item: {
    padding: '20px',
    animationDuration: 0.5,
  },
  copy: {
    pasteTextColor: '#6c6c6c',
    animationDuration: 0.35,
  },
  cell: {
    padding: '20px 5px 0px 5px',
  },
}

// type CustomTheme = typeof customTheme

// https://mui.com/material-ui/customization/theming/#typescript
// https://medium.com/@bahuguna.shubhanshu19/how-to-create-custom-theme-in-react-written-in-typescript-using-material-ui-154ed1daeae6
declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  // interface Theme {
  //   // from mui
  //   palette: {
  //     primary: {
  //       main: string
  //     }
  //   }
  //   typography: {
  //     button: {
  //       textTransform: string
  //     }
  //   }
  //   // from customTheme
  //   colors: {
  //     grey: string
  //     red: string
  //     topMenuItem: string
  //     darkBackground: string
  //     greyFont: string
  //   }
  //   nav: {
  //     height: number
  //     marginTop: number
  //     marginBottom: number
  //     fullHeight: number
  //   }
  //   menu: {
  //     width: number
  //     paddingTop: number
  //     paddingBottom: number
  //     menuItem: {
  //       height: number
  //     }
  //     navItem: {
  //       marginLeft: number
  //       marginRight: number
  //     }
  //   }
  //   item: {
  //     padding: number
  //     animationDuration: number
  //   }
  //   copy: {
  //     pasteTextColor: string
  //     animationDuration: number
  //   },

  // }
}

export const theme = { ...muiTheme, ...customTheme }

export const themeClient = createTheme(theme)
