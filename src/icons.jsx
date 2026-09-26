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
        <svg {...props}>
          <path d="M4 6h16M4 12h10M4 18h5" />
        </svg>
      )
    default:
      return null
  }
}
