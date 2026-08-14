import Link from "next/link";

import styles from "./terms.module.css";

export const metadata = {
  title: "Terms and Conditions | Wisper Studios",
  description: "Wisper Studios Terms and Conditions.",
};

const TERMS_SECTIONS = [
  {
    title: "1. Definitions & Interpretation",
    clauses: [
      "1.1 Definitions used in this Agreement are defined in Schedule 1.",
      "1.2 Definitions which are relevant and used only within a particular clause or Schedule are defined in that clause or Schedule.",
    ],
  },
  {
    title: "2. Appointment & Scopes of Work",
    clauses: [
      "2.1 During the Term, the Agency shall perform the Services and (where relevant) shall supply the Deliverables as described in the applicable Order Form, which shall set out the scope of work, phases (if applicable), Deliverables, timelines, assumptions and any limitations or exclusions.",
      "2.2 The parties may agree new Projects from time to time by agreeing a new Order Form in writing. Once an Order Form is signed by both parties, such Order Form shall automatically form part of this Agreement.",
      "2.3 The Agency will not be obliged to perform any work on behalf of the Client until the Order Form has been signed by both parties.",
      "2.4 The Client acknowledges that the Services include creative, strategic, branding, design, website, content production, marketing and digital services, including brand identity development, visual assets, website design and development, content creation, campaign assets and related Deliverables. The Agency shall not be responsible for the Client’s commercial performance unless expressly agreed in writing.",
      "2.5 The Agency does not warrant or guarantee that the Services or Deliverables will achieve any particular commercial, marketing, brand, audience growth, engagement, conversion, SEO, traffic or performance outcome. Any projections, estimates, benchmarks or indicative results provided in proposals, presentations or discussions are illustrative only and do not constitute contractual commitments.",
      "2.6 Where the Services are provided on a recurring or retainer basis, the applicable Order Form shall specify the monthly Deliverables, any assumptions, review process and Fees. Unless otherwise stated in the applicable Order Form, any unused capacity, deliverables or review rounds in a given month shall not roll over to future months.",
    ],
  },
  {
    title: "3. Term",
    clauses: [
      "3.1 This Agreement shall commence on the Effective Date and shall continue until terminated in accordance with clause 16.",
      "3.2 Each Project shall commence on the date specified in the applicable Order Form and shall continue until completion of the Services and delivery of the Deliverables specified in that Order Form, unless terminated earlier in accordance with this Agreement.",
    ],
  },
  {
    title: "4. Client’s Obligations",
    clauses: [
      "4.1 The Client will give the Agency full and clear instructions as to its requirements for the Services and Deliverables to be included in an Order Form, including full details of the dates by which each stage of the proposed Services and Deliverables are to commence and finish. The Client will give the Agency clear briefings and ensure that all information and materials provided to the Agency are accurate and complete in all material respects. The Client will promptly inform the Agency if the Client considers that any Deliverables submitted to the Client by the Agency for approval are false or misleading or in any way contrary to law.",
      "4.2 The Client will promptly supply to the Agency (at no charge) any Client Materials reasonably required by the Agency or otherwise necessary to provide the Services and Deliverables and shall ensure that it has all rights and licences in place to enable use by the Agency of all Client Materials.",
      "4.3 The Client shall provide the Agency (and its permitted subcontractors) with timely access to the Client’s relevant systems, accounts and platforms as reasonably required to perform the Services, including administrative access where necessary. The Client warrants that it has authority to grant such access and that doing so does not breach any third-party terms. The Client is responsible for maintaining the security of its accounts, including the use of appropriate access controls and multi-factor authentication.",
      "4.4 If the Client does not fulfil its obligations under or in connection with this Agreement (including its payment obligations), then to the extent that such failure prevents the Agency from performing any Services and/or providing any Deliverables in accordance with this Agreement, the Agency will be relieved of its obligations to the Client, and the Agency shall not be liable for any Losses incurred by the Client as a result of any such failure.",
      "4.5 The Client acknowledges that timelines are dependent on timely provision of content, materials, feedback and approvals, and delays may result in revised timelines and/or additional Fees.",
    ],
  },
  {
    title: "5. Service Delivery",
    clauses: [
      "5.1 The Agency will give the Client full and clear instructions as to the Client Materials it reasonably requires for the purposes of performing the Services and providing the Deliverables.",
      "5.2 The Client acknowledges that the quality, timing and effectiveness of the Services depends materially on:",
      "(a) the timely provision of accurate information, content and materials;",
      "(b) timely access to relevant systems, platforms and accounts;",
      "(c) the Client’s timely review, feedback and approvals;",
      "(d) the accuracy and completeness of Client Materials; and",
      "(e) any assumptions, dependencies and limitations set out in the applicable Order Form.",
      "5.3 The Agency shall not be liable for any failure to achieve anticipated results where such failure arises from the Client’s acts, omissions, delays or business decisions.",
      "5.4 The Agency shall:",
      "(a) apply such time, attention, and reasonable skill and care as may be necessary or appropriate for its proper performance of the Services and provision of the Deliverables;",
      "(b) comply with all lawful and reasonable directions regarding the Services and Deliverables communicated to it from time to time by the Client (provided such directions do not materially deviate from or add to the Order Form and any such material amendment must be agreed in accordance with clause 7.1);",
      "(c) keep Client Materials reasonably safe and secure while they are in the possession or control of the Agency; and",
      "(d) deliver all Deliverables by the dates set out in the applicable Order Form or any other delivery date(s) agreed by the parties in writing.",
      "5.5 If at any time the Agency becomes aware that it may not be able to perform the Services or deliver any Deliverables by any date set out in the applicable Order Form (or any other deadline agreed by the parties in writing), the Agency will promptly notify the Client and give details of the reasons for the delay.",
      "5.6 Where the Services are delivered in phases (including strategy, design and development), the Client shall review and approve Deliverables at the end of each phase. Approval (including via email) shall constitute acceptance of that phase.",
      "5.7 Unless otherwise specified in the Order Form, the Client shall provide feedback within 5 Business Days of delivery. If no feedback is received within that period, the Deliverables shall be deemed accepted.",
      "5.8 Any changes requested after approval of a Deliverable or phase shall be treated as a change request in accordance with clause 7.",
      "5.9 Where Deliverables include a website or digital product, the Agency shall not be responsible for hosting environments, third-party platforms (including Webflow), plugins, integrations, or any changes made by the Client or third parties following delivery.",
    ],
  },
  {
    title: "6. Personnel",
    clauses: [
      "6.1 The Agency will allocate suitable personnel with appropriate levels of experience and seniority to provide the Services. The Client acknowledges and agrees that it may be necessary for the Agency to replace the personnel providing the Services with alternative personnel with similar levels of seniority and experience.",
    ],
  },
  {
    title: "7. Amendments and Cancellations",
    clauses: [
      "7.1 In the event that either party wishes to make any material amendment to a Project, any such amendment shall be subject to the agreement of both parties in writing.",
      "7.2 In the event of any amendment to a Project by the Client, the Fees payable to the Agency in respect of the amended Project shall be amended to reflect the scope of the new Services agreed. Pending approval of any amendments to a Project, the Agency shall (unless otherwise agreed) continue to perform and be paid for the Services as if such change had not been requested.",
      "7.3 Where an Order Form provides for recurring or monthly Services, any request that materially exceeds the agreed Deliverables, output volume, channels, complexity or review rounds shall constitute a change to scope and may result in revised Fees or a revised Order Form.",
    ],
  },
  {
    title: "8. Fees",
    clauses: [
      "8.1 The Agency will invoice the Client in respect of all Fees, Expenses and Third Party Costs.",
      "8.2 The Fees will be invoiced in accordance with the payment terms set out in the applicable Order Form and shall be payable within fourteen (14) days of the date of the relevant invoice.",
      "8.3 The Expenses and Third Party Costs will be invoiced in accordance with the payment terms set out in the applicable Order Form and shall be payable within three (3) days of the date of the relevant invoice.",
      "8.4 All sums stated in this Agreement or in any Order Form, quotation or estimate exclude VAT and any other applicable sales tax (unless otherwise stated) which shall also be payable by the Client at the rate prevailing from time to time.",
      "8.5 In the event that the Client fails to make any payment in full when due to the Agency under this Agreement, then without prejudice to its other rights and remedies under or in connection with this Agreement or otherwise in law, the Agency shall be entitled to charge the Client interest on such overdue sum at the rate of 4% above the base rate of the Bank of England in force from time to time calculated from the due date up to the date of payment.",
      "8.6 If the Client is overdue with any payment hereunder, then without prejudice to the Agency’s other rights or remedies:",
      "(a) the Agency shall have the right to suspend performance of the Services immediately until the Agency has received payment of the overdue amount together with any accrued interest; and/or",
      "(b) the Agency shall have the right to terminate the applicable Order Form immediately upon seven (7) days’ written notice to the Client.",
      "8.7 Where Fees are payable in stages or milestones, the Agency shall not be obliged to commence or continue work unless the relevant payment has been received.",
      "8.8 Unless expressly stated otherwise in the applicable Order Form, the Fees are charged on a deliverable or fixed-fee basis and not by reference to time spent. Any additional work outside scope may be charged separately in accordance with clause 7.",
      "8.9 Unless otherwise stated in the applicable Order Form, Fees paid in advance are non-refundable. Where the Client delays, pauses or reschedules a Project, the Agency may reallocate resources and revise delivery dates accordingly.",
    ],
  },
  {
    title: "9. Third Party Services & Costs",
    clauses: [
      "9.1 The Services may involve the use of third-party platforms, software and tools, including without limitation hosting providers, Webflow, CMS platforms, plugins, APIs, font libraries, stock asset libraries, analytics tools, domain registrars and other digital service providers. The Agency does not control such third-party services and shall not be liable for:",
      "(a) outages, downtime or service interruptions;",
      "(b) changes to pricing, features, functionality, terms or policies;",
      "(c) suspension, restriction or termination of accounts;",
      "(d) failures or limitations in third-party integrations;",
      "(e) defects or inaccuracies in third-party services or materials; or",
      "(f) enforcement action or decisions taken by such third-party providers.",
      "9.2 Any third-party platforms, software, tools, data sources, licences, subscriptions, domains, email accounts and similar third-party services used in connection with the Services may involve additional costs payable by the Client (whether directly to the provider or via the Agency) (“Third Party Costs”). Third Party Costs are used subject to the relevant provider’s terms and at the Client’s risk.",
      "9.3 The Agency will advise the Client promptly of any material changes in the estimated Third Party Costs.",
      "9.4 In the event that any Third Party Costs require payment in advance or sooner than the payment terms set out in clause 8.3, the Agency will notify the Client as soon as reasonably practicable in advance and the Client shall pay such costs within the period set out in the relevant invoice.",
    ],
  },
  {
    title: "10. Confidentiality",
    clauses: [
      "10.1 Each of the parties acknowledges that, whether by virtue of and in the course of this Agreement or otherwise, it may receive or otherwise become aware of information relating to the other party, its clients, customers, businesses, business plans or affairs, which information is proprietary and confidential to the other party (“Confidential Information”).",
      "10.2 Confidential Information shall include any document marked “Confidential”, or any information which the recipient has been informed is confidential or which it ought reasonably to expect the other party would regard as confidential.",
      "10.3 Confidential Information shall exclude information which:",
      "(a) at the time of receipt by the recipient is in the public domain;",
      "(b) subsequently comes into the public domain through no fault of the recipient, its officers, employees or agents;",
      "(c) is lawfully received by the recipient from a third party on an unrestricted basis; and/or",
      "(d) is already known to the recipient before receipt hereunder.",
      "10.4 Each of the parties undertake to maintain the confidentiality of the other party’s Confidential Information at all times and to use no less adequate measures than it uses in respect of its own confidential information to keep the other party’s Confidential Information reasonably secure. Neither party shall at any time, whether during the Term or at any time thereafter, without the prior written approval of the other party, use, disclose, exploit, copy or modify any of the other party’s Confidential Information, or authorise or permit any third party to do the same, other than for the sole purpose of the exercise of its rights and/or the performance of its obligations in connection with this Agreement.",
      "10.5 Each of the parties undertakes to disclose the other party’s Confidential Information only to those of its Associates to whom, and to the extent to which, such disclosure is necessary for the purposes contemplated under this Agreement.",
      "10.6 Neither party shall be in breach of this clause 10 if it discloses the other party’s Confidential Information in circumstances where such disclosure is required by law, regulation or order of a competent authority, provided that the other party is given reasonable advance notice of the intended disclosure and a reasonable opportunity to challenge the same.",
      "10.7 The terms of and obligations imposed by this Clause 10 shall survive the termination of this Agreement for any reason.",
    ],
  },
  {
    title: "11. Agency Warranties",
    clauses: [
      "11.1 The Agency warrants and undertakes that:",
      "(a) it has full power and authority to enter into this Agreement and that by doing so it will not be in breach of any obligation to a third party;",
      "(b) the use of the Deliverables by the Client in accordance with this Agreement and for the purposes set out in the applicable Order Form, excluding any Client Materials and any third-party materials, shall not infringe the Intellectual Property Rights of any third party.",
    ],
  },
  {
    title: "12. Client Warranties",
    clauses: [
      "12.1 The Client warrants and undertakes that:",
      "(a) it has full power and authority to enter into this Agreement and that by doing so it will not be in breach of any obligation to a third party;",
      "(b) the Client Materials will not, when used in accordance with this Agreement and any written instructions given by the Client, infringe third party copyright;",
      "(c) to the best of its knowledge and belief, the Client Materials will comply with all applicable laws and regulations;",
      "(d) the Client Materials are accurate and complete in all material respects; and",
      "(e) the Client is solely responsible for ensuring that any Client Materials, claims, statements, content, imagery, marketing materials and other materials supplied to the Agency or approved by the Client for inclusion in the Deliverables comply with applicable laws and regulations, and the Client warrants that it has all necessary rights, consents and lawful bases required for the Agency to use them in connection with the Services.",
    ],
  },
  {
    title: "13. Liability",
    clauses: [
      "13.1 Nothing in the Agreement excludes or limits the liability of either party for fraud or fraudulent misrepresentation, or in respect of any other liability which cannot by law be limited or excluded.",
      "13.2 Subject to clause 13.1, neither party shall be liable to the other party for any loss, whether direct, indirect, or incidental, of business, profits, revenue, anticipated savings, loss of or depletion of goodwill, loss of or corruption of data, compensatory or restitutionary payments to any third party, any indirect, consequential, incidental, special, exemplary, or punitive loss or damage arising out of or related to the Services, or this Agreement, or, in each case, however arising, whether in contract, tort (including negligence), breach of statutory duty or otherwise, and whether or not either party was aware of the possibility of such loss arising even if each party has been advised of the possibility of such losses.",
      "13.3 Subject to clause 13.1, clause 13.2, and clause 13.4, each party’s total aggregate liability to the other party under or in connection with the Agreement whether under contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the Fees paid by Client to the Agency pursuant to a Order Form related to the liability in the 12 months prior to the event giving rise to the liability. If no Order Form is then in effect or if multiple Order Forms are related to the liability, the Fees referenced in the prior sentence refers to the most recent Order Form executed between the parties.",
      "13.4 Subject to clause 13.1, the parties agree that the limitations described in clause 13.3 shall not apply to:",
      "(a) Client’s obligation to pay all amounts due hereunder; or",
      "(b) a breach by either party of clause 10 (Confidentiality);",
      "13.5 The parties agree that the foregoing limitations on each party’s liability form the basis of the bargain in relation to this Agreement, are necessary for Agency to provide the Services and to enter into this Agreement, and that without such limitations the parties would not enter into this Agreement.",
      "13.6 The Agency shall not be liable for any claim based solely on subjective dissatisfaction with creative Deliverables, provided that such Deliverables materially conform with the applicable Order Form.",
    ],
  },
  {
    title: "14. Indemnity",
    clauses: [
      "14.1 Each party (the “Indemnifying Party”) shall indemnify and keep indemnified the other party, including its officers, directors, and employees (the “Indemnified Party”), against any and all losses, liabilities, damages, costs, and expenses (including reasonable legal fees) incurred by the Indemnified Party arising from or in connection with any claim brought by a third party, but only to the extent that such claim arises out of or relates to a breach by the Indemnifying Party of any warranty expressly given by it in this Agreement.",
    ],
  },
  {
    title: "15. Intellectual Property Rights",
    clauses: [
      "15.1 All intellectual property rights in methodologies, frameworks, templates, processes, tools and know-how used or developed by the Agency in performing the Services shall remain the property of the Agency.",
      "15.2 Subject to payment in full of all Fees, the Agency assigns to the Client all Intellectual Property Rights in the final Deliverables created specifically for the Client under the applicable Order Form, excluding any Agency Proprietary Materials and any third-party materials.",
      "15.3 Nothing in clause 15.2 shall transfer to the Client any ownership of Agency Proprietary Materials or any third-party materials, except to the extent incorporated into the final Deliverables, and the Client shall not exploit any such excluded materials separately from the final Deliverables without the Agency’s prior written consent.",
      "15.4 Subject to clause 10, the Agency may use Deliverables for portfolio, case studies and marketing purposes once such Deliverables have been made public by the Client, unless otherwise agreed in writing.",
      "15.5 Unless expressly stated otherwise in the applicable Order Form, working files, source files, editable design files and other production files are excluded from the Deliverables and shall remain the property of the Agency.",
    ],
  },
  {
    title: "16. Termination",
    clauses: [
      "16.1 Either party may terminate this Agreement at any time without cause after expiry of all Order Forms by giving not less than 3 months written notice to the other party.",
      "16.2 Where an Order Form specifies a fixed Initial Term, the Client may not terminate for convenience during that Initial Term. If the Client terminates during the Initial Term without cause, all Fees due for the remainder of that Initial Term shall become immediately payable.",
      "16.3 Either party may terminate this Agreement or any Project immediately upon written notice to the other party:",
      "(a) in the event of any material breach of this Agreement by the other party which breach is not remediable or, if remediable, is not remedied within thirty (30) days after the service by the party not in default of a written notice on the defaulting party, specifying the nature of the breach and requiring such breach to be remedied; or",
      "(b) if the other party suspends, or threatens to suspend payment of its debts or is unable to pay its debts as they fall due, or is deemed unable to pay its debts within the meaning of section 123 of the Insolvency Act 1986; or",
      "(c) if the other party commences negotiations with all or any class of its creditors with a view to rescheduling any of its debts, or makes a proposal or enters into any compromise or arrangement with its creditors (other than for the sole purpose of a solvent reconstruction or a scheme for a solvent amalgamation of that other party with other companies); or",
      "(d) if a petition is filed, or a notice is given, or a resolution is passed or an order is made for or in connection with the winding up of that other party (other than for the sole purpose of a solvent reconstruction or a scheme for a solvent amalgamation of that other party with other companies); or",
      "(e) if an application is made to court, or an order is made, for the appointment of an administrator, or if a notice of intention to appoint an administrator is given or if an administrator is appointed over the other party.",
    ],
  },
  {
    title: "17. Consequences of Termination",
    clauses: [
      "17.1 Termination of a Project in accordance with the terms of this Agreement by either party shall not serve to terminate this Agreement which shall continue in full force and effect.",
      "17.2 Provisions of this Agreement which are either expressed to survive its termination or which from their nature or context are contemplated to survive termination shall remain in full force and effect notwithstanding termination of this Agreement. Notwithstanding the generality of the foregoing, the following clauses shall survive termination of this Agreement:",
      "(a) Clause 10 (Confidentiality);",
      "(b) Clause 13 (Liability);",
      "(c) Clause 15 (Intellectual Property Rights);",
      "(d) Clause 18 (Non-Solicitation);",
      "(e) Clause 20 (Notices); and",
      "(f) Clause 25 (Governing law and jurisdiction).",
    ],
  },
  {
    title: "18. Non-Solicitation",
    clauses: [
      "18.1 During the Term and for a further period of 12 months after its termination, neither party shall (except with the prior written approval of the other party) directly or indirectly solicit or entice away (or attempt to solicit or entice away) from the employment of the other party any person employed or engaged by such other party either in the provision or receipt of any Services or Deliverables, other than by means of a national advertising campaign open to all comers and not specifically targeted at any of the staff of the other party. Further, the Client shall not engage directly any employee or contractor of the Agency introduced through the Services during the Term and for 12 months thereafter without paying a recruitment fee equal to 30% of the individual’s annual remuneration.",
    ],
  },
  {
    title: "19. Force Majeure",
    clauses: [
      "19.1 Neither party shall be liable for any delay in performing or failure to perform its obligations hereunder to the extent that and for so long as the delay or failure results from any act, event, non-happening, omission or accident beyond its reasonable control (a “Force Majeure Event”).",
      "19.2 Force Majeure Events shall include but not be limited to the following events affecting either party or its Associates:",
      "(a) strikes, lock-outs or other industrial action (other than strikes, lock-outs or other industrial action of any Associates of the party seeking to rely on the Force Majeure Event);",
      "(b) civil commotion, riot, invasion, war (whether declared or not), terrorism, or threat of or preparation for war or terrorist attack;",
      "(c) fire, explosion, storm, flood, earthquake, subsidence, epidemic, pandemic or other natural disaster;",
      "(d) impossibility of the use of railways, shipping, aircraft, motor transport or other means of public or private transport; and/or",
      "(e) compliance with any law or governmental order, rule, regulation or direction.",
      "19.3 The party whose performance is affected by a Force Majeure Event shall, as soon as reasonably practicable after becoming aware of the Force Majeure Event, provide a written notice to the other party, giving details of the Force Majeure Event, its likely duration and the manner and extent to which its obligations are likely to be prevented or delayed.",
      "19.4 If any Force Majeure Event occurs, the date(s) for performance of the affected obligation(s) shall be postponed for so long as is made necessary by the Force Majeure Event, provided that if any Force Majeure Event continues for a period of or exceeding two (2) months, the non-affected party shall have the right to terminate this Agreement immediately on written notice to the affected party. Each party shall use its reasonable endeavours to minimise the effects of any Force Majeure Event.",
    ],
  },
  {
    title: "20. Notices",
    clauses: [
      "20.1 Subject to clause 20.2, any notice required to be given under the Agreement shall be in writing and shall be delivered by hand, sent by pre-paid first-class post, recorded delivery post or by email to the other party at its address set out in the Order Form (or such other address as may have been notified by that party for such purposes).",
      "20.2 A notice delivered by hand shall be deemed to have been received when delivered (or if delivery is not during business hours, at 09.00 am London, U.K. time on the first business day following delivery). A correctly addressed notice sent by pre-paid first-class post or recorded delivery post shall be deemed to have been received at the time at which it would have been delivered in the normal course of post. Notices sent by email shall be deemed to have been received at the time the email enters the information system of the intended recipient provided that no error message indicating failure to deliver has been received by the sender.",
    ],
  },
  {
    title: "21. Assignment and Sub-Contracting",
    clauses: [
      "21.1 The Agency shall be entitled to sub-contract its performance of the Services and/or Deliverables provided that any sub-contracting shall not relieve the Agency from its obligations to the Client under this Agreement",
      "21.2 Neither party may assign, transfer or charge or otherwise dispose of this Agreement or any of its rights or obligations arising hereunder without the prior written approval of the other party.",
    ],
  },
  {
    title: "22. Third Party Rights",
    clauses: [
      "22.1 A person who is not a party to this Agreement has no right under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of this Agreement.",
    ],
  },
  {
    title: "23. Data Protection",
    clauses: [
      "23.1 Each party warrants to the other that it is and will continue to be appropriately notified under the terms of any applicable Data Protection Legislation and any other relevant data protection laws, legislation and regulation. For the purposes of this clause, “personal data” and “processes” shall have the meanings given under Data Protection Legislation.",
      "23.2 Where the Agency or its Associates processes personal data on behalf of the Client, then the Agency shall, and shall procure that its Associates shall:",
      "(a) process such data solely in accordance with the Client’s instructions from time to time and in accordance with its duties under Data Protection Legislation;",
      "(b) adopt and maintain reasonably appropriate security and organisational measures against unauthorised, unlawful processing, accidental loss or destruction of such data;",
      "(c) notify the Client promptly in the event that it or its Associates receive any request from a data subject for access to that person’s personal data, where such personal data is processed by or on behalf of the Agency as part of the Services; and",
      "(d) notify the Client promptly in the event that it or its Associates receive any complaint, notice or communication that relates directly to its compliance with Data Protection Legislation and/or the processing of personal data under or in connection with this Agreement.",
      "23.3 The Client authorises the Agency to engage subprocessors for the purposes of providing the Services, provided the Agency remains responsible for their compliance with this clause 23.",
      "23.4 On termination of the relevant Order Form, the Agency shall, at the Client’s option, return or securely delete personal data processed on behalf of the Client, save to the extent retention is required by law.",
      "23.5 The Agency shall provide reasonable assistance to the Client in relation to any personal data breach, DPIA, or data subject request to the extent required under Data Protection Legislation.",
    ],
  },
  {
    title: "24. General",
    clauses: [
      "24.1 The failure of either party to enforce or exercise at any time any term or any right under this Agreement does not constitute and shall not be construed as a waiver of such term or right and shall in no way affect that party’s later right to enforce or to exercise it.",
      "24.2 This Agreement contains all the terms agreed between the parties regarding its subject matter and supersedes any prior agreement, understanding or arrangement between the parties, whether oral or in writing. Each of the parties acknowledges and agrees that:",
      "(a) in entering into this Agreement it has not relied on, and shall have no remedy in respect of, any statement, representation, warranty or understanding other than the statements, representations, warranties and understandings expressly set out in this Agreement; and",
      "(b) its only remedies in connection with any statements, representations, warranties and understandings expressly set out in this Agreement shall be for breach of contract as provided in this Agreement. Nothing in this clause shall, however, operate to limit or exclude any liability for fraud.",
      "24.3 No modification or variation of this Agreement shall be valid unless it is in writing and signed by each of the parties to this Agreement.",
      "24.4 Nothing in this Agreement is intended to or shall operate to create a partnership or joint venture of any kind between the parties or to authorise either party to act as agent for the other, and neither party shall have authority to act in the name or on behalf of or otherwise to bind the other in any way.",
    ],
  },
  {
    title: "25. Governing Law and Jurisdiction",
    clauses: [
      "25.1 The Agreement and any disputes or claims arising out of or in connection with it or its subject matter or formation (including non-contractual disputes or claims) are exclusively governed by, and construed in accordance with, the law of England.",
      "25.2 The parties irrevocably agree that the courts of England have exclusive jurisdiction to settle any dispute or claim that arises out of or in connection with the Agreement or its subject matter or formation (including non-contractual disputes or claims).",
    ],
  },
];

