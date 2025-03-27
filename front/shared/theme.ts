import { createTheme, type ThemeOptions } from '@mui/material/styles'

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
    get fullHeight(): number {
      return this.height + this.marginTop + this.marginBottom
    },
  },
  footer: {
    height: 24,
  },
  menu: {
    width: 300,
    paddingTop: 20,
    paddingBottom: 20,
    menuItem: {
      height: 50,
    },
  },
  block: {
    animationDuration: 0.5,
  },
  copy: {
    pasteTextColor: '#6c6c6c',
    animationDuration: 0.35,
  },
  cell: {
    padding: '30px 5px 0px 5px',
  },
}

export const theme = { ...muiTheme, ...customTheme }

export const themeClient = createTheme(theme)
