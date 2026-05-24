import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
	key: string // Translation key, e.g. 'guides' -> t('nav.guides')
	path: string // URL path, e.g. '/guides'
	icon: LucideIcon // Lucide icon component
	isContentType: boolean // Whether mapped to content/ directory
}

export const NAVIGATION_CONFIG: NavigationItem[] = []

// Derive content type list from config (used by routing and content loading)
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// Helper: validate content type
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