const SCHEDULE_DEFINITIONS = [
  "“Affiliates” means any company, partnership or other entity which at any time directly or indirectly controls, is controlled by or is under common control with either party including as a subsidiary, parent or holding company;",
  "“Agency Materials” means those Materials specifically created by the Agency for the purposes of a Project by officers, employees or freelancers of the Agency (including any Materials adapted, modified or derived from the Client Materials), whether or not it is incorporated into Deliverables during the Term;",
  "“Agency Proprietary Materials” means software (including all programming code in object and source code form), methodology, know-how and processes and Materials in relation to which the Intellectual Property Rights are owned by (or licensed to) the Agency and which are: in existence prior to the date on which it is intended to use them for a Project; or created by or for the Agency outside of a Project and which are intended to be reused across its business;",
  "“Agreement” and “Framework Agreement” means this agreement including the General Terms, the Order Forms and the Schedules;",
  "“Associates” means a party’s employees, officers, agents, sub-contractors or authorised representatives;",
  "“Business Day“ means any day other than: a Saturday, Sunday or public holiday in the UK; or any day between 24 December in any year and 1 January in the immediately following year (inclusive);",
  "“Client Materials” means any Data, client equipment, computer systems, software, documents, copy, Intellectual Property Rights, artwork, logos and any other materials or information owned by or licensed to the Client which are provided to the Agency and/or its Associates by or on behalf of the Client;",
  "“Data” means the Client’s computer data (in machine readable form);",
  "“Data Protection Legislation” means the Data Protection Act 2018 and, unless and until the General Data Protection Regulation ((EU) 2016/679) (GDPR) is no longer directly applicable in the UK, the GDPR and any national implementing laws, regulations and secondary legislation, as amended or updated from time to time, in the UK; and thereafter any successor legislation to the GDPR or the Data Protection Act 2018;",
  "“Deliverables” means any outputs to be provided by the Agency as specified in an Order Form, which may include, without limitation, brand assets, brand guidelines, visual identities, logos, websites, landing pages, user interfaces, user experience designs, digital products, code, content calendars, social content, marketing collateral, campaign assets, templates, presentations, reports and other creative or digital outputs, whether in draft or final form and whether or not capable of intellectual property protection;",
  "“Effective Date” means the date the first Order Form is signed by both parties;",
  "“Expenses” means reasonable travelling, hotel, subsistence and other expenses incurred by the Agency in connection with the supply of Services and Deliverables, provided that such Expenses have either received the Client’s prior written approval or where applicable are in accordance with any expenses policies which have been supplied to the Agency and set out in the applicable agreed Order Form, and evidence of such expenses are provided to the Client;",
  "“Fees” means the Agency fees for a Project as set out in the applicable Order Form or otherwise agreed in writing;",
  "“General Terms” means the terms and conditions set out in this Agreement;",
  "“Intellectual Property Rights” means the following rights, wherever in the world enforceable, including all reversions and renewals and all applications for registration:",
  "“Order Form” means one or more documents signed by the parties from time to time containing a description of the relevant Project;",
  "“Losses” means losses, damages, liabilities, claims, demands, actions, penalties, fines, awards, costs and expenses (including reasonable legal and other professional expenses);",
  "“Project” means any project(s) agreed between the parties from time to time under which the Agency is to perform Services and supply Deliverables to the Client, as more fully described in this Agreement and the applicable Order Form;",
  "“Schedule” means a schedule attached to this agreement, signed by the parties;",
  "“Services” means creative, strategic, branding, design, website, content production, marketing and digital services, including without limitation brand strategy, brand identity development, website design, website development, content creation, campaign asset production and related advisory and implementation services, as set out in an Order Form;",
  "“Term” means the period commencing on the Effective Date and ending on the effective date of termination of this Agreement in accordance with clause 16;",
  "“Third Party Costs” has the meaning set out in clause 9.2.",
];

