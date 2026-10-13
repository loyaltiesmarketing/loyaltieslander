import { useMemo, useState } from 'react'
import { TicketForm } from '../components/TicketForm'
import styles from './ContactPage.module.css'

type Answer = {
  id: string
  label: string
  next?: string
  category?: string
}

type Step = {
  id: string
  question: string
  answers: Answer[]
}

/** Max 3 answers per step. */
const steps: Step[] = [
  {
    id: 'who',
    question: 'Who are you submitting a ticket as?',
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
      { id: 'account', label: 'Account, product, or how something works', category: 'Venue support' },
      { id: 'billing', label: 'Billing, plans, or cancellations', category: 'Billing' },
      { id: 'other-venue', label: 'Security or something else', next: 'venue-other' },
    ],
  },
  {
    id: 'venue-other',
    question: 'Which of these fits best?',
    answers: [
      { id: 'security', label: 'Security or account compromise', category: 'Security' },
      { id: 'venue-else', label: 'Something else', category: 'Venue support' },
    ],
  },
  {
    id: 'member-need',
    question: 'What do you need help with?',
    answers: [
      { id: 'privacy', label: 'My personal information or privacy', category: 'Privacy request' },
      { id: 'program', label: 'A reward, stamp, or program issue', category: 'Member program issue' },
      { id: 'other-member', label: 'Marketing, promotion, or something else', next: 'member-other' },
    ],
  },
  {
    id: 'member-other',
    question: 'Which of these fits best?',
    answers: [
      { id: 'spam', label: 'Spam or marketing I didn’t ask for', category: 'Spam or consent issue' },
      { id: 'promo', label: 'A promotion or prize issue', category: 'Promotion or prize' },
      { id: 'member-else', label: 'Something else', category: 'Member support' },
    ],
  },
  {
    id: 'other-need',
    question: 'What do you need help with?',
    answers: [
      { id: 'privacy-other', label: 'A privacy question or complaint', category: 'Privacy request' },
      { id: 'copyright', label: 'Copyright or intellectual property', category: 'Copyright or IP' },
      { id: 'general', label: 'Press, partnership, or something else', category: 'General support' },
    ],
  },
]

function NavRow({
  onBack,
  onRestart,
  showBack,
  showRestart,
}: {
  onBack: () => void
  onRestart: () => void
  showBack: boolean
  showRestart: boolean
}) {
  return (
    <div className={styles.navRow}>
      {showBack ? (
        <button type="button" className={styles.back} onClick={onBack}>
          ← Back
        </button>
      ) : (
        <span />
      )}
      {showRestart ? (
        <button type="button" className={styles.secondary} onClick={onRestart}>
          Start over
        </button>
      ) : null}
    </div>
  )
}

export function SupportTicketPage() {
  const [stepId, setStepId] = useState('who')
  const [history, setHistory] = useState<string[]>(['who'])
  const [category, setCategory] = useState<string | null>(null)
  const [pathAnswers, setPathAnswers] = useState<Record<string, string>>({})

  const step = useMemo(
    () => steps.find((item) => item.id === stepId) ?? steps[0],
    [stepId],
  )

  const progress = category ? 100 : Math.min(90, Math.round((history.length / 3) * 100))

  const choose = (answer: Answer) => {
    setPathAnswers((prev) => ({ ...prev, [stepId]: answer.label }))
    if (answer.category) {
      setCategory(answer.category)
      return
    }
    if (answer.next) {
      setStepId(answer.next)
      setHistory((prev) => [...prev, answer.next!])
    }
  }

  const goBack = () => {
    if (category) {
      setCategory(null)
      return
    }
    if (history.length <= 1) return
    const nextHistory = history.slice(0, -1)
    setHistory(nextHistory)
    setStepId(nextHistory[nextHistory.length - 1])
  }

  const restart = () => {
    setCategory(null)
    setStepId('who')
    setHistory(['who'])
    setPathAnswers({})
  }

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Help</p>
      <h1 className={styles.title}>Submit a ticket</h1>
      <p className={styles.lede}>
        A few short questions, then send us a message. We’ll route it to the
        right place.
      </p>

      <div className={styles.quiz}>
        <div className={styles.progress} aria-hidden>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>

        {category ? (
          <div className={styles.result}>
            <TicketForm
              channel="support"
              category={category}
              answers={pathAnswers}
              allowAnonymous={false}
              title="Describe what you need"
            />
            <NavRow onBack={goBack} onRestart={restart} showBack showRestart />
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
            <NavRow
              onBack={goBack}
              onRestart={restart}
              showBack={history.length > 1}
              showRestart={history.length > 1}
            />
          </div>
        )}
      </div>
    </div>
  )
}
