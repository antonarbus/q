import {
  Box,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { BlockComp } from '@front/entities/quotation/ui/BlockComp'
import { DragBlockIcon } from '@front/features/blocks/drag-item/DragBlockIcon'
import { CutBlockIcon } from '@front/features/blocks/cut-item/CutBlockIcon'
import { DeleteBlockIcon } from '@front/features/blocks/delete-item/DeleteBlockIcon'
import { GeneratePaymentLinkButton } from '@front/features/blocks/generate-payment-link/GeneratePaymentLinkButton'
import { OpenPaymentLinkButton } from '@front/features/blocks/open-payment-link/OpenPaymentLinkButton'
import { ItemActionButtonsLayout } from '@front/shared/layout/ItemActionButtonsLayout'
import { CiCreditCard1 } from 'react-icons/ci'
import { useState } from 'react'
import type { PaymentBlock } from '@back/entity/quotation/schema'

const STRIPE_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'JPY', 'SGD', 'HKD', 'NZD',
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AWG', 'AZN', 'BAM',
  'BBD', 'BDT', 'BGN', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BWP',
  'BYN', 'BZD', 'CDF', 'CLP', 'CNY', 'COP', 'CRC', 'CVE', 'CZK', 'DJF',
  'DKK', 'DOP', 'DZD', 'EGP', 'ETB', 'FJD', 'FKP', 'GEL', 'GIP', 'GMD',
  'GNF', 'GTQ', 'GYD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR',
  'ISK', 'JMD', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KYD', 'KZT', 'LAK',
  'LBP', 'LKR', 'LRD', 'LSL', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT',
  'MOP', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO',
  'NOK', 'NPR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR',
  'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SHP', 'SLE',
  'SOS', 'SRD', 'STD', 'SZL', 'THB', 'TJS', 'TND', 'TOP', 'TRY', 'TTD',
  'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'XAF',
  'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW',
] as const

type Props = {
  blockIndex: number
  payment: PaymentBlock['payment']
  quotationId: string
}

export const OwnerPaymentView = (props: Props): React.JSX.Element => {
  const [amount, setAmount] = useState(
    props.payment.amount === 0 ? '' : String(props.payment.amount / 100),
  )

  const [currency, setCurrency] = useState(props.payment.currency)
  const [description, setDescription] = useState(props.payment.description)
  const isQuotationSaved = props.quotationId.length > 0 && props.quotationId !== 'new'
  const hasPaymentLink = props.payment.stripePaymentLinkUrl !== null

  return (
    <BlockComp
      disableResize
      leftBlockActionButtons={
        <ItemActionButtonsLayout>
          <DragBlockIcon />
          <CutBlockIcon />
        </ItemActionButtonsLayout>
      }
      rightBlockActionButtons={
        <ItemActionButtonsLayout>
          <DeleteBlockIcon />
        </ItemActionButtonsLayout>
      }
    >
      <Box
        sx={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '320px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CiCreditCard1 style={{ fontSize: '20px' }} />
          <Typography fontWeight={600} variant='subtitle2'>
            Payment
          </Typography>
        </Box>
        <Divider />
        <TextField
          disabled={hasPaymentLink}
          label='Description'
          focused
          placeholder='Invoice #123 for services rendered'
          size='small'
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <TextField
            disabled={hasPaymentLink}
            label='Amount'
            focused
            placeholder='100.00'
            size='small'
            slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
            sx={{ flex: 2 }}
            type='number'
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value)
            }}
          />
          <FormControl disabled={hasPaymentLink} size='small' sx={{ flex: 1 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              label='Currency'
              value={currency.toUpperCase()}
              onChange={(event) => {
                setCurrency(event.target.value)
              }}
            >
              {STRIPE_CURRENCIES.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {hasPaymentLink ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Chip color='success' label='Payment link active' size='small' variant='outlined' />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: 'text.secondary',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {props.payment.stripePaymentLinkUrl}
              </Typography>
              <OpenPaymentLinkButton url={props.payment.stripePaymentLinkUrl ?? ''} />
            </Box>
          </Box>
        ) : (
          <GeneratePaymentLinkButton
            amount={amount}
            blockIndex={props.blockIndex}
            currency={currency}
            description={description}
            quotationId={props.quotationId}
          />
        )}
        {isQuotationSaved === false && (
          <Typography color='text.secondary' sx={{ fontSize: '11px' }}>
            Save the quotation first to generate a payment link.
          </Typography>
        )}
      </Box>
    </BlockComp>
  )
}
