export type ResourceTagId =
  | 'getting-started'
  | 'by-industry'
  | 'grow-revenue'
  | 'compare-tools'

export type ResourceTag = {
  id: ResourceTagId
  label: string
  /** Unicode symbol shown in filter pills */
  symbol: string
  /** Pastel fill for filter tabs */
  pastel: string
  /** Soft ink for tab text */
  ink: string
}

export const resourceTags: ResourceTag[] = [
  { id: 'getting-started', label: 'Getting started', symbol: '', pastel: '#F5D5C8', ink: '#7A4E3A' },
  { id: 'by-industry',     label: 'By industry',     symbol: '', pastel: '#D4E5D0', ink: '#3F5A3A' },
  { id: 'grow-revenue',    label: 'Grow revenue',    symbol: '', pastel: '#D4E4F0', ink: '#3A4E6A' },
  { id: 'compare-tools',   label: 'Compare tools',   symbol: '', pastel: '#F0E6C8', ink: '#6A5A30' },
]

export type ResourceIndustryId =
  | 'cafes'
  | 'restaurants'
  | 'bars'
  | 'bakeries'
  | 'hairdressers'
  | 'barbers'
  | 'nail-techs'
  | 'clothing-stores'
  | 'other-services'

export type ResourceIndustry = {
  id: ResourceIndustryId
  label: string
  /** Unicode symbol shown in industry chips and card tags */
  symbol: string
  pastel: string
  ink: string
}

/** Shared green for every industry subcategory chip. */
const INDUSTRY_PASTEL = '#D4E5D0'
const INDUSTRY_INK = '#3F5A3A'

