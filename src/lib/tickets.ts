import { getSupabaseUrl } from './assets'

export type TicketChannel = 'abuse' | 'support'

export type CreateTicketInput = {
  channel: TicketChannel
  category: string
  message: string
  name?: string
  email?: string
  venue_name?: string
  campaign_ref?: string
  answers?: Record<string, unknown>
}

export type CreateTicketResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

export async function createTicket(
  input: CreateTicketInput,
): Promise<CreateTicketResult> {
  const base = getSupabaseUrl()
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as
    | string
    | undefined

  if (!publishableKey) {
    return {
      ok: false,
      error: 'Missing VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.',
    }
  }

  try {
    const response = await fetch(`${base}/functions/v1/create-ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${publishableKey}`,
        apikey: publishableKey,
      },
      body: JSON.stringify(input),
    })

    const payload = (await response.json().catch(() => null)) as
      | { ticket?: { id?: string }; error?: string }
      | null

    if (!response.ok) {
      return {
        ok: false,
        error: payload?.error || 'Something went wrong. Please try again.',
      }
    }

    const id = payload?.ticket?.id
    if (!id) {
      return { ok: false, error: 'Ticket created but no id was returned.' }
    }

    return { ok: true, id }
  } catch {
    return {
      ok: false,
      error: 'Network error. Check your connection and try again.',
    }
  }
}
