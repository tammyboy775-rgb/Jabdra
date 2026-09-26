import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../icons'
import chatbotData from '../../data/messages.json'
import markets from '../../data/marketData.json'
import './Chatbot.css'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      type: 'text',
      text: "Hi! I'm the FreshFind assistant. Ask me about markets, hours, fruits, farms, or what's in season."
    }
  ])

  const [quickChatOpen, setQuickChatOpen] = useState(true)
  const [draft, setDraft] = useState('')

  const chatBodyRef = useRef(null)

  const QUICK_QUESTIONS = [
    'Which markets are open today?',
    "What's in season right now?",
    'Tell me about mangoes',
    'What fruits are available?',
    "What's the nearest market to me?"
  ]

  // Automatically scroll to the newest message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight
    }
  }, [messages])

  // Normalize user questions so matching is easier
  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[?!.,]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  // Check if the user is asking for nearby markets
  function isNearestMarketQuestion(question) {
    const q = normalize(question)

    const nearestWords = [
      'nearest market',
      'closest market',
      'nearest markets',
      'closest markets',
      'market near me',
      'market close to me',
      'market nearby',
      'market around me'
    ]

    return nearestWords.some((phrase) =>
      q.includes(phrase)
    )
  }

  // Calculate distance between two coordinates
  function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
  ) {
    const R = 6371

    const dLat =
      (lat2 - lat1) * Math.PI / 180

    const dLon =
      (lon2 - lon1) * Math.PI / 180

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      )

    return R * c
  }

  // Find the three closest markets
  function findNearestMarket() {
    setLoading(true)

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLoading(false)

        resolve({
          type: 'text',
          text: "Your browser doesn't support location services, so I can't find nearby markets."
        })

        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude =
            position.coords.latitude

          const userLongitude =
            position.coords.longitude

          // Add distance to every market
          const marketsWithDistance =
            markets.markets.map((market) => {
              const distance =
                calculateDistance(
                  userLatitude,
                  userLongitude,
                  market.coordinates.lat,
                  market.coordinates.lon
                )

              return {
                ...market,
                distance
              }
            })

          // Closest first
          marketsWithDistance.sort(
            (a, b) =>
              a.distance - b.distance
          )

          // Only show the three closest
          const closestMarkets =
            marketsWithDistance.slice(0, 3)

          if (closestMarkets.length === 0) {
            setLoading(false)

            resolve({
              type: 'text',
              text: "I couldn't find any markets in my database."
            })

            return
          }

          setLoading(false)

          // Return the market objects instead of HTML strings
          resolve({
            type: 'nearbyMarkets',
            markets: closestMarkets
          })
        },

        (error) => {
          setLoading(false)

          if (
            error.code ===
            error.PERMISSION_DENIED
          ) {
            resolve({
              type: 'text',
              text: "I need your location permission to find nearby markets. Please allow location access and try again."
            })
          } else {
            resolve({
              type: 'text',
              text: "I couldn't get your location right now. Please try again."
            })
          }
        }
      )
    })
  }

  // Decide how the chatbot should respond
  async function reply(question) {
    const q = normalize(question)

    // Check this FIRST
    if (isNearestMarketQuestion(question)) {
      return await findNearestMarket()
    }

    // Search normal chatbot responses
    const result = chatbotData.find((item) => {
      return item.questions.some(
        (possibleQuestion) => {
          const normalizedQuestion =
            normalize(possibleQuestion)

          return q.includes(
            normalizedQuestion
          )
        }
      )
    })

    if (result) {
      return {
        type: 'text',
        text: result.answer
      }
    }

    return {
      type: 'text',
      text: "I'm not sure about that yet. Try asking me about fruits, farms, markets, opening hours, or what's in season."
    }
  }

  // Send a message
  async function send(text) {
    const value = text ?? draft

    if (!value.trim()) return

    // Add user's message
    setMessages((messages) => [
      ...messages,
      {
        from: 'user',
        type: 'text',
        text: value
      }
    ])

    setDraft('')

    // Get chatbot response
    const response = await reply(value)

    // Add bot response
    setMessages((messages) => [
      ...messages,
      {
        from: 'bot',
        ...response
      }
    ])
  }

  // Open/close quick questions
  const toggleQuickQuestions = () => {
    setQuickChatOpen(
      (value) => !value
    )
  }

  function renderBotMessage(message) {

    // Normal chatbot text
    if (message.type === 'text') {
      return (
        <span>
          {message.text}
        </span>
      )
    }

    // Nearby markets
    if (message.type === 'nearbyMarkets') {
      return (
        <div className="nearby-markets-container">

          <div className="nearby-markets-header">

            <div className="nearby-markets-icon">
              📍
            </div>

            <div className="nearby-markets-title">
              Markets near you
            </div>

          </div>

          <div className="nearby-markets-list">

            {message.markets.map((market, index) => (
              <Link
                key={market.id}
                to={`/market/${market.id}`}
                className="nearby-market"
              >

                <div className="nearby-market-number">
                  {index + 1}
                </div>

                <div className="nearby-market-info">

                  <div className="nearby-market-name">
                    {market.name}
                  </div>

                  <div className="nearby-market-distance">
                    📍 {market.distance.toFixed(1)} km away
                  </div>

                  <div className="nearby-market-products">
                    {market.products
                      .slice(0, 5)
                      .join(', ')}
                  </div>

                </div>

                <div className="nearby-market-arrow">
                  →
                </div>

              </Link>
            ))}

          </div>

        </div>
      )
    }

    return null
  }

  return (
    <div className="chatbot">

      {/* CHATBOT WINDOW */}
      {open && (
        <div className="chatbot-panel">

          {/* HEADER */}
          <div className="chatbot-header">

            <span>
              <Icon
                name="leaf"
                size={15}
              />

              FreshFind Assistant
            </span>

            <button
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close assistant"
            >
              <Icon
                name="close"
                size={16}
              />
            </button>

          </div>

          {/* LOADING */}
          {loading && (
            <div className="chatbot-loading">

              <div className="loading-spinner"></div>

              <span>
                Finding nearby markets...
              </span>

            </div>
          )}

          {/* CHAT MESSAGES */}
          <div
            className="chatbot-body"
            ref={chatBodyRef}
          >

            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`chatbot-bubble ${message.from}`}
                >
                  {message.from === 'bot'
                    ? renderBotMessage(message)
                    : message.text}
                </div>
              )
            )}

          </div>

          {/* QUICK QUESTIONS */}
          <div className="quick-chat-section">

            {/* QUICK CHAT HEADER */}
            <div className="quick-chat-header">

              <span className="quick-chat-title">
                Quick messages
              </span>

              <button
                onClick={toggleQuickQuestions}
                className="quick-chat-toggle"
                aria-label={
                  quickChatOpen
                    ? 'Hide quick messages'
                    : 'Show quick messages'
                }
                aria-expanded={quickChatOpen}
              >
                {quickChatOpen
                  ? <FaChevronDown />
                  : <FaChevronUp />
                }
              </button>

            </div>

            {/* QUICK MESSAGES */}
            <div
              className={`chatbot-quick ${
                quickChatOpen
                  ? 'chatbot-quick-open'
                  : 'chatbot-quick-closed'
              }`}
            >

              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => send(question)}
                >
                  {question}
                </button>
              ))}

            </div>

          </div>

          {/* INPUT */}
          <form
            className="chatbot-input"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >

            <input
              value={draft}
              onChange={(e) =>
                setDraft(e.target.value)
              }
              placeholder="Ask a question…"
              aria-label="Message the FreshFind assistant"
            />

            <button
              type="submit"
              aria-label="Send"
            >
              <Icon
                name="send"
                size={15}
              />
            </button>

          </form>

        </div>
      )}

      {/* FLOATING CHAT BUTTON */}
      <button
        className="chatbot-fab"
        onClick={() =>
          setOpen(
            (value) => !value
          )
        }
        aria-expanded={open}
        aria-label={
          open
            ? 'Close assistant'
            : 'Open assistant'
        }
      >
        <Icon
          name={
            open
              ? 'close'
              : 'chat'
          }
          size={22}
        />
      </button>

    </div>
  )
}