export const resourceIndustries: ResourceIndustry[] = [
  { id: 'cafes',           label: 'Cafes',            symbol: '☕', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'restaurants',     label: 'Restaurants',      symbol: '🍽', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'bars',            label: 'Bars',             symbol: '🍺', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'bakeries',        label: 'Bakeries',         symbol: '🥐', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'hairdressers',    label: 'Hairdressers',     symbol: '✂',  pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'barbers',         label: 'Barbers',          symbol: '✂',  pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'nail-techs',      label: 'Nail techs',       symbol: '💅', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'clothing-stores', label: 'Clothing stores',  symbol: '🛍', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
  { id: 'other-services',  label: 'Trades & services', symbol: '🌿', pastel: INDUSTRY_PASTEL, ink: INDUSTRY_INK },
]

export type BlogEmbedKind = 'roi' | 'cards'

export type BlogEmbed =
  | { kind: 'roi';   /** Place after this section (1–3). */ afterSection: 1 | 2 | 3 }
  | { kind: 'cards'; /** Place after this section (1–3). */ afterSection: 1 | 2 | 3; industry: string }

export type BlogInlineImage = {
  file: string
  alt: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  tag: ResourceTagId
  /** Present when the post is about a specific industry. */
  industry?: ResourceIndustryId
  assetKey: string
  assetVariant: 1 | 2
  accent: string
  section1Heading: string
  section1Body: string
  section2Heading: string
  section2Body: string
  section3Heading: string
  section3Body: string
  cta: string
  publishDate: string
  embed?: BlogEmbed
}

const CAFE_IMAGES: BlogInlineImage[] = [
  { file: 'cafe 2.webp', alt: 'Customers sitting outside a busy cafe' },
  { file: 'cafe with pos.webp', alt: 'Busy cafe floor seen from the till' },
  { file: 'Fresh cafe drinks.webp', alt: 'Fresh drinks and a croissant on a cafe table' },
  { file: 'cafe 1.webp', alt: 'Customers at a cafe counter' },
]

const RESTAURANT_IMAGES: BlogInlineImage[] = [
  { file: 'busy restaurant dining room.webp', alt: 'A busy restaurant dining room' },
]

const BAR_IMAGES: BlogInlineImage[] = [
  { file: 'bartender talking to customer.webp', alt: 'Bartender talking with a guest at the bar' },
  { file: 'bar from above.webp', alt: 'Guests seated along a busy bar' },
  { file: 'bar 1.webp', alt: 'Guests gathered along a busy bar' },
  { file: 'bar loyalty card.webp', alt: 'A bar loyalty card next to a pint' },
]

const BAKERY_IMAGES: BlogInlineImage[] = [
  { file: 'bakery and customer interaction.webp', alt: 'Baker serving a customer at the counter' },
  { file: 'bakery 1.webp', alt: 'Baker stocking a wall of fresh bread' },
  { file: 'bakery 2.webp', alt: 'Pastry cabinet in a bakery' },
  { file: 'bakery croissants.webp', alt: 'Fresh croissants being arranged on a tray' },
  { file: 'female bakery owner.webp', alt: 'Bakery owner in the shop' },
]

const LOYALTY_CARD_IMAGES: BlogInlineImage[] = [
  { file: 'another loyalty card.webp', alt: 'Front and back of a paper stamp card' },
  { file: 'bakery brand identity with paper loyalty cards.webp', alt: 'Bakery branding with paper loyalty cards' },
]

const HAIRDRESSER_IMAGES: BlogInlineImage[] = [
  { file: 'hairdresser 1.webp', alt: 'Client at a salon wash basin' },
]

const BARBER_IMAGES: BlogInlineImage[] = [
  { file: 'barber 2.webp', alt: 'Busy barbershop with clients waiting and in the chair' },
]

const CLOTHING_IMAGES: BlogInlineImage[] = [
  { file: 'apparel owner.webp', alt: 'Clothing store owner at the counter' },
]

/** One unique thumbnail per resource card — do not reuse a file. */
const THUMB_BY_SLUG: Record<string, string> = {
  'customer-loyalty-program-software': 'cafe with pos.webp',
  'how-to-design-a-loyalty-program': 'another loyalty card.webp',
  'loyalties-platform': 'bakery brand identity with paper loyalty cards.webp',
  'best-loyalty-programs-for-barbershops': 'barber 2.webp',
  'best-loyalty-apps-for-cafes-australia': 'cafe 2.webp',
  'why-app-loyalty-programs-dont-work': 'bar 2.webp',
  'restaurant-loyalty-programs-that-drive-sales': 'busy restaurant dining room.webp',
  'rewards-program-for-nail-salons': 'nail 1.webp',
  'how-much-revenue-can-a-loyalty-program-make': 'female bakery owner.webp',
  'benefits-of-rewards-program-for-bakery-customers': 'bakery and customer interaction.webp',
  'benefits-of-loyalty-program-for-bars': 'bartender talking to customer.webp',
  'good-loyalty-app-for-hairdressers': 'hairdresser 2.webp',
  'attract-customers-to-clothing-store': 'apparel owner.webp',
  'free-loyalty-card-app-small-business': 'other 1.webp',
  'increase-sales-at-a-cafe': 'cafe owner.webp',
  'attract-customers-landscaping-business': 'other 2.webp',
  'most-popular-loyalty-program': 'retail 1.webp',
  'best-loyalty-card-app': 'hairdresser 1.webp',
  'best-loyalty-programs-for-cafes': 'cafe 1.webp',
  'attract-customers-to-your-cafe': 'cafe owner doing admin.webp',
  'benefits-of-loyalty-program-for-cafes': 'Fresh cafe drinks.webp',
  'best-loyalty-programs-for-restaurants': 'restaurant 1.webp',
  'increase-sales-at-a-restaurant': 'restaurant 2.webp',
  'rewards-program-for-restaurants': 'busy kitchen.webp',
  'best-loyalty-programs-for-bars': 'bar loyalty card.webp',
  'attract-more-customers-to-a-bar': 'bar from above.webp',
  'rewards-program-for-bars': 'bar 1.webp',
  'best-loyalty-programs-for-bakeries': 'bakery 1.webp',
  'increase-sales-at-a-bakery': 'bakery 2.webp',
  'good-loyalty-app-for-bakeries': 'bakery croissants.webp',
}

export function thumbnailFileForPost(post: BlogPost): string {
  const file = THUMB_BY_SLUG[post.slug]
  if (!file) {
    throw new Error(`Missing unique thumbnail for ${post.slug}`)
  }
  return file
}

const IMAGES_BY_INDUSTRY: Partial<Record<ResourceIndustryId, BlogInlineImage[]>> = {
  cafes: CAFE_IMAGES,
  restaurants: RESTAURANT_IMAGES,
  bars: BAR_IMAGES,
  bakeries: BAKERY_IMAGES,
  hairdressers: HAIRDRESSER_IMAGES,
  barbers: BARBER_IMAGES,
  'clothing-stores': CLOTHING_IMAGES,
}

const IMAGES_BY_ASSET_KEY: Record<string, BlogInlineImage[]> = {
  cafe: CAFE_IMAGES,
  restaurant: RESTAURANT_IMAGES,
  bar: BAR_IMAGES,
  bakery: BAKERY_IMAGES,
  hairdresser: HAIRDRESSER_IMAGES,
  barber: BARBER_IMAGES,
  retail: CLOTHING_IMAGES,
  other: LOYALTY_CARD_IMAGES,
}

/** Two industry photos placed between article sections. */
export function inlineImagesForPost(post: BlogPost): BlogInlineImage[] {
  const pool =
    (post.industry && IMAGES_BY_INDUSTRY[post.industry]) ||
    IMAGES_BY_ASSET_KEY[post.assetKey] ||
    []
  if (pool.length === 0) return []
  const idx = Math.max(0, blogPosts.findIndex((item) => item.slug === post.slug))
  if (pool.length === 1) return [pool[0]]
  return [pool[idx % pool.length], pool[(idx + 1) % pool.length]]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'customer-loyalty-program-software',
    title: 'Customer Loyalty Program Software: What It Does and How to Choose It',
    excerpt: 'Learn what customer loyalty program software actually does, how to choose the right type for your business and where Loyalties fits in.',
    metaTitle: 'Customer Loyalty Program Software Guide | Loyalties',
    metaDescription: 'Learn what customer loyalty program software does, how to choose the right type for a local business, and where a wallet stamp card fits.',
    tag: 'getting-started',
    assetKey: 'cafe',
    assetVariant: 1,
    accent: '#c4a574',
    publishDate: '2026-09-01',
    section1Heading: 'What customer loyalty program software actually does',
    section1Body: `Customer loyalty program software tracks who visits, rewards them for coming back and shows you the results. It replaces the paper punch card that gets lost, forgotten or faked. Every loyalty tool does four jobs: it identifies the customer, records each visit, delivers the reward and gives the owner data they can act on.\n\nFor a local business, the first three jobs matter most on day one. The fourth is where the value builds over time. When you know who your regulars are, who is one visit from a reward and who has not been back in six weeks, you can act on it. You stop guessing.\n\nLoyalty software comes in a few forms. Some tools sit inside your point of sale. Some need customers to download your own branded app. A newer group puts a stamp card straight into Apple Wallet or Google Wallet, so there is nothing to install. Each type suits a different business, which is why the choice matters more than the brand name.\n\nA good test is the Monday morning test. Imagine your busiest hour. If recording a visit adds more than a few seconds to each order, staff will skip it and your data will have gaps. The best software is the one your team uses on every single transaction.`,
    section2Heading: 'Five things to check before you choose',
    section2Body: `Run every option through these five checks:\n\n1. Customer friction — how long does joining take? Test it yourself with a stopwatch. If it takes more than a minute, members drop off.\n2. Branding — does the card look like your business? A generic template does not build recognition.\n3. Recording speed — can staff add a stamp in under two seconds at the counter during a rush?\n4. Dashboard insight — does it show active members, stamp activity and redemptions, not just a total sign-up count?\n5. Pricing model — is it flat, or does it grow with every new customer?\n\nAsk every vendor two more questions before you sign up:\n\n- What happens to my customer list if I leave?\n- Can I contact my members directly?\n\nThe answers tell you who really owns the relationship — you or the platform. Run a small trial before you commit. Put the QR at your till for two weeks and count how many customers join without being asked twice.`,
    section3Heading: 'Where Loyalties fits',
    section3Body: `Loyalties is a wallet-based stamp card platform for local businesses. You sign up, claim your venue link and design a card with your logo, colours, stamp icon and reward. Customers scan a QR code or open your link, enter a name and email, and add the card to their phone. No app download is needed.\n\nThe dashboard shows active members, stamp activity and redemptions. On the Pro plan you can send branded email campaigns to members who opted in, so your loyalty data becomes direct marketing without exporting lists to another tool.\n\nLoyalties is free for up to 100 active customers. Pro is $8 per week and unlocks campaigns. It suits single-venue and small multi-location businesses. If you run a large multi-brand group with a points engine and deep POS integration, you need a different class of tool.`,
    cta: 'Design your free stamp card',
  },
  {
    slug: 'how-to-design-a-loyalty-program',
    title: 'How to Design a Loyalty Program Customers Actually Finish',
    excerpt: 'A practical guide to designing a loyalty program with the right stamp count, reward and joining flow for your customers.',
    metaTitle: 'How to Design a Loyalty Program Customers Finish | Loyalties',
    metaDescription: 'A practical guide to stamp count, reward cost and joining flow so customers actually finish your loyalty card.',
    tag: 'getting-started',
    assetKey: 'cafe',
    assetVariant: 2,
    accent: '#c4a574',
    publishDate: '2026-09-03',
    section1Heading: 'Start with the behaviour you want to reward',
    section1Body: `A loyalty program is a nudge. Before you pick a reward, decide what behaviour you want more of. Most small businesses want one of three things: more frequent visits, bigger spend per visit, or more visits at quiet times. Pick one. A program that chases all three confuses staff and customers.\n\nThen set the number of stamps with a simple formula. Take how often a regular visits and multiply it by how many weeks you want them to take to earn the reward. A regular who visits twice a week and should earn a reward in four weeks needs eight stamps. Eight is a good default because it fits most cafe, bakery and salon rhythms.\n\nKeep the target reachable. If a card takes six months to finish, customers lose interest long before the reward. If it takes one week, you give away margin you do not need to. Aim for four to eight weeks for your typical regular.`,
    section2Heading: 'Choose a reward that is worth the stamps',
    section2Body: `Customers judge a reward by how it feels. You should judge it by what it costs. A free coffee feels like a five dollar gift to the customer, but it costs you only the ingredients and the cup. Reward items you can give away at cost, not at menu price.\n\nLoyalties gives you three reward types to choose from:\n\n- **Free item** — works best for products with a strong margin and a clear identity (a flat white, a pastry, a trim)\n- **Discount** — suits businesses with variable spend, like retail and restaurants\n- **Custom reward** — suits services, such as a free design upgrade at a nail salon\n\nName the reward clearly. "A free flat white" beats "a loyalty reward". Put the name on the card so customers see the prize every time they open it. Then work out the real cost: divide the cost of the reward by what a customer spends to earn it.`,
    section3Heading: 'Make joining and stamping effortless',
    section3Body: `The best reward fails if joining is hard. Here is how it works in Loyalties:\n\n1. Customer scans your QR code or opens your link\n2. They enter a name and email (takes under a minute)\n3. They add the card to Apple Wallet or Google Wallet — no app to download\n4. At each visit, staff scan the QR on the customer's pass to add a stamp\n\nCustomise the join page with your logo and one line that tells people what they get. Place the QR at the till, on takeaway bags and on the counter. Train staff to say one sentence to every customer: "Want a stamp card on your phone?"\n\nReview the dashboard after thirty days. Check how many members joined, how many stamps were added and how close people are to a reward. If few members are close, lower the stamp count. Small changes in the first month make the program work for years.`,
    cta: 'Build your card in 10 minutes',
    embed: { kind: 'cards', afterSection: 2, industry: 'cafes' },
  },
  {
    slug: 'loyalties-platform',
    title: 'Loyalties: The Digital Stamp Card Platform for Local Businesses',
    excerpt: 'Loyalties is a wallet-based stamp card platform built for local businesses. Here is how it works and what it costs.',
    metaTitle: 'Loyalties Platform: Digital Stamp Cards | Loyalties',
    metaDescription: 'Loyalties is a wallet-based stamp card platform for local businesses. See how setup, joining and pricing work.',
    tag: 'compare-tools',
    assetKey: 'cafe',
    assetVariant: 1,
    accent: '#c4a574',
    publishDate: '2026-09-05',
    section1Heading: 'Why we built Loyalties',
    section1Body: `Paper stamp cards get lost, forgotten and faked. Branded apps fix some of that, but they ask customers to download one more app for one more cafe. Most will not. Loyalties exists for the space between. It gives local businesses a branded digital stamp card that lives in the customer's phone wallet, with nothing to install.\n\nThe idea is simple. Your loyalty program should look like your business, take a minute to join and cost less than the regulars it brings back. We keep the platform focused on stamp cards, a clear dashboard and optional email, instead of a maze of features you will never use.\n\nThree principles guide every decision. Customers should never need to download anything. Owners should be able to set up in one sitting without help. And the platform should stay out of the way, so staff can serve the next customer while the stamp is added.`,
    section2Heading: 'How Loyalties works for owners',
    section2Body: `Setup takes minutes. Here is what a typical first week looks like:\n\n1. Day 1 — Sign up, claim your venue link, design your card (logo, colours, stamp icon, reward)\n2. Day 2 — Customise your join page and tap page. Add your locations.\n3. Day 2 — Share your QR code. Print it, put it at the till, post the link online.\n4. Day 7 — First members arrive, first stamps are added\n5. Week 4 — Dashboard shows who is close to a reward. Decide whether to switch on email.\n\nThe dashboard shows active members, stamp activity and redemptions. On Pro, you can send branded email campaigns to members who opted in. Choose from templates, schedule sends and see opens and clicks. Your loyalty data becomes direct marketing without exporting a list into another tool.\n\nNothing here needs a developer.`,
    section3Heading: 'What customers experience and what it costs',
    section3Body: `A customer scans your QR code, enters a name and email, and chooses whether to receive messages from you. They add the card to Apple Wallet or Google Wallet, where it sits with their other cards. They can manage their membership later, change their email preferences or leave the program at any time.\n\nThat privacy-first approach protects your customers and your business. Members opt in, they can opt out at any time and you only email people who said yes.\n\nPricing is straightforward. Loyalties is free for up to 100 active customers, with the full card, join page, wallet passes and dashboard included. Pro is $8 per week and unlocks email campaigns. There is no contract. Start on the free plan, see the value and upgrade when you want to bring members back with campaigns.`,
    cta: 'Start free',
    embed: { kind: 'cards', afterSection: 1, industry: 'cafes' },
  },
  {
    slug: 'best-loyalty-programs-for-barbershops',
    title: 'Best Loyalty Programs for Barbershops (And How to Pick One)',
    excerpt: 'Most barbershop clients leave without saying anything. A loyalty card gives you a reason to reach them before they drift to another shop.',
    metaTitle: 'Best Loyalty Programs for Barbershops | Loyalties',
    metaDescription: 'How barbershops keep clients rebooking with a simple loyalty card, plus a setup checklist for Loyalties.',
    tag: 'by-industry',
    industry: 'barbers',
    assetKey: 'barber',
    assetVariant: 1,
    accent: '#7a8b6a',
    publishDate: '2026-09-07',
    section1Heading: 'Why barbershops need a loyalty program',
    section1Body: `A barbershop runs on the rebook. Most clients return every three to five weeks, which makes each visit the start of the next one. Lose one cut and you often lose the whole cycle.\n\nBarbers face empty chairs on slow days. A reward that favours midweek visits fills those gaps without discounting your busy Saturdays. A loyalty program gives you a reason to reach people before they drift, and a visible reward gives clients a reason to stay in your chair.\n\nConsider what a missed rebook costs. If a cut is $40 and a client visits every four weeks, a client who drifts away takes roughly $500 of yearly revenue with them. One saved client can pay for a year of software many times over.`,
    section2Heading: 'What the best barbershop programs have in common',
    section2Body: `The best programs share five traits:\n\n- Fast at the chair — a scan takes seconds and never slows the next client\n- Rewards the habit you want — such as a free cut on every sixth or eighth visit\n- Looks like your shop — a card with your logo and colours feels like part of the experience\n- No app required — clients add the card to their phone wallet and forget about it\n- Lets you stay in touch — a reminder to an overdue client brings them back before they book elsewhere\n\nKeep the reward simple. A client who visits every three weeks reaches six stamps in about four months. If that feels long, start with a lower stamp count or add a bonus reward for midweek visits. You can adjust the card after the first month.`,
    section3Heading: 'Setting up a barbershop card in Loyalties',
    section3Body: `Here is exactly how to set it up:\n\n1. Design your card with your shop logo and colours — pick the scissors stamp icon\n2. Set six to eight stamps, reward with a free cut or free beard trim\n3. Put the QR on your mirror, at the till and in your Instagram bio\n4. Tell every client: "Want a stamp card on your phone?"\n5. After each cut, scan the QR on the client's pass to add a stamp\n\nThe client sees your tap page after each stamp — add a message, a promo image or a link to book their next appointment.\n\nUse the dashboard to see who is active and who is close to a reward. On the Pro plan, send a short reminder to members who have not been in for a while, or promote a quiet midweek slot. Loyalties is free for up to 100 active customers, so you can test it with your own regulars first.`,
    cta: 'Set up your barbershop card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'barbers' },
  },
  {
    slug: 'best-loyalty-apps-for-cafes-australia',
    title: 'Best Loyalty Apps for Cafes in Australia (2026 Guide)',
    excerpt: 'A guide to the best wallet-based and app-based loyalty options for Australian cafes, with a side-by-side comparison.',
    metaTitle: 'Best Loyalty Apps for Cafes in Australia | Loyalties',
    metaDescription: 'Compare wallet-based and app-based loyalty options for Australian cafes, including cost, branding and joining friction.',
    tag: 'by-industry',
    industry: 'cafes',
    assetKey: 'cafe',
    assetVariant: 2,
    accent: '#c4a574',
    publishDate: '2026-09-09',
    section1Heading: 'What Australian cafe owners should look for',
    section1Body: `Australian cafes face a specific mix of pressures. Customers have plenty of choice within a few blocks, margins are thin and regulars are the business. A good loyalty app has to be quick for staff, effortless for customers and affordable on a small turnover.\n\nLook for these five things in any option you evaluate:\n\n- Works on iPhone and Android — many Australian customers expect Apple Wallet\n- No download required — customers rarely install an app for a single cafe\n- Branding that matches your shop, not a generic template\n- A clear dashboard showing who your regulars are and how active they are\n- Flat pricing you can budget for, not per-customer fees\n\nBe careful with the big coalition programs. Flybuys and Everyday Rewards are retail coalitions built for supermarkets and large brands. They do not give a single cafe a branded relationship with its own customers.`,
    section2Heading: 'The main types of loyalty apps for cafes',
    section2Body: `Cafe owners usually choose between four types. A custom branded app gives full control but costs a lot to build and most customers never install it. Loyalty built into your POS is convenient, though it ties you to that system. Generic stamp card apps are cheap, but customers must download a shared app and your brand barely shows. Wallet-based stamp cards put your branded card in Apple Wallet or Google Wallet with no download.\n\nSeveral wallet-based tools exist. They commonly charge roughly $25 to $50 a month. Loyalties sits in the same range once you upgrade, at $8 per week for Pro, and is free for up to 100 active customers so you can test it before you pay anything.\n\nDo the maths on price in your own terms. If a tool costs about $30 a month and a coffee earns you about $3.50 in gross profit, it pays for itself with nine extra coffees a month. A loyalty program only has to bring back a handful of extra regulars to cover its cost.`,
    section3Heading: 'How to choose, and when to pick something else',
    section3Body: `Ask these five questions of any option you are evaluating:\n\n1. How long does a new customer take to join?\n2. Does it work in both Apple Wallet and Google Wallet?\n3. Does the card look like my cafe?\n4. Can I see who my regulars are?\n5. Can I email members who agreed to hear from me?\n\nFor most independent cafes, a wallet-based stamp card gives the best balance of simplicity, branding and cost. Loyalties is built for exactly this case. You design the card in minutes, customers join by QR and staff stamp with a scan.\n\nPick something else if you run a cafe group that needs points tied to spend across many POS systems. For everyone else, start free and see how your regulars respond. Set up a card, put the QR at the counter for a fortnight and count joins and stamps.`,
    cta: 'Try Loyalties free at your cafe',
  },
  {
    slug: 'why-app-loyalty-programs-dont-work',
    title: "Why App-Based Loyalty Programs Don't Work for Small Businesses",
    excerpt: 'The main reason app-based loyalty programs fail for small businesses — and why the phone wallet is a better option.',
    metaTitle: 'Why App Loyalty Programs Fail Small Businesses | Loyalties',
    metaDescription: 'Customers will not download another app for one cafe. See why phone-wallet stamp cards convert better.',
    tag: 'getting-started',
    assetKey: 'other',
    assetVariant: 1,
    accent: '#6b7a6a',
    publishDate: '2026-09-11',
    section1Heading: 'Customers will not download another app',
    section1Body: `The biggest problem is the first step. To join an app-based program, a customer has to complete every one of these:\n\n1. Stop at the counter\n2. Open the App Store or Google Play\n3. Search for the cafe's loyalty app\n4. Download it (often 50–150 MB)\n5. Open the app and create an account\n6. Verify their email\n7. Find the loyalty card inside the app\n\nThat is seven steps for a five dollar coffee. Many give up halfway. Even customers who install your app once often forget it exists by the next visit.\n\nLarge chains with very frequent visits can overcome this. Their customers visit almost daily, the app becomes part of the routine and they have the marketing budget to push installs. A local cafe, barbershop or bakery has neither.`,
    section2Heading: 'The costs land on the owner',
    section2Body: `Building a custom app costs money. You pay for design, development, store accounts and updates every time Apple or Google change their rules. Even a template app adds monthly fees and takes time to maintain. Staff need training on a separate system.\n\nThe results are often underwhelming. When only a small share of customers install the app, the program covers a small share of your sales. You pay for a full system and reach a fraction of your customers.\n\nStaff feel the cost too. A system that needs a separate tablet, a login and several taps per customer slows the queue. When the morning rush hits, staff skip it. Then members miss stamps, get annoyed and stop using the card. A program that depends on staff remembering a slow step is fragile by design.`,
    section3Heading: 'What works better: the phone wallet',
    section3Body: `Apple Wallet and Google Wallet already sit on almost every customer's phone. A loyalty pass added to a wallet needs no download, lives next to their cards and tickets and can update when a stamp is added. Joining takes under a minute with a QR code or a link.\n\nThat is how Loyalties works. Customers scan, enter a name and email and add the card. Staff add stamps by scanning the pass. The venue keeps a member list with email consent, so you can reach customers directly.\n\nIf you want to test the difference, count the steps. Write down every tap a new customer needs to join your current program. Then try the wallet approach and count again. Fewer steps almost always means more members.`,
    cta: 'See how a wallet card works',
  },
  {
    slug: 'restaurant-loyalty-programs-that-drive-sales',
    title: 'Restaurant Loyalty Programs That Actually Drive Sales',
    excerpt: 'Restaurants need a loyalty program that suits less frequent visits. Here are four reward structures that work.',
    metaTitle: 'Restaurant Loyalty Programs That Drive Sales | Loyalties',
    metaDescription: 'Four restaurant reward structures that suit less frequent visits, plus how to measure whether the program works.',
    tag: 'by-industry',
    industry: 'restaurants',
    assetKey: 'restaurant',
    assetVariant: 2,
    accent: '#8b6b4a',
    publishDate: '2026-09-13',
    section1Heading: 'Restaurants need a different kind of loyalty program',
    section1Body: `A cafe sees a regular several times a week. A restaurant might see the same guest a few times a year. That changes everything. Stamp counts need to be lower, rewards need to feel like an occasion and every return visit needs a reason.\n\nA loyalty program gives guests a reason to choose you again. It also gives you something rare in hospitality — a list of people who have already dined with you and said they want to hear from you.\n\nThe visit rhythm shapes the reward. If a typical guest dines twice a year, a ten-stamp card will never finish. A four-stamp card might finish in a year, which is still long. That is why restaurants often pair a low stamp count with an extra reason to return, such as a seasonal menu or a midweek offer.`,
    section2Heading: 'Four reward structures that work',
    section2Body: `Pick one structure and keep it simple. Here are four that work for restaurants:\n\n1. Visit-based stamps — one stamp per visit regardless of bill size. Set four to six stamps. Reward with a dish or a drink, such as a free dessert on the fifth visit.\n2. Occasion rewards — offer a reward for a second visit within a set window. Turns a special night into a habit.\n3. Midweek incentives — send a Pro email campaign with a Monday to Wednesday offer to members. Fills quiet nights.\n4. Spend thresholds — only stamp bills above a set amount. Protects your margins while still rewarding regulars.\n\nMatch the reward to your margin. Desserts, sides, snacks and a small discount on a drink cost little and feel generous. Food-led rewards usually work best — they are easy to name and keep the focus on the meal.`,
    section3Heading: 'Measure whether it works',
    section3Body: `Track three numbers monthly:\n\n- Repeat rate — how many members return within sixty days\n- Redemption rate — how many complete a card\n- Midweek share — how many stamps land on your quiet nights\n\nThe Loyalties dashboard covers all three. Review monthly and change one thing at a time.\n\nSet up takes minutes. Design a branded card, put the QR on the table card and the bill folder and ask every guest to join at payment. Loyalties is free for up to 100 active customers, and the Pro plan at $8 per week adds email campaigns for quiet nights.\n\nUse the tap page to thank guests in your venue's own voice, not with a generic message. A short line such as "Thanks for dining with us, see you again soon" makes the scan feel like part of the service and not a transaction.`,
    cta: 'Create your restaurant card free',
  },
  {
    slug: 'rewards-program-for-nail-salons',
    title: 'How to Run a Rewards Program for Your Nail Salon',
    excerpt: 'How to run a rewards program that keeps nail salon clients rebooking, from reward ideas to the exact setup in Loyalties.',
    metaTitle: 'Nail Salon Rewards Program Guide | Loyalties',
    metaDescription: 'Reward ideas and a step-by-step setup for a nail salon stamp card that keeps clients rebooking.',
    tag: 'by-industry',
    industry: 'nail-techs',
    assetKey: 'nail',
    assetVariant: 1,
    accent: '#c9a0b0',
    publishDate: '2026-09-15',
    section1Heading: 'The rebooking rhythm of a nail salon',
    section1Body: `Nail clients come back on a rhythm. Most regulars rebook every two to three weeks for fills, repairs or a fresh set. The goal is not only a great set — it is making sure the client is back in your chair before that rhythm breaks.\n\nA rewards program gives clients a reason to return to you and not to a cheaper tech down the road. It also gives you a reason to reach out when a client is overdue, which is the follow-up many salons never get to.\n\nAppointments are high value and slots are fixed, so a no-show hurts. A client who feels recognised is less likely to disappear on the day. Pair your card with your normal booking reminders.`,
    section2Heading: 'Reward ideas that fit nails',
    section2Body: `Think about what clients value and what costs you little. Here are reward ideas that work well for nail salons:\n\n- Free design upgrade on the eighth visit — costs a few minutes, feels special\n- Discount on a full set — rewards loyal clients and fills longer appointments\n- Bonus stamp for referring a friend — brings in new clients without ads\n- Small treat (hand massage or cuticle oil gift) — adds a personal touch at low cost\n- Bonus stamp for booking during quieter weeks — helps fill slow periods\n\nAvoid rewards that need extra stock or long extra time. Keep the rule simple: one stamp per visit is easy for clients and staff to understand.`,
    section3Heading: 'Setting it up in Loyalties',
    section3Body: `Here is exactly how to set it up:\n\n1. Add your salon logo and choose your brand colours\n2. Pick the nails stamp icon\n3. Set eight stamps and name the reward clearly — for example "Free design upgrade"\n4. Put the QR at the desk and on your booking confirmations\n5. Use this script at the front desk: "Want a stamp card on your phone? It takes a minute, and your eighth visit gets a free design upgrade."\n\nClients scan, enter their name and email and add the card to their phone. At checkout, scan the pass to add a stamp. The tap page shows a message after each stamp — use it to remind clients to rebook.\n\nOn the Pro plan, email members who are overdue for a fill with a friendly reminder, or announce new seasonal designs. Loyalties is free for up to 100 active customers.`,
    cta: 'Create your nail salon card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'nail-techs' },
  },
  {
    slug: 'how-much-revenue-can-a-loyalty-program-make',
    title: 'How Much Revenue Can a Loyalty Program Make? A Simple Way to Estimate It',
    excerpt: 'A simple formula to estimate how much extra revenue a loyalty program could generate at your venue.',
    metaTitle: 'How Much Revenue Can a Loyalty Program Make? | Loyalties',
    metaDescription: 'A simple formula and cafe example to estimate extra profit from a loyalty program, including reward cost.',
    tag: 'grow-revenue',
    assetKey: 'bakery',
    assetVariant: 1,
    accent: '#d4a574',
    publishDate: '2026-09-17',
    embed: { kind: 'roi', afterSection: 2 },
    section1Heading: 'The formula',
    section1Body: `Nobody can promise you a fixed number, and you should be wary of anyone who does. Revenue from a loyalty program depends on your customers, your prices and your reward. You can estimate it with a formula you control.\n\nExtra profit per month = active members × extra visits per member per month × average spend × gross margin − reward cost\n\nEach input is something you can measure:\n\n- Active members → your Loyalties dashboard\n- Average spend → your POS system\n- Gross margin → your accounts\n- Extra visits → start with an estimate of 0.5 per member per month and review after 60 days\n- Reward cost → cost of the item you give away\n\nA good habit is to write down your assumptions before you start. If the program does not hit them after sixty days, you will know exactly which input was wrong. That is better than a vague feeling that it is not working.`,
    section2Heading: 'A worked example',
    section2Body: `Take a cafe with 200 active members. Each member visits half a time more per month than before. Average spend is $12. Gross margin on the extra sales is 65 percent. Twenty-five rewards are redeemed each month, and each costs $2.50 to give away.\n\nExtra revenue is 200 × 0.5 × $12 = $1,200 a month. At 65 percent margin that is $780 of gross profit. Subtract $62.50 of reward cost and you get $717.50 a month, or $8,610 a year. Pro costs $8 a week — $416 a year. The net gain is about $8,194.\n\nThese numbers are illustrative, not a forecast. Change them to match your venue. Be honest about what is not counted: some members would have visited anyway, so not every stamp is extra revenue. Conservative inputs build trust in your own numbers.`,
    section3Heading: 'What moves the number',
    section3Body: `Three levers move the result:\n\n1. Members — more members come from asking every customer to join and placing your QR where people stand\n2. Extra visits — more visits come from a reward that is reachable and a reminder when someone drifts\n3. Average spend — higher spend comes from rewards that need a minimum purchase and from a promo on the tap page\n\nMeasure every month. Loyalties shows active members, stamp activity and redemptions — the data you need. Compare the first sixty days with the sixty before if you can. Look at repeat visits, not total sales, because seasons and events add noise.\n\nDo not forget the benefits the formula skips. Members refer friends, leave reviews and buy more often at quiet times. A list of opted-in customers also gives you a free marketing channel, which lowers what you spend on ads.`,
    cta: 'Run your own numbers, then start free',
  },
  {
    slug: 'benefits-of-rewards-program-for-bakery-customers',
    title: 'Benefits of a Rewards Program for Bakery Customers (and for the Bakery)',
    excerpt: 'What bakery customers gain from a rewards program — and what it does for the bakery in return.',
    metaTitle: 'Benefits of a Bakery Rewards Program | Loyalties',
    metaDescription: 'What bakery customers gain from a rewards card, and how it helps the shop with regulars, waste and pre-orders.',
    tag: 'by-industry',
    industry: 'bakeries',
    assetKey: 'bakery',
    assetVariant: 2,
    accent: '#d4a574',
    publishDate: '2026-09-19',
    section1Heading: 'What customers gain',
    section1Body: `Customers join a bakery rewards program for a simple reason: they get something back for habits they already have. Buy bread twice a week and the eighth loaf — or a pastry — comes free. That feels like a thank you, not a discount.\n\nHere is what customers actually get:\n\n- A free treat — the eighth stamp earns a pastry or a loaf\n- Recognition — a card that tracks visits shows the bakery values its regulars\n- No card to lose — the pass lives in Apple Wallet or Google Wallet\n- Early notice — Pro email about limited batches and pre-order dates\n- Easy joining — scan the QR at the counter, no app needed\n\nCustomers do not feel pushed to spend more. They feel noticed. That difference matters in a trade where trust and routine drive most sales.`,
    section2Heading: 'What it does for the bakery',
    section2Body: `The benefits flow back to the shop. Customers who earn rewards visit more often. A habit forms around your opening hours, and that habit competes with the supermarket aisle. You also learn who your regulars are — the dashboard shows active members, stamp activity and redemptions, so you know which customers carry your week.\n\nOn the Pro plan you can email members when a limited batch or seasonal item lands, or when pre-order deadlines open. These messages reach people who want them, which helps with the classic bakery problems of sell-outs and waste.\n\nRewards also cost little to give. A free pastry costs you ingredients and oven time already spent, not the menu price. Pre-order seasons, such as Easter or Christmas, can be announced to members ahead of time, so you can plan production.`,
    section3Heading: 'Setting up a bakery card',
    section3Body: `Here is how to set it up in Loyalties:\n\n1. Choose a stamp icon — Loyalties includes pastry, donut and cake icons\n2. Set eight stamps for a weekly regular, name the reward plainly — "Free pastry of your choice"\n3. Add your logo and pick your brand colours\n4. Put the QR on the counter, on bags and in the window\n5. Train staff to ask one question: "Want a stamp card on your phone?"\n6. After each purchase, staff scan the pass to add a stamp (one stamp per visit — simple to explain)\n\nAfter a month, check the dashboard. If most members are one or two stamps away, you have set the right level. If very few are close, lower the count. Loyalties is free for up to 100 active customers.`,
    cta: 'Start your bakery card free',
  },
  {
    slug: 'benefits-of-loyalty-program-for-bars',
    title: 'The Benefits of a Loyalty Program for Bars',
    excerpt: 'The practical benefits of adding a loyalty program to your bar, from filling quiet nights to remembering regulars.',
    metaTitle: 'Benefits of a Loyalty Program for Bars | Loyalties',
    metaDescription: 'How a bar loyalty card remembers regulars, fills quiet nights and rewards visits with food, snacks or a drink deal.',
    tag: 'by-industry',
    industry: 'bars',
    assetKey: 'bar',
    assetVariant: 1,
    accent: '#5c6b7a',
    publishDate: '2026-09-21',
    section1Heading: 'Why bars benefit from loyalty',
    section1Body: `Bars live on regulars. People return for good drinks, a vibe that suits them and staff who recognise them. But staff change, and a new bartender cannot remember every face. A loyalty program remembers for them.\n\nBars also face quiet weeknights, new venues down the street and the challenge of turning a one-off night out into a habit. A loyalty program gives guests a reason to pick you on a Tuesday, not just a Friday.\n\nA loyalty program should feel like part of the night and not like a transaction. The best ones feel like being known by name. A quick scan and a thank you from staff does that. A long form or a slow app does the opposite and breaks the mood.`,
    section2Heading: 'The benefits, one by one',
    section2Body: `Here are the practical benefits of a loyalty program for a bar:\n\n- Recognise regulars even when staff change — the member list and stamp history survive staff turnover\n- Fill quiet nights — use Pro email to tell members about midweek specials and events\n- Know your best guests — the dashboard shows active members and redemptions\n- Fast at a busy bar — one scan per visit, no slow app or login screen\n- Build a direct line to guests — members who opt in hear about events, specials and themed nights\n- Replace paper cards that get wet, lost or left behind\n\nGuests benefit too. They get something back for their loyalty — a card that sits in their phone wallet and no app to install.`,
    section3Heading: 'Choose a reward guests actually want',
    section3Body: `Most bars do best with a food-led reward. A snack plate, a share plate, a burger or a food discount is easy to name, easy to fulfil and feels like a treat for coming back. A small discount on a drink is another option if you want the reward tied to the bar list without giving something away for nothing.\n\nLoyalties lets you set a free food item, a discount or a custom reward such as a reserved table on a busy night. Pick one that fits your margins and your menu.\n\nKeep the setup simple. Choose six to eight stamps, add your logo, place the QR at the bar and train staff to scan at the end of each visit. Loyalties is free for up to 100 active customers. Review the numbers monthly and treat the card as something you tune, not something you set once and forget.`,
    cta: 'Start your bar card free',
  },
  {
    slug: 'good-loyalty-app-for-hairdressers',
    title: 'What Is a Good Loyalty App for Hairdressers?',
    excerpt: 'What hairdressers need from a loyalty app, and how to pick one that improves rebooking without complicating the front desk.',
    metaTitle: 'What Makes a Good Loyalty App for Hairdressers | Loyalties',
    metaDescription: 'What hairdressers need from a loyalty app, from rebooking reminders to a card that works beside booking software.',
    tag: 'by-industry',
    industry: 'hairdressers',
    assetKey: 'hairdresser',
    assetVariant: 1,
    accent: '#b89a9a',
    publishDate: '2026-09-23',
    section1Heading: 'What hairdressers need from a loyalty app',
    section1Body: `A hairdresser's loyalty problem is rebooking. Clients return every four to eight weeks, so each visit has to lead to the next one. Many clients feel loyal to a stylist more than to the salon, and booking convenience has a strong effect on their loyalty. A good loyalty app supports the habit of returning, it does not try to replace your booking system.\n\nAsk yourself a hard question: how many of last month's new clients rebooked? If you do not know, that gap is the first thing a loyalty program fixes.\n\nStylists also move. A stylist who leaves can take clients with them. A salon-wide loyalty card gives clients a reason to stay with the salon, because the progress they have built sits on the venue's card and not with one person.`,
    section2Heading: 'What to look for',
    section2Body: `Look for these five qualities in any loyalty app for your salon:\n\n1. Works alongside your booking software — keep your booking tool and add loyalty on top, no double entry\n2. No app download — clients join from a QR at reception in under a minute\n3. Looks like your salon — your logo, colours and stamp icon\n4. Rewards the right behaviour — every eighth visit, or a bonus for rebooking within the cycle\n5. Lets you contact members — a short reminder email at week six does the chasing for you\n\nBe cautious about tools that charge per client. A program that works should not get more expensive as it grows. Flat pricing keeps your costs predictable.\n\nThink through the reward carefully. A free treatment or a discount on colour is generous but affordable. Avoid rewards that clash with your busiest hours — offer rewards on weekdays or quiet periods and keep your language friendly.`,
    section3Heading: 'Where Loyalties fits',
    section3Body: `Loyalties works next to your booking software, not instead of it. Here is a simple first-month plan:\n\n1. Week 1 — Design the card and place the QR at reception and at each station\n2. Week 2 — Ask every client at checkout to join\n3. Week 3 — Check the dashboard for members close to a reward\n4. Week 4 (Pro) — Send a short reminder to members who have not rebooked, with your booking link\n\nSet eight stamps and a reward such as a free treatment, a discount on colour or a free blow-dry. Loyalties is free for up to 100 active customers, with Pro at $8 per week for email campaigns.\n\nBy the end of the month you will know whether the card is changing rebooking habits. A salon that keeps the routine simple tends to keep using it — and that matters more than any feature.`,
    cta: 'Create your salon card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'hairdressers' },
  },
  {
    slug: 'attract-customers-to-clothing-store',
    title: 'How Do I Attract Customers to My Clothing Store?',
    excerpt: 'Seven practical tactics to bring more customers into your clothing store and turn first-time buyers into regulars.',
    metaTitle: 'How to Attract Customers to a Clothing Store | Loyalties',
    metaDescription: 'Seven tactics to get people through the door and turn a first clothing purchase into a second visit.',
    tag: 'grow-revenue',
    industry: 'clothing-stores',
    assetKey: 'retail',
    assetVariant: 1,
    accent: '#7a8b6a',
    publishDate: '2026-09-25',
    section1Heading: 'Get people through the door',
    section1Body: `Foot traffic comes from a few repeatable sources. Here is where to focus first:\n\n- A window display that changes often — gives people a reason to look every week\n- Local social media (especially Instagram) — shows what is new and puts a face to the shop\n- Partnerships with nearby cafes, gyms and makers — sends you customers who already like your area\n- Events (late nights, styling sessions, launches) — give people a reason to come now\n- Google Business Profile — most local searches start here; keep it accurate with fresh photos\n\nBoutiques win by being different. Unique pieces, fresh stock and good fit advice bring people back. Online stores can match your price, but they cannot match the feeling of being known in a shop.`,
    section2Heading: 'Turn a first purchase into a second',
    section2Body: `Winning a first visit is expensive. Winning the second is cheaper and far more valuable. Too many retailers treat a sale as a transaction and never follow up. The ones that grow treat it as the start of a relationship.\n\nAsk every buyer to join your stamp card at the till. Joining takes under a minute, with no app. Decide your rule — stamp every purchase over a set amount and reward the fifth stamp with a discount or a free accessory. Members who opt in also agree to hear from you, giving you a direct line for new drops, sales and styling events.\n\nThink about what your best customers have in common. A loyalty card works best when it speaks to a pattern you already see.`,
    section3Heading: 'A simple 30-day plan',
    section3Body: `Use the next 30 days as a test:\n\n1. Week 1 — Set up your card with your logo and colours. Place the QR at the till and in the fitting rooms.\n2. Week 2 — Train staff to ask every customer to join. Post your QR on Instagram with a short explanation of the reward.\n3. Week 3 — Send your first Pro email to members about new stock.\n4. Week 4 — Review the dashboard: how many members joined, how many are near a reward. Adjust the rule if needed.\n\nKeep expectations realistic. Loyalty does not bring strangers through the door. It makes the customers you already win come back. Pair it with your window, your social and local partnerships.\n\nLoyalties is free for up to 100 active customers, so you can run the first month at no cost.`,
    cta: 'Set up your store card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'clothing-stores' },
  },
  {
    slug: 'free-loyalty-card-app-small-business',
    title: 'What Is a Good Free Loyalty Card App for Small Businesses?',
    excerpt: 'What the free tier of a loyalty card app actually includes — and when it makes sense to upgrade.',
    metaTitle: 'Best Free Loyalty Card App for Small Business | Loyalties',
    metaDescription: 'What a free loyalty card plan should include, what to check before you commit, and when to upgrade.',
    tag: 'getting-started',
    assetKey: 'other',
    assetVariant: 2,
    accent: '#6b7a6a',
    publishDate: '2026-09-27',
    section1Heading: 'What free usually means',
    section1Body: `Free plans exist, but free rarely means unlimited. Most limit one of four things:\n\n- Number of customers or cards — once you hit the cap, the program stops or locks\n- Features — often locking email or advanced reporting behind a paid plan\n- Branding — by adding the vendor's name or logo to your card\n- Support — with help only available on paid plans\n\nLimits are fair. A vendor has to earn money somewhere. The question is whether the limit lets you test the product properly. A very low cap ends before a venue sees real results. A cap of 100 active customers lets a busy cafe, salon or barbershop see how its regulars respond.\n\nTreat the free plan as a trial that never expires. Use it to learn what your customers do, then decide whether to pay.`,
    section2Heading: 'What to check in a free plan',
    section2Body: `Before you commit, check these six things:\n\n- Is the card branded? Your logo, colours and stamp icon — not a generic template\n- Do customers need to download an app? Downloads kill sign-ups\n- How many customers count towards the limit, and what counts as "active"?\n- Which features need a paid plan? Avoid surprises after you are already live\n- Can you contact your members? If not, you are renting the relationship\n- What happens when you hit the cap? Good platforms warn you; bad ones lock your card mid-service\n\nTest the join flow yourself on a phone before committing. Time how long it takes. Then check how the card looks in the wallet. A card that looks cheap or broken reflects on your brand, whatever the price.`,
    section3Heading: 'The Loyalties free plan, and when to upgrade',
    section3Body: `The Loyalties free plan is a working program — not a stripped-down demo. Here is what is included at no cost:\n\n- Card designer with your logo, colours and stamp icon\n- QR code for counter or self-serve join\n- Apple Wallet and Google Wallet passes — no app download required\n- Staff scanning tool to add stamps\n- Dashboard with member list, stamp history and redemptions\n- Free for up to 100 active customers, no time limit\n\nWhen should you upgrade? Upgrade when you want to bring members back with email. Pro is $8 per week and adds branded campaigns, templates, scheduling and engagement tracking. Many venues stay on the free plan until they have a base of regulars worth emailing.`,
    cta: 'Start free',
  },
  {
    slug: 'increase-sales-at-a-cafe',
    title: 'How to Increase Sales at a Cafe: 7 Tactics That Work',
    excerpt: 'Seven tactics that lift cafe sales, from bundle pricing to an email list of opted-in regulars.',
    metaTitle: 'How to Increase Sales at a Cafe | Loyalties',
    metaDescription: 'Seven cafe sales tactics, from bundle pricing to an opted-in email list of regulars you actually own.',
    tag: 'grow-revenue',
    industry: 'cafes',
    assetKey: 'cafe',
    assetVariant: 1,
    accent: '#c4a574',
    publishDate: '2026-09-29',
    section1Heading: 'Find the leak before you fix it',
    section1Body: `Cafe sales come from three numbers: how many people come in, how often they return and how much they spend per visit. Before you try tactics, find which number is weakest. Check your POS for average ticket size, your quiet hours and how many customers you recognise as regulars.\n\nMost cafes have an easy win in one place. A cafe with strong morning traffic but empty afternoons has an off-peak problem. A cafe with busy weekends but few weekday regulars has a habit problem. A cafe with plenty of customers but small tickets has an upsell problem.\n\nFixing the weakest number will beat spreading your effort across everything. Keep a simple weekly scorecard: write down transactions, average ticket and the number of regulars you recognised. Small trends show up quickly when you look at the same numbers every week.`,
    section2Heading: 'Seven tactics that work for independent cafes',
    section2Body: `Here are seven tactics that tend to work:\n\n- Pair a drink with a pastry at a small bundle price\n- Train staff to suggest one add-on at the till\n- Offer an off-peak reward — a bonus stamp before eleven or after two\n- Partner with nearby offices, gyms and studios\n- Collect good reviews and photos on Google\n- Take pre-orders for offices and events\n- Build a customer list you can email\n\nThe last one matters most over time. A list of opted-in regulars lets you promote a new menu item or a quiet afternoon without paying for ads. It turns your busiest customers into a channel you own.\n\nChoose two tactics, not seven. Trying everything at once makes it impossible to tell what worked. Pick one that lifts ticket size and one that brings people back. Run them for a month, then review.`,
    section3Heading: 'Use a loyalty card to run these tactics',
    section3Body: `A digital stamp card ties several tactics together. It gives regulars a reason to return, it shows you who they are and it gives you a way to reach them. Design a card with your logo and an eight-stamp reward. Put the QR at the counter and ask every customer to join.\n\nUse your tap page after each stamp to promote the next tactic — show a promo image for your pastry bundle or an off-peak offer. On Pro, email members about quiet afternoons or a new seasonal drink.\n\nCheck the dashboard weekly. If afternoon stamps stay low, adjust the offer. Loyalties is free for up to 100 active customers, so you can test every idea without cost.`,
    cta: 'Start your cafe card free',
  },
  {
    slug: 'attract-customers-landscaping-business',
    title: 'How to Attract More Customers to a Landscaping Business',
    excerpt: 'How to keep past landscaping and trade clients close and turn one-off jobs into repeat work.',
    metaTitle: 'Attract Customers to a Landscaping Business | Loyalties',
    metaDescription: 'How landscaping and trade businesses win local search, keep past clients close and turn one-off jobs into repeat work.',
    tag: 'grow-revenue',
    industry: 'other-services',
    assetKey: 'other',
    assetVariant: 1,
    accent: '#6b7a6a',
    publishDate: '2026-10-01',
    section1Heading: 'Win local search and referrals',
    section1Body: `Most landscaping customers start with a search or a neighbour's recommendation. Make both easy. Keep your Google Business Profile complete, with your service area, a clear category and photos of finished jobs. Ask every happy customer for a review and reply to each one. Photo evidence beats claims.\n\nReferrals come from doing good work and staying visible. Neighbours see your trailer, your finished garden and your yard sign. With permission, leave a small sign after a job and share before and after photos. Make it easy for clients to pass on your number or a link.\n\nSeasonal timing is a lever. Book spring clean-ups in winter and autumn leaf clearing in late summer. Customers who plan ahead are easier to schedule and less price-sensitive.`,
    section2Heading: 'Keep the clients you already won',
    section2Body: `Most service businesses lose clients to silence, not to bad work. Here is how to stay in touch and keep the work flowing:\n\n- Keep a clean list of past clients with their email and the work you did\n- Send a seasonal prompt at the right time — "Time for your autumn tidy" books more jobs than most ads\n- Give clear quotes, start dates and day-of messages — reliability is the main thing clients say they want\n- Ask for a review after every completed job and reply to each one\n\nLandscaping work is seasonal. Lawns need mowing, gardens need pruning and storms need clean-up. A client who used you in spring is your best lead for autumn. Without a reminder, they may forget your name by then.`,
    section3Heading: 'Use a loyalty card between jobs',
    section3Body: `Loyalties is not a lead generator. It keeps past clients close. For a service business, a stamp can mark a completed job rather than a counter tap. Set four stamps and a reward such as a free hedge trim or a discount on the fourth job. After each job, show the client a QR on your phone or invoice. They join in a minute with no app.\n\nThe stamp page can carry a message and a link to book the next visit. On the Pro plan, email members before each season with a simple prompt and your booking link. The dashboard shows who is active and who is close to a reward.\n\nIt is free for up to 100 active customers, which covers most regular clients of a small crew. You turn one-off jobs into repeat work, on whatever timeline your trade actually runs on.`,
    cta: 'Start your service business card free',
  },
  {
    slug: 'most-popular-loyalty-program',
    title: 'What Is the Most Popular Loyalty Program? (And What Small Businesses Can Learn)',
    excerpt: 'What the most popular loyalty programs have in common — and which lessons actually apply to a local business.',
    metaTitle: 'What Is the Most Popular Loyalty Program? | Loyalties',
    metaDescription: 'What the biggest loyalty programs have in common, and which lessons actually apply to a local business.',
    tag: 'compare-tools',
    assetKey: 'retail',
    assetVariant: 2,
    accent: '#7a8b6a',
    publishDate: '2026-10-03',
    section1Heading: 'The big names',
    section1Body: `The answer depends on where you live. In Australia, the largest programs are coalitions. Qantas Frequent Flyer, Flybuys and Woolworths Everyday Rewards each have millions of members. In the United States, Starbucks Rewards is often named as the leading single-brand program, alongside airline and hotel programs such as Marriott Bonvoy.\n\nThese programs share one trait. Members earn and spend points across many places or many purchases, and the program sits in daily life. A supermarket shop or a morning coffee happens often, so points build quickly and the reward feels real.\n\nNewer programs show where the market is heading. Many now live in phone wallets instead of separate apps, because customers already carry cards and tickets there. Wallet-based loyalty removes a large amount of friction.`,
    section2Heading: 'Why they work, and why you cannot copy them',
    section2Body: `The big programs succeed for three core reasons:\n\n- Frequency — customers use them weekly or daily, so points build fast and the reward feels real\n- Simplicity — a customer can explain the reward in one sentence\n- Ecosystem — the program connects many products and partners, multiplying earning opportunities\n\nA local business cannot copy the ecosystem. You do not have a supermarket chain, an airline or a coffee empire behind you. What you can copy is the simplicity and the visible progress. A stamp card is the simplest loyalty mechanic there is. A customer sees four of eight filled in and feels the pull to finish.\n\nData is another reason big programs work. They know what members buy and when, and they use it to time offers. A small business cannot match that scale, but you can know your own members. Knowing who comes weekly and who has gone quiet is a powerful edge at a small scale.`,
    section3Heading: 'What to build for your own business',
    section3Body: `Pick a mechanic your customers can explain in a sentence. Make progress visible. Give a reward worth reaching. And meet customers where they already are — their phone wallet.\n\nLoyalties applies those lessons for a local business. Customers join by scanning a QR, add a branded stamp card to Apple Wallet or Google Wallet and staff add a stamp with a scan. You see active members and redemptions in the dashboard, and on Pro you can email members who opted in.\n\nA good way to start is to write your program in one sentence. "Buy eight coffees and get the ninth free" is clear. If you cannot say it in one breath, simplify it. Then print the sentence on your QR sign so customers see it every day.`,
    cta: 'Build your own simple program free',
  },
  {
    slug: 'best-loyalty-card-app',
    title: 'What Is the Best Loyalty Card App? How to Choose for Your Business',
    excerpt: 'There is no single best loyalty card app. Here is the framework to find the right one for your business.',
    metaTitle: 'How to Choose the Best Loyalty Card App | Loyalties',
    metaDescription: 'There is no single best loyalty card app. Use this six-point framework to pick the right one for your business.',
    tag: 'compare-tools',
    assetKey: 'other',
    assetVariant: 2,
    accent: '#6b7a6a',
    publishDate: '2026-10-05',
    section1Heading: 'There is no single best app',
    section1Body: `The best loyalty card app depends on your business. A coffee shop with daily regulars needs something different from a retailer with occasional high-value sales or a hotel group with a points engine. Anyone who names one winner for everybody is selling something.\n\nA better question is: which app fits your customers, your staff and your budget? Start with your customers — will they download an app for you? If visits are daily and your brand is strong, maybe. For most local businesses, no. Then consider your staff. A scan has to take seconds. Finally consider your budget. Flat pricing is easier than fees that grow with your list.\n\nBeware of lists that rank apps without saying how. A ranking with no criteria and no test is usually an advert. When you read a comparison, including this one, look for the method. We build Loyalties, so treat our view as informed but not neutral, and test any option yourself.`,
    section2Heading: 'Six criteria that matter',
    section2Body: `Use this table to compare any option:\n\n| Criterion | What to look for |\n| --- | --- |\n| Joining time | A new customer can sign up in under a minute |\n| Install needed | Customers add the card without downloading an app |\n| Branding | The card looks like your business, not the vendor's |\n| Staff effort | A stamp takes one scan at the till, even on a busy day |\n| Insight | You can see who your regulars are and how often they visit |\n| Contact | You can email members who agreed to hear from you |\n\nWeigh price last. A cheap tool that customers never use costs more than a fairly priced tool that gets used. Apps in this space commonly run roughly $25 to $50 a month. Loyalties is free for up to 100 active customers and $8 per week for Pro — about $35 a month.\n\nTest with real people. Hand your phone to a regular and ask them to join without help. Watch where they pause. The difference in confusion tells you more than a feature table.`,
    section3Heading: 'Who should pick Loyalties, and who should not',
    section3Body: `Loyalties is built for cafes, bakeries, bars, restaurants, salons, barbershops, nail techs, retail and service businesses with one or a few locations. If your customers return regularly and you want a branded card with no app, it fits.\n\nIt is not the best choice for everyone. A large multi-brand retailer needing points across many stores and deep POS integration needs an enterprise platform. A business that wants its own custom app needs a developer.\n\nIf you are unsure, start free. Design a card in ten minutes, put the QR at your till and watch what your regulars do for a month. The free plan covers your first 100 active customers and there is no contract. That is the quickest way to find out which app is best — the one your own customers actually use.`,
    cta: 'Start free and test it with your regulars',
    embed: { kind: 'cards', afterSection: 2, industry: 'cafes' },
  },

  /* ── Round 2: posts 19–30 ──────────────────────────── */

  {
    slug: 'best-loyalty-programs-for-cafes',
    title: 'Best Loyalty Programs for Cafes: How to Pick One Your Regulars Will Use',
    excerpt: 'The four types of cafe loyalty program compared, and what makes one work at the counter on a busy Monday morning.',
    metaTitle: 'Best Loyalty Programs for Cafes | Loyalties',
    metaDescription: 'Compare paper, POS, app and wallet stamp cards for cafes, and see how to set up a card regulars will use.',
    tag: 'by-industry',
    industry: 'cafes',
    assetKey: 'cafe',
    assetVariant: 2,
    accent: '#c4a574',
    publishDate: '2026-10-07',
    section1Heading: 'What makes a cafe loyalty program work',
    section1Body: `Cafe loyalty is about frequency. A regular might visit three to five times a week, so a program can reward quickly and still feel fair. The best cafe programs share four traits: they ask for almost nothing at sign-up, they deliver a first reward within four to six weeks, they look like the cafe, and they take seconds at the till.\n\nSpeed matters more here than anywhere else. A morning queue gives staff a few seconds per customer. If recording a stamp takes longer than making change, it gets skipped. Choose a program your least patient barista will actually use at 8:15 on a Monday.\n\nReward design matters too. A free coffee after eight visits is the classic. It works because the customer can say it in one breath, and it costs you the ingredients and not the menu price. Fancier systems with points and tiers often confuse people in a business built on a quick flat white.`,
    section2Heading: 'The four types of cafe loyalty program',
    section2Body: `Here is how the four main types compare:\n\n| Type | Pros | Cons |\n| --- | --- | --- |\n| Paper cards | Near zero cost to start | Get lost, faked and forgotten; give you no data |\n| POS-based loyalty | Convenient — already in your system | Ties you to one platform; limited card branding |\n| Branded apps | Full control over experience | Customers rarely download an app for a single cafe |\n| Wallet stamp cards | Lives in Apple/Google Wallet; no app; your logo | Stamp-based, not a full points engine |\n\nWallet stamp cards suit most cafes well because the mechanic is simple and staff add a stamp with one scan.\n\nWhatever you pick, check that it works on both iPhone and Android, and ask who controls the customer list. If you cannot contact your own regulars, the platform owns the relationship, not you.`,
    section3Heading: 'How Loyalties fits a cafe',
    section3Body: `In Loyalties you design the card in minutes. Add your logo, pick your colours and choose the coffee stamp icon. Set eight stamps and name the reward, such as "Free coffee of your choice". Put the QR code at the till and on takeaway cups. Customers scan, enter a name and email and add the card to their phone wallet.\n\nAt the counter, staff scan the QR on the customer's pass to add a stamp. After each stamp, the tap page can show a message or a promo image. The dashboard shows active members, stamp activity and redemptions.\n\nOn Pro, send branded email campaigns to members who opted in, for example to fill a quiet afternoon. Loyalties is free for up to 100 active customers, so you can test it with your own regulars first.`,
    cta: 'Design your cafe card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'cafes' },
  },
  {
    slug: 'attract-customers-to-your-cafe',
    title: 'How Do I Attract Customers to My Cafe? A Practical Local Guide',
    excerpt: 'How to get found, give people a reason to try you, and turn a first visit into a habit.',
    metaTitle: 'How to Attract Customers to Your Cafe | Loyalties',
    metaDescription: 'Get found locally, give people a reason to try you, and turn a first cafe visit into a weekly habit.',
    tag: 'grow-revenue',
    industry: 'cafes',
    assetKey: 'cafe',
    assetVariant: 1,
    accent: '#c4a574',
    publishDate: '2026-10-08',
    section1Heading: 'Get found by people nearby',
    section1Body: `Most cafe visits are local and spontaneous. People search for a cafe near them, glance at photos and hours, then walk in. Make that moment easy. Claim your Google Business Profile, keep your hours accurate, add recent photos of your coffee and food and reply to every review.\n\nYour shopfront is an advert too. A clear A-frame with your best item and a price tells people what you do in five seconds. Make your menu readable from the footpath, and keep your window clean and inviting. Cafes that look busy attract more people, so seat your first customers near the window.\n\nInstagram helps locals see your style before they visit. Post your real drinks, real staff and real regulars, tagged with your suburb. Photos of your best-selling item, taken in daylight, do more than any generic promo.`,
    section2Heading: 'Give people a reason to try you',
    section2Body: `A first visit needs a hook. A signature drink or pastry that people cannot get elsewhere works better than a discount. Make it easy to photograph and easy to name. Then build partnerships with nearby businesses. Offices, gyms, studios and markets all hold groups of people who need coffee and prefer to walk somewhere nearby.\n\nEvents give you stories to tell. A latte art night, a tasting or a community morning gives people a reason to come now and talk about it later. Even a simple regulars breakfast builds a sense of belonging.\n\nBe careful with heavy discounting. It attracts people who leave when the deal ends. A small gift with purchase, such as a free biscuit with the first coffee, brings people in without training them to wait for a sale.`,
    section3Heading: 'Turn a first visit into a habit',
    section3Body: `New customers cost effort to win, so make the second visit easy. At the till, ask every new customer: "Want a stamp card on your phone?" With Loyalties they scan your QR, enter a name and email and add the card in under a minute. There is no app to download.\n\nUse your tap page to welcome them. A short message, a photo of your seasonal special or a link to your Instagram gives them a reason to come back. On Pro, send members a friendly email about a new menu item or a quiet afternoon offer.\n\nDo not forget your staff. They are your best marketing channel, because they talk to every customer. Brief them on your signature item, your stamp card and your weekend specials, and encourage them to learn regulars' names. People return to places where they are known.`,
    cta: 'Start your cafe card free',
  },
  {
    slug: 'benefits-of-loyalty-program-for-cafes',
    title: 'The Benefits of a Loyalty Program for Cafes (For Owners and Customers)',
    excerpt: 'Five ways a loyalty program helps a cafe owner, and what customers quietly get out of it too.',
    metaTitle: 'Benefits of a Loyalty Program for Cafes | Loyalties',
    metaDescription: 'Five ways a cafe loyalty program helps the owner, plus what customers quietly get out of a stamp card.',
    tag: 'by-industry',
    industry: 'cafes',
    assetKey: 'cafe',
    assetVariant: 2,
    accent: '#c4a574',
    publishDate: '2026-10-09',
    section1Heading: 'What a loyalty program does for the owner',
    section1Body: `A loyalty program helps a cafe in five concrete ways:\n\n- Lifts visit frequency — a visible reward gives people a reason to choose you over the cafe next door\n- Shows you who your regulars are — instead of leaving you to guess from familiar faces\n- Builds trade in quiet hours — pair a reward with an off-peak offer and fill the slow periods\n- Gives you a direct line to customers — who opted in and want to hear from you\n- Lowers advertising spend — you can reach people you already won, at almost no cost\n\nThe effect compounds. A regular who visits one extra time a month is worth far more over a year than a stranger who visits once. A cafe with a few hundred of those regulars is a very different business from one that relies on passing trade.\n\nA loyalty program does not fix bad coffee or slow service. It amplifies a good cafe. Get the basics right first, then use loyalty to make good habits stick.`,
    section2Heading: 'What customers get out of it',
    section2Body: `Customers join for simple, personal reasons:\n\n- They get something back — a free coffee after eight visits for habits they already have\n- They feel recognised — the cafe notices they are a regular\n- They gain convenience — a digital card in their phone wallet cannot be lost in a coat pocket\n- They belong — a cafe that knows its regulars becomes part of someone's routine, which is hard for a competitor to break\n\nStaff gain too. A simple stamp routine gives baristas a natural reason to start a short conversation. Asking if a customer wants a stamp card on their phone is an easy opener, and it keeps the experience warm even in a rush.`,
    section3Heading: 'How to capture the benefits and see them',
    section3Body: `Benefits only count if you can see them. Loyalties shows active members, stamp activity and redemptions in the dashboard, so you can check whether visits are rising. Compare your first sixty days with the sixty before if you can, and focus on repeat visits rather than total sales.\n\nSet the program up with care. Choose around eight stamps, a reward you can give at cost and a clear name for the prize. Put the QR where customers stand and train staff to ask every time. On Pro, use email to bring members back on quiet days.\n\nBe patient. The first month builds your member list. The second shows who returns. By the third you can judge whether your reward and stamp count are right. Keep the routine steady while you learn, and change one thing at a time.`,
    cta: 'Start your cafe card free',
  },
  {
    slug: 'best-loyalty-programs-for-restaurants',
    title: 'Best Loyalty Programs for Restaurants: What to Look For and What to Avoid',
    excerpt: 'How to choose a loyalty program suited to less frequent dining visits, and which questions to ask every vendor.',
    metaTitle: 'Best Loyalty Programs for Restaurants | Loyalties',
    metaDescription: 'What restaurants should look for in a loyalty program, which types to avoid, and how a wallet card works on the floor.',
    tag: 'by-industry',
    industry: 'restaurants',
    assetKey: 'restaurant',
    assetVariant: 1,
    accent: '#8b6b4a',
    publishDate: '2026-10-10',
    section1Heading: 'Why restaurants need something different',
    section1Body: `Most loyalty tools were designed for cafes and retail, where customers return weekly. A restaurant guest might return a few times a year. That changes what a good program looks like — stamp counts need to be lower, rewards need to feel like an occasion and the sign-up has to happen without slowing the table down.\n\nA good program gives guests a reason to choose you again, and gives you a list of people who dined with you and agreed to hear from you. Look for five things:\n\n- A join step that takes under a minute\n- A reward that feels like an occasion (free dessert, a side or a snack plate)\n- A way to contact members directly\n- A tool that works alongside your reservation system\n- A routine floor staff can follow during service\n\nConsider the guest journey. A diner books, arrives, orders, eats and pays. The best moment to offer a loyalty card is at payment, when the guest is relaxed and happy. Asking at the door feels like a form. Asking at the end of a good meal feels like a thank you.`,
    section2Heading: 'The types of restaurant loyalty program',
    section2Body: `Restaurants usually encounter four types:\n\n| Type | What it does | Watch out for |\n| --- | --- | --- |\n| Booking platform rewards | Can bring new guests | Guest belongs to the platform, not you |\n| POS-based points | Convenient — in your system | Ties you to one system; rarely matches your brand |\n| Enterprise platforms | Deep features (tiers, points) | Built for large groups; costly and complex for most venues |\n| Wallet stamp cards | Branded card in Apple/Google Wallet; your own list | Simpler mechanic — no points engine |\n\nAsk each vendor who owns the customer relationship. If you cannot email the guests who joined, you are renting your loyalty program instead of building one.`,
    section3Heading: 'How Loyalties works in a restaurant',
    section3Body: `Design your card with your logo and colours. Set four to six stamps and a reward that feels like a treat, such as a free dessert. Put the QR on the table card or the bill folder. Guests scan, add their name and email and add the card to their phone wallet.\n\nStaff scan the QR on the pass at payment to add a stamp. The tap page can thank the guest and promote a seasonal menu. The dashboard shows active members and redemptions.\n\nStart small. Run the card on dinner service only for the first month, with one reward and one QR placement. Ask every guest at payment and track joins per night. Once the routine feels natural, extend it to lunch and private events.`,
    cta: 'Create your restaurant card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'restaurants' },
  },
  {
    slug: 'increase-sales-at-a-restaurant',
    title: 'How to Increase Sales at a Restaurant: 8 Ideas That Work Without Heavy Discounting',
    excerpt: 'Eight restaurant sales ideas that protect your margins — from menu design to a guest email list you actually own.',
    metaTitle: 'How to Increase Sales at a Restaurant | Loyalties',
    metaDescription: 'Eight restaurant sales ideas that protect margins, from menu design to a guest email list you own.',
    tag: 'grow-revenue',
    industry: 'restaurants',
    assetKey: 'restaurant',
    assetVariant: 2,
    accent: '#8b6b4a',
    publishDate: '2026-10-11',
    section1Heading: 'Find where sales leak',
    section1Body: `Restaurant revenue comes from covers multiplied by average spend. Before you try new ideas, find which side is weak. Check your numbers by night. Do Fridays and Saturdays fill while Monday to Wednesday sit empty? Is your average spend lower than it should be because few guests order starters or dessert?\n\nLook at where guests come from too. Around 90 percent research a restaurant online before they dine, so your Google profile, photos and reviews act as your front door. If those are weak, no amount of floor effort will fix the numbers.\n\nWrite down three figures each week: covers, average spend per head and the share of covers on quiet nights. These three numbers show you the problem and tell you whether your changes work.`,
    section2Heading: 'Eight ideas that work',
    section2Body: `Here are eight ideas that work for most restaurants:\n\n- Highlight your most profitable dishes on the menu\n- Train staff to suggest a starter or dessert\n- Run a set menu on quiet nights\n- Offer an early or late seating deal\n- Promote group bookings and private dining\n- Add takeaway or delivery for off-peak revenue\n- Keep your Google profile and reviews strong\n- Build an email list of past guests you actually own\n\nAvoid broad discounting. It cuts margin and trains guests to wait for deals. A set menu or a small extra, such as a complimentary dessert or a snack on a quiet night, gives value without a price cut.\n\nThe email list matters most over time. It lets you promote a new dish or a quiet-night offer to people who already enjoyed your food, at almost no cost.`,
    section3Heading: 'Use loyalty to run these ideas',
    section3Body: `A stamp card turns one-time diners into a list you own. Ask every guest at payment to scan your QR. With Loyalties they add the card to their phone wallet in under a minute. Reward the second or third visit with a dessert or a side, and you give people a reason to return.\n\nUse the tap page after each stamp to promote your quiet-night set menu. On Pro, email members before your slowest night with the offer. The dashboard shows how many members joined, how many came back and how many redeemed.\n\nKeep an eye on the guest experience as well. Fast service, clear communication and a warm welcome bring people back more reliably than any promotion. A loyalty program will not rescue a poor night out, but it will reward a good one.`,
    cta: 'Start your restaurant card free',
  },
  {
    slug: 'rewards-program-for-restaurants',
    title: 'How to Set Up a Rewards Program for Your Restaurant, Step by Step',
    excerpt: 'Seven steps to launch a restaurant rewards program, from choosing the goal to reviewing the dashboard after 30 days.',
    metaTitle: 'Set Up a Restaurant Rewards Program | Loyalties',
    metaDescription: 'Seven steps to launch a restaurant rewards program, from choosing the goal to reviewing the dashboard after 30 days.',
    tag: 'by-industry',
    industry: 'restaurants',
    assetKey: 'restaurant',
    assetVariant: 1,
    accent: '#8b6b4a',
    publishDate: '2026-10-12',
    section1Heading: 'Steps 1 and 2: choose the goal and the reward',
    section1Body: `Start with the outcome you want. For most restaurants it is one of three: a second visit from first-time guests, more midweek covers, or higher spend per visit. Pick one, because a program that chases all three confuses staff and guests.\n\nThen choose the stamp count. A guest who dines twice a year will never finish a ten-stamp card. Four to six stamps is a better fit for most restaurants. The reward should feel like an occasion, such as a free dessert, a free side or a snack plate.\n\nWork out the cost before you commit. A dessert that costs you three dollars to make, given to a guest who has spent two hundred over several visits, is a tiny cost for a repeat customer. Give rewards at cost, not at menu price.`,
    section2Heading: 'Steps 3 to 5: build, place and train',
    section2Body: `3. Design the card in Loyalties — add your logo, choose your colours, pick a stamp icon, set the stamp count and name the reward clearly\n4. Place the QR where guests already look — the table card, the bill folder and the front door\n5. Train floor staff to say one sentence at payment: "Want a stamp card on your phone? Your fourth visit gets a free dessert." — practise it once before the first busy service\n\nSet up the tap page with a thank-you message and a promo image for a seasonal dish. Every stamp then doubles as a small marketing moment.`,
    section3Heading: 'Steps 6 and 7: launch and review',
    section3Body: `6. Launch with a short staff briefing and a week of friendly reminders\n7. After thirty days, open the dashboard and check: how many members joined, how many returned, how many are close to a reward — if few are close, lower the stamp count\n\nKeep the program tidy. Members opt in to emails and can unsubscribe in one click. Stick with food-led rewards that are easy to fulfil during service.\n\nAvoid common mistakes: do not make the reward too big, do not limit it to your busiest nights, and do not forget to ask every guest. Loyalties is free for up to 100 active customers, and Pro at $8 per week adds email campaigns when you want to fill quiet nights.`,
    cta: 'Build your restaurant card in 10 minutes',
  },
  {
    slug: 'best-loyalty-programs-for-bars',
    title: 'Best Loyalty Programs for Bars and Pubs',
    excerpt: 'What a bar needs from a loyalty program — speed, no app required, and a reward built around food, snacks or a drink deal.',
    metaTitle: 'Best Loyalty Programs for Bars and Pubs | Loyalties',
    metaDescription: 'What bars need from loyalty: speed, no app, and a reward built around food, snacks or a drink deal.',
    tag: 'by-industry',
    industry: 'bars',
    assetKey: 'bar',
    assetVariant: 1,
    accent: '#5c6b7a',
    publishDate: '2026-10-13',
    section1Heading: 'What a bar needs from a loyalty program',
    section1Body: `Bars have loyalty needs that cafes and restaurants do not. The room is dark and loud. Staff change often. Guests arrive in groups and pay in different ways. A loyalty program has to work inside all of that.\n\nLook for five things:\n\n- It must be fast — a busy bar cannot wait on a slow app\n- It must need no download — guests will not install an app at the bar on a Friday night\n- It must survive staff turnover — a new bartender should be able to use it from the first shift\n- It should help you know your regulars\n- It should reward visits, not how much someone orders in one night\n\nThat last point matters. A program that pays out for every drink bought teaches the wrong habit. Rewarding visits, event attendance or food keeps the focus on coming back — and on sharing a plate with friends.`,
    section2Heading: 'The options, and how they behave in a busy bar',
    section2Body: `Here is how the four main options compare for a bar:\n\n| Option | How it works | Bar-specific issue |\n| --- | --- | --- |\n| Paper cards | Cheap to start, hand out at the bar | Get wet, lost or left in a jacket; give you no data |\n| POS / tab-based loyalty | Records what goes through the till | Only records that system; often looks generic |\n| Branded apps | Full control over the experience | Guests almost never download an app at a bar |\n| Wallet stamp cards | Scan QR once; card lives in phone wallet | Works best with a food, snack or drink-deal reward |\n\nWallet stamp cards work well in bars because staff add a stamp by scanning the pass in a few seconds, even in low light.\n\nMost venues keep the reward on the food menu — a snack plate, a share plate or a small food discount. A discounted drink is a solid alternative if you want the reward tied to the bar list.`,
    section3Heading: 'How Loyalties fits a bar',
    section3Body: `Loyalties suits bars that want a simple, branded card. Add your logo and colours and pick a stamp icon. Set six to eight stamps. Choose a reward that fits your menu and your margins, such as a snack plate, a food discount, a small drink discount or a perk like a reserved table on a busy night.\n\nPut the QR on the bar, on tables and on the door. Guests scan, enter a name and email and add the card to their phone. Staff scan the pass at the end of a visit to add a stamp. The tap page can promote your next event.\n\nThe dashboard shows active members, stamp activity and redemptions. On Pro, email members who opted in about trivia nights, live music or new menus. Loyalties is free for up to 100 active customers.`,
    cta: 'Create your bar card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'bars' },
  },
  {
    slug: 'attract-more-customers-to-a-bar',
    title: 'How to Attract More Customers to Your Bar: Ideas Beyond Happy Hour',
    excerpt: 'How to decide who you want, make yourself easy to find, and turn a one-off night out into a regular habit.',
    metaTitle: 'How to Attract More Customers to a Bar | Loyalties',
    metaDescription: 'Ideas beyond happy hour: decide who you want, get found, and turn a one-off night out into a regular habit.',
    tag: 'grow-revenue',
    industry: 'bars',
    assetKey: 'bar',
    assetVariant: 1,
    accent: '#5c6b7a',
    publishDate: '2026-10-14',
    section1Heading: 'Decide who you want, then make yourself easy to find',
    section1Body: `Start by deciding who you want. A craft beer bar, a cocktail lounge and a sports pub attract different guests. Write down the crowd you want and the nights you want them. Then look at your weakest nights. Most bars fill on Friday and Saturday, so the real opportunity sits between Monday and Wednesday.\n\nMake yourself easy to find. Keep your Google Business Profile current, with accurate opening hours, recent photos taken at night and your event listings. People often look for something to do the same evening, so a profile that shows a busy, friendly room beats a stock photo.\n\nReviews matter too. A steady flow of recent reviews tells new guests that your venue is alive and well run. Ask happy guests to leave one, and reply to every review in your own voice.`,
    section2Heading: 'Build a reason to come on a quiet night',
    section2Body: `Events give people a reason to pick a Tuesday. Here are approaches that work:\n\n- Run a weekly event (trivia, live music, tastings, quiz night) on the same night every week for at least two months — habits need repetition\n- Partner with local sports clubs, workplaces, university societies and meetup groups — offer a reserved area and a simple food deal\n- Make the room look alive early — seat your first guests near the front, keep music and lighting right\n- Add food — a simple menu of shared plates gives people a reason to stay longer and brings in a wider audience\n\nPartnerships help as well. Local sports clubs, workplaces, university societies and meetup groups can bring in groups who then become regulars.\n\nPromote your weekly event everywhere — on your door, on your socials and to your email list.`,
    section3Heading: 'Turn a one-off night into a habit',
    section3Body: `A one-off visit is the start, not the goal. Turn it into a habit. Ask every new guest to scan your QR and add your stamp card. With Loyalties, they join in under a minute and there is no app. Reward visits and event attendance with food, snacks, a drink deal or a venue perk.\n\nUse the tap page to promote your next event after each stamp. On Pro, email members a few days before trivia or live music nights, so the room fills early. The dashboard shows who is active and who has gone quiet.\n\nReview your numbers monthly. If your quiet nights stay quiet, change the event and not the stamp card. Loyalties is free for up to 100 active customers, so you can run the plan at no cost.`,
    cta: 'Start your bar card free',
  },
  {
    slug: 'rewards-program-for-bars',
    title: 'How to Run a Rewards Program for Your Bar',
    excerpt: 'How to set the rules, train the team and run a bar rewards program that is fast, food-friendly and worth coming back for.',
    metaTitle: 'How to Run a Rewards Program for Your Bar | Loyalties',
    metaDescription: 'Set the rules, train the team and run a bar rewards program built around food, snacks or a drink deal.',
    tag: 'by-industry',
    industry: 'bars',
    assetKey: 'bar',
    assetVariant: 1,
    accent: '#5c6b7a',
    publishDate: '2026-10-15',
    section1Heading: 'What to reward, and how big to make it',
    section1Body: `Start with what you want to reward. For a bar, the best answer is visits and events — not how many drinks someone orders in one night. A guest who comes four times in two months and brings friends is worth more than a one-night blowout.\n\nSet the stamp count to match how often your regulars visit. A guest who comes weekly can finish an eight-stamp card in two months. A guest who comes fortnightly needs a lower count, perhaps five or six. Choose a reward that is easy to name: a burger, a snack plate, a food discount or a small discount on a drink keeps your costs clear and the offer easy to say at the bar.`,
    section2Heading: 'Set the rules and train the team',
    section2Body: `Decide your rules before you launch, and write them down. Bar staff are busy, so they need a rule they can apply without thinking. Here is a simple setup:\n\n1. Place your QR in three spots — on the bar, on tables and by the door\n2. Train staff to scan at a natural point — when a guest pays or leaves\n3. One scan per guest per visit — keeps the program fair and the data clean\n4. For groups — decide in advance whether each paying guest gets a stamp or only the person who pays for the table\n5. Use your tap page for your next event or special — every stamp becomes a small marketing moment\n\nKeep the privacy side simple: only email members who opted in, and make each email worth opening.`,
    section3Heading: 'Launch, review and keep it simple',
    section3Body: `Launch with a short staff briefing and a poster at the bar. After thirty days, check the dashboard. Look at active members, stamp activity and redemptions. If most members are one or two stamps away, you have set the level well. If few are close, lower the count.\n\nOn Pro, send a short email before big nights. Members who opted in will hear about trivia, live music or a new menu, and you can see opens and clicks. Every email includes a one-click unsubscribe.\n\nTune the program — do not set it and forget it. Keep rewards modest, keep the routine fast and keep the tone friendly. Reward showing up, not ordering more. Loyalties is free for up to 100 active customers.`,
    cta: 'Build your bar card in 10 minutes',
  },
  {
    slug: 'best-loyalty-programs-for-bakeries',
    title: 'Best Loyalty Programs for Bakeries: Keep Your Weekly Regulars',
    excerpt: 'A bakery runs on routine. Here is how to choose a loyalty program that rewards that routine without slowing the queue.',
    metaTitle: 'Best Loyalty Programs for Bakeries | Loyalties',
    metaDescription: 'How bakeries choose a loyalty program that rewards weekly regulars without slowing the morning queue.',
    tag: 'by-industry',
    industry: 'bakeries',
    assetKey: 'bakery',
    assetVariant: 2,
    accent: '#d4a574',
    publishDate: '2026-10-16',
    section1Heading: 'What a bakery needs',
    section1Body: `A bakery runs on routine. Some customers buy bread every morning. Others stop by on Saturdays. Some only appear for birthdays and gatherings. A good loyalty program rewards the routine and nudges the occasional customer into becoming a regular.\n\nBakeries have needs other shops do not. Staff often have flour on their hands and a queue at the door, so recording a visit has to take seconds. Stock is fresh in the morning and sold out by noon, so you want a way to tell regulars when something special comes out of the oven.\n\nLook for five things:\n\n- Speed at the counter — one scan, no login\n- No app required — customers add the card from a QR scan\n- Your branding on the card — logo, colours, stamp icon\n- A way to contact members — for limited batches and pre-order dates\n- Flat pricing — does not grow with your list`,
    section2Heading: 'The options for a bakery',
    section2Body: `Here is how the four common types compare for a bakery:\n\n| Type | Pros | Cons |\n| --- | --- | --- |\n| Paper cards | Near zero cost | Get crumpled, lost; no data on regulars |\n| POS loyalty | Built into your till | Ties you to one system; limited branding |\n| Branded apps | Full control | Few customers install an app for a single bakery |\n| Wallet stamp cards | Your logo; no app needed; one scan per visit | Stamp-based, not a full points engine |\n\nCost per reward is easier to control in a bakery than in most trades. A pastry costs you a small amount in ingredients and labour already in the oven. Name a reward that uses items you can make in volume, and avoid rewards that depend on limited products that sell out.`,
    section3Heading: 'How Loyalties fits a bakery',
    section3Body: `In Loyalties, design your card with your logo and colours. Choose the pastry, donut or cake icon. Set eight stamps and name the reward plainly, such as "Free pastry of your choice". Put the QR on the counter, on bags and in the window. Customers scan, enter a name and email and add the card to their phone wallet.\n\nStaff scan the QR on the pass at purchase to add a stamp. After each stamp, the tap page shows a message or a photo of your seasonal bake. The dashboard shows active members and redemptions.\n\nOn Pro, email members when a limited batch lands or when pre-order dates open for holidays. Loyalties is free for up to 100 active customers.`,
    cta: 'Start your bakery card free',
    embed: { kind: 'cards', afterSection: 2, industry: 'bakeries' },
  },
  {
    slug: 'increase-sales-at-a-bakery',
    title: 'How to Increase Sales at a Bakery: Simple Ideas for Every Part of the Day',
    excerpt: 'How to find your weak part of the day, reduce waste and use loyalty to connect the ideas that work.',
    metaTitle: 'How to Increase Sales at a Bakery | Loyalties',
    metaDescription: 'Find your weak part of the day, cut waste and use a bakery loyalty card to connect the ideas that work.',
    tag: 'grow-revenue',
    industry: 'bakeries',
    assetKey: 'bakery',
    assetVariant: 1,
    accent: '#d4a574',
    publishDate: '2026-10-17',
    section1Heading: 'Find your weak part of the day',
    section1Body: `A bakery sells in waves. The morning rush brings bread and coffee. Lunch brings sandwiches and savoury items. The afternoon is quieter. Before you try new ideas, work out which part of the day is weakest. Check your till data by hour and by product.\n\nThen look at waste. Unsold product at the end of the day is lost margin. Track what sells out early and what is left over. Bake more of the first and less of the second. Small shifts in production planning often add more profit than a new marketing idea.\n\nWrite down three numbers each week: sales by day part, items left over at close and your count of regular customers. These three show you where to act, and they show whether your changes work.`,
    section2Heading: 'Ideas that work for bakeries',
    section2Body: `Here are ideas that work well for most bakeries:\n\n- Bundle a coffee with a pastry at a small saving\n- Add lunch lines — filled rolls and soups lift midday sales\n- Offer pre-orders and catering for offices and events (larger tickets)\n- Run seasonal lines with clear dates to create urgency\n- Supply local cafes with wholesale products if your capacity allows\n- Post photos and short videos of fresh loaves coming out of the oven — at the moment the product is ready, so people can come while it is warm\n\nBe careful with discounts. Marking down day-old items can clear stock, but do it quietly so it does not teach regulars to wait for the afternoon. A bonus stamp or a small free item for early purchases protects your prices.`,
    section3Heading: 'Use loyalty to tie the ideas together',
    section3Body: `Loyalty ties these ideas together. Give every customer a way to join in under a minute. With Loyalties they scan your QR and add the card to their phone wallet. Staff add a stamp with a scan. Regulars get a reward, and you get a list of people who want to hear from you.\n\nUse the tap page after each stamp to promote your next idea, such as a new lunch item or a pre-order date. On Pro, email members when limited batches or seasonal lines launch. Because members opted in, these messages reach people who care.\n\nCheck the dashboard weekly. Look at active members, stamp activity and redemptions. If afternoon stamps are low, try a bonus stamp for afternoon visits. Loyalties is free for up to 100 active customers, so you can test every idea without cost.`,
    cta: 'Start your bakery card free',
  },
  {
    slug: 'good-loyalty-app-for-bakeries',
    title: 'What Is a Good Loyalty App for Bakeries?',
    excerpt: 'A checklist to find a loyalty app that works at the speed of the queue, looks like your shop and covers both weekly regulars and occasional buyers.',
    metaTitle: 'What Is a Good Loyalty App for Bakeries? | Loyalties',
    metaDescription: 'A checklist for a bakery loyalty app that works at queue speed, looks like your shop and covers regulars.',
    tag: 'compare-tools',
    industry: 'bakeries',
    assetKey: 'bakery',
    assetVariant: 2,
    accent: '#d4a574',
    publishDate: '2026-10-18',
    section1Heading: 'What a good app has to do',
    section1Body: `A good loyalty app for a bakery works at the speed of the queue. Staff have flour on their hands and customers want their bread and a smile, not a login screen. If the app slows the counter, it will not last a week.\n\nIt also has to cover two kinds of customer. Weekly regulars buy bread and pastries on a rhythm. Occasional customers come for birthdays, holidays and gifts. A good program rewards the first group and gives the second a reason to return for everyday items.\n\nAnd it has to look like your shop. Bakeries sell craft and care. A generic card in a shared app does not reflect that. A card with your logo, your colours and a stamp icon that matches your counter feels like part of the product.`,
    section2Heading: 'A checklist you can use on any option',
    section2Body: `Use this checklist before committing to any loyalty app:\n\n- Joining is quick — under a minute, no app download required\n- The card carries your branding — your logo, colours and stamp icon\n- A stamp is one scan at the counter — no login, no manual entry\n- You can see who your regulars are — a dashboard with member and stamp history\n- You can email members who opted in — for limited batches and pre-order dates\n- The price is flat and clear — does not grow with your list or per message sent\n\nTest the options yourself. Hand your phone to a regular and ask them to join without help. Watch where they pause. Then ask a staff member to add a stamp in a busy moment. The difference in friction between tools is obvious within minutes.\n\nBe wary of tools that charge per customer or per message. A program that works should not become more expensive as it grows. Flat pricing is easier to plan around, particularly for a business with tight margins.`,
    section3Heading: 'Where Loyalties fits, and where it does not',
    section3Body: `Loyalties meets this checklist for most bakeries. Customers scan a QR, enter a name and email and add a branded card to Apple Wallet or Google Wallet. Staff scan the QR on the pass to add a stamp. The dashboard shows active members and redemptions. On Pro, you can email members about limited batches and seasonal pre-orders.\n\nIt is not everything. Loyalties does not take online orders, manage inventory or replace your point of sale. It is built to bring customers back. If you need online ordering, you will pair it with a separate tool.\n\nPricing is simple: free for up to 100 active customers, and Pro at $8 per week for email campaigns. There is no contract. Set up a card in ten minutes, put the QR on your counter and see what your regulars do over a month.`,
    cta: 'Create your bakery card free',
  },
]

