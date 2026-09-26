const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = ({ name, size = 20, className, ...props }) => {
  const iconProps = { width: size, height: size, viewBox: '0 0 24 24', className, ...base, ...props }

  switch (name) {
    case 'leaf':
      return (
        <svg {...iconProps}>
          <path d="M20 4c-9 0-16 5-16 14 9 0 14-6 14-14Z" />
          <path d="M9 15c3-3 6-6 11-9" />
        </svg>
      )
    case 'search':
      return (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
    case 'filter':
      return (
        <svg {...iconProps}>
          <path d="M4 5h16M7 12h10M10 19h4" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...iconProps}>
          <path d="M12 22s7-7.3 7-12a7 7 0 1 0-14 0c0 4.7 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      )
    case 'tag':
      return (
        <svg {...iconProps}>
          <path d="M20 12 12.5 19.5a2 2 0 0 1-2.8 0L4 13.8a2 2 0 0 1 0-2.8L11.5 3H18a2 2 0 0 1 2 2Z" />
          <circle cx="14.5" cy="8.5" r="1.2" fill="currentColor" />
        </svg>
      )
    case 'chat':
      return (
        <svg {...iconProps}>
          <path d="M4 5h16v11H8l-4 4Z" />
        </svg>
      )
    case 'send':
      return (
        <svg {...iconProps}>
          <path d="M22 2 11 13M22 2 15 22l-4-9-9-4Z" />
        </svg>
      )
    case 'close':
      return (
        <svg {...iconProps}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...iconProps}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...iconProps}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
    case 'basket':
      return (
        <svg {...iconProps}>
          <path d="M4 9h16l-1.5 10a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8Z" />
          <path d="M8 9 9.5 4M16 9 14.5 4M9 13v4M15 13v4" />
        </svg>
      )
    case 'sprout':
      return (
        <svg {...iconProps}>
          <path d="M12 21V11" />
          <path d="M12 11C12 6 8 4 4 4c0 5 3 8 8 7Z" />
          <path d="M12 13c0-4.5 3.5-6.5 8-6.5-.3 4.5-3.5 7-8 6.5Z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...iconProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      )
    case 'sort':
      return (
        <svg {...iconProps}>
          <path d="M4 6h16M4 12h10M4 18h5" />
        </svg>
      )
    case 'vegetables':
      return (
        <svg {...iconProps}>
          <path d="M8 17c0 2.7 2.3 5 5 5s5-2.3 5-5c0-1.2-.4-2.3-1-3.2.7-.6 1.2-1.5 1.5-2.5.2-.7-.1-1.5-.7-2-.6-.5-.5-.5-1.2-.3-.2 1-1 1.8-2 2.3 0 0 0 .1-.1.1-.7-.3-1.4-.6-2.2-.7v-.1c0-.1-.1-.3-.1-.4l-.1-.1c-.8.2-1.5.6-2 .9l-.2-.2c-.4-.3-.9-.4-1.2-.2-.7.6-.7 1.5-.3 2.2.5 1 1.4 1.6 2.1 1.9-.3.2-.7.4-1 .5-.3.2-.6.4-.8.7-1.2-.2-2-.7-2.3-1.8-.4-1.3 0-2.6 1-3.4.8-.7 1.8-1 2.9-.8.3-.8.8-1.4 1.4-1.7.7-.3 1.5-.2 2 .2.4-.4.8-.7 1.3-.8 0 .3-.1.5-.2.8.1 0 .1.1.2.1.2-.7.6-1.3 1-1.7.5-.4 1-.6 1.5-.6 1 0 1.9.5 2.2 1.4.2.8-.1 1.6-.7 2.1-.7.7-1.7 1-2.7.8l.1.2c0 .4.2.8.5 1 0 .1 0 .2-.1.2-.5-.3-1.1-.4-1.7-.4v.1c0 1.1.9 2 2 2.2.1 0 .2.1.3.1 0 1.1-.6 2.1-1.7 2.6.9.7 1.7 1.7 2 2.8.4 1.1.1 2.2-.7 3-1 .8-2.4 1-3.7.6-.2 0-.5 0-.7-.1v-.1c-1.2 0-2.3-.4-3.1-1.3-.9-.9-1.2-2.2-1-3.2-.7-.4-1.5-.9-2-1.7-.4 1.1-1.5 1.9-2.7 2-1.3.1-2.4-.7-2.7-2-.3-1.1.1-2.2 1-2.9.7-.6 1.6-.9 2.5-.6.1.3.2.6.2.9 0 0 .1 0 .1.1z" />
          <path d="M12 9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
        </svg>
      )
    case 'fruit':
      return (
        <svg {...iconProps}>
          <path d="M12 2v6M8 5a4 4 0 1 1 8 0c0 2.2-1.5 3.8-3 4.5-.7.3-1 .5-2 .5v5a2 2 0 0 0 4 0v-3a2 2 0 0 1 4 0v3a2 2 0 0 0 4 0v-5c-.5 0-1-.3-1.5-1 0 0 0 0-.1-.1C19 12.7 20 11 20 9a8 8 0 0 0-8-7H8a4 4 0 0 0 0 7c2 0 3.8-1.3 4.8-3 0 0 0 .1.2.1" />
        </svg>
      )
    case 'seafood':
      return (
        <svg {...iconProps}>
          <path d="M4 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.8-1.3-3.8l2.1-2.1a1 1 0 0 0-1.4-1.4l-2.1 2.1A7.94 7.94 0 0 0 14 9c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6 6 2.7 6 6h-2c0-2.2-1.8-4-4-4s-4 1.8-4 4z" />
          <path d="M16 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          <path d="M9 12c0 1.1.9 2 2 2s2-.9 2-2-1-2-2-2" />
        </svg>
      )
    case 'meat':
      return (
        <svg {...iconProps}>
          <path d="M6 20h12v-4c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4V20z" />
          <path d="M12 8c0 .6.4 1 1 1s1-.4 1-1-1-2-2-1-1 1.4-1 2z" />
          <circle cx="9" cy="9" r="2" />
          <circle cx="15" cy="9" r="2" />
          <path d="M7 7V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" />
        </svg>
      )
    case 'dairy':
      return (
        <svg {...iconProps}>
          <path d="M5 3h10a2 2 0 0 1 2 2v2H3V5a2 2 0 0 1 2-2z" />
          <path d="M5 7h10v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7z" />
          <path d="M9 3h2v4H9zM12 3h2v4h-2zM15 5h2a2 2 0 0 1 2 2v0" />
        </svg>
      )
    case 'cheese':
      return (
        <svg {...iconProps}>
          <path d="M4 6h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
          <path d="M4 9h16M4 12h16M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          <path d="M7 15c.5 1 2 .5 3 0s2-1 3 0" />
        </svg>
      )
    case 'eggs':
      return (
        <svg {...iconProps}>
          <path d="M12 4C9 4 7 6 7 9c0 2.5 3 5 5 5s5-2.5 5-5c0-3-2-5-5-5z" />
          <path d="M9 20h6v2H9z" />
          <ellipse cx="12" cy="14" cy2="16" rx="3" ry="1" />
        </svg>
      )
    case 'bread':
      return (
        <svg {...iconProps}>
          <path d="M4 12h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M5 12V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      )
    case 'baked-goods':
      return (
        <svg {...iconProps}>
          <path d="M6 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
          <path d="M18 14c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
          <path d="M9 7V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v3" />
          <path d="M4 11h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      )
    case 'honey':
      return (
        <svg {...iconProps}>
          <path d="M12 2v6" />
          <path d="M10 8h4a2 2 0 0 1 2 2v8H8v-8a2 2 0 0 1 2-2z" />
          <path d="M9 6h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3z" />
          <path d="M12 10v8" />
          <path d="M9 16h6" />
        </svg>
      )
    case 'preserves':
      return (
        <svg {...iconProps}>
          <path d="M8 2h8v4H8zM7 6h10v2a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V6z" />
          <path d="M7 8v8a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8" />
        </svg>
      )
    case 'herbs':
      return (
        <svg {...iconProps}>
          <path d="M12 4v16" />
          <path d="M8 7c2-1 4-1 8 0" />
          <path d="M8 11c2-1 4-1 8 0" />
          <path d="M8 15c2-1 4-1 8 0" />
          <path d="M8 19c2-1 4-1 8 0" />
          <path d="M5 7l2-2" />
          <path d="M17 6l2-1" />
        </svg>
      )
    case 'flowers':
      return (
        <svg {...iconProps}>
          <path d="M12 4v8" />
          <circle cx="9" cy="9" r="3" />
          <circle cx="15" cy="9" r="3" />
          <path d="M9 12c0 3.3 2.7 6 6 6s6-2.7 6-6" />
          <path d="M6 12c0 3.3 2.7 6 6 6" />
        </svg>
      )
    case 'prepared-food':
      return (
        <svg {...iconProps}>
          <path d="M6 6h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
          <path d="M18 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
          <path d="M9 6V4a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
          <path d="M6 11h12" />
        </svg>
      )
    case 'user':
      return (
        <svg {...iconProps}>
          <path d="M20 21V12a4 4 0 1 0-8 0v9" />
          <path d="M12 11a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
        </svg>
      )
    default:
      return null
  }
}
