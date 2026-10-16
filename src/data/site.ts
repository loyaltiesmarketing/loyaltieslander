export const APP_URL = 'https://app.loyalties.marketing'

/** Use this for every button so signups can be traced back to the page they came from. */
export function appUrl(slug: string) {
  return `${APP_URL}?utm_source=site&utm_medium=industry-page&utm_campaign=${slug}`
}

// ── Types ──────────────────────────────────────────────────────────────────

export type ProblemFeature = 'wallet' | 'scan' | 'mail' | 'coupon' | 'page' | 'members'

export type Problem = {
  feature: ProblemFeature
  pain: string
  detail: string
  fix: string
}

export type CampaignIdea = { subject: string; when: string }

export type RewardIdeas = { stamp: string; coupon: string }

export type Step = { title: string; body: string }

export type WalletShowcaseData = {
  stampIcon: string
  venueName: string
  reward: string
  stampsFilled: number
  stampsRequired: number
}

export type Testimonial = {
  quote: string
  author: string
  businessName: string
}

export type PricingTier = {
  name: string
  price: string
  priceNote: string
  cta: string
  featured?: boolean
  points: string[]
}

export type PricingComparisonRow = {
  feature: string
  free: string | string[]
  pro: string | string[]
  emphasizePro?: boolean
}

export type FAQ = { question: string; answer: string }

export type Industry = {
  slug: string
  name: string
  blurb: string
  accent: string
  assetKey: string
  metaTitle: string
  metaDescription: string
  hero: string
  subtext: string
  problems: [Problem, Problem, Problem]
  campaignIdeas: [CampaignIdea, CampaignIdea, CampaignIdea, CampaignIdea]
  rewardIdeas: RewardIdeas
  showcase: WalletShowcaseData
  testimonials: Testimonial[]
  faqs: FAQ[]
  ctaHeading: string
  cta: string
}

// ── Shared copy ────────────────────────────────────────────────────────────

export const HERO_NOTE = 'Free to start. No apps to download. No hardware to buy.'

export const PROBLEM_COPY = {
  heading: 'A loyalty system that runs in the background, so you can run your venue.',
  cta: 'See how it works',
}

export const HOW_IT_WORKS: { heading: string; steps: [Step, Step, Step] } = {
  heading: 'How it works.',
  steps: [
    {
      title: 'Connect in minutes.',
      body: 'Upload your logo and set your reward. We handle the formatting.',
    },
    {
      title: 'Guests tap and join.',
      body: 'Customers scan a QR code on the table and add the pass to their digital wallet in two taps. No app required.',
    },
    {
      title: 'Watch them return.',
      body: 'Automatically invite opted-in guests back for new menus, events, or quiet mid-week services.',
    },
  ],
}

export const PRICING_COPY: {
  heading: string
  footnote: string
  ctaHeading: string
  cta: string
  tiers: [PricingTier, PricingTier]
  comparison: PricingComparisonRow[]
} = {
  heading: 'Plans for every stage',
  footnote: 'Prices in AUD, GST included. Free covers up to 100 active customers.',
  ctaHeading: 'Ready when your regulars are.',
  cta: 'Start free',
  tiers: [
    {
      name: 'Free',
      price: '$0',
      priceNote: 'Up to 100 active customers',
      cta: 'Start free',
      points: [
        'For smaller, community-focused venues',
        'A stamp card your regulars will actually use',
        'No setup cost — start at the till this week',
        'Upgrade when you want to reach them',
      ],
    },
    {
      name: 'Pro',
      price: '$8',
      priceNote: 'per week',
      cta: 'Go Pro',
      featured: true,
      points: [
        'For venues ready to fill quiet nights',
        'Email your opted-in regulars, not a rented list',
        'See which locations and campaigns actually work',
        'Less than a couple of coffees a week',
      ],
    },
  ],
  comparison: [
    { feature: 'Card design (logo, colours, stamp icon, reward)', free: 'Yes', pro: 'Yes' },
    { feature: 'Join page + customer / tap page', free: 'Yes', pro: 'Yes' },
    { feature: 'Apple / Google Wallet stamp passes', free: 'Yes', pro: 'Yes' },
    { feature: 'Scan pass (QR stamp + promo redeem)', free: 'Yes', pro: 'Yes' },
    { feature: 'Members list', free: 'Yes', pro: 'Yes' },
    {
      feature: 'Location data',
      free: 'Single-site view',
      pro: 'Multi-site breakdown',
      emphasizePro: true,
    },
    {
      feature: 'Rewards / coupons',
      free: 'Standalone Wallet vouchers',
      pro: [
        'Standalone Wallet vouchers',
        'Promotional links',
        'Tracked links inside email campaigns',
      ],
      emphasizePro: true,
    },
    {
      feature: 'Email campaigns',
      free: 'Locked',
      pro: [
        'Build and send branded emails',
        'Schedule campaigns',
        'Ready-made templates',
        'Opens and click tracking',
        'One-click unsubscribe',
      ],
      emphasizePro: true,
    },
    { feature: 'Price', free: '$0', pro: '$8 / week AUD' },
  ],
}

