import { useState } from 'react'
import { createTicket, type TicketChannel } from '../lib/tickets'
import styles from './TicketForm.module.css'

export type TicketFormValues = {
  category: string
  answers?: Record<string, unknown>
  campaign_ref?: string
}

type Props = {
  channel: TicketChannel
  category: string
  answers?: Record<string, unknown>
  campaignRef?: string
  title?: string
  allowAnonymous?: boolean
  onDone?: () => void
}

export function TicketForm({
  channel,
  category,
  answers,
  campaignRef,
  title = 'Send your message',
  allowAnonymous = true,
  onDone,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [venue, setVenue] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ticketId, setTicketId] = useState<string | null>(null)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = await createTicket({
      channel,
      category,
      message,
      name: name || undefined,
      email: email || undefined,
      venue_name: venue || undefined,
      campaign_ref: campaignRef || undefined,
      answers,
    })

    setSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setTicketId(result.id)
    onDone?.()
  }

  if (ticketId) {
    return (
      <div className={styles.success}>
        <p className={styles.successEyebrow}>Received</p>
        <h2 className={styles.successTitle}>Thanks — we have your report</h2>
        <p className={styles.successBody}>
          We aim to acknowledge within 3 business days
          {email ? ' at the email you provided' : ''}. Your reference is{' '}
          <code className={styles.code}>{ticketId.slice(0, 8)}</code>.
        </p>
        {allowAnonymous && !email ? (
          <p className={styles.successNote}>
            You reported without an email, so we may only be able to act on what’s
            in the message.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.meta}>
        Category: <strong>{category}</strong>
      </p>

      <label className={styles.label}>
        Your name {allowAnonymous ? <span className={styles.optional}>(optional)</span> : null}
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          maxLength={200}
        />
      </label>

      <label className={styles.label}>
        Email {allowAnonymous ? <span className={styles.optional}>(optional, for follow-up)</span> : null}
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          maxLength={320}
          required={!allowAnonymous}
        />
      </label>

      <label className={styles.label}>
        Venue name <span className={styles.optional}>(optional)</span>
        <input
          className={styles.input}
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          maxLength={200}
          placeholder="If this relates to a specific venue"
        />
      </label>

      <label className={styles.label}>
        What happened?
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          maxLength={8000}
          rows={6}
          placeholder="Include dates, what you saw or received, and anything else that helps."
        />
      </label>

      {error ? <p className={styles.error}>{error}</p> : null}

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit'}
      </button>
    </form>
  )
}
