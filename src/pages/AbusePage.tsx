import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TicketForm } from '../components/TicketForm'
import { usePageMeta } from '../lib/usePageMeta'
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

/** Max 3 answers per step. Step 1 splits business vs personal. */
const steps: Step[] = [
  {
    id: 'about',
    question: 'Is this about a business, or about you?',
    answers: [
      { id: 'business', label: 'A business or venue', next: 'business-type' },
      { id: 'me', label: 'Me / my information', next: 'me-type' },
    ],
  },
  {
    id: 'business-type',
    question: 'What’s going on with the business?',
    answers: [
      {
        id: 'biz-marketing',
        label: 'Spam, marketing, or consent (“I never signed up”)',
        category: 'Spam or consent issue',
      },
      {
        id: 'biz-offer',
        label: 'Reward, promotion, or prize problem',
        next: 'business-offer',
      },
      {
        id: 'biz-other',
        label: 'Harmful content or something else',
        next: 'business-other',
      },
    ],
  },
  {
    id: 'business-offer',
    question: 'Which offer issue is it?',
    answers: [
      { id: 'reward', label: 'Reward not honoured', category: 'Reward not honoured' },
      { id: 'promo', label: 'Misleading or unfair promotion', category: 'Misleading or unfair promotion' },
      { id: 'prize', label: 'Prize not provided', category: 'Prize not provided' },
    ],
  },
  {
    id: 'business-other',
    question: 'What else about the business?',
    answers: [
      { id: 'harmful', label: 'Harmful or unlawful content', category: 'Harmful or unlawful content' },
      { id: 'under18', label: 'A member who appears to be under 18', category: 'Under-18 member' },
      { id: 'biz-else', label: 'Something else', category: 'Something else' },
    ],
  },
  {
    id: 'me-type',
    question: 'What is this about for you?',
    answers: [
      { id: 'privacy', label: 'My personal information or privacy', next: 'me-privacy' },
      { id: 'security', label: 'Security issue or suspected phishing', category: 'Security or phishing' },
      { id: 'me-other', label: 'Copyright, IP, or something else', next: 'me-other' },
    ],
  },
  {
    id: 'me-privacy',
    question: 'What do you need around privacy?',
    answers: [
      { id: 'access', label: 'Access, correction, or deletion', category: 'Privacy request' },
      { id: 'complaint', label: 'A privacy complaint', category: 'Privacy complaint' },
      { id: 'wrong-email', label: 'Someone used my email without permission', category: 'Spam or consent issue' },
    ],
  },
  {
    id: 'me-other',
    question: 'What else do you need to report?',
    answers: [
      { id: 'copyright', label: 'Copyright or intellectual property', category: 'Copyright or IP' },
      { id: 'me-else', label: 'Something else about me', category: 'Something else' },
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

export function AbusePage() {
  usePageMeta(
    'Report a concern | Loyalties',
    'Report spam, privacy issues, misleading promotions or other concerns about a Loyalties program.',
  )

  const [params] = useSearchParams()
  const campaignRef = params.get('campaign') || params.get('c') || undefined

  const [stepId, setStepId] = useState('about')
  const [history, setHistory] = useState<string[]>(['about'])
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
    setStepId('about')
    setHistory(['about'])
    setPathAnswers({})
  }

  return (
    <div className={`container ${styles.page}`}>
      <p className={styles.eyebrow}>Safety</p>
      <h1 className={styles.title}>Report a concern about a Loyalties program</h1>
      <p className={styles.lede}>
        Two quick questions, then a short form. You don’t need to be a member.
        Anonymous reports are allowed, but we can’t follow up without an email.
      </p>

      <div className={styles.quiz}>
        <div className={styles.progress} aria-hidden>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>

        {category ? (
          <div className={styles.result}>
            <TicketForm
              channel="abuse"
              category={category}
              campaignRef={campaignRef}
              answers={pathAnswers}
              allowAnonymous
              title="Tell us what happened"
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
