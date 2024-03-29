import { nanoid } from '@shared/lib/nanoid'
import { boqRowKey } from '../consts/boqRowKey'
import { itemKey } from '../consts/itemKey'
import { type Item } from '../types'

export const defaultItems: Item[] = [
  {
    id: nanoid(3),
    type: itemKey.text,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<p style="text-align: center; font-size: 24px;">Cover letter</p><p><br></p><p style="text-align: center;"><span>Here goes any technical and commercial information.</span></p><p><br></p><p style="text-align: center;"><span>You may...</span></p><p><br></p><ul><li>write, select and <span style="color: rgb(226, 80, 65);">format</span> text</li><li>insert tables, drop <a href="911.pdf" rel="noopener noreferrer" target="_blank">files</a>, images, attach videos</li><li>copy, cut, delete, insert, sort, resize blocks and rows</li><li>calculate prices</li><li>auto save data in browser</li><li>store and share quotations</li><li>review, track and update offers</li><li>save and search though products portfolio</li><li>copy items from other quotations</li><li>all elements are editable and customizable</li></ul><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      value: null,
    },
  },
  {
    id: nanoid(3),
    type: itemKey.boq,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    boq: {
      header: {
        title: {
          html: '<p><strong>Title 1</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          value: 0,
        },
        subtotalText: {
          html: '<div>Subtotal</div><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          value: 0,
        },
        subTotalPrice: {
          html: '<p><strong>140</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          value: 140,
        },
      },
      column: {
        number: {
          html: '',
          width: 30,
        },
        description: {
          html: '<p><strong>Description</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          width: 240,
        },
        itemPrice: {
          html: '<p><strong>Item price</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          width: 100,
        },
        qty: {
          html: '<p><strong>Qty</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          width: 100,
        },
        price: {
          html: '<p><strong>Price</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
          width: 100,
        },
      },
      rows: [
        {
          id: nanoid(3),
          type: boqRowKey.row,
          height: 0,
          width: 0,
          description: {
            html: '<p>item 1</p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>1 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 1,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>10 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: nanoid(3),
          type: boqRowKey.row,
          height: 0,
          width: 0,
          description: {
            html: '<p>item 2</p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>20 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>2 <span style="font-size: 12px; color: rgb(61, 142, 185);">pcs</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>40 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 40,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
        },
        {
          id: nanoid(3),
          type: boqRowKey.row,
          height: 0,
          width: 0,
          description: {
            html: '<p>service</p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>30 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>3 <span style="font-size: 12px; color: rgb(61, 142, 185);">h</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>90 <span style="font-size: 16px; color: rgb(65, 168, 95);">$</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
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
    id: nanoid(3),
    type: itemKey.price,
    width: 150,
    height: 0,
    msg: '',
    isFroala: true,
    title: {
      html: '<p style="text-align: center;"><strong>Total price</strong></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      value: null,
    },
    price: {
      html: '<p style="text-align: center;">280 <span>USD</span></p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      value: 280,
    },
  },
  {
    id: nanoid(3),
    type: itemKey.text,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: `
        <p style="font-size: 24px; text-align: center;">Terms &amp; Conditions</p><p><br></p>
        <p><strong>Parties.</strong> The "Seller" refers to [Seller Name], and the "Buyer" refers to [Buyer Name].</p><p><br></p>
        <p><strong>Validity.</strong> This quotation is valid for 30 days from the date of issuance.</p><p><br></p>
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
        <p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>
      `,
      value: null,
    },
  },
]
