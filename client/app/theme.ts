import { ThemeOptions, createTheme } from '@mui/material/styles'

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
    get fullHeight() {
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
    padding: 20,
    animationDuration: 0.5,
  },
  copy: {
    pasteTextColor: '#6c6c6c',
    animationDuration: 0.5,
  },
}

// https://mui.com/material-ui/customization/theming/#typescript
// https://medium.com/@bahuguna.shubhanshu19/how-to-create-custom-theme-in-react-written-in-typescript-using-material-ui-154ed1daeae6
declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    // from mui
    palette: {
      primary: {
        main: '#757575'
      }
    }
    typography: {
      button: {
        textTransform: 'none'
      }
    }
    // from customTheme
    colors: {
      grey: '#5a5a5a'
      red: '#ee6666'
      topMenuItem: '#858383'
      darkBackground: 'rgb(52 52 52 / 95%)'
      greyFont: '#bcbcbc'
    }
    nav: {
      height: 60
      marginTop: 10
      marginBottom: 0
      fullHeight: number
    }
    menu: {
      width: 300
      paddingTop: 16
      paddingBottom: 16
      menuItem: {
        height: 50
      }
      navItem: {
        marginLeft: 10
        marginRight: 10
      }
    }
    item: {
      padding: 20
      animationDuration: 0.5
    }
    copy: {
      pasteTextColor: '#6c6c6c'
      animationDuration: 0.5
    }
  }
}

export const theme = { ...muiTheme, ...customTheme }

export const themeClient = createTheme(theme)
