import { useMemo, useState } from 'react'
import { APP_URL } from '../data/site'
import styles from './ContactPage.module.css'

type Answer = {
  id: string
  label: string
  next?: string
  result?: Result
}

type Result = {
  title: string
  body: string
  actionLabel: string
  href: string
  detail?: string
}

type Step = {
  id: string
  question: string
  answers: Answer[]
}

const steps: Step[] = [
  {
    id: 'who',
    question: 'Who are you contacting us as?',
    answers: [
      { id: 'venue', label: 'A venue or staff member', next: 'venue-need' },
      { id: 'member', label: 'A customer / loyalty member', next: 'member-need' },
      { id: 'other', label: 'Someone else', next: 'other-need' },
    ],
  },
  {
    id: 'venue-need',
    question: 'What do you need help with?',
    answers: [
      {
        id: 'account',
        label: 'Account, product, or how something works',
        result: {
          title: 'General support',
          body: 'Account help, product questions, and day-to-day venue support.',
          actionLabel: 'Email support',
          href: 'mailto:support@loyalties.marketing',
          detail: 'support@loyalties.marketing',
        },
      },
      {
        id: 'billing',
        label: 'Billing, plans, invoices, or cancellations',
        result: {
          title: 'Billing & cancellations',
          body: 'Plan changes, invoices, refunds, and cancellations.',
          actionLabel: 'Email billing',
          href: 'mailto:support@loyalties.marketing?subject=Billing',
          detail: 'support@loyalties.marketing',
        },
      },
      {
        id: 'security',
        label: 'Security, phishing, or a possible account compromise',
        result: {
          title: 'Security',
          body: 'Suspected compromise, phishing, or a vulnerability report.',
          actionLabel: 'Email security',
          href: 'mailto:support@loyalties.marketing?subject=Security',
          detail: 'support@loyalties.marketing · subject: Security',
        },
      },
      {
        id: 'get-started',
        label: 'I want to create an account or log in',
        result: {
          title: 'Get started',
          body: 'Create a venue account or log in to the Loyalties app.',
          actionLabel: 'Open the app',
          href: APP_URL,
          detail: 'app.loyalties.marketing',
        },
      },
    ],
  },
  {
    id: 'member-need',
    question: 'What do you need help with?',
    answers: [
      {
        id: 'privacy',
        label: 'My personal information, access, or deletion',
        result: {
          title: 'Privacy requests',
          body: 'Access, correction, deletion, or privacy complaints about how we handle your data.',
          actionLabel: 'Email privacy',
          href: 'mailto:privacy@loyalties.marketing',
          detail: 'privacy@loyalties.marketing',
        },
      },
      {
        id: 'spam',
        label: 'Spam, marketing I didn’t ask for, or a consent issue',
        result: {
          title: 'Report a concern',
          body: 'Use the abuse form for spam, consent issues, and related reports. We follow up from support.',
          actionLabel: 'Open report form',
          href: '/abuse',
          detail: '/abuse',
        },
      },
      {
        id: 'reward',
        label: 'A reward, stamp, or venue program issue',
        result: {
          title: 'Venue program issue',
          body: 'Rewards and program rules are set by the venue. Contact them first. If you still need to report it, use the abuse form.',
          actionLabel: 'Open report form',
          href: '/abuse',
          detail: '/abuse',
        },
      },
      {
        id: 'promo',
        label: 'A promotion, prize, or unfair giveaway',
        result: {
          title: 'Promotions & prizes',
          body: 'Report misleading promotions, missing prizes, or unfair giveaways through the abuse form.',
          actionLabel: 'Open report form',
          href: '/abuse',
          detail: '/abuse',
        },
      },
    ],
  },
  {
    id: 'other-need',
    question: 'What do you need help with?',
    answers: [
      {
        id: 'privacy-other',
        label: 'A privacy question or complaint',
        result: {
          title: 'Privacy',
          body: 'Privacy questions and complaints go to our privacy inbox.',
          actionLabel: 'Email privacy',
          href: 'mailto:privacy@loyalties.marketing',
          detail: 'privacy@loyalties.marketing',
        },
      },
      {
        id: 'copyright',
        label: 'Copyright or intellectual property',
        result: {
          title: 'Copyright & IP',
          body: 'Report content you believe infringes your rights.',
          actionLabel: 'Email copyright',
          href: 'mailto:support@loyalties.marketing?subject=Copyright',
          detail: 'support@loyalties.marketing · subject: Copyright',
        },
      },
      {
        id: 'abuse-other',
        label: 'Report harmful, unlawful, or policy-breaking conduct',
        result: {
          title: 'Report a concern',
          body: 'Use the abuse form for policy concerns. You don’t need to be a Member to report.',
          actionLabel: 'Open report form',
          href: '/abuse',
          detail: '/abuse',
        },
      },
      {
        id: 'general-other',
        label: 'Something else',
        result: {
          title: 'General support',
          body: 'If nothing else fits, send it to support and we’ll route it.',
          actionLabel: 'Email support',
          href: 'mailto:support@loyalties.marketing',
          detail: 'support@loyalties.marketing',
        },
      },
    ],
  },
]

export function ContactPage() {
  const [stepId, setStepId] = useState('who')
  const [history, setHistory] = useState<string[]>(['who'])
  const [result, setResult] = useState<Result | null>(null)

  const step = useMemo(
    () => steps.find((item) => item.id === stepId) ?? steps[0],
    [stepId],
  )

  const progress = result ? 100 : Math.round((history.length / 3) * 100)

  const choose = (answer: Answer) => {
    if (answer.result) {
      setResult(answer.result)
      return
    }
    if (answer.next) {
      setStepId(answer.next)
      setHistory((prev) => [...prev, answer.next!])
    }
  }

  const goBack = () => {
    if (result) {
      setResult(null)
      return
    }
    if (history.length <= 1) return
    const nextHistory = history.slice(0, -1)
    setHistory(nextHistory)
    setStepId(nextHistory[nextHistory.length - 1])
  }

  const restart = () => {
    setResult(null)
    setStepId('who')
    setHistory(['who'])
  }

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Help</p>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.lede}>
        Answer a couple of quick questions and we’ll point you to the right place.
      </p>

      <div className={styles.quiz}>
        <div className={styles.progress} aria-hidden>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>

        {result ? (
          <div className={styles.result}>
            <p className={styles.resultEyebrow}>Best contact</p>
            <h2 className={styles.resultTitle}>{result.title}</h2>
            <p className={styles.resultBody}>{result.body}</p>
            {result.detail ? (
              <p className={styles.resultDetail}>{result.detail}</p>
            ) : null}
            <div className={styles.resultActions}>
              {result.href.startsWith('/') ? (
                <a href={result.href} className={styles.primary}>
                  {result.actionLabel}
                </a>
              ) : (
                <a
                  href={result.href}
                  className={styles.primary}
                  {...(result.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {result.actionLabel}
                </a>
              )}
              <button type="button" className={styles.secondary} onClick={restart}>
                Start over
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.step}>
            <h2 className={styles.question}>{step.question}</h2>
            <div className={styles.answers}>
              {step.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  className={styles.answer}
                  onClick={() => choose(answer)}
                >
                  {answer.label}
                </button>
              ))}
            </div>
            {history.length > 1 ? (
              <button type="button" className={styles.back} onClick={goBack}>
                ← Back
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