export const SEND_COPY = {
  heading: 'What you could send this month.',
  body: 'Reach only the members who opted in. Every email has a one-click unsubscribe.',
}

export const REWARD_COPY = {
  heading: 'Reward ideas to start with.',
  stampLabel: 'On the stamp card',
  couponLabel: 'As a one-off Reward coupon',
}

export const SHOWCASE_COPY = {
  heading: 'One card. Every phone.',
  body: 'Customers add it to Apple Wallet on iPhone or Google Wallet on Android. Nothing to download.',
  trust: 'Members sign in with an emailed code, Google or Apple. Email goes only to members who opted in.',
}

export const TESTIMONIAL_COPY = { heading: 'From the people using it.' }

export const FAQ_COPY = { heading: 'Questions you will have.' }

export const CTA_BODY = 'Design your card, share your QR and let your first customers join. Free to start.'

export const CTA_FOOTNOTE =
  'Free to start. Email campaigns are on Pro at $8 per week (AUD, GST included). Apple Wallet is a trademark of Apple Inc. Google Wallet is a trademark of Google LLC.'

export const GLOBAL_FAQS: FAQ[] = [
  {
    question: 'Do my customers need to download an app?',
    answer: 'No. They add the card to Apple Wallet or Google Wallet. Nothing to install and no password to remember.',
  },
  {
    question: 'How do customers sign up?',
    answer:
      'They scan your QR code or open your link, sign in with an emailed code, Google or Apple, choose whether to hear from you and add the card to their wallet. They only do it once.',
  },
  {
    question: 'What do my staff have to do?',
    answer:
      "Open Scan pass on a phone or tablet and scan the QR on the customer's pass. A short cooldown stops accidental double stamps. There is no hardware to buy.",
  },
  {
    question: 'Who can I email?',
    answer:
      'Only members who opted in when they joined. Every email has a one-click unsubscribe, and members can change their preference or leave the program from their manage page.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Core loyalty is free for up to 100 active customers: card design, join page, Wallet passes, scan stamping, members, single-site location view and standalone Reward coupons. Pro is $8 per week (AUD, GST included) for multi-site location breakdown, promotional and tracked reward links, and the full email campaign suite.',
  },
  {
    question: 'Can I change my card later?',
    answer: 'Yes. You can edit your logo, colours, stamp icon, stamps required and reward from the dashboard.',
  },
  {
    question: 'Does it replace my point of sale or booking system?',
    answer: 'No. Loyalties sits beside them as a silent partner. It does not take payments or bookings.',
  },
]

// ── Industry data ──────────────────────────────────────────────────────────

