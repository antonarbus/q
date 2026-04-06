import { Box, Chip, Divider, TextField, Typography } from '@mui/material'
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
            Payment Block
          </Typography>
        </Box>
        <Divider />
        <TextField
          disabled={hasPaymentLink}
          label='Description'
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
          <TextField
            disabled={hasPaymentLink}
            label='Currency'
            size='small'
            slotProps={{ htmlInput: { maxLength: 3 } }}
            sx={{ flex: 1 }}
            value={currency.toUpperCase()}
            onChange={(event) => {
              setCurrency(event.target.value.toUpperCase())
            }}
          />
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
