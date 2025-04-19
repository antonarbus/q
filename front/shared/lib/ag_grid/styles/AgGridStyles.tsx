// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Global, css } from '@emotion/react'

export const AgGridStyles = (): React.JSX.Element => {
  return (
    <Global
      styles={css`
        .q-table {
          // https://www.ag-grid.com/react-data-grid/global-style-customisation-variables/
          --ag-row-hover-color: #dcdcdc24;

          .ag-header-cell-label {
            justify-content: center;
          }

          .ag-cell {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 20px;
            text-align: 'center';
          }

          /* https://css-tricks.com/flexbox-truncated-text/ */
          .ag-cell-wrapper {
            min-width: 0;
            width: 100%;
          }

          .ag-cell-value {
            padding: 0px 0px;
          }

          .center .ag-header-cell-comp-wrapper {
            justify-content: center;
          }

          // floating filter
          .ag-floating-filter input {
            padding-left: 5px;
          }

          .ag-floating-filter input::placeholder {
            opacity: 0.5;
          }

          .ag-input-field-input.ag-text-field-input[type='date'] {
            opacity: 0.5;
          }

          /* remove magnifying class */
          .ag-text-field-input-wrapper::before {
            display: none !important;
          }

          // remove pin border line
          .ag-pinned-left-header,
          .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(
              .ag-cell-range-single-cell
            ) {
            border-right: 1px dotted #80808045;
          }

          .ag-floating-filter-button-button {
            height: auto;
            width: auto;
          }
        }
      `}
    />
  )
}
