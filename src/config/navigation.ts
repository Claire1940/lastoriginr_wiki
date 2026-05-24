import {
  BookOpen,
  Trophy,
  Download,
  CalendarClock,
  Users,
  Cpu,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  key: string // Translation key, e.g. 'guide' -> t('nav.guide')
  path: string // URL path, e.g. '/guide'
  icon: LucideIcon // Lucide icon component
  isContentType: boolean // Whether mapped to content/ directory
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
  {
    key: 'guide',
    path: '/guide',
    icon: BookOpen,
    isContentType: true,
  },
  {
    key: 'tier',
    path: '/tier',
    icon: Trophy,
    isContentType: true,
  },
  {
    key: 'download',
    path: '/download',
    icon: Download,
    isContentType: true,
  },
  {
    key: 'release',
    path: '/release',
    icon: CalendarClock,
    isContentType: true,
  },
  {
    key: 'characters',
    path: '/characters',
    icon: Users,
    isContentType: true,
  },
  {
    key: 'systems',
    path: '/systems',
    icon: Cpu,
    isContentType: true,
  },
]

// Derive content type list from config (used by routing and content loading)
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
  (item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// Helper: validate content type
export function isValidContentType(type: string): type is ContentType {
  return CONTENT_TYPES.includes(type as ContentType)
}
