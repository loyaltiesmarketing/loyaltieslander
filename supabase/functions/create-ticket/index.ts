import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const RATE_LIMIT_MAX = 2
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

type TicketChannel = 'abuse' | 'support'

type CreateTicketBody = {
  channel?: TicketChannel
  category?: string
  name?: string | null
  email?: string | null
  message?: string
  venue_name?: string | null
  campaign_ref?: string | null
  answers?: Record<string, unknown>
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function cleanText(value: unknown, max: number): string | null {
  if (value == null) return null
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, max)
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = req.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  const cf = req.headers.get('cf-connecting-ip')?.trim()
  if (cf) return cf
  return 'unknown'
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  let body: CreateTicketBody
  try {
    body = (await req.json()) as CreateTicketBody
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const channel = body.channel
  if (channel !== 'abuse' && channel !== 'support') {
    return json(400, { error: 'channel must be "abuse" or "support"' })
  }

  const category = cleanText(body.category, 120)
  const message = cleanText(body.message, 8000)
  if (!category || !message) {
    return json(400, { error: 'category and message are required' })
  }

  const name = cleanText(body.name, 200)
  const email = cleanText(body.email, 320)
  if (email && !isEmail(email)) {
    return json(400, { error: 'email is invalid' })
  }

  const venue_name = cleanText(body.venue_name, 200)
  const campaign_ref = cleanText(body.campaign_ref, 200)
  const answers =
    body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
      ? body.answers
      : {}

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    return json(500, { error: 'Server misconfigured' })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const ipHash = await hashIp(clientIp(req))
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()

  const { count, error: countError } = await supabase
    .from('tickets')
    .select('id', { count: 'exact', head: true })
    .eq('client_ip_hash', ipHash)
    .gte('created_at', windowStart)

  if (countError) {
    console.error('create-ticket rate-limit check failed', countError)
    return json(500, { error: 'Could not create ticket' })
  }

  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return json(429, {
      error: 'Too many tickets from this location. Please try again in 15 minutes.',
      retry_after_minutes: 15,
    })
  }

  const { data, error } = await supabase
    .from('tickets')
    .insert({
      channel,
      category,
      name,
      email,
      message,
      venue_name,
      campaign_ref,
      answers,
      client_ip_hash: ipHash,
    })
    .select('id, created_at')
    .single()

  if (error) {
    console.error('create-ticket insert failed', error)
    return json(500, { error: 'Could not create ticket' })
  }

  return json(201, {
    ok: true,
    ticket: data,
  })
})
