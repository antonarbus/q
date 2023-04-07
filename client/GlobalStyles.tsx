import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      body{
        background-color: #e9e9e9;
        color: rgba(0, 0, 0, 0.87);
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        font-weight: 300;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        height: 100dvh;
      }
    
      button {
        border: 1px solid grey;
        border-radius: 4px;
        padding: 5px;
      }
    
      /* css reset in 2022 */
      /* https://elad2412.github.io/the-new-css-reset/ */
    
      /* *:where(:not(html, iframe, canvas, img, svg, video):not(svg *, symbol *)) {
        all: unset;
        display: revert;
      } */
    
      /* Preferred box-sizing value */
      *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
    
      /* Reapply the pointer cursor for anchor tags */
      a, button {
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

      a {
        color: #0083bf;
        text-decoration-color: transparent;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-thickness: 0.09em;
      }
      a:hover {
        transition: text-decoration-color 300ms;
        text-decoration-color: #0495d7;
      }
      
      /* removes spacing between cells in tables */
      table {
        border-collapse: collapse;
      }
    
      /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
      input, textarea {
        user-select: auto;
        -webkit-user-select: auto;
      }
    
      /* revert the 'white-space' property for textarea elements on Safari */
      textarea {
        white-space: revert;
      }
    
      /* minimum style to allow to style meter element */
      meter {
        -webkit-appearance: revert;
        appearance: revert;
      }
    
      /* reset default text opacity of input placeholder */
      ::placeholder {
        color: unset;
      }
    
      /* fix the feature of 'hidden' attribute.
      display:revert; revert to element instead of attribute */
      :where([hidden]) {
        display: none;
      }
    
      /* revert for bug in Chromium browsers
      - fix for the content editable attribute will work properly.
      - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
      :where([contenteditable]:not([contenteditable="false"])) {
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        line-break: after-white-space;
        -webkit-line-break: after-white-space;
        user-select: auto;
        -webkit-user-select: auto;
      }
    
      /* apply back the draggable feature - exist only in Chromium and Safari */
      :where([draggable="true"]) {
        -webkit-user-drag: element;
      }

      /* hack to disable autofill color on input
      https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete */
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
          transition: background-color 600000s 0s, color 600000s 0s;
      }
      input[data-autocompleted] {
          background-color: transparent !important;
      }

      // react-query dev tools
      .ReactQueryDevtools > button {
        scale: 0.7;
      }

      // froala: html code
      .CodeMirror {
        font-size: 12px;
      }

      // froala: icon to close html code
      .html-switch {
        color: #ff4848 !important;
        background: transparent !important;
        & .fa-code {
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 20px !important;
          transition: scale 200ms;
          :before {
            content: '×'
          }
          &:hover {
            scale: 1.5;
          }
        }
      }
    `}
  />
)
