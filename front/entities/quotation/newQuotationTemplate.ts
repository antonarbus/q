import { nanoid } from '@shared/lib/nanoid'
import { boqRowKey } from './consts/boqRowKey'
import { itemType } from './consts/itemType'
import type { Quotation } from './types'

export const newQuotationTemplate: Quotation = {
  id: 'new',
  type: 'quotation',
  email: 'john@mail.com',
  permissionLevel: undefined,
  sharedWith: [],
  preview: '',
  blocks: [
    {
      id: nanoid(5),
      type: itemType.text,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
      text: {
        html: '<p style="text-align: center; font-size: 24px;">Cover letter</p><p><br></p><p style="text-align: center;"><span>Here goes any technical and commercial information.</span></p><p><br></p><p style="text-align: center;"><span>You may...</span></p><p><br></p><ul><li>write, select and <span style="color: rgb(226, 80, 65);">format</span> text</li><li>insert tables, drop <a href="/911.pdf" rel="noopener noreferrer" target="_blank">files</a>, images, attach videos</li><li>copy, cut, delete, insert, sort, resize blocks and rows</li><li>calculate prices</li><li>store and share quotation as link or .pdf file</li><li>review, track and update quotation</li><li>save and search through bookmarked portfolio</li><li>copy and paste items from other quotations</li></ul>',
        value: null,
      },
    },
    {
      id: nanoid(5),
      type: itemType.boq,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
      boq: {
        header: {
          title: {
            html: '<p><strong>Title 1</strong></p>',
            value: 0,
          },
          subtotalText: {
            html: '<div>Subtotal</div>',
            value: 0,
          },
          subTotalPrice: {
            html: '<p><strong>140</strong></p>',
            value: 140,
          },
        },
        column: {
          number: {
            html: '',
            width: 30,
          },
          description: {
            html: '<p><strong>Description</strong></p>',
            width: 240,
          },
          itemPrice: {
            html: '<p><strong>Item price</strong></p>',
            width: 100,
          },
          qty: {
            html: '<p><strong>Qty</strong></p>',
            width: 100,
          },
          price: {
            html: '<p><strong>Price</strong></p>',
            width: 100,
          },
        },
        rows: [
          {
            id: nanoid(5),
            type: boqRowKey.row,
            email: 'john@mail.com',
            height: 0,
            width: 0,
            description: {
              html: '<p>item 1</p>',
              value: 0,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            itemPrice: {
              html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 10,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            qty: {
              html: '<p>1 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>',
              value: 1,
              pin: {
                isPinned: true,
                isShown: false,
              },
            },
            price: {
              html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 10,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
          },
          {
            id: nanoid(5),
            type: boqRowKey.row,
            email: 'john@mail.com',
            height: 0,
            width: 0,
            description: {
              html: '<p>item 2</p>',
              value: 0,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            itemPrice: {
              html: '<p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 20,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            qty: {
              html: '<p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p>',
              value: 2,
              pin: {
                isPinned: true,
                isShown: false,
              },
            },
            price: {
              html: '<p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 40,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
          },
          {
            id: nanoid(5),
            type: boqRowKey.row,
            email: 'john@mail.com',
            height: 0,
            width: 0,
            description: {
              html: '<p>service</p>',
              value: 0,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            itemPrice: {
              html: '<p>30 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 30,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
            qty: {
              html: '<p>3 <span style="font-size: 12px; color: rgb(61, 142, 185);">h</span></p>',
              value: 3,
              pin: {
                isPinned: true,
                isShown: false,
              },
            },
            price: {
              html: '<p>90 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p>',
              value: 90,
              pin: {
                isPinned: false,
                isShown: false,
              },
            },
          },
        ],
      },
    },
    {
      id: nanoid(5),
      type: itemType.price,
      email: 'john@mail.com',
      width: 150,
      height: 0,
      isFroala: true,
      title: {
        html: '<p style="text-align: center;"><strong>Total price</strong></p>',
        value: null,
      },
      price: {
        html: '<p style="text-align: center;">280 <span>USD</span></p>',
        value: 280,
      },
    },
    {
      id: nanoid(5),
      type: itemType.text,
      email: 'john@mail.com',
      width: 600,
      height: 0,
      isFroala: true,
      text: {
        html: `
        <p style="font-size: 24px; text-align: center;">Terms &amp; Conditions</p><p><br></p>
        <p><strong>Parties.</strong> The "Seller" refers to [Seller Name], and the "Buyer" refers to [Buyer Name].</p><p><br></p>
        <p><strong>Validity.</strong> This quotation is valid for 14 days from the date of issuance.</p><p><br></p>
        <p><strong>Payment.</strong> Payment is due within 30 days of the invoice date. Late payments may incur penalties.</p><p><br></p>
        <p><strong>Delivery.</strong> Delivery times are estimated at 2-4 weeks from order confirmation.</p><p><br></p>
        <p><strong>Cancellation.</strong> Orders may be canceled within 48 hours of placement without penalty. Cancellations after this period may incur fees.</p><p><br></p>
        <p><strong>Ownership.</strong> Ownership of goods remains with Seller until full payment is received.</p><p><br></p>
        <p><strong>Warranty.</strong> Products are covered by a 12 months warranty against defects in materials and workmanship.</p><p><br></p>
        <p><strong>Returns.</strong> Returns or exchanges are accepted within 14 days of receipt, subject to terms outlined in our returns policy.</p><p><br></p>
        <p><strong>Variations.</strong> Any changes to the quotation must be agreed upon in writing.</p><p><br></p>
        <p><strong>Liability.</strong> Seller is not liable for damages occurring during transportation.</p><p><br></p>
        <p><strong>Governing Law.</strong> This quotation shall be governed by and construed in accordance with the laws of Seller jurisdiction.</p><p><br></p>
        <p><strong>Confidentiality.</strong> Both parties agree to keep all information exchanged in relation to this quotation confidential.</p><p><br></p>
        <p><strong>Intellectual Property.</strong> All intellectual property rights related to the quotation and any associated materials remain with Seller.</p><p><br></p>
        <p><strong>Force Majeure.</strong> Neither party shall be liable for any failure to perform their obligations under this quotation due to unforeseen circumstances beyond their control.</p><p><br></p>
        <p><strong>Indemnity.</strong> The Buyer agrees to indemnify and hold Seller harmless from any claims arising from the use of the products or services provided under this quotation.</p><p><br></p>
        <p><strong>Notices.</strong> Any notices or communications regarding this quotation shall be sent to the addresses provided by each party.</p><p><br></p>
      `,
        value: null,
      },
    },
  ],
}
