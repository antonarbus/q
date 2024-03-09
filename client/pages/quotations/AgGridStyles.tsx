import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Global, css } from '@emotion/react'

export const AgGridStyles = (): JSX.Element => {
  return (
    <Global
      styles={css`
        .ag-quotations-table {
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
          }

          .ag-cell-value {
            padding: 15px 0px;
          }

          .center .ag-header-cell-comp-wrapper {
            justify-content: center;
          }

          // filter placeholder and date pattern
          .ag-floating-filter input::placeholder,
          .ag-input-field-input.ag-text-field-input[type='date'] {
            opacity: 0.5;
          }

          // remove pin border line
          .ag-pinned-left-header,
          .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(.ag-cell-range-single-cell) {
            border-right: 1px dotted #80808045;
          }
          

        }
      `}
    />
  )
}