const INTELLECTUAL_PROPERTY_RIGHTS = [
  "any patents or patent applications;",
  "any trade marks (whether or not registered);",
  "inventions, discoveries, utility models and improvements whether or not capable of protection by patent or registration;",
  "copyright or design rights (whether registered or unregistered);",
  "database rights;",
  "performer's property rights as described in Part II, Chapter X of the Copyright Designs and Patents Act 1988 and any similar rights of performers anywhere in the world;",
  "any goodwill in any trade or service name, trading style or get-up; and",
  "any and all other intellectual or proprietary rights.",
];

function isSubClause(clause) {
  return /^\([a-z]\)/.test(clause);
}

export default function TermsPage() {
  return (
    <>
      <main id="main" className={styles["terms-page"]}>
        <div className={styles["terms-shell"]}>
          <Link href="/" className={styles["back-link"]}>
            <span aria-hidden="true" className={styles["back-link-icon"]}>
              ←
            </span>
            <span>Back to home</span>
          </Link>

          <article className={styles.document}>
            <header className={styles["document-header"]}>
              <h1 className={styles.title}>Wisper Studios Terms and Conditions</h1>
              <p className={styles.updated}>Last Updated: June 2026</p>
            </header>

            <section className={styles.introduction} aria-label="Introduction">
              <p>
                These Terms and Conditions govern any services to be provided by [Wisper
                Studios] (the “Agency”). By executing an Order Form that references this
                Agreement, you (hereafter “Client” or “you”) agree to the terms of this
                Agreement. If you are entering into this Agreement on behalf of a company or other
                legal entity, you represent that you have the authority to bind such entity and its
                Affiliates to this Agreement. If you do not have such authority, or if you do not
                agree with these terms and conditions, you must not accept this Agreement. This
                Agreement is effective as of that date that you accept it. Client and Agency hereby
                agree as follows:
              </p>
            </section>

            {TERMS_SECTIONS.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles["section-heading"]}>{section.title}</h2>
                {section.clauses.map((clause) => (
                  <p
                    key={clause}
                    className={isSubClause(clause) ? styles["sub-clause"] : styles.clause}
                  >
                    {clause}
                  </p>
                ))}
              </section>
            ))}

            <section className={styles.schedule} aria-labelledby="schedule-1-heading">
              <p className={styles["schedule-label"]}>Schedule 1</p>
              <h2 id="schedule-1-heading" className={styles["section-heading"]}>
                Definitions and Interpretation
              </h2>

              <div className={styles.section}>
                <h3 className={styles["schedule-heading"]}>
                  1. Interpretation and Defined Terms
                </h3>
                <p className={styles.clause}>
                  1.1 In this Agreement, references to clauses, schedules and appendices are to
                  clauses of and schedules to and appendices to this Agreement. Where any
                  provision contained in the Schedules or a Order Form conflicts with any
                  provision of the General Terms the following order of precedence shall apply
                  (unless otherwise expressly stated in the Order Form):
                </p>
                <p className={styles["sub-clause"]}>(a) an Order Form.</p>
                <p className={styles["sub-clause"]}>(b) Schedules;</p>
                <p className={styles["sub-clause"]}>(c) General Terms;</p>
                <p className={styles.clause}>1.2 Unless the context otherwise requires:</p>
                <p className={styles["sub-clause"]}>
                  (a) a person includes a legal person (such as a limited company) as well as a
                  natural person;
                </p>
                <p className={styles["sub-clause"]}>
                  (b) the words “include” and “including” shall be construed without limitation;
                  and
                </p>
                <p className={styles["sub-clause"]}>
                  (c) any reference to an enactment of legislation includes any subordinate
                  legislation made from time to time under it and is to be construed as references
                  to that enactment as from time to time amended or modified or any enactment
                  replacing it.
                </p>
                <p className={styles.clause}>
                  1.3 The headings in this Agreement are for ease of reference only and shall be
                  disregarded in construing or interpreting the Agreement.
                </p>
                <p className={styles.clause}>
                  1.4 The following terms shall have the corresponding meanings for the purposes
                  of this Agreement:
                </p>

                {SCHEDULE_DEFINITIONS.map((definition) => (
                  <div key={definition} className={styles.definition}>
                    <p>{definition}</p>
                    {definition.startsWith("“Intellectual Property Rights”") ? (
                      <ul className={styles["definition-list"]}>
                        {INTELLECTUAL_PROPERTY_RIGHTS.map((right) => (
                          <li key={right}>{right}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
