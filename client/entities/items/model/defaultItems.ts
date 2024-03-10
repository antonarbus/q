import { nanoid } from 'nanoid'
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
      html: '<p style="font-size: 24px; text-align: center;">Terms &amp; Conditions</p><p><br></p><p>1. <strong>APPLICABILITY AND ACCEPTANCE.</strong> These Terms govern the sale of products (Products) by the Seller to the Buyer. The Terms, along with a valid quotation, constitute the entire Agreement, and the Buyer can accept a quotation by issuing a purchase order.</p><p><br></p><p>2. <strong>PRICE.</strong> Prices are subject to change without notice. Prices indicated in the Purchase Order apply, and shipping fees are exclusive.</p><p><br></p><p>3. <strong>PAYMENT.</strong> Payments are due net thirty (30) days from the invoice date.</p><p><br></p><p>4. <strong>DELIVERY.</strong> Products are delivered according to the Quotation&#39;s International Commercial Term (Incoterms&reg; 2010). Buyer is responsible for any applicable taxes, duties, and insurance.</p><p><br></p><p>5. <strong>TITLE AND RISK OF LOSS.</strong> Title and Risk of Loss pass upon product delivery. Buyer agrees to maintain appropriate insurance coverage.</p><p><br></p><p>6. <strong>INSPECTION AND REJECTION.</strong> Buyer must inspect Products within ten (10) days of receipt. Nonconforming Products must be reported within the Inspection Period for resolution.</p><p><br></p><p>7. <strong>CHANGES AND CANCELLATIONS.</strong> Buyer may request changes, subject to Seller&#39;s approval. Cancellations require written approval and may incur fees.</p><p><br></p><p>8. <strong>WARRANTY.</strong> Seller warrants Products free from defects for a specified period. Limited warranty terms and conditions apply.</p><p><br></p><p>9. <strong>INTELLECTUAL PROPERTY RIGHTS.</strong> Seller retains all intellectual property rights associated with the Products.</p><p><br></p><p>10. <strong>CONFIDENTIALITY.</strong> Buyer shall not disclose business information without legal necessity.</p><p><br></p><p>11. <strong>COMPLIANCE WITH LAWS.</strong> Buyer agrees to comply with applicable laws and regulations.</p><p><br></p><p>12. <strong>WAIVER.</strong> No waiver by Seller is effective unless in writing and signed.</p><p><br></p><p>13. <strong>GOVERNING LAW AND DISPUTES.</strong> The contract is governed by the laws of the State of Texas. Disputes shall be referred exclusively to the courts in Harris County, Texas.</p><p><br></p><p>14. <strong>SURVIVAL AND SEVERABILITY.</strong> Certain provisions survive termination. If any term is invalid, it will be reformed to comply with applicable law.</p><p><br></p><p>15. <strong>LIMITATION OF LIABILITY.</strong> Seller&#39;s liability is limited; specific terms apply.</p><p><br></p><p>16. <strong>CLERICAL ERRORS AND PUBLISHED DATA.</strong> Stenographic errors may be corrected, and specifications should be verified.</p><p><br></p><p>17. <strong>PRECEDENCE.</strong> Inconsistent provisions follow a specified order: Terms, Quotation&#39;s terms, Purchase Order&#39;s terms, any Schedules, addenda, and Specifications.</p><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      value: null,
    },
  },
]
