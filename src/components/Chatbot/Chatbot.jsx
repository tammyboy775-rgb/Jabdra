import { useState } from 'react'
import { Icon } from '../../icons'
import './Chatbot.css'

const QUICK_QUESTIONS = [
  'Which markets are open today?',
  "What's in season right now?",
  'Is there a market near Old Town?',
]

// A small canned-response layer so the widget is useful without a live
// backend wired up yet — swap `reply()` for a real API call when ready.
function reply(question) {
  const q = question.toLowerCase()
  if (q.includes('open') || q.includes('today') || q.includes('day')) {
    return 'Use the "Open on" filter on the Find a market page to see what\u2019s running on a given day — most Millhaven markets run Wednesday through Sunday.'
  }
  if (q.includes('season')) {
    return "Check the What's in season page for a running list of what's at peak right now, plus a full year-round produce guide."
  }
  if (q.includes('near') || q.includes('neighborhood') || q.includes('old town')) {
    return 'The market directory is searchable by neighborhood — try typing the area name into the search box on the Find a market page.'
  }
  if (q.includes('hour') || q.includes('time')) {
    return 'Each market detail page lists its exact hours, along with which days it runs and what it typically sells.'
  }
  return "I can help you find a market, check what's in season, or point you to opening hours — try one of the quick questions below, or ask me directly."
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the FreshFind assistant. Ask me about markets, hours, or what's in season." },
  ])
  const [draft, setDraft] = useState('')

  const send = (text) => {
    const value = text ?? draft
    if (!value.trim()) return
    setMessages((m) => [...m, { from: 'user', text: value }, { from: 'bot', text: reply(value) }])
    setDraft('')
  }

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <span><Icon name="leaf" size={15} /> FreshFind Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close assistant">
              <Icon name="close" size={16} />
            </button>
          </div>

          <div className="chatbot-body">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-bubble ${m.from}`}>{m.text}</div>
            ))}
          </div>

          <div className="chatbot-quick">
            {QUICK_QUESTIONS.map((q) => (
              <button key={q} onClick={() => send(q)}>{q}</button>
            ))}
          </div>

          <form
            className="chatbot-input"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Message the FreshFind assistant"
            />
            <button type="submit" aria-label="Send"><Icon name="send" size={15} /></button>
          </form>
        </div>
      )}

      <button
        className="chatbot-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        <Icon name={open ? 'close' : 'chat'} size={22} />
      </button>
    </div>
  )
}
