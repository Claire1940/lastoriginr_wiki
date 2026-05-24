import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'
import deepMerge from 'deepmerge'

// Statically import all locale files configured in routing.ts
import enMessages from '@/locales/en.json'
import jaMessages from '@/locales/ja.json'
import koMessages from '@/locales/ko.json'
import thMessages from '@/locales/th.json'

const messages: Record<string, any> = {
	en: enMessages,
	ja: jaMessages,
	ko: koMessages,
	th: thMessages,
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	// Validate locale against routing.locales
	if (!locale || !routing.locales.includes(locale as Locale)) {
		locale = routing.defaultLocale
	}

	if (locale === 'en') {
		return { locale, messages: enMessages }
	}

	// Merge locale messages with English as fallback
	const localeMessages = messages[locale] || enMessages
	const mergedMessages = deepMerge(enMessages, localeMessages, {
		arrayMerge: (_destinationArray, sourceArray) => sourceArray,
	})

	return { locale, messages: mergedMessages }
})
