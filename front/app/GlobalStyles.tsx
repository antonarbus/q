import { Global, css } from '@emotion/react'

export const GlobalStyles = (): JSX.Element => (
  <Global
    styles={css`
      /* fix the feature of 'hidden' attribute.
      display:revert; revert to element instead of attribute */
      :where([hidden]) {
        display: none;
      }

      /* revert for bug in Chromium browsers
      - fix for the content editable attribute will work properly.
      - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
      :where([contenteditable]:not([contenteditable='false'])) {
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        line-break: after-white-space;
        -webkit-line-break: after-white-space;
        user-select: auto;
        -webkit-user-select: auto;
      }

      /* apply back the draggable feature - exist only in Chromium and Safari */
      :where([draggable='true']) {
        -webkit-user-drag: element;
      }

      /* hack to disable autofill color on input
      https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete */
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        transition:
          background-color 600000s 0s,
          color 600000s 0s;
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
          top: 0px;
          right: 0px;
          font-size: 20px !important;
          transition: scale 200ms;
          :before {
            content: '×';
          }
          &:hover {
            scale: 1.5;
          }
        }
      }

      // caret at Froala
      .fr-wrapper {
        cursor: 'text';
        /* caret-color: red; */
      }

      // Froala insert button
      .fr-quick-insert {
      }
    `}
  />
)