export const industries: Industry[] = [
  {
    slug: 'restaurants',
    name: 'Restaurants',
    blurb: 'Invite past guests back.',
    accent: '#a53e49',
    assetKey: 'restaurant',
    metaTitle: 'Loyalty card and email marketing for restaurants | Loyalties',
    metaDescription:
      "Put your restaurant's reward card in Apple Wallet and Google Wallet, then email the guests who opted in about new menus and quiet nights. Free to start.",
    hero: 'Turn one-time guests into regulars, automatically.',
    subtext:
      "Put a digital reward card in your customers' Apple or Google Wallet and keep your tables full.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction at the table.',
        detail: "Guests just scan a QR code; staff don't need to navigate complex POS menus during a rush.",
        fix: 'Customers scan a QR at the table, join once and add the card to their digital wallet in two taps.',
      },
      {
        feature: 'mail',
        pain: 'Fill your quietest nights.',
        detail: "Tuesday is empty? You have a set menu or wine night, but your audience is whoever scrolls past your feed.",
        fix: 'On Pro, automatically invite opted-in guests back for new menus, events, or slow mid-week services through targeted email campaigns.',
      },
      {
        feature: 'scan',
        pain: 'Reward loyalty, not deal-hunters.',
        detail: 'Public discounts reward people who never return. A deal on a booking site usually brings a guest once.',
        fix: 'Reward the guests who return with a free dish or custom perk on their stamp card.',
      },
    ],
    campaignIdeas: [
      { subject: 'Spring menu launches Thursday', when: 'When the menu changes' },
      { subject: 'Wine night, a few seats left', when: 'Ahead of an event' },
      { subject: 'Midweek set menu, Tuesday to Thursday', when: 'To fill quiet nights' },
      { subject: 'Book your festive table', when: 'When the holiday season opens' },
    ],
    rewardIdeas: {
      stamp: 'A free dessert on the fourth visit.',
      coupon: 'A complimentary starter on a Tuesday, claimed from a link.',
    },
    showcase: { stampIcon: 'chef', venueName: 'Your Restaurant', reward: 'Free dessert', stampsFilled: 3, stampsRequired: 5 },
    testimonials: [
      {
        quote: "Being able to send a quick email to fill our quietest nights without relying on public discount sites has completely changed the way we operate. It's a silent partner that just works.",
        author: 'Owner',
        businessName: 'Barillo',
      },
    ],
    faqs: [
      {
        question: 'Guests only dine a few times a year. Does a stamp card still work?',
        answer:
          'Set a low stamp count and a reward that feels like a treat, like a dessert on the fourth visit. The bigger prize is the list. Every guest who opts in is someone you can invite back.',
      },
      {
        question: 'How do guests join at the table?',
        answer:
          'Put a QR on the table card or bill folder. They scan it, sign in with an emailed code, Google or Apple, and add the card to their wallet. Staff scan the pass at payment.',
      },
      {
        question: 'Can I promote a new menu or a quiet night?',
        answer:
          'Yes. On Pro, email opted-in members when the menu changes or a quiet night needs a reason. You can also create a Reward coupon with a claim link for a one-off offer.',
      },
      {
        question: 'Does it work with our booking system?',
        answer:
          'It sits beside it. Loyalties does not take bookings or payments, but the page guests see after every stamp can link to your booking page.',
      },
    ],
    ctaHeading: 'Learn who dined. Invite them back.',
    cta: 'Start for free',
  },
  {
    slug: 'cafes',
    name: 'Cafes',
    blurb: 'Reach the regulars you already have.',
    accent: '#c4a574',
    assetKey: 'cafe',
    metaTitle: 'Loyalty card and email marketing for cafes | Loyalties',
    metaDescription:
      "Put your cafe's stamp card in Apple Wallet and Google Wallet, then email the regulars who opted in about menus and offers. Free to start.",
    hero: 'A loyalty system that runs in the background, so you can run your cafe.',
    subtext:
      "Loyalties puts a stamp card in your customers' phone wallets, then lets you automatically email the ones who opted in about your menu, your specials and your news.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction at the counter.',
        detail: 'The morning queue is chaotic. Staff don\'t need to navigate complex POS menus during a rush.',
        fix: 'Customers join once with an emailed code, Google or Apple. Staff just scan the QR code and the queue keeps moving.',
      },
      {
        feature: 'mail',
        pain: 'Fill your quietest afternoons.',
        detail: 'The morning rush is great, but 2pm needs a reason. Instagram only shows your post to a fraction of your followers.',
        fix: 'On Pro, email your opted-in members with targeted campaigns. Branded templates, sent in one go or scheduled.',
      },
      {
        feature: 'scan',
        pain: 'Reward loyalty, not deal-hunters.',
        detail: 'Paper cards get lost in bags, forgotten in cars, or stamped by whoever has a pen.',
        fix: 'The card lives safely in Apple Wallet or Google Wallet. A short cooldown stops accidental double stamps, rewarding genuine loyalty.',
      },
    ],
    campaignIdeas: [
      { subject: 'New brunch menu starts Saturday', when: 'When the menu changes' },
      { subject: 'Seasonal latte, this week only', when: 'When a limited drink lands' },
      { subject: "Holiday hours: what's open and when", when: 'Before a public holiday' },
      { subject: 'Your 2pm coffee is on us', when: 'To fill a quiet afternoon, with a Reward coupon' },
    ],
    rewardIdeas: {
      stamp: 'A free coffee on the eighth stamp.',
      coupon: 'A free pastry with any coffee, claimed from a link in your email.',
    },
    showcase: { stampIcon: 'coffee', venueName: 'Your Cafe', reward: 'Free coffee', stampsFilled: 5, stampsRequired: 8 },
    testimonials: [
      {
        quote: "We don't have time to mess with POS integrations during the morning rush. Guests just tap the QR on the cart and the pass is in their wallet. It's completely frictionless.",
        author: 'Operator',
        businessName: 'Brew Labs',
      },
    ],
    faqs: [
      {
        question: 'Will it slow the morning queue?',
        answer:
          "It adds one scan. The pass is already in the customer's wallet. Staff open Scan pass on a phone or tablet at the till and scan it. There is no typing, no login and nothing to hand over.",
      },
      {
        question: 'What should my reward be?',
        answer:
          'Pick something that costs you little and feels generous. A free coffee on the eighth stamp is the classic. You can also choose a percentage off or write your own reward.',
      },
      {
        question: 'What would I actually email my regulars?',
        answer:
          'New menu items, a seasonal special, holiday hours, or an offer for a quiet afternoon. On Pro you build the email from branded templates, then send it or schedule it.',
      },
      {
        question: 'Can I run it across more than one cafe?',
        answer: 'Yes. Add each site as a location to see activity venue by venue.',
      },
    ],
    ctaHeading: 'Know your regulars. Reach them.',
    cta: 'Start for free',
  },
  {
    slug: 'bars',
    name: 'Bars',
    blurb: 'Fill the room on purpose.',
    accent: '#1e293b',
    assetKey: 'bar',
    metaTitle: 'Loyalty card and email marketing for bars | Loyalties',
    metaDescription:
      "Put your bar's stamp card in Apple Wallet and Google Wallet, then email the regulars who opted in about events and what's on. Free to start.",
    hero: 'Fill the room on purpose, automatically.',
    subtext:
      "Put a digital reward card in your regulars' Apple or Google Wallet and give Tuesday a reason.",
    problems: [
      {
        feature: 'members',
        pain: 'Zero friction at the door.',
        detail: "A good bartender remembers a name, but rosters change. Staff need a system that doesn't slow them down.",
        fix: 'Members join once and the list stays in your account. Any staff member can open Scan pass and stamp in a second.',
      },
      {
        feature: 'mail',
        pain: 'Fill your quietest nights.',
        detail: 'Live music or trivia is only as loud as your Instagram. If someone scrolls past, they missed it.',
        fix: 'On Pro, automatically email opted-in members before the night. The page they see after every stamp can promote the next event with a link.',
      },
      {
        feature: 'scan',
        pain: 'Reward loyalty the smart way.',
        detail: 'Free rounds and drink-count deals teach the wrong habit.',
        fix: 'Reward visits, not volume. A stamp for showing up, then a reward you choose: food, snacks, a drink deal or a venue perk.',
      },
    ],
    campaignIdeas: [
      { subject: 'Live music this Friday, from 8', when: 'In the days before an event' },
      { subject: 'Trivia is back on Tuesday', when: 'For a weekly night' },
      { subject: 'Guest DJ announced', when: 'When a lineup is confirmed' },
      { subject: 'Closing early on Sunday', when: 'Before a change in hours' },
    ],
    rewardIdeas: {
      stamp: 'A free snack plate on the sixth visit.',
      coupon: 'A free side with any main on a quiet night, claimed from a link.',
    },
    showcase: { stampIcon: 'bar', venueName: 'Your Bar', reward: 'Free snack plate', stampsFilled: 5, stampsRequired: 8 },
    testimonials: [],
    faqs: [
      {
        question: 'Can I promote our events?',
        answer:
          'Yes. On Pro, email opted-in members before the night. The page they see after each stamp can also promote your next event with an image and a link.',
      },
      {
        question: 'Is it a ticketing tool?',
        answer:
          'No. It is a stamp card and a way to talk to the people who opted in. Link to your ticket page from your emails or from the page after each stamp.',
      },
      {
        question: 'Can I reward drinks?',
        answer:
          'You set the reward. Most bars do best with food, snacks or a small drink discount — something easy to name and fulfil without giving a free round away.',
      },
      {
        question: 'What happens when a bartender leaves?',
        answer:
          'Nothing changes. The program runs on your account, and any staff member can open Scan pass on a phone or tablet.',
      },
    ],
    ctaHeading: 'Give Tuesday a reason.',
    cta: 'Start for free',
  },
  {
    slug: 'bakeries',
    name: 'Bakeries',
    blurb: 'Tell regulars what is fresh.',
    accent: '#d97757',
    assetKey: 'bakery',
    metaTitle: 'Loyalty card and email marketing for bakeries | Loyalties',
    metaDescription:
      "Put your bakery's stamp card in Apple Wallet and Google Wallet, then email the regulars who opted in about limited batches and pre-orders. Free to start.",
    hero: "Tell regulars what is fresh, the moment it's out.",
    subtext:
      "Put a digital stamp card in their wallet and announce limited batches instantly.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction at the counter.',
        detail: 'Flour on your hands, a queue at the door. Anything that adds a minute to the counter gets skipped.',
        fix: 'One scan adds the stamp. No login, no app, nothing to type. Keep the queue moving.',
      },
      {
        feature: 'mail',
        pain: 'Sell out limited batches.',
        detail: 'A chalkboard only reaches the people already standing there.',
        fix: 'On Pro, automatically email opted-in members the morning it comes out of the oven, or when pre-orders open.',
      },
      {
        feature: 'scan',
        pain: 'Turn occasion buyers into regulars.',
        detail: 'Plenty of customers only come for birthdays or holidays.',
        fix: 'Give everyone a card on their first visit. They join once, add it to their wallet, and every purchase brings them closer to a reward.',
      },
    ],
    campaignIdeas: [
      { subject: 'Hot cross buns are out of the oven', when: 'The morning a seasonal bake lands' },
      { subject: 'Christmas pre-orders are open', when: 'When pre-orders start' },
      { subject: 'New sourdough on the shelf', when: 'When a new product launches' },
      { subject: 'A free coffee with any loaf this week', when: 'For a one-off offer, with a Reward coupon' },
    ],
    rewardIdeas: {
      stamp: 'A free pastry of your choice on the eighth stamp.',
      coupon: 'A free coffee with any loaf this week, claimed from a link.',
    },
    showcase: { stampIcon: 'pastry', venueName: 'Your Bakery', reward: 'Free pastry', stampsFilled: 6, stampsRequired: 8 },
    testimonials: [],
    faqs: [
      {
        question: 'Can I announce a limited batch?',
        answer: 'Yes. On Pro, email opted-in members the morning it comes out of the oven.',
      },
      {
        question: 'Can I take pre-orders with Loyalties?',
        answer:
          'It does not take orders. Email members your pre-order dates and link to wherever you take them, or create a Reward coupon as a pre-order perk.',
      },
      {
        question: 'What about customers who only come for birthdays?',
        answer:
          'Give them a card on the first visit. If they come back, the stamps start counting. If they opted in, you can also let them know when something good is on.',
      },
      {
        question: 'Which stamp icons can I use?',
        answer: 'Pastry, donut and cake are there, along with other food and drink icons. You add your own logo and colours.',
      },
    ],
    ctaHeading: "Tell your regulars it's out.",
    cta: 'Start for free',
  },
  {
    slug: 'hairdressers',
    name: 'Hairdressers',
    blurb: 'Fill gaps in the day.',
    accent: '#e8b4b8',
    assetKey: 'hairdresser',
    metaTitle: 'Loyalty card and email marketing for hairdressers | Loyalties',
    metaDescription:
      "Put your salon's stamp card in Apple Wallet and Google Wallet, then email the clients who opted in about open slots and new services. Free to start.",
    hero: 'Fill gaps in your day, automatically.',
    subtext:
      "Put a digital stamp card in every client's wallet and automatically email them about open slots and new services.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction for rebooking.',
        detail: 'Rebooking depends on the client remembering before they leave.',
        fix: 'A stamp card shows their progress every time they open their wallet. The page after each stamp links straight to your booking page.',
      },
      {
        feature: 'mail',
        pain: 'Fill empty chairs instantly.',
        detail: 'A cancellation at two is an empty chair at three. Gaps in the day cost you.',
        fix: 'On Pro, email opted-in clients the moment a slot opens. They book through your own page.',
      },
      {
        feature: 'members',
        pain: 'Build salon loyalty.',
        detail: 'Clients often follow the stylist, not the salon.',
        fix: "Your member list and card sit in your salon's account. The relationship stays with the business, not just the stylist.",
      },
    ],
    campaignIdeas: [
      { subject: 'Two slots open tomorrow', when: 'When a cancellation lands' },
      { subject: 'Winter colour refresh, book this month', when: 'At the start of a season' },
      { subject: 'A new stylist joins the team', when: 'When someone new starts' },
      { subject: 'Last bookings before Christmas', when: 'As the holiday rush starts' },
    ],
    rewardIdeas: {
      stamp: 'A free blow-dry on the eighth visit.',
      coupon: 'A percentage off a product for clients who book this month, claimed from a link.',
    },
    showcase: { stampIcon: 'cut', venueName: 'Your Salon', reward: 'Free blow-dry', stampsFilled: 4, stampsRequired: 8 },
    testimonials: [],
    faqs: [
      {
        question: 'Does it replace my booking software?',
        answer:
          'No. It sits beside it. Loyalties does not take bookings, but the page clients see after each stamp can link straight to your booking page.',
      },
      {
        question: 'What reward should I offer?',
        answer:
          'Keep it something you can afford on a quiet day. A free blow-dry on the eighth visit, a percentage off colour, or a custom reward.',
      },
      {
        question: 'Can I tell clients about a last-minute gap?',
        answer: 'Yes. On Pro, email opted-in clients when a slot opens. Keep it short and link to your booking page.',
      },
      {
        question: 'What if a stylist leaves?',
        answer: "The member list and the card belong to your salon's account, so the relationship stays with the business.",
      },
    ],
    ctaHeading: "Fill the chair before it's empty.",
    cta: 'Start for free',
  },
  {
    slug: 'barbers',
    name: 'Barbers',
    blurb: 'Keep regulars in your chair.',
    accent: '#475569',
    assetKey: 'barber',
    metaTitle: 'Loyalty card and email marketing for barbers | Loyalties',
    metaDescription:
      "Put your barbershop's stamp card in Apple Wallet and Google Wallet, then email the clients who opted in about guest barbers and new products. Free to start.",
    hero: 'Keep regulars in your chair, without lifting a finger.',
    subtext:
      "Put a digital stamp card in every client's wallet and email them about guest barbers and open slots.",
    problems: [
      {
        feature: 'scan',
        pain: 'Zero friction at the chair.',
        detail: "Anything that stops the conversation won't last a week.",
        fix: "Open Scan pass on a phone or tablet at the chair, scan the client's pass and carry on. No typing. No login.",
      },
      {
        feature: 'coupon',
        pain: 'Fill your quiet weekdays.',
        detail: 'Saturday is full, but Tuesday is empty. Weekdays need a reason.',
        fix: 'Create a Reward coupon for a quiet weekday, or on Pro email opted-in clients about open chairs.',
      },
      {
        feature: 'wallet',
        pain: 'Reward genuine loyalty.',
        detail: "A client who doesn't love a cut rarely says so. They just book somewhere else next time.",
        fix: 'A stamp card gives every client a reason to stay: a reward they can see getting closer.',
      },
    ],
    campaignIdeas: [
      { subject: 'Guest barber in the shop on Saturday', when: 'Before a guest spot' },
      { subject: 'Our pomade is back in stock', when: 'When a product restocks' },
      { subject: 'Open late on Thursday', when: 'Before a change in hours' },
      { subject: 'Tuesday chairs are open', when: 'To fill a slow weekday' },
    ],
    rewardIdeas: {
      stamp: 'A free cut or beard trim after six stamps.',
      coupon: 'A percentage off a midweek cut, claimed from a link.',
    },
    showcase: { stampIcon: 'cut', venueName: 'Your Barbershop', reward: 'Free beard trim', stampsFilled: 4, stampsRequired: 6 },
    testimonials: [],
    faqs: [
      {
        question: 'Will it interrupt a cut?',
        answer: "No. Open Scan pass on a phone or tablet at the chair, scan the client's pass and carry on. Nothing to type and no login.",
      },
      {
        question: 'What reward works for a barbershop?',
        answer:
          'A free cut or beard trim after six or eight stamps is a common choice. You can also offer a percentage off or a custom reward.',
      },
      {
        question: 'Can I promote a guest barber or new products?',
        answer: 'Yes. On Pro, email opted-in clients about guest barbers, new products or holiday hours.',
      },
      {
        question: 'Can more than one barber scan?',
        answer: "Yes. Staff can open Scan pass on any phone or tablet to scan a client's pass.",
      },
    ],
    ctaHeading: 'Keep them in your chair.',
    cta: 'Start for free',
  },
  {
    slug: 'nail-techs',
    name: 'Nail techs',
    blurb: 'Show your work between visits.',
    accent: '#d4a5a5',
    assetKey: 'nail',
    metaTitle: 'Loyalty card and email marketing for nail techs | Loyalties',
    metaDescription:
      "Put your nail studio's stamp card in Apple Wallet and Google Wallet, then show the clients who opted in your latest sets and open slots. Free to start.",
    hero: 'Show your work and fill open slots, automatically.',
    subtext:
      "Put a stamp card in every client's wallet and show them your latest sets and availability.",
    problems: [
      {
        feature: 'page',
        pain: 'Zero friction marketing.',
        detail: 'Your work only reaches whoever scrolls past it on social media.',
        fix: 'The page clients see after every stamp carries a promo image, a message and a social follow link.',
      },
      {
        feature: 'mail',
        pain: 'Turn cancellations into bookings.',
        detail: "A booked chair is income. An empty one isn't.",
        fix: 'On Pro, email opted-in clients about open slots instantly. They book through your own page.',
      },
      {
        feature: 'wallet',
        pain: 'Reward loyalty, not deal-hunters.',
        detail: 'A cheaper set is one search away, and loyalty is only as strong as the last appointment.',
        fix: 'Give them a reward they can see getting closer. A free design upgrade on the eighth set keeps them coming back.',
      },
    ],
    campaignIdeas: [
      { subject: 'The new autumn sets are up', when: 'When a new collection is ready' },
      { subject: 'A slot opened up on Friday at 3', when: 'When a cancellation lands' },
      { subject: 'Book your party set before the weekend', when: 'Ahead of busy event dates' },
      { subject: 'Christmas bookings are open', when: 'As the holiday season starts' },
    ],
    rewardIdeas: {
      stamp: 'A free design upgrade on the eighth set.',
      coupon: 'A free add-on for a booking this week, claimed from a link.',
    },
    showcase: { stampIcon: 'nails', venueName: 'Your Nail Studio', reward: 'Free design upgrade', stampsFilled: 6, stampsRequired: 8 },
    testimonials: [],
    faqs: [
      {
        question: 'Can I show my work?',
        answer:
          'Yes. The page clients see after every stamp carries a promo image, a message and a social follow link. On Pro, emails to opted-in clients can feature your latest sets.',
      },
      {
        question: 'Can I fill a last-minute cancellation?',
        answer: 'On Pro, email opted-in clients when a slot opens and link to your booking page.',
      },
      {
        question: 'What reward should I offer?',
        answer:
          'Something that costs you minutes and feels special, like a free design upgrade on the eighth set. A percentage off is another option.',
      },
      {
        question: 'What if a client uses Android?',
        answer: 'The card works in Google Wallet on Android and in Apple Wallet on iPhone.',
      },
    ],
    ctaHeading: "Show them what's new.",
    cta: 'Start for free',
  },
  {
    slug: 'clothing',
    name: 'Clothing stores',
    blurb: 'Announce every drop.',
    accent: '#52525b',
    assetKey: 'retail',
    metaTitle: 'Loyalty card and email marketing for clothing stores | Loyalties',
    metaDescription:
      "Put your store's reward card in Apple Wallet and Google Wallet, then email the shoppers who opted in the moment new stock lands. Free to start.",
    hero: 'Announce every drop directly to your best customers.',
    subtext:
      "Put a digital reward card in every shopper's wallet and email them the moment new stock lands.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction at the till.',
        detail: 'A sale is just a transaction until you can reach them again.',
        fix: 'Give every buyer a card at the till in two taps. The ones who opt in join your list instantly.',
      },
      {
        feature: 'mail',
        pain: 'Sell out new drops faster.',
        detail: 'Your new stock announcement is only as loud as your Instagram that day.',
        fix: "On Pro, automatically email opted-in members a branded product grid with a clear button the moment it's in.",
      },
      {
        feature: 'coupon',
        pain: 'Reward loyalty, protect your brand.',
        detail: 'Public discount codes cheapen the brand and train people to wait for a sale.',
        fix: 'Reward repeat purchases with a percentage off on the stamp card, or use a Reward coupon for a VIP preview.',
      },
    ],
    campaignIdeas: [
      { subject: 'The autumn drop is in', when: 'The day new stock arrives' },
      { subject: 'VIP preview, Friday before we open', when: 'For an early-access event, with a Reward coupon' },
      { subject: 'Restocked: the jacket you asked about', when: 'When a popular item returns' },
      { subject: 'Late night shopping on Thursday', when: 'Before a change in hours' },
    ],
    rewardIdeas: {
      stamp: '10% off your next purchase after five stamps.',
      coupon: 'A VIP preview credit for the new drop, claimed from a link.',
    },
    showcase: { stampIcon: 'tee', venueName: 'Your Store', reward: '10% off', stampsFilled: 3, stampsRequired: 5 },
    testimonials: [],
    faqs: [
      {
        question: 'What earns a stamp?',
        answer: 'You decide. Every purchase, or only purchases over a set amount. Staff scan the pass when the sale qualifies.',
      },
      {
        question: 'Can I email a product grid?',
        answer:
          'Yes. On Pro, the email builder has sections for a hero image, text, an offer, a product grid and a button, so you can show new stock to opted-in members.',
      },
      {
        question: 'Can I run a VIP preview?',
        answer:
          'Create a Reward coupon for the preview, then send the claim link to opted-in members. They add it to their wallet and staff redeem it on the same Scan pass screen.',
      },
      {
        question: 'Do I have to give away free items?',
        answer: 'No. A stamp card reward can be a free item, a percentage off or a custom reward.',
      },
    ],
    ctaHeading: 'Tell them what just landed.',
    cta: 'Start for free',
  },
  {
    slug: 'services',
    name: 'Service businesses',
    blurb: 'Stay top of mind between jobs.',
    accent: '#0f766e',
    assetKey: 'other',
    metaTitle: 'Loyalty card and email marketing for service businesses | Loyalties',
    metaDescription:
      "Put your business's stamp card in Apple Wallet and Google Wallet, then email the clients who opted in when the season turns. Free to start.",
    hero: 'Stay top of mind between jobs, automatically.',
    subtext:
      "Put a digital reward card in your clients' wallets and email them when the season turns.",
    problems: [
      {
        feature: 'wallet',
        pain: 'Zero friction on site.',
        detail: 'A great job in spring is just a number in their phone by autumn.',
        fix: 'Your card sits natively in their wallet with your logo on it, and progress toward a reward they can see.',
      },
      {
        feature: 'mail',
        pain: 'Generate automatic referrals.',
        detail: 'People recommend the business they can name, but chasing past clients takes time.',
        fix: 'On Pro, automatically email opted-in clients when the season turns, with a tip and a link to book.',
      },
      {
        feature: 'members',
        pain: 'Turn invoices into a member list.',
        detail: "A filing cabinet of old invoices isn't a marketing list.",
        fix: 'Every client who joins is in your member list. One email reaches everyone who opted in.',
      },
    ],
    campaignIdeas: [
      { subject: 'Time for your autumn tidy-up?', when: 'As the season turns' },
      { subject: 'Book spring before the rush', when: 'Early in the off-season' },
      { subject: 'Storm clean-up slots are open', when: 'After bad weather' },
      { subject: 'Thanks for your business, your next visit is on us', when: 'As a thank-you, with a Reward coupon' },
    ],
    rewardIdeas: {
      stamp: 'A free tidy-up visit after four jobs.',
      coupon: 'Credit toward the next seasonal service, claimed from a link.',
    },
    showcase: { stampIcon: 'services', venueName: 'Your Business', reward: 'Free tidy-up visit', stampsFilled: 2, stampsRequired: 4 },
    testimonials: [],
    faqs: [
      {
        question: 'Can I use it on site?',
        answer: 'Yes. Scan pass runs on a phone or tablet, so you can stamp a card when the job is done.',
      },
      {
        question: 'My clients only book once or twice a year. Is it worth it?',
        answer:
          'The value is staying in touch. Your logo sits in their wallet, and on Pro you can email opted-in clients when the season turns.',
      },
      {
        question: 'How do clients join?',
        answer: 'Show the QR on your phone or invoice, or send them the join link by message.',
      },
      {
        question: 'Can I link to my booking or enquiry page?',
        answer: 'Yes. The page clients see after each stamp can carry a link.',
      },
    ],
    ctaHeading: 'Be the number they remember.',
    cta: 'Start for free',
  },
]

