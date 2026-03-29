// This is the real technical need for index.ts barrel file

// We reference latest schema & types and keep names variable names unchanged
//* CHANGE TO THE LATEST VERSION
export {
  quotationSchema,
  type Quotation,
  type Cell,
  type CellPin,
  type Column,
  type HeaderValue,
  type HeaderKey,
  type BoqColumnKey,
  type CellKey,
  type RowBlock,
  type BoqBlock,
  type TextBlock,
  type PriceBlock,
  type BlockItem,
} from './quotationSchemaV2'
