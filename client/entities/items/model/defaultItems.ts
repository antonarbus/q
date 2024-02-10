import { nanoid } from 'nanoid'
import { boqRowType } from '../consts/boqRowType'
import { itemType } from '../consts/itemType'
import { type Item } from '../types'

export const defaultItems: Item[] = [
  {
    id: nanoid(3),
    type: itemType.text,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: `
        <p style="text-align: center; font-size: 24px;">Cover letter</p>
        <br>

        <p style="text-align: center;"><span>Here goes any technical and commercial information.</span></p>
        <br>

        <p style="text-align: center;"><span>You may...</span></p>
        <br>

        <ul>
          <li style="text-align: left;"><span>write, select and <span style="color: rgb(226, 80, 65);">format</span> text</span></li>
          <li style="text-align: left;"><span>insert tables, drop <a href="911.pdf" target="_blank" rel="noopener noreferrer">files</a>, images, attach videos</span></li>
          <li style="text-align: left;"><span>copy, cut, delete, insert, sort, resize blocks and rows</span></li>
          <li style="text-align: left;"><span>calculate prices</span></li>
          <li style="text-align: left;"><span>auto save data in browser</span></li>
          <li style="text-align: left;"><span>store and share quotations</span></li>
          <li style="text-align: left;"><span>review, track and update offers</span></li>
          <li style="text-align: left;"><span>save and search though products portfolio</span></li>
          <li style="text-align: left;"><span>copy items from other quotations</span></li>
          <li style="text-align: left;"><span>all elements are editable and customizable</span></li>
        </ul>
      `,
      value: null,
    },
  },
  {
    id: nanoid(3),
    type: itemType.boq,
    width: 600,
    height: 0,
    msg: '',
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
          id: nanoid(3),
          type: boqRowType.row,
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
          id: nanoid(3),
          type: boqRowType.row,
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
          id: nanoid(3),
          type: boqRowType.row,
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
    id: nanoid(3),
    type: itemType.boq,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    boq: {
      header: {
        title: {
          html: '<p><strong>Title 2</strong></p>',
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
          id: nanoid(3),
          type: boqRowType.row,
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
          id: nanoid(3),
          type: boqRowType.row,
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
          id: nanoid(3),
          type: boqRowType.row,
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
    id: nanoid(3),
    type: itemType.price,
    width: 150,
    height: 0,
    msg: '',
    isFroala: true,
    title: {
      html: '<p style="text-align: center;"><strong>Total price</strong></p>',
      value: null,
    },
    price: {
      html: '<p style="text-align: center;">280<strong></strong> <span>USD</span></p>',
      value: 280,
    },
  },
  {
    id: nanoid(3),
    type: itemType.text,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: `
        <p style="font-size: 24px; text-align: center;">Terms &amp; Conditions</p>
        <br>
        <p>1. <strong>APPLICABILITY AND ACCEPTANCE.</strong> These Terms govern the sale of products (Products) by the Seller to the Buyer. The Terms, along with a valid quotation, constitute the entire Agreement, and the Buyer can accept a quotation by issuing a purchase order.</p>
        <br>
        <p>2. <strong>PRICE.</strong> Prices are subject to change without notice. Prices indicated in the Purchase Order apply, and shipping fees are exclusive.</p>
        <br>
        <p>3. <strong>PAYMENT.</strong> Payments are due net thirty (30) days from the invoice date.</p>
        <br>
        <p>4. <strong>DELIVERY.</strong> Products are delivered according to the Quotation's International Commercial Term (Incoterms® 2010). Buyer is responsible for any applicable taxes, duties, and insurance.</p>
        <br>
        <p>5. <strong>TITLE AND RISK OF LOSS.</strong> Title and Risk of Loss pass upon product delivery. Buyer agrees to maintain appropriate insurance coverage.</p>
        <br>
        <p>6. <strong>INSPECTION AND REJECTION.</strong> Buyer must inspect Products within ten (10) days of receipt. Nonconforming Products must be reported within the Inspection Period for resolution.</p>
        <br>
        <p>7. <strong>CHANGES AND CANCELLATIONS.</strong> Buyer may request changes, subject to Seller's approval. Cancellations require written approval and may incur fees.</p>
        <br>
        <p>8. <strong>WARRANTY.</strong> Seller warrants Products free from defects for a specified period. Limited warranty terms and conditions apply.</p>
        <br>
        <p>9. <strong>INTELLECTUAL PROPERTY RIGHTS.</strong> Seller retains all intellectual property rights associated with the Products.</p>
        <br>
        <p>10. <strong>CONFIDENTIALITY.</strong> Buyer shall not disclose business information without legal necessity.</p>
        <br>
        <p>11. <strong>COMPLIANCE WITH LAWS.</strong> Buyer agrees to comply with applicable laws and regulations.</p>
        <br>
        <p>12. <strong>WAIVER.</strong> No waiver by Seller is effective unless in writing and signed.</p>
        <br>
        <p>13. <strong>GOVERNING LAW AND DISPUTES.</strong> The contract is governed by the laws of the State of Texas. Disputes shall be referred exclusively to the courts in Harris County, Texas.</p>
        <br>
        <p>14. <strong>SURVIVAL AND SEVERABILITY.</strong> Certain provisions survive termination. If any term is invalid, it will be reformed to comply with applicable law.</p>
        <br>
        <p>15. <strong>LIMITATION OF LIABILITY.</strong> Seller's liability is limited; specific terms apply.</p>
        <br>
        <p>16. <strong>CLERICAL ERRORS AND PUBLISHED DATA.</strong> Stenographic errors may be corrected, and specifications should be verified.</p>
        <br>
        <p>17. <strong>PRECEDENCE.</strong> Inconsistent provisions follow a specified order: Terms, Quotation's terms, Purchase Order's terms, any Schedules, addenda, and Specifications.</p>
      `,
      value: null,
    },
  },
]
