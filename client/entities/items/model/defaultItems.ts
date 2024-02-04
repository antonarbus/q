import { nanoid } from 'nanoid'
import { boqRowType } from '../consts/boqRowType'
import { itemType } from '../consts/itemType'
import { type Item } from '../types'

export const defaultItems: Item[] = [
  {
    id: nanoid(3),
    type: itemType.text,
    width: 800,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<div>editable text</div>',
      value: null,
    },
  },
  {
    id: nanoid(3),
    type: itemType.boq,
    width: 700,
    height: 0,
    msg: '',
    isFroala: true,
    boq: {
      header: {
        title: {
          html: '<p><strong>Title</strong></p>',
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
          width: 200,
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
            html: '<p>description 1</p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>10</p>',
            value: 10,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>1</p>',
            value: 1,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>10</p>',
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
            html: '<p>description 2</p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>20</p>',
            value: 20,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>2</p>',
            value: 2,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>40</p>',
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
            html: '<p>description 3</p>',
            value: 0,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          itemPrice: {
            html: '<p>30</p>',
            value: 30,
            pin: {
              isPinned: false,
              isShown: false,
            },
          },
          qty: {
            html: '<p>3</p>',
            value: 3,
            pin: {
              isPinned: true,
              isShown: false,
            },
          },
          price: {
            html: '<p>90</p>',
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
    type: itemType.text,
    width: 600,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: '<div>editable text</div>',
      value: null,
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
      html: '<p style="text-align: center;"><strong>140</strong> <span style="font-size: 16px; color: rgb(204, 204, 204);">EUR</span></p>',
      value: 140,
    },
  },
  {
    id: nanoid(3),
    type: itemType.text,
    width: 800,
    height: 0,
    msg: '',
    isFroala: true,
    text: {
      html: `
      <p style="font-size: 25px; margin-top: 20px; margin-bottom: 10px; text-align: center;">Terms &amp; Conditions</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>1. APPLICABILITY AND ACCEPTANCE.</strong> These General Terms and Conditions of Sale (&ldquo;Terms&rdquo;) are the only terms which govern the sale of products (&ldquo;Products&rdquo;) by Seller (&ldquo;Seller&rdquo;) to a Buyer (&ldquo;Buyer&rdquo;). These Terms, together with a valid quotation, contain the entire Agreement associated with this transaction and Buyer may accept a quotation by issuing a purchase order.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>2. PRICE.</strong> All Prices and applicable discounts are subject to change without notice, however, Buyer&rsquo;s order for the Products shall be invoiced at the prices indicated in the Purchase Order and in accordance with these Terms.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>2.1 QUOTED PRICES.</strong> All Prices are quoted ExWorks (EXW) (Incoterms &reg; 2010) Seller&#39;s factory or such other place Seller shall designate on the Quotation.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>2.2 SHIPPING FEES.</strong> Prices are exclusive of shipping fees, loading, and unloading costs.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>2.3 TAXES AND DUTIES.</strong> Buyer shall be responsible for payment of any applicable taxes or duties that may be levied by relevant government authorities, and if payable or paid by Seller, then added to the Price.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>2.4 REMOVAL, INSTALLATION, AND SERVICE CALLS.</strong> Prices are exclusive of extraneous expenses and costs, including shipping, travel, removal and installation costs, service call costs, which shall be invoiced to Buyer.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>3. PAYMENT.</strong> Unless otherwise agreed, payments are due net thirty (30) days from date of invoice.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>3.1 LATE PAYMENTS.</strong> Late payments shall bear interest from the due date of payment at a monthly rate equal to five percent (5%). In the event Buyer is late on payments or Seller has reasonable cause to believe Buyer is unable to pay, Seller may.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>4. DELIVERY.</strong> Products delivered under the contract shall be delivered pursuant to the Quotation&rsquo;s International Commercial Term (Incoterms &reg; 2010). In no event shall Seller insure shipment beyond the delivery point. Products not picked up in accordance with the agreed upon shipment dates, shall be treated as cancelled.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>4.1 NO DAMAGES FOR DELAY.</strong> In no event shall Buyer be entitled to monetary compensation for any delay unless otherwise expressly agreed to in writing by the Parties. Buyer hereby waives and releases Seller from any and all loss, cost, expense, or damages arising out of any delays.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>5. TITLE AND RISK OF LOSS.</strong> Title and Risk of Loss shall pass when the Products are delivered. Seller shall retain a security interest in the products and their proceeds until paid in full.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>5.1 INSURANCE.</strong> Buyer agrees to maintain appropriate insurance coverage to cover its risks under this Agreement.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>6. INSPECTION AND REJECTION OF NONCONFORMING PRODUCTS.</strong> Buyer shall inspect the Products within ten (10) days of receipt to the &ldquo;ship to&rdquo; location (&ldquo;Inspection Period&rdquo;). If Products do not materially comply with the Purchase Order&rsquo;s requirements, Buyer may reject the nonconforming products at any time during the Inspection Period. Failure to reject nonconforming products within the Inspection Period an in accordance with section 6.1 below will be deemed acceptance.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>6.1 NONCONFORMING PRODUCTS.</strong> In the event Buyer finds any nonconforming Products, Buyer shall send written notice to Seller no later than the last day of the Inspection Period. Seller shall, in its sole discretion: (a) replace the nonconforming Products with conforming Products without additional expense to Buyer, or (b) credit or refund the Price for the nonconforming Products together with any reasonable shipping and handling expenses incurred by Buyer in connection therewith. Buyer shall ship, at its expense and risk of loss, the nonconforming Products to the Bray factory or such other place Seller shall designate. Seller shall credit Buyers&rsquo; expenses for shipment once Seller confirms the non-conformance.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>6.2 LIMITATION.</strong> Buyer may not reject a Product based on tests which Seller does not conduct.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>7. CHANGES.</strong> Buyer shall promptly notify Seller in writing of any change to the Purchase Order Buyer reasonably determines are necessary. Seller may accept the change order at its own discretion. If Seller accepts the change order, then Seller will promptly notify Buyer of the impact the requested change will have on (a) the Purchase Order&rsquo;s price; (b) the time for performance; and (c) any other terms or conditions of this Agreement.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>7.1 CANCELLATIONS AND RETURNS.</strong> Buyer may not cancel accepted purchase order without Seller&rsquo;s prior written approval which may be granted at Seller&rsquo;s discretion. Any orders Seller holds for more than sixty (60) days shall be treated as a cancelled and the Products deemed returned and subject to section 7.2 below.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>7.2 MODIFICATIONS AND CANCELLATION FEES.</strong> Seller will not accept changes or cancellations of Products, whether standard, non-standard or special, without full reimbursement of all related expenses incurred to date. Any changes or cancellations of Projects will be subject to appropriate changes in discounts, freight costs and other charges to Buyer. Any credit will be subject to shipping, restocking and reconditioning fees.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>8. WARRANTY.</strong> Seller warrants to Buyer that for a period ending as of the earlier of twelve (12) months from the installation date or eighteen (18) months from the shipment date (as applicable, the &ldquo;Warranty Period&rdquo;), Products manufactured by Seller will be free from defects in materials and workmanship when used for the purposes for which they were designed and manufactured.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>8.1 LIMITED WARRANTY.</strong> Seller does not warrant the Products: (i) against chemical or stress corrosion; (ii) against any other failure other than from defects in materials or workmanship; (iii) from any defective third party products contained in, incorporated into, attached to or packaged together with the Products; (iv) any defect when the Product is altered, modified, or repaired without Seller&rsquo;s prior written approval; and (v) any defect caused by Buyer&rsquo;s failure to follow Seller&rsquo;s oral or written instructions as to storage, installation, commissioning, use or maintenance of the Products. Further, Seller shall not be liable for a breach of the warranty if Buyer makes any further use of such Products after giving notice described in section 8.2 below</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>8.2 WARRANTY CLAIM.</strong> Seller shall not be liable for a breach of the warranty set forth herein unless: (i) Buyer gives written notice to Seller of the defect during the Warranty Period and, in any event, within fourteen (14) days of the time when Buyer discovers or should have reasonably discovered the defect; (ii) Seller is given a reasonable opportunity after receiving the notice to examine such Products, and Buyer (if requested to do so by Seller) returns such Products to Bray&rsquo;s factory or such other place Seller shall designate for the examination to take place; and (iii) Seller reasonably verifies Buyer&rsquo;s claim that the Products are defective. Buyer shall return (freight prepaid) the defective Product to Bray at Bray&rsquo;s factory or such other place that Seller shall designate no later than ninety (90) days from Buyer&rsquo;s initial written notice of defect to Seller. Upon Seller&rsquo;s confirmation of Products in breach of the warranty provided herein, Seller shall credit Buyer&rsquo;s expense for shipment against Buyer&rsquo;s payment obligations to Seller and, if Seller exercises its option to replace such defective Products, Seller shall ship to Buyer the replaced Products and the terms set herein shall apply for such replaced Products, except that Seller shall be responsible for the shipment&rsquo;s costs and expenses. Seller shall, in its sole discretion, either: (i) repair or replace such Products (or the defective part) or (ii) credit or refund the price of such Products at the pro rata contract rate provided that, if Seller so requests, Buyer shall, at Seller&rsquo;s expense, return such Products to Seller. If Seller determines Buyer claim is not covered by this Warranty, Buyer shall bear all costs associated with Seller&rsquo;s service and shall indemnify Seller for any verified cost, loss, claims, and expenses Seller incurs as a result of, arising out of, or incurred in connection with the Service Call. THE REMEDIES SET HEREIN SHALL BE THE BUYER&rsquo;S SOLE AND EXCLUSIVE REMEDY AND SELLER&rsquo;S SOLE AND ENTIRE LIABILITY FOR ANY BREACH OF WARRANTY. SELLER MAKES NO REPRESENTATIONS AND NO OTHER WARRANTIES OR CONDITIONS ON THE PERFORMANCE OF THE WORK, THE PRODUCTS, WHETHER EXPRESS, IMPLIED, STATUTORY, OR WHETHER IN ANY OTHER PROVISION OF THIS AGREEMENT OR OTHER COMMUNICATION WITH BUYER. SELLER SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OR CONDITION OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>9. INTELLECTUAL PROPERTY RIGHTS.</strong> All copyrights, patents, trademarks, trade secrets, know-how and other intellectual property or proprietary rights pursuant to the laws of any jurisdiction worldwide (&ldquo;IP Rights&rdquo;) associated with or relating to the Products shall belong solely and exclusively to Seller. Seller will retain all IP Rights used to create, embodied in, used in and otherwise relating to the Products and any of their component parts, and Buyer shall not acquire any ownership interest in any of Seller&rsquo;s IP Rights. Buyer shall use Seller&rsquo;s IP Rights only in accordance with these Terms and any instructions of Seller. No license, either express or implied, is granted in any IP Rights of Seller. If Buyer acquires any IP Rights in or relating to any Product by operation of law or otherwise, such rights are deemed and are hereby irrevocably assigned to Seller without further action. Buyer shall, at Seller&rsquo;s expense, execute such documents and do such things as are necessary to enable Seller to protect its IP Rights.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>10. CONFIDENTIALITY.</strong> Except as required by law or as necessary to carry out this Agreement, Buyer shall not disclose to any person any business financial, or commercial information, including pricing, technical data and information, with respect to this Agreement.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>11. COMPLIANCE WITH LAWS.</strong> Buyer agrees to abide by all federal, state, and local laws, ordinances and regulations, licenses, permissions, authorizations, consents and permits that it needs to carry out its obligations under the Agreement, including but not limited to, Section 1502 of the Dodd-Frank Act related to conflict minerals; all provisions of the Copeland &ldquo;Anti-Kickback&rdquo; Act (18 U.S.C. &sect; 874) as supplemented by the Department of Labor&rsquo;s regulations (29 C.F.R. part 3); and Foreign Corrupt Practices Act (15 U.S.C. &sect;&sect; 78dd-1 and 2). Furthermore, to the extent where applicable, the Parties agree to comply with the following: the Federal Labor Standard Act of 1938 as amended; Executive Order 11246; EEO-1 Reporting; Vietnam Era&rsquo;s Veterans&rsquo; Readjustment Assistance Act; Affirmative Action and Equal Opportunity for Workers with Disabilities (48 C.F.R. &sect; 52.222-36, and 41 C.F.R. &sect; 60- 741.5.); and Utilization of Small Business Concerns (48 C.F.R. &sect; 52.219-8 et. seq.) Import and Export. The Parties have and shall maintain in effect all the licenses, permissions, authorizations, consents and permits needed to carry out their obligations under the Order. The Parties shall comply with all export and import laws of all countries involved in the sale and transportation of Goods under this Order.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>12. WAIVER.&nbsp;</strong> No waiver by Seller of any of the provisions of these Terms or the Agreement is effective unless explicitly set forth in writing and signed by Seller. No failure to exercise, or delay in exercising, any rights, remedy, power or privilege arising from these Terms operates or may be construed as a waiver thereof. No single or partial exercise of any right, remedy, power or privilege hereunder precludes any other or further exercise thereof or the exercise of any other right, remedy, power or privilege.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>13. RELATIONSHIP OF THE PARTIES.</strong> The legal relationship between the parties shall be that of buyer and seller, i.e., independent contractors, and shall not be understood so that either party is deemed a partner or an agent of the other party, nor will it confer upon either party the right or power to bind the other party in any contract or to the performance of any obligations as to any third party. These Terms and the Agreement are for the sole benefit of the Seller and Buyer and their respective successors and permitted assigns, and nothing herein, express or implied, is intended to or shall confer upon any other person or entity any legal or equitable right, benefit or remedy of any nature whatsoever under or by reason of these Terms.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>14. GOVERNING LAW.</strong> This Contract shall be governed by and construed in accordance with the laws of the State of Texas, without giving effect to its principles of conflicts of laws.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>15. DISPUTES.</strong> Disputes that may arise between the parties relating to this Contract shall be referred exclusively to the courts of competent jurisdiction in Harris County, Texas. No action under this agreement may be brought more than two (2) years after it accrues.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>16. SURVIVAL.</strong> The provisions of these Terms and Conditions, which by nature are intended to survive termination, cancellation, completion or expiration of the Agreement (No Set-Off; No Damages for Delay; Warranty; Limitation of Liability; Intellectual Property Rights; Governing Law; Disputes; Severability) shall continue as valid and enforceable obligations of the parties, notwithstanding any such termination, cancellation, completion or expiration.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>17. SEVERABILITY.</strong> If any term is invalid or unenforceable under any statute, regulation, ordinance, executive order, or other rule of law, the term will be deemed reformed or deleted as the case may be, but only to the extent necessary to comply with applicable law. The remaining provisions of these Terms and Conditions will remain in full force and effect.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>18. LIMITATION OF LIABILITY.</strong> IN NO EVENT SHALL SELLER BE LIABLE FOR COSTS OF PROCUREMENT OF SUBSTITUTE GOODS BY BUYER. MOREOVER SELLER SHALL NOT BE LIABLE FOR CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR PUNITIVE DAMAGES, LOST PROFITS, OR REVENUES OR DIMINUTION IN VALUE, ARISING OUT OF OR RELATING TO A BREACH OF THESE TERMS, WHETHER OR NOT BUYER DISCLOSED THE POSSIBILITY OF SUCH DAMAGES IN ADVANCE, OR SELLER COULD HAVE REASONABLY FORESEEN THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF THE LEGAL OR EQUITABLE THEORY (CONTRACT, TORT, OR OTHERWISE) UPON WHICH THE CLAIM IS BASED. MOREOVER, IN NO EVENT SHALL SELLER&rsquo;S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO ANY PRODUCT EXCEED THE TOTAL OF THE AMOUNTS PAID UNDER THE APPLICABLE PURCHASE ORDER.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>19. CLERICAL ERRORS AND PUBLISHED DATA.</strong> Stenographic and clerical errors or omissions may be correct at any time. Seller is not liable for misinterpreted specifications after making a bona-fide effort. Buyer shall verify products and materials quoted conform to any applicable specifications and/or quantities. All published dimensions, weights, temperatures, pressure ratings, and other data are approximate; if critical, consult factory.</p>
      <p><br></p>      
      <p style="font-size: 14px; text-align: justify;"><strong>20. PRECEDENCE.&nbsp;</strong> In the event of any inconsistent provisions in this Agreement, these Terms shall take precedence, followed by the Quotation&rsquo;s terms, and then by the Purchase Order&rsquo;s terms, any Schedules, addenda, and Specifications.</p>
      <p><br></p>     
`,
      value: null,
    },
  },
]
