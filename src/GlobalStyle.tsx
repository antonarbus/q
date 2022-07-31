import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * { 
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  button {
    border: 1px solid grey;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
  }

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