// ── Navigation categories ──────────────────────────────────────────────────

export type IndustryCategory = {
  id: string
  label: string
  description: string
  slugs: string[]
}

export const industryCategories: IndustryCategory[] = [
  {
    id: 'hospitality',
    label: 'Hospitality',
    description: 'Cafes, restaurants, bars & bakeries',
    slugs: ['cafes', 'restaurants', 'bars', 'bakeries'],
  },
  {
    id: 'beauty',
    label: 'Beauty & grooming',
    description: 'Hair, barbers & nail techs',
    slugs: ['hairdressers', 'barbers', 'nail-techs'],
  },
  {
    id: 'retail',
    label: 'Retail',
    description: 'Clothing and product-led stores',
    slugs: ['clothing'],
  },
  {
    id: 'services',
    label: 'Other services',
    description: 'Trades, landscaping and more',
    slugs: ['services'],
  },
]

export function industriesInCategory(category: IndustryCategory): Industry[] {
  return category.slugs
    .map((slug) => industries.find((item) => item.slug === slug))
    .filter((item): item is Industry => Boolean(item))
}

// ── Company logos ──────────────────────────────────────────────────────────

export type CompanyLogo = {
  name: string
  src: string
}

export const companyLogos: CompanyLogo[] = [
  { name: 'Brew Labs', src: '/logos/brew-labs.png' },
  { name: 'RMIT University', src: '/logos/rmit.svg' },
  { name: 'Revel Group', src: '/logos/revel.png' },
  { name: 'Recess', src: '/logos/recess.png' },
  { name: 'Barillo', src: '/logos/barillo.png' },
  { name: 'Off Campus', src: '/logos/off-campus.png' },
  { name: 'Stand-Up Café', src: '/logos/stand-up-cafe.png' },
]
