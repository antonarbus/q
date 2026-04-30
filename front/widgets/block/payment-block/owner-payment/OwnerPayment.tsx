import { Box, IconButton, Tooltip } from '@mui/material'
import { GeneratePaymentLinkButton } from '@front/features/blocks/generate-payment-link/GeneratePaymentLinkButton'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'
import { getHtmlOfPaymentPayButtonLabelFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfPaymentPayButtonLabelFromStoreByIndex'
import { updatePaymentPayButtonLabelAtPaymentBlock } from '@front/features/blocks/update-payment-pay-button-label/updatePaymentPayButtonLabelAtPaymentBlock'
import { CiCreditCard1 } from 'react-icons/ci'
import { MdContentCopy } from 'react-icons/md'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import type { PaymentBlock } from '@back/entity/quotation/schema'
import { stripeCurrencies } from '@front/shared/lib/stripe/stripeCurrencies'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { useBlock } from '@front/entities/quotation/provider/block/useBlock'
import { OwnerPaymentLayout } from './OwnerPaymentLayout'
import { PaymentHeading } from './PaymentHeading'
import { PaymentStatusBadge } from './PaymentStatusBadge'

type Props = {
  payment: PaymentBlock['payment']
}

const inputSx = {
  width: '100%',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '6px',
  padding: '7px 10px',
  fontSize: '13px',
  fontFamily: 'inherit',
  color: 'text.primary',
  background: 'transparent',
  outline: 'none',
  boxSizing: 'border-box',
  '&::placeholder': { color: 'text.disabled', opacity: 1 },
  '&:focus': { borderColor: 'text.secondary' },
  '&:disabled': { background: '#f8f8f8', color: 'text.disabled', cursor: 'default' },
} as const

export const OwnerPayment: FC<Props> = (props) => {
  const block = useBlock()

  const [amount, setAmount] = useState(
    props.payment.amount === 0 ? '' : String(props.payment.amount / 100),
  )

  const [currency, setCurrency] = useState(props.payment.currency)
  const [amountError, setAmountError] = useState(false)
  const amountInputRef = useRef<HTMLInputElement>(null)
  const hasPaymentLink = props.payment.stripePaymentLinkUrl !== null

  const quotationId = reduxHolder.useSelector((state) => state.quotation.id)

  const handleInvalidAmount = (): void => {
    setAmountError(true)
    amountInputRef.current?.focus()
  }

  return (
    <OwnerPaymentLayout
      paymentLogo={<CiCreditCard1 style={{ fontSize: '24px' }} />}
      paymentHeading={<PaymentHeading />}
      paymentStatusBadge={<PaymentStatusBadge />}
      paymentAmount={<div>666</div>}
      paymentCurrency={<div>666</div>}
      paymentButtonLabel={<div>666</div>}
      paymentLinkGenerateButton={<div>666</div>}
      paymentLink={<div>666</div>}
      devMode={true}
    />
  )

  return (
    <>
      {/* Amount + Currency row */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 2 }}>
          <Box
            ref={amountInputRef}
            component='input'
            disabled={hasPaymentLink}
            min={0.5}
            step={0.01}
            placeholder='0.00'
            sx={{
              ...inputSx,
              ...(amountError && {
                borderColor: 'error.main',
                '&:focus': {
                  borderColor: 'error.main',
                },
              }),
            }}
            type='number'
            value={amount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(event.target.value)

              if (amountError) {
                setAmountError(false)
              }
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box
            component='select'
            disabled={hasPaymentLink}
            sx={{
              ...inputSx,
              cursor: hasPaymentLink ? 'default' : 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              paddingRight: '28px',
            }}
            value={currency.toUpperCase()}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setCurrency(event.target.value)
            }}
          >
            {stripeCurrencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Pay button label editor — shown as a full-width button preview */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 16px',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: '6px',
          cursor: 'text',
          '& p': {
            margin: 0,
            color: 'text.secondary',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          },
          '& .tiptap': { padding: '0' },
        }}
      >
        <TextEditor
          registryKey={getRegistryKey({
            editorName: 'paymentBlockPayButtonLabel',
            blockIndex: block.index,
            rowIndex: null,
          })}
          isEditorView={true}
          className='payment-pay-button-label'
          placeholder='Pay Now...'
          contentGetter={() =>
            getHtmlOfPaymentPayButtonLabelFromStoreByIndex({ blockIndex: block.index })
          }
          onChange={() => updatePaymentPayButtonLabelAtPaymentBlock({ blockIndex: block.index })}
          sx={{
            '& p': { margin: 0 },
            '& .tiptap': { padding: '0' },
          }}
        />
      </Box>

      {/* Payment link section */}
      {hasPaymentLink ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Box
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
          </Box>
          <Tooltip title='Copy link'>
            <IconButton
              size='small'
              onClick={async () => {
                await window.navigator.clipboard
                  .writeText(props.payment.stripePaymentLinkUrl ?? '')
                  .then(() => toast.success('Link copied'))
                  .catch(() => toast.error('Failed to copy'))
              }}
            >
              <MdContentCopy style={{ fontSize: '16px' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ alignSelf: 'center' }}>
          <GeneratePaymentLinkButton
            amount={amount}
            blockIndex={block.index}
            currency={currency}
            onInvalidAmount={handleInvalidAmount}
            quotationId={quotationId}
          />
        </Box>
      )}
    </>
  )
}
