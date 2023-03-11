import { createTheme } from '@mui/material/styles'

const muiTheme = {
  palette: {
    primary: {
      main: '#757575'
    }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
}

const customTheme = {
  colors: {
    grey: '#5a5a5a',
    red: '#ee6666',
    topMenuItem: '#858383',
    darkBackground: 'rgb(52 52 52 / 95%)'
  },
  nav: {
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    get fullHeight() {
      return this.height + this.marginTop + this.marginBottom
    }
  },
  menu: {
    width: 300,
    paddingTop: 16,
    paddingBottom: 16,
    menuItem: {
      height: 50
    },
    navItem: {
      marginLeft: 10,
      marginRight: 10
    }
  }
}

export const theme = { ...muiTheme, ...customTheme }

export const themeClient = createTheme(theme as any)