export function postsForTag(tagId: ResourceTagId) {
  return blogPosts.filter((p) => p.tag === tagId)
}

export function tagForPost(post: BlogPost): ResourceTag {
  return resourceTags.find((t) => t.id === post.tag) ?? resourceTags[0]
}

export function industryForPost(post: BlogPost): ResourceIndustry | undefined {
  if (!post.industry) return undefined
  return resourceIndustries.find((i) => i.id === post.industry)
}

/** Industries that have at least one post. */
export function industriesWithPosts(): ResourceIndustry[] {
  const used = new Set(
    blogPosts.map((p) => p.industry).filter(Boolean) as ResourceIndustryId[],
  )
  return resourceIndustries.filter((i) => used.has(i.id))
}

/**
 * Returns the display label, symbol and colours for a post's card tag.
 * Industry posts show "Industry · [Name]" with the industry symbol;
 * all other posts show the tag label and symbol.
 */
export function displayTagForPost(post: BlogPost): {
  label: string
  symbol: string
  pastel: string
  ink: string
} {
  if (post.industry) {
    const ind = resourceIndustries.find((i) => i.id === post.industry)
    if (ind) {
      return {
        label: `Industry · ${ind.label}`,
        symbol: ind.symbol,
        pastel: ind.pastel,
        ink: ind.ink,
      }
    }
  }
  const tag = resourceTags.find((t) => t.id === post.tag) ?? resourceTags[0]
  return { label: tag.label, symbol: tag.symbol, pastel: tag.pastel, ink: tag.ink }
}
