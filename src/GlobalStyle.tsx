import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  button {
    cursor: revert;
    border: 1px solid grey;
    border-radius: px;
    padding: 5px;
    cursor: pointer;
  }

  /* Preferred box-sizing value */
  *, *::before, *::after { box-sizing: border-box; }

  /* Remove list styles (bullets/numbers) */
  ol, ul, menu {
    list-style: none;
  }

  /* For images to not be able to exceed their container */
  img {
    max-width: 100%;
  }

  /* removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }
`